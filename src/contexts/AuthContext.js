import {createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import {authServiceFactory} from "../service/authService";



export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
	const [error, setEror] = useState([])
    const [user, setUser] = useLocalStorage('user', {});
    const navigate = useNavigate();
    const authService =  authServiceFactory(user.accessToken);

    const onLoginSubmit = async(data) => {
		try {
			const result = await authService.login(data);
			
			setUser(result);
			
			navigate('/');

		} catch (error) {
			setEror(error.message)
			
		}
	};

	const onRegisterSubmit = async(data) => { 
		const {confirmPass , ...registerData } = data;

		if (confirmPass !== registerData.password) {
			return setEror('Password don`t match!');
		}
		try {
			const result = await authService.register(registerData);

			setUser(result);

			navigate('/');

		} catch (error) {
			setEror(error.message)
		}
	};

    const onLogout = async() => {
        await authService.logout();
		
		setUser({});
   }

    const contex = {
		onLoginSubmit,
		onRegisterSubmit,
		onLogout,
		userId: user._id,
		token: user.accessToken,
		email: user.email,
		isAuthenticated: !!user.accessToken,

	}
    return (
        <AuthContext.Provider value={contex}>
			{error && (
				<div>
				<p>{error}</p>
			</div>
			)}
             {children }
        </AuthContext.Provider>
    )
};