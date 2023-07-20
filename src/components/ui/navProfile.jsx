import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function NavProfile() {
    const { currentUser } = useAuth();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleMenu = () => {
        setIsOpenMenu((prev) => !prev);
        setTimeout(() => {
            setIsOpenMenu(false);
        }, 3000);
    };
    return (
        <div className="dropdown" onClick={() => toggleMenu()}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="Avatar"
                    height={40}
                    className="img-responsive rounded-circle"
                />
            </div>
            <div
                className={"w-100 dropdown-menu" + (isOpenMenu ? " show" : "")}
            >
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Профиль
                </Link>
                <Link to={"/logout"} className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
