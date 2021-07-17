import React from "react";
import Navbar from "react-bootstrap/Navbar";

function Header() {
    return (
        <header>
            <Navbar>
                <Navbar.Brand>ComputerLink</Navbar.Brand>
                {/* <Nav sections={sections} current={current} setCurrent={setCurrent} /> */}
            </Navbar>
        </header>
    );
}

export default Header;
