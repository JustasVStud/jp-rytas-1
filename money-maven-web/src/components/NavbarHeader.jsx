import { NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import { FaBars, FaUserAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutHandler } from "../services/logoutHandler";
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import bigEllipse from '../assets/Elipsai Logotipui.svg';
import smallEllipse from '../assets/Ellipse 3.svg';
import desktopLogo from '../assets/Favicon.svg';

function NavbarHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);
  const isAdmin = user && user.authorities.includes('ADMIN');
  const isLoggedIn = !!user;
  const isProfilePage = location.pathname === '/profile';

  const handleLogout = () => {
    logoutHandler(logout, navigate);
  };

  

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="navigation">
          {window.innerWidth < 768 ? (
            <>
              <Image 
                src={location.pathname === '/income' || location.pathname === '/expense' ? smallEllipse : bigEllipse} 
                className='navigation-logo--img'
              />
              <Navbar.Brand href='/profile' className='navigation-logo'>
              {location.pathname === '/income' || location.pathname === '/expense' ? (
                <span className='navigation-logo--text small'>
                  MONEY <br/> MAVEN
                </span>

              ) : (
                <span className='navigation-logo--text'>
                MONEY MAVEN
                </span>
              )}
              </Navbar.Brand>
            </>

          ) : (
            <Navbar.Brand  href='/profile' className='navigation-logo'>
              <Image src={desktopLogo} className='navigation-logo--img'/>
              <span className='navigation-logo-text'>MONEY MAVEN</span>
            </Navbar.Brand>
          )
        }
            {isLoggedIn && !isProfilePage && (
              <NavDropdown title={<FaUserAlt/>} className='navigation-profile'>
                <NavDropdown.Item href='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className='navigation-toggle'>
              <FaBars/>
            </Navbar.Toggle>
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
                <Nav className="offcanvas-nav">
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
                    <Nav.Link href="/budget">Budget</Nav.Link>
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
        </Navbar>
      ))}
    </>
  );
}

export default NavbarHeader;