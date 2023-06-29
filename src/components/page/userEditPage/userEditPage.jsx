import React, { useState, useEffect, useRef } from "react";
import api from "../../../api";
import EditUserForm from "../../ui/editUserForm";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "../../../hooks/useUsers";

function UserEditPage() {
    const { id } = useParams();
    const history = useHistory();
    const userRef = useRef();
    const [hasUser, setHasUser] = useState(false);
    const handleToUsers = () => {
        history.replace(`/users`);
    };
    const { getUserById } = useUser();
    const user = getUserById(id);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState([]);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        setTimeout(() => {
            if (!userRef.current) {
                setHasUser((prev) => !prev);
                setTimeout(() => {
                    handleToUsers();
                }, 2000);
            }
        }, 5000);
    }, []);
    useEffect(() => {
        userRef.current = user;
    }, [user]);
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user ? (
                        <EditUserForm
                            user={user}
                            professions={professions}
                            qualities={qualities}
                        />
                    ) : hasUser ? (
                        <h3 className="text-center text-danger">
                            Пользователь не найден!
                        </h3>
                    ) : (
                        <>
                            <Loader />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
