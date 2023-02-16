import "./Footer.scss"
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo } from 'phosphor-react'

export function Footer(){

    return (
        <>
        <h1 className="footer">Footer</h1>
        <FacebookLogo size={32} color="#ff0000" weight="fill" />
        <LinkedinLogo size={32} color="#ff0000" weight="fill" />
        <TwitterLogo size={32} color="#ff0000" weight="fill" />
        <InstagramLogo size={32} color="#ff0000" />
        </>
    )
}