import React, { useEffect, useState } from "react";
import Pagination from "../components/tableElements/pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/tableElements/groupList";
import api from "../api";
import PartyMsg from "../components/userList/partyMsg";
import Loader from "../components/tableElements/loader";
import UsersTable from "../components/userList/usersTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserInfo from "../components/userList/userInfo";
import TextField from "../components/UI/textField";

const Users = () => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);
    const allProfession = { name: "Все профессии", _id: "0" };
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    const [selectedProf, setSelectedProf] = useState({
        name: "Все профессии",
        _id: "0"
    });
    // уникальный список айди профессий в users
    const [profListinUsers, setProfListinUser] = useState(["0"]);
    useEffect(() => {
        setProfListinUser([
            "0",
            ...new Set(users.map((user) => user.profession._id))
        ]);
    }, [users.length]);
    const [currentPage, setCurrentPage] = useState(1);
    const [professoins, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions({
                ...data,
                allProfession
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
    const handleToogleBookmark = (id) => {
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
        setSearchText("");
        selectedProf && item._id === selectedProf._id
            ? setSelectedProf(allProfession)
            : setSelectedProf(item);
        setCurrentPage(1);
    };
    const handleResetUsers = () => {
        setProfessions();
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) =>
            setProfessions({
                allProfession,
                ...data
            })
        );
    };
    const handleSort = (prop) => {
        if (sortBy.iter === prop) {
            setSortBy((prev) => ({
                ...prev,
                order: prev.order === "asc" ? "desc" : "asc"
            }));
        } else {
            setSortBy({ iter: prop, order: "asc" });
        }
    };
    const handleSearch = (e) => {
        setSelectedProf(allProfession);
        setCurrentPage(1);
        setSearchText(e.target.value);
    };
    const filterUsers = searchText.trim()
        ? users.filter((user) =>
              user.name.toLowerCase().includes(searchText.trim().toLowerCase())
          )
        : selectedProf._id !== allProfession._id
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const sortedUsers = _.orderBy(filterUsers, [sortBy.iter], [sortBy.order]);
    const count = sortedUsers.length;
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    useEffect(() => {
        if (!userCrop.length && currentPage !== 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [users]);
    useEffect(() => {
        setSelectedProf(allProfession);
    }, [profListinUsers.length]);
    const { id } = useParams();
    if (id) return <UserInfo id={id} />;
    return (
        <>
            {users && professoins ? (
                <div className="mt-2">
                    <div className="d-flex justify-content-between">
                        <PartyMsg numUsers={count} />
                        {!users.length && (
                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={handleResetUsers}
                            >
                                Reset
                            </button>
                        )}
                    </div>
                    <div className="d-flex">
                        {!!users.length && (
                            <>
                                <GroupList
                                    items={professoins}
                                    onItemSelect={handleProfessionSelect}
                                    selectedProf={selectedProf}
                                    profListinUsers={profListinUsers}
                                />

                                <div>
                                    <div className="mt-2">
                                        <TextField
                                            type={"search"}
                                            placeholder={"Поиск по имени"}
                                            onChange={handleSearch}
                                            value={searchText}
                                        />
                                        <UsersTable
                                            userCrop={userCrop}
                                            onDelete={handlerDelete}
                                            onToogleBookmark={
                                                handleToogleBookmark
                                            }
                                            onSort={handleSort}
                                            selectedSort={sortBy}
                                            user={users}
                                        />
                                    </div>
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Users;
