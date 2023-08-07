import React, { useEffect } from "react";
import EditUserForm from "../../ui/editUserForm";
import { useParams, useHistory } from "react-router-dom";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import {
    getQialities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

function UserEditPage() {
    const history = useHistory();
    const { id } = useParams();
    const { currentUser } = useAuth();
    useEffect(() => {
        if (id !== currentUser._id) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);
    const { profession, isLoading: professionsIsLoading } = useProfession();
    const qualities = useSelector(getQialities());
    const qualitiesIsLoading = useSelector(getQualitiesLoadingStatus());
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                {!professionsIsLoading && !qualitiesIsLoading && (
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <EditUserForm
                            user={currentUser}
                            professions={profession}
                            qualities={qualities}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserEditPage;
