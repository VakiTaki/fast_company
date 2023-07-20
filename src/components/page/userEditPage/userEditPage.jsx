import React, { useEffect } from "react";
import EditUserForm from "../../ui/editUserForm";
import { useParams, useHistory } from "react-router-dom";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

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
    const { quality, isLoading: qualitiesIsLoading } = useQuality();
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                {!professionsIsLoading && !qualitiesIsLoading && (
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <EditUserForm
                            user={currentUser}
                            professions={profession}
                            qualities={quality}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserEditPage;
