import { useEffect, useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import {mattressServiceFactory} from "./service/mattressService";
import {authServiceFactory} from "./service/authService";
import { AuthContext } from './contexts/AuthContext'

import { Header } from './components/Header/Header';
import { Catalog } from './components/Catalog/Catalog';
import { CreateMattress } from './components/CreateMattress/CreateMattress';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Details } from './components/Details/Details';
import { Edit } from './components/Edit/Edit';
import { Logout } from './components/Logout/Logout';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [mattress, setMattress] = useState([]);
	const mattressService = mattressServiceFactory(user.accessToken);
	const authService =  authServiceFactory(user.accessToken)
	
	useEffect(() => {
		mattressService.getAll()
		.then(result => {
			setMattress(result)
		})
	},[]);

	const onCreateMattressSubmit = async(data) => {
		const newMattress = await mattressService.create(data);

		setMattress(state => [...state, newMattress] );

		navigate('/catalog')
	};

	const onLoginSubmit = async(data) => {
		try {
			const result = await authService.login(data);
			
			setUser(result);
			
			navigate('/');

		} catch (error) {
			console.log("Problem!!");
		}
	};

	const onLogout = async() => {
		 await authService.logout();

		setUser({});
	}

	const onRegisterSubmit = async(data) => { 
		const {confirmPass , ...registerData } = data;

		if (confirmPass !== registerData.password) {
			return;
		}
		try {
			const result = await authService.register(registerData);

			setUser(result);

			navigate('/');

		} catch (error) {
			console.log("Problem!");
		}
	};

	const onEditMattresssubmit = async(values) => {
		const result = await mattressService.edit(values._id, values);

		setMattress(state => state.map(x => x._id === values._id ? result : x));

		navigate(`/catalog/${values._id}`);
	};

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
		<div id='mattress'>
		<Header/>
			<main>
				<Routes>
					<Route path='/' element={<Home mattress={mattress}/>} />
					<Route path='/login' element={<Login /> } />
					<Route path='/register' element={<Register />} />
					<Route path='/logout' element={<Logout /> } />
					<Route path='/create' element={<CreateMattress onCreateMattressSubmit={onCreateMattressSubmit} />} />
					<Route path='/catalog' element={<Catalog mattress={mattress} />} />
					<Route path='/catalog/:mattressId' element={<Details />} />
					<Route path='/catalog/:mattressId/edit' element={<Edit onEditMattresssubmit={onEditMattresssubmit} />} />
				</Routes>

			</main>

			<Footer />

		</div>
	</AuthContext.Provider>
  )
};

export default App;
