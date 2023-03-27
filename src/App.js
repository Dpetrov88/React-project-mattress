import { useEffect, useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import {mattressServiceFactory} from "./service/mattressService";
import { AuthProvider } from './contexts/AuthContext'

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
	
	const [mattress, setMattress] = useState([]);
	const mattressService = mattressServiceFactory();//user.accessToken
	
	
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


	const onEditMattresssubmit = async(values) => {
		const result = await mattressService.edit(values._id, values);

		setMattress(state => state.map(x => x._id === values._id ? result : x));

		navigate(`/catalog/${values._id}`);
	};

	

  return (
	<AuthProvider>
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
	</AuthProvider>
  )
};

export default App;
