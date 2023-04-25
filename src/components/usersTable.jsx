import React, { useEffect, useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import PartyMsg from "./partyMsg";
import Loader from "./loader";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const allProfession = { name: "Все профессии", _id: "0" };
    const pageSize = 4;
    const [selectedProf, setSelectedProf] = useState({
        name: "Все профессии",
        _id: "0"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [professoins, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions({
                allProfession,
                ...data
            })
        );
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    function handlerDelete(id) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
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
    const handleProfessionSelect = (item) => {
        selectedProf && item === selectedProf
            ? setSelectedProf(allProfession)
            : setSelectedProf(item);
        setCurrentPage(1);
    };
    const filterUsers =
        selectedProf._id !== allProfession._id
            ? users.filter((user) => user.profession === selectedProf)
            : users;
    const count = filterUsers.length;
    const userCrop = paginate(filterUsers, currentPage, pageSize);
    if (!userCrop.length && currentPage !== 1) {
        setCurrentPage((prev) => prev - 1);
    }
    return (
        <>
            {users && professoins ? (
                <div className="mt-2">
                    <PartyMsg numUsers={filterUsers.length} />

                    <div className="d-flex">
                        {professoins && (
                            <GroupList
                                items={professoins}
                                onItemSelect={handleProfessionSelect}
                                selectedProf={selectedProf}
                            />
                        )}

                        {filterUsers.length !== 0 && (
                            <div>
                                <div
                                    style={{
                                        height: `${(pageSize + 1) * 90}px`
                                    }}
                                >
                                    <table className="table m-2 align-middle">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    style={{ width: "110px" }}
                                                >
                                                    Имя
                                                </th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "250px" }}
                                                >
                                                    Качества
                                                </th>
                                                <th scope="col">Профессия</th>
                                                <th
                                                    scope="col"
                                                    style={{ width: "150px" }}
                                                >
                                                    Встретился, раз
                                                </th>
                                                <th scope="col">Оценка</th>
                                                <th
                                                    scope="col"
                                                    className="text-center"
                                                >
                                                    Избранное
                                                </th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userCrop.map((user) => (
                                                <User
                                                    user={user}
                                                    key={user._id}
                                                    onDelete={handlerDelete}
                                                    onToogleBookMark={
                                                        handleToogleBookMark
                                                    }
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {!!filterUsers.length && (
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UsersTable;
