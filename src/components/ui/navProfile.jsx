import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthId, getUserById } from "../../store/usersSlice";

function NavProfile() {
    const authId = useSelector(getAuthId());
    const currentUser = useSelector(getUserById(authId));
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const toggleMenu = () => {
        setIsOpenMenu((prev) => !prev);
        setTimeout(() => {
            setIsOpenMenu(false);
        }, 3000);
    };
    return (
        <>
            {currentUser && (
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
                        className={
                            "w-100 dropdown-menu" + (isOpenMenu ? " show" : "")
                        }
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
            )}
        </>
    );
}

export default NavProfile;
