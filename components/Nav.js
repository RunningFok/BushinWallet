import Link from "next/link"
import navStyles from "../styles/Nav.module.css"
import SwitchNetworkEthereum from "./SwitchNetworkEthereum"
import SwitchNetworkMoonbeam from "./SwitchNetworkMoonBeam"
import SwitchNetworkPolygon from "./SwitchNetworkPolygon"

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/about">Read Me</Link>
            </li>
           
            
                
        
        </ul>

    </nav>
    )
}

export default Nav