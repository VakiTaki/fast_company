import React, { useState, useEffect } from "react";
import api from "../../../api";
import EditUserForm from "../../ui/editUserForm";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader";

function UserEditPage() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState({});
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
            api.users.getById(id).then((data) => setUser(data));
        });
    }, []);
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
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
