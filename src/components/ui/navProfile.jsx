import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function NavProfile() {
    const { currentUser } = useAuth();
    console.log(currentUser);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleMenu = () => {
        setIsOpenMenu((prev) => !prev);
    };
    return (
        <div className="dropdown" onClick={() => toggleMenu()}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`}
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
