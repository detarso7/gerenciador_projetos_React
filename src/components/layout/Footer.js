import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'


import Styles from './Footer.module.css'

function Footer(){
    return (
        <footer className={Styles.footer}>
            <ul className={Styles.list_icon}>
                <li><a href='#'><FaLinkedin/></a></li>
            </ul>
            <p className={Styles.copy_right}><span>Projetise</span> &copy; 2023</p>
        </footer>
    )
}

export default Footer