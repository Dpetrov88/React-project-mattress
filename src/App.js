import {Routes, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { MattressProvider } from './contexts/MattresContext';

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

  return (
	<AuthProvider>
		<MattressProvider>
			<div id='mattress'>
			<Header/>
				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login /> } />
						<Route path='/register' element={<Register />} />
						<Route path='/profil' element='' />
						<Route path='/logout' element={<Logout /> } />
						<Route path='/create' element={<CreateMattress />} />
						<Route path='/catalog' element={<Catalog />} />
						<Route path='/catalog/:mattressId' element={<Details  />} />
						<Route path='/catalog/:mattressId/edit' element={<Edit />} />
					</Routes>

				</main>

				<Footer />

			</div>
		</MattressProvider>
	</AuthProvider>
  )
};

export default App;
