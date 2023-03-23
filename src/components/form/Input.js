import styles from './Input.module.css'

function Input ({type, text, name, placeholder, handleOnChenge, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} >{text}</label>
            <input 
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={handleOnChenge} 
            value={value}/>
        </div>
    )
}

export default Input