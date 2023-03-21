import Styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LinkBottun'

function Home(props){
    return(
        <section className={Styles.home_container}>
            <h1>Bom vindo ao <span>Projetise</span></h1>
            <p>Comece a gerir seus projetos agora mesmo</p>
            <LinkButton to="/newprojects" text="Criar Projeto"/>
            <img src={savings} alt="Gegenciador de Projetos"/>
        </section>
    )
    
}

export default Home