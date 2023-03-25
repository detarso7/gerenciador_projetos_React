import Message from "./Message"
import { useLocation } from 'react-router-dom'
import { useState } from "react";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkBottun";
import ProjectsCard from "../project/ProjectsCard";

import styles from './Projects.module.css'




function Projects(props){

    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => setProjects(data))
          .catch((err) => console.log(err))
      }, [])

    const location = useLocation()
    let message = ''

    if (location.state) {
      message = location.state.message
    }

    return(
        <div className={styles.project_container}> 

            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newprojects" text="Criar Projeto"/>
            </div>

                {message && <Message type="success" msg={message} />}

            <Container customClass="start">

                {projects.map((data) =>(
                <ProjectsCard 
                id={data.id} 
                name={data.name} 
                budget={data.budget} 
                category={data.category}/>)) }

            </Container>

        </div>
    )
    
}

export default Projects