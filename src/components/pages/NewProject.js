import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import {useNavigate} from 'react-router-dom'

function NewProject(props){

    const navigate = useNavigate()

    function creatProject(project){

    //Initialize cost and services
    project.cost = 0
    project.services=[]

    fetch('http://localhost:5000/project', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        //redirect
        navigate('/projects', {message: 'Projeto criado com sucesso'})
    }) 
    .catch((err) => console.log(err))
}

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={creatProject} btnText="Criar Projeto"/>
        </div>
        )
    
}

export default NewProject