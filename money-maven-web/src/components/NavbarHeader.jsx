import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarHeader() {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">MONEY MAVEN</Navbar.Brand>
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
                  <Nav.Link href="/income">Income</Nav.Link>
                  <Nav.Link href="/expense">Expense</Nav.Link>
                  {/* <Nav.Link href="/category/add">Add Category</Nav.Link> */}
                  <Nav.Link href="/category/">Category</Nav.Link>
                  <Nav.Link href="/income/edit/:id">Edit Income</Nav.Link>
                  
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