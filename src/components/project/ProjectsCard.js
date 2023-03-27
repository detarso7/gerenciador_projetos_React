import styles from './ProjectsCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectsCard ({id, name, budget, category, handleRemove}) {

    return (
       <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category?.toLowerCase() || '']}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to='/'> <BsPencil/> Editar</Link>
                <button><BsFillTrashFill/> Remover</button>
            </div>
       </div>
            )
}

export default ProjectsCard