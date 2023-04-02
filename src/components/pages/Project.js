import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from "./Message"
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../Service/ServiceForm'

import {useParams } from "react-router-dom"
import { useState, useEffect } from 'react'



function Project(){

    const {id} = useParams()
    const [project, setProject] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
            setMessage('O orçamento do projeto não pode ser menor do que o custo dos serviços!')
            setType('error')
            setTimeout(() => {setMessage('');}, 3010);
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
        }) 
        .catch((err) => console.log(err))
    }

    //---------------------------------------------------

    function createService(project) {

        const lastService = project.services[project.services.length -1]
        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost 

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //MAXIMUM VALUE VALIDATION
        if (newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do seriço')
            setType('error')
            setTimeout(() => {setMessage('');}, 3000);
            project.services.pop()

            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        fetch(`http://localhost:5000/project/${project.id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            //Exibir Serviços
            console.log(data)
        }) 
        .catch((err) => console.log(err))
    }
    
    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
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
                                    <p>{project.name}</p>

                                </div>
                            )}
                        </div>

                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                               { !showServiceForm ? 'Criar Serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&
                                <div>
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                                        />
                                </div>}
                            </div>
                        </div>
                        <h2>Serviços:</h2>
                        <Container customClass="start">
                            
                            <p>Itens de Serviços</p>
                        </Container>

                    </Container>
                </div>
         
        ): (
            <Loading/>
        )}    
    </>)
}

export default Project