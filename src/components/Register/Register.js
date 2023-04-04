import { useContext } from 'react';
import { Link } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const {values,changeHandler, onSubmit} = useForm({
        email: '',
        password: '',
        confirmPass: '',

    },onRegisterSubmit)

    return(
        <section id="registerPage">
            <form  method='POST' onSubmit={onSubmit}>
                <fieldset>
                    <legend>Register</legend>
                    <label htmlFor="email" className="vhod">Email</label>
                    <input
                     id="email"
                     className="email"
                     name="email"
                     type="email"
                     value={values.email}
                     onChange={changeHandler}
                     placeholder="Email" />

                    <label htmlFor="password" className="vhod">Password</label>
                    <input
                      id="password" 
                      className="password" 
                      name="password" 
                      type="password" 
                      value={values.password}
                      onChange={changeHandler}
                      placeholder="Password" />

                    <label htmlFor="conf-pass" className="vhod">Confirm Password:</label>
                    <input 
                    id="conf-pass" 
                    className="conf-pass" 
                    name="confirmPass" 
                    type="password" 
                    value={values.repeatPass} 
                    onChange={changeHandler} 
                    placeholder="Confirm Password" />

                    <button type="submit" className="register">Register</button>
                    <p className="field">
                        <span>If you already have profile click <Link to={'/login'}>here</Link></span>
                    </p>
                </fieldset>
            </form>
        </section>
    )
};