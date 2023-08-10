import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "../navProfile";
import { getIsLoggedIn } from "../../../store/usersSlice";
import { useSelector } from "react-redux";
import UsersLoader from "../hoc/usersLoader";

const NavBar = () => {
    const isAuth = useSelector(getIsLoggedIn());
    const navigation = [
        { id: 0, path: "/", title: "Главная", display: true },
        { id: 1, path: "/login", title: "Вход", display: false },
        { id: 2, path: "/users", title: "Пользователи", display: !!isAuth }
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
                    {isAuth ? (
                        <UsersLoader>
                            <NavProfile />
                        </UsersLoader>
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
