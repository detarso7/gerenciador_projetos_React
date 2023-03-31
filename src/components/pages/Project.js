import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from "./Message"
import ProjectForm from '../project/ProjectForm'

import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from 'react'


function Project(){

    const navigate = useNavigate()
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    //---------------------------------------------------

    useEffect(() => {
        setTimeout(() => {
        fetch(`http://localhost:5000/project/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/jason',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            
        })
        .catch((err) => console.log(err))
        }, 300)
    }, [id])

    //---------------------------------------------------

    function editPost(project){

        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo o orçamento!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/project/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto alterado com sucesso!')
            setType('success')
            setTimeout (() => {navigate('/projects')}, 3000) 
        }) 
        .catch((err) => console.log(err))
    }

    //---------------------------------------------------
    
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    //---------------------------------------------------
    

    return(
    <>
        {project.name ? (
            
                <div className={styles.project_details}>
                    <Container customClass="column">

                        {message && <Message type={type} msg={message}/>}

                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                               { !showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>

                                    <ProjectForm
                                    
                                        handleSubmit={editPost}
                                        btnText="Concluir Edição"
                                        projectData={project}
                                    
                                    />

                                </div>
                            )}
                        </div>
                    </Container>
                </div>
         
        ): (
            <Loading/>
        )}    
    </>)
}

export default Project