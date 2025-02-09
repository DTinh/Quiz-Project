import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink  } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
            <NavLink  to= '/' className='navbar-brand'>Quiz Project</NavLink >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink  to= '/' className='nav-link'>Home</NavLink >
            <NavLink  to= '/users' className='nav-link'>User</NavLink >
            <NavLink  to= '/admins' className='nav-link'>Admin</NavLink >
          </Nav>
          <Nav>
            <button className='btn-login'>Log in</button>
            <button className='btn-signup'>Sign up</button>
             {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Login</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;