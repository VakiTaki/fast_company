import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import localStorageServise, {
    setTokens
} from "../service/localStorage.service";
import userService from "../service/user.service";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AuthContext = React.createContext();

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
            return data;
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с такой почтой уже сущетвует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с такой почтой не сущетвует"
                    };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Неверный пароль"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }
    const logOut = () => {
        localStorageServise.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    const getUserData = async () => {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (localStorageServise.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
            {!isLoading ? children : "Загрузка..."}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AuthProvider;
