import React, { useEffect, useState, useRef } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import PartyMsg from "../../ui/partyMsg";
import Loader from "../../common/loader";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextField from "../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getProfessions } from "../../../store/professionsSlice";
import {
    editUserBookmark,
    getAuthId,
    getUserById,
    getUsers
} from "../../../store/usersSlice";
import { getRateForId } from "../../../store/ratesSlice";

const UsersListPage = () => {
    const dispatch = useDispatch();
    const authId = useSelector(getAuthId());
    const currentUser = useSelector(getUserById(authId));
    const timeout = useRef();
    const [searchText, setSearchText] = useState("");
    const [searchTextDelay, setSearchTextDelay] = useState("");
    let users = useSelector(getUsers());
    users = users.map((user) => ({
        ...user,
        rate: useSelector(getRateForId(user._id)),
        bookmarks: currentUser.bookmark
            ? currentUser.bookmark.some((u) => u === user._id)
            : false
    }));
    const allProfession = { _id: "0", name: "Все профессии" };
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    const [selectedProf, setSelectedProf] = useState({
        name: "Все профессии",
        _id: "0"
    });
    // уникальный список айди профессий в users
    const [profListinUsers, setProfListinUser] = useState([
        "0",
        ...new Set(users.map((user) => user.profession))
    ]);
    useEffect(() => {
        setProfListinUser([
            "0",
            ...new Set(
                users
                    .filter((user) => user._id !== currentUser._id)
                    .map((user) => user.profession)
            )
        ]);
    }, [users.length]);
    const [currentPage, setCurrentPage] = useState(1);
    const profession = useSelector(getProfessions());
    const [professionsList, setProfessionsList] = useState(profession);
    useEffect(() => {
        setProfessionsList([...profession, allProfession]);
    }, [profession]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleToogleBookmark = async (id) => {
        const isBookmark = currentUser.bookmark
            ? currentUser.bookmark.some((u) => u === id)
            : false;
        const newData = {
            ...currentUser,
            bookmark: currentUser.bookmark
                ? isBookmark
                    ? currentUser.bookmark.filter((u) => u !== id)
                    : !currentUser.bookmark
                    ? [id]
                    : [...currentUser.bookmark, id]
                : [id]
        };
        dispatch(editUserBookmark(newData));
    };
    const handleProfessionSListelect = (item) => {
        setSearchText("");
        setSearchTextDelay("");
        selectedProf && item._id === selectedProf._id
            ? setSelectedProf(allProfession)
            : setSelectedProf(item);
        setCurrentPage(1);
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
    const handleSearch = (target) => {
        setSearchText(target.value);
    };
    useEffect(() => {
        clearTimeout(timeout.current);
        if (searchText.trim()) {
            timeout.current = setTimeout(() => {
                setSelectedProf(allProfession);
                setCurrentPage(1);
                setSearchTextDelay(searchText);
            }, 500);
        } else {
            timeout.current = setTimeout(() => {
                setSearchTextDelay(searchText);
            }, 500);
        }
    }, [searchText]);
    const filterUsers = searchTextDelay.trim()
        ? users.filter((user) =>
              user.name
                  .toLowerCase()
                  .includes(searchTextDelay.trim().toLowerCase())
          )
        : selectedProf._id !== allProfession._id
        ? users.filter((user) => user.profession === selectedProf._id)
        : users;
    const sortedUsers = _.orderBy(filterUsers, [sortBy.iter], [sortBy.order]);
    const count = sortedUsers.filter(
        (user) => user._id !== currentUser._id
    ).length;
    const userCrop = paginate(
        sortedUsers.filter((user) => user._id !== currentUser._id),
        currentPage,
        pageSize
    );
    useEffect(() => {
        if (!userCrop.length && currentPage !== 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [users]);
    useEffect(() => {
        setSelectedProf(allProfession);
    }, [profListinUsers.length]);
    return (
        <>
            {users && professionsList ? (
                <div className="mt-2">
                    <div className="d-flex justify-content-between">
                        <PartyMsg numUsers={count} />
                    </div>
                    <div className="d-flex">
                        {!!users.length && (
                            <>
                                <GroupList
                                    items={professionsList}
                                    onItemSelect={handleProfessionSListelect}
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

export default UsersListPage;
