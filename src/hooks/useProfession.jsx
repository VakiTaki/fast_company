import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../service/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};
const ProfessionProvider = ({ children }) => {
    const [profession, setProfession] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfession();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getProfession() {
        try {
            const { content } = await professionService.get();
            setProfession(content);
            setIsLoading(false);
            return content;
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message || "No message error");
    }
    function getProfessionById(id) {
        return profession.find((prof) => prof._id === id);
    }
    return (
        <ProfessionContext.Provider
            value={{ profession, isLoading, getProfessionById }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default ProfessionProvider;
