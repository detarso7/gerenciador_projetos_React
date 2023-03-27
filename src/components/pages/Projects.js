import Message from "./Message"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkBottun";
import ProjectsCard from "../project/ProjectsCard";

import styles from './Projects.module.css'




function Projects(props){

  //GET
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/project', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {setProjects(data)})
          .catch((err) => console.log(err))
      }, [])
    //

    //Message
    const location = useLocation()
    let message = ''

    if (location.state) {
      message = location.state.message
    }
    //

    return(
        <div className={styles.project_container}> 

            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newprojects" text="Criar Projeto"/>
            </div>

                {message && <Message type="success" msg={message} />}

            <Container customClass="start">

                {projects.length > 0 &&
                projects.map((pro) => (
                <ProjectsCard
                id={pro.id}
                name={pro.name}
                budget={pro.budget}
                key={pro.id}
                category={pro.category.name}/>
                ))}

            </Container> 

        </div>
    )
    
}

export default Projects