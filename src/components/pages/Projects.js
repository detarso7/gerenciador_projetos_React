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
  // Loader
    const [removeLoading, setRemoveLoading] = useState(true)

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
                  
                  {removeLoading && <Loading/>}    
                  {!removeLoading && projects.length === 0 && 
                  
                    (<p>Não há projetos no momento</p>)

                  }               

            </Container> 

        </div>
    )
    
}

export default Projects