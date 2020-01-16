import React, { useState, useEffect } from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import logo from "./components/najlepszeLogo.png"
function App(props) {
    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [homeUrl, setHomeUrl] = useState("/");

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();
        userHasAuthenticated(false);
        setHomeUrl("/");
        props.history.push("/");
    }

    async function handleHome() {
        Auth.currentAuthenticatedUser()
            .then(user => Auth.userAttributes(user))
            .then(attributes => checkUser(attributes));
        props.history.push(homeUrl);
    }

    function checkUser(attributes) {
        if (attributes[2].getValue() === "1") {
            setHomeUrl("/recruiter");
        } else {
            setHomeUrl("/candidate");
        }
    }

    return (
        !isAuthenticating &&
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        {/*tu jest problem, chciałem żeby wciśnięcie home przenosiło do strony głównej kandydata albo rekrutera w zależności od tego, kto jest zalogowany, ale coś nie wyszło xd*/}
                        <Link onClick={handleHome}>Home</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                            ? <NavItem onClick={handleLogout}>Logout</NavItem>
                            : <>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <a>
                <img src={logo} className="logo" />
            </a>
            <Routes appProps={{ isAuthenticated, userHasAuthenticated}} />
        </div>
    );
}

export default withRouter(App);
