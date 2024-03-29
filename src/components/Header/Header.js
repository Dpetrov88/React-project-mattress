import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from '../../hooks/useForm';
import { useMattressContex } from '../../contexts/MattresContext';


export const Header = () => {
  const {onSearchSubmit} = useMattressContex()
  
  const {isAuthenticated, email} = useContext(AuthContext);
  const {values,changeHandler, onSubmit} = useForm({
    search: ''},onSearchSubmit);

  return (
    <Navbar sticky='top' bg="dark"  variant='dark'>
    <Container>
      <Link to="/">Home</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/catalog">Catalog</Link>
          {isAuthenticated && (<>
          <Link to="/profile">Profil</Link>
          <Link to="/create">CreateMattress</Link>
          <Link to="/logout">Logout</Link>
          <p id='mail'>Welcome: {email}</p>
          </>
          )}
          {!isAuthenticated && (
            <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
            </>
          )}
          
        </Nav>
          <Form onSubmit={onSubmit} className="d-flex">
            <Form.Control
            value={values.search}
            onChange={changeHandler}
              type="search"
              name="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type='Submit' variant="outline-success">Search</Button>
          </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
};