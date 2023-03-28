import Message from "./Message"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkBottun";
import Loading from "../layout/Loading";
import ProjectsCard from "../project/ProjectsCard";

import styles from './Projects.module.css'




function Projects(props){

  //GET
    const [projects, setProjects] = useState([])
  // LOADER
    const [removeLoading, setRemoveLoading] = useState(true)
  // MESSAGE REMOVE
    const [projectMessage, setProjectMessage] = useState('')

  //METODO GET
    useEffect(() => {
      setTimeout(()=>{
        fetch('http://localhost:5000/project', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data)
            setRemoveLoading(false)
          })
          .catch((err) => console.log(err))
      }, 300)
      }, [])
    //

    //METODO REMOVE
    function removeProject(id) {
      fetch(`http://localhost:5000/project/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then(() => {
          setProjects(projects.filter((pro) => pro.id !== id))
          setProjectMessage('Projeto removido com sucesso')
        })
        .catch((err) => console.log(err))
    }


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
                {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container customClass="start">

                {projects.length > 0 &&
                  projects.map((pro) => (
                  <ProjectsCard
                    id={pro.id}
                    name={pro.name}
                    budget={pro.budget}
                    key={pro.id}
                    category={pro.category.name}
                    handleRemove={removeProject}/>
                  ))}
                  
                  {removeLoading && <Loading/>}    
                  {!removeLoading && projects.length === 0 && 
                  
                    (<p>Não há projetos no momento</p>)

                  }               

            </Container> 

        </div>
    )
    
}

export default Projects