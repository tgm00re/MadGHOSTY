import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <Navbar expand="lg" className="navbar" variant="dark">
                <Container>
                    <Navbar.Brand as={Link}>Botdestroya's Dominion</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link}>Kroger Shrine</Nav.Link>
                            <Nav.Link as={Link}>The Madi Files</Nav.Link>
                            <Nav.Link as={Link}>Cunty Madi Maze</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
