import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import NavProfile from "../navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    const navigation = [
        { id: 0, path: "/", title: "Главная", display: true },
        { id: 1, path: "/login", title: "Вход", display: false },
        { id: 2, path: "/users", title: "Пользователи", display: !!currentUser }
    ];
    return (
        <nav className="navbar bg-light mb-3 rounded-bottom rounded-3">
            <div className="container-fluid">
                <ul className="nav">
                    {navigation.map((navItem) => {
                        if (navItem.display) {
                            return (
                                <li className="nav-item" key={navItem.id}>
                                    <Link
                                        className="nav-link"
                                        to={navItem.path}
                                    >
                                        {navItem.title}
                                    </Link>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to={"/login"}>
                            {"Вход"}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
