import React, { useState } from "react";
import api from "../src/api/index";
import UserTable from "./components/usersTable";
import PartyMsg from "./components/partyMsg";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

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
            <PartyMsg numUsers={users.length} />
            <UserTable
                users={users}
                onDelete={handlerDelete}
                onToogleBookMark={handleToogleBookMark}
            />
        </div>
    );
}

export default App;
