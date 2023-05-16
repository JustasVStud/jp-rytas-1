import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutHandler } from "../services/logoutHandler";
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

function NavbarHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logoutHandler(logout, navigate);
  };

  const isAdmin = user && user.authorities.includes('ADMIN');
  const isLoggedIn = !!user;
  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container>
            <Navbar.Brand href="#" className='mr-auto'>MONEY MAVEN</Navbar.Brand>
            {isLoggedIn && !isProfilePage && (
              <NavDropdown title={<FaUserAlt/>}>
                <NavDropdown.Item href='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                MONEY MAVEN
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                {!isLoggedIn && (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
                {isLoggedIn &&(
                  <>
                    <Nav.Link href="/income">Income</Nav.Link>
                    <Nav.Link href="/expense">Expense</Nav.Link>
                    <Nav.Link href="/doughnut">Doughnut Chart</Nav.Link>
                    <Nav.Link href="/line">Line Chart</Nav.Link>
                    {isAdmin && (
                        <NavDropdown title="Administration">
                          <NavDropdown.Item href="/category/">
                            Category
                          </NavDropdown.Item>
                        </NavDropdown>
                    )}
                  </>
                )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarHeader;