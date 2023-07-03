import React, { useEffect, useRef } from "react";
import EditUserForm from "../../ui/editUserForm";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";

function UserEditPage() {
    const { id } = useParams();
    const userRef = useRef();
    const { getUserById } = useUser();
    const user = getUserById(id);
    const { profession } = useProfession();
    const { quality } = useQuality();
    useEffect(() => {
        userRef.current = user;
    }, [user]);
    return (
        <div className="conteiner mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <EditUserForm
                        user={user}
                        professions={profession}
                        qualities={quality}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserEditPage;
