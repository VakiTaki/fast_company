import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const navigation = [
        { id: 0, path: "/", title: "Main" },
        { id: 1, path: "/login", title: "Login" },
        { id: 2, path: "/users", title: "Users" }
    ];
    return (
        <ul className="nav">
            {navigation.map((navItem) => (
                <li className="nav-item" key={navItem.id}>
                    <Link className="nav-link" to={navItem.path}>
                        {navItem.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavBar;
