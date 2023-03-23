import styles from './ProjectForm.module.css'
import Input from '../form/Input.js'
import Select from '../form/Select.js'
import Submit from '../form/Submit.js'

function ProjectForm({btnText}){
    return(
        <form className={styles.form}>
        
            <Input type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto"/>

            <Input type="number" 
            text="Orçamento do Projeto" 
            name="budget" 
            placeholder="Insira o orçamento total"/>

            <Select name="category_id" text="Selecione a categoria"/>

            <Submit text={btnText}/>
        
        </form>

    )
}

export default ProjectForm