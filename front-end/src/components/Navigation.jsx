import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <Navbar expand="lg" className="navbar" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Botdestroya's Dominion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/gallery"}>The Madi Files</Nav.Link>
                            <Nav.Link as={Link} to="/kroger">Kroger Shrine</Nav.Link>
                            <Nav.Link as={Link} to={"/game"}>MADI RUN</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
