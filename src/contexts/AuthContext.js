import {createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

import {authServiceFactory} from "../service/authService";



export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [user, setUser] = useLocalStorage('user', {});
    const navigate = useNavigate();
    const authService =  authServiceFactory(user.accessToken);

    const onLoginSubmit = async(data) => {
		const {email, password} = data;
		if (!email || !password) {
			return alert("All field are required")
		}
		try {
			const result = await authService.login(data);
			
			setUser(result);
			
			navigate('/');

		} catch (error) {
			alert(error.message)
			
		}
	};

	const onRegisterSubmit = async(data) => { 
		const {confirmPass , ...registerData } = data;

		if (confirmPass !== registerData.password) {
			return alert('Password don`t match!');
		}
		if (!confirmPass || !registerData.password || !registerData.email) {
			return alert("All field are required");
		}
		try {
			const result = await authService.register(registerData);

			setUser(result);

			navigate('/');

		} catch (error) {
			alert(error.message)
		}
	};

    const onLogout = async() => {
        await authService.logout();
		setUser({});
		localStorage.clear()
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
             {children }
        </AuthContext.Provider>
    )
};