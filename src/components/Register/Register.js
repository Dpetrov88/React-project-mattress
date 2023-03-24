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
                    <input value={values.email} onChange={changeHandler} id="email" className="email" name="email" type="text" placeholder="Email" />
                    <label htmlFor="password" className="vhod">Password</label>
                    <input value={values.password} onChange={changeHandler} id="password" className="password" name="password" type="password" placeholder="Password" />
                    <label htmlFor="conf-pass" className="vhod">Confirm Password:</label>
                    <input value={values.repeatPass} onChange={changeHandler} id="conf-pass" className="conf-pass" name="confirmPass" type="password" placeholder="Confirm Password" />
                    <button type="submit" className="register">Register</button>
                    <p className="field">
                        <span>If you already have profile click <Link to={'/login'}>here</Link></span>
                    </p>
                </fieldset>
            </form>
        </section>
    )
};