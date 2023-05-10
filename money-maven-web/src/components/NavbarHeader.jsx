import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logoutHandler } from "../services/logoutHandler";

function NavbarHeader() {
  const navigate = useNavigate();
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container>
            <Navbar.Brand href="#" className='mr-auto'>MONEY MAVEN</Navbar.Brand>
            <NavDropdown title={<FaUserAlt/>}>
              <NavDropdown.Item href='/profile'>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => logoutHandler(navigate)}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
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
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/profile">User</Nav.Link>
                  <Nav.Link href="/income">Income</Nav.Link>
                  <Nav.Link href="/expense">Expense</Nav.Link>
                  <Nav.Link href="/category/">Category</Nav.Link>
                  <Nav.Link href="/doughnut">Doughnut Chart</Nav.Link>
                  <Nav.Link href="/line">Line Chart</Nav.Link>
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