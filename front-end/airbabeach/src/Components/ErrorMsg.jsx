


export function ErrorMsg({inputs, type}){

    const [msg, setMsg] = useState('')

if(inputs==='firstName' && type==='null') return setMsg('Este campo é obrigatório')

    return(
        
        <p className="text-small errorMsg">{msg}</p>
    )
}