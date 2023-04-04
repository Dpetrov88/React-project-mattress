import {useContext} from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'; 
import { useForm } from '../../hooks/useForm';


export const Login = () => {
    const {onLoginSubmit} = useContext(AuthContext);
    const {values, changeHandler, onSubmit } = useForm({
        email:'', 
        password:'',
    }, onLoginSubmit);
    return(
        <section id="loginPage">
        <form method='POST' onSubmit={onSubmit}>
            <fieldset>
                <legend>Login</legend>
    
                <label htmlFor="email" className="vhod">Email</label>
                <input  id="email" className="email" name="email" type="text" placeholder="Email" value={values.email} onChange={changeHandler} />
    
                <label htmlFor="password" className="vhod">Password</label>
                <input id="password" className="password" name="password" type="password" placeholder="Password" value={values.password} onChange={changeHandler} />
    
                <button type="submit" className="login">Login</button>
    
                <p className="field">
                    <span>If you don't have profile click <Link to={'/register'} >here</Link> </span>
                </p>
            </fieldset>
        </form>
    </section>
     )
};