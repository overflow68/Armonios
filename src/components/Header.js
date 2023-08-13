
import logo from '../images/logo.png'
import style from './Header.module.css'
export default function Header(){
    return(
        <div className={style.header}>
        <img alt="logo" src={logo} height={60}></img>
        </div>
    )
}
