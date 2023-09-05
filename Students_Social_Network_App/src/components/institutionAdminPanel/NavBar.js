import AuthService from "../../services/AuthService";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import SideNav from "./SideNav";
import './insHome.css';

const NavBar = ({institute}) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate("/institution");
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Students Social Network</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#features" disabled>{institute.name}</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;