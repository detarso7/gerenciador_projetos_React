import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'

import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

function Project(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

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

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
    <>
        {project.name ? (
            
                <div className={styles.project_details}>
                    <Container customClass="column">
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
                                <div className={styles.project_info}>Formulario de edição</div>
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