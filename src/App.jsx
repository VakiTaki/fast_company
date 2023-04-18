import React, { useState } from "react";
import api from "../src/api/index";
import UserTable from "./components/usersTable";
import PartyMsg from "./components/partyMsg";

function App() {
    const initialUsers = api.users.fetchAll();
    const [users, setUsers] = useState(initialUsers);

    function handlerDelete(id) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
    }

    const handleToogleBookMark = (id) => {
        setUsers((prev) =>
            prev.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <PartyMsg numUsers={users.length} />
                <button
                    className="badge bg-warning fs-4 m-2  text-reset"
                    onClick={() => setUsers(initialUsers)}
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
            <UserTable
                users={users}
                onDelete={handlerDelete}
                onToogleBookMark={handleToogleBookMark}
            />
        </div>
    );
}

export default App;
