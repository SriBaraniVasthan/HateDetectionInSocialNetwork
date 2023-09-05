import { Link } from "react-router-dom";
import AccountMenu from "./accountMenu/AccountMenu";
import './Header.css';

const Header = ({currElement}) => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top justify-content-end d-flex bg-header">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">Students Social Network</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav" style={{ position: 'fixed', transform: 'translate(-50%, -50%)', left: '50%', top: '30px' }}>
                        <li className="nav-item">
                            <Link to="/home" className={currElement == 'home' ? "nav-link active" : "nav-link"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className={currElement == 'events' ? "nav-link active" : "nav-link"}>Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/peers" className={currElement == 'peers' ? "nav-link active" : "nav-link"}>People</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/groups" className={currElement == 'groups' ? "nav-link active" : "nav-link"}>Groups</Link>
                        </li>

                    </ul>
                </div>
                <AccountMenu />
            </div>   
        </nav>
    );
};

export default Header;