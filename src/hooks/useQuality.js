import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import qualityService from "../service/quality.service";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
   return useContext(QualityContext);
};
const QualityProvider = ({ children }) => {
   const [quality, setQuality] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
      getQuality();
   }, []);
   useEffect(() => {
      if (error !== null) {
         toast.error(error);
         setError(null);
      }
   }, [error]);
   async function getQuality() {
      try {
         const { content } = await qualityService.get();
         setQuality(content);
         setIsLoading(false);
         return content;
      } catch (error) {
         errorCatcher(error);
      }
   }
   function errorCatcher(error) {
      const { message } = error.response.data;
      setError(message);
   }
   function getQualityById(id) {
      return quality.find((prof) => prof._id === id);
   }
   return (
      <QualityContext.Provider
         value={{ quality, isLoading, getQualityById }}
      >
         {children}
      </QualityContext.Provider>
   );
};

QualityProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
   ])
};

export default QualityProvider;
