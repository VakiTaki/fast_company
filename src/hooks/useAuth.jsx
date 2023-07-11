import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { setTokens } from "../service/localStorage.service";
import UserProvider, { useUser } from "./useUsers";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
    const { createUser } = useUser();
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    async function signUp({ email, password, ...rest }) {
        try {
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
            const { data } = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            // setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
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
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
            const { data } = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            setCurrentUser(data);
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
    //  async function createUser(data) {
    //      try {
    //          const { content } = await userService.create(data);
    //          return content;
    //      } catch (error) {
    //          errorCatcher(error);
    //      }
    //  }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return (
        <UserProvider>
            <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
                {children}
            </AuthContext.Provider>
        </UserProvider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AuthProvider;
