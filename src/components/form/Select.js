import styles from './Select.module.css'

function Select ({text, name, options, handleOnChenge, value}){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} >{text}</label>
            <select name={name} id={name}>
            <options>Selecione uma opçao</options>
                {options.map((options) => (
                    <option value={options.id} kay={options.id}>{options.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select