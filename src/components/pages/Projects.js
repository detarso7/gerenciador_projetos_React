import Message from "./Message"
import { useLocation } from 'react-router-dom'
import Container from "../layout/Container";

import styles from './Projects.module.css'
import LinkButton from "../layout/LinkBottun";

function Projects(props){

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
                <p>Projetos</p>
            </Container>
        </div>
    )
    
}

export default Projects