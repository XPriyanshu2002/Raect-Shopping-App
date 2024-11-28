import { useState } from "react"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function Login(){


    const [userid, setuserId] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies('userid');

    let navigate = useNavigate();

    function handleIdChange(e){
        setuserId(e.target.value);
    }

    function handleLoginClick(){
        setCookie('userid', userid);
        navigate('/');
    }

    return(
        <div>
            <h2>User Login</h2>
            <dl>
                <dt>User Id</dt>
                <dd><input type="text" onChange={handleIdChange} /></dd>
                <dt>Password</dt>
                <dd><input type="password" /></dd>
            </dl>
            <button onClick={handleLoginClick} className="btn btn-primary">Login</button>
        </div>
    )
}