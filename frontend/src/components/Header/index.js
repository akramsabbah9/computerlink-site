import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Header() {
    // test Auth.getCookie()
    useEffect(() => {
        console.log(Auth.getCookie());
    }, []);

    return (
        <header>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>ComputerLink</Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <NavDropdown title="Servers">
                            <NavDropdown.Item as={Link} to="/servers">TODO</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Workstations">
                            <NavDropdown.Item as={Link}>TODO</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Solutions">
                            <NavDropdown.Item as={Link}>TODO</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link}>About Us</Nav.Link>
                        <Nav.Link as={Link}>Contact Us</Nav.Link>
                        {/* {Auth.getCookie() ?
                            <Nav.Link as={Link}>Logout</Nav.Link>
                            :
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>} */}
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            
                        {/* Add search bar, cart, login/logout, and profile links */}
                        {/* Remove About or Contact? Solutions? */}
                    </Nav>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
