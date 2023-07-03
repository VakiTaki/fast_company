import { useEffect, useState } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import httpService from "../service/http.service";

const useMockData = () => {
   const statuses = {
      idle: "Не запускалось",
      pending: "В процессе",
      success: "Готово",
      error: "Ошибка"
   };
   const [error, setError] = useState(null);
   const [status, setStatus] = useState(statuses.idle);
   const [progress, setProgress] = useState(0);
   const [count, setCount] = useState(0);
   const summaryCount = professions.length + qualities.length + users.length;
   const incrementCount = () => { setCount(prev => prev + 1); };
   const updateProgress = () => {
      const newProgress = Math.floor((count / summaryCount) * 100);
      if (status === statuses.idle && count !== 0) {
         setStatus(statuses.pending);
      }
      if (progress < newProgress) {
         setProgress(() => newProgress);
      }
      if (newProgress === 100) {
         setProgress(() => newProgress);
         setStatus(statuses.success);
      }
   };
   useEffect(() => {
      updateProgress();
   }, [count]);
   async function initialize() {
      setStatus(statuses.pending);
      setProgress(0);
      setCount(0);
      try {
         for (const prof of professions) {
            await httpService.put("profession/" + prof._id, prof);
            incrementCount();
         }
         for (const user of users) {
            await httpService.put("user/" + user._id, user);
            incrementCount();
         }
         for (const qual of qualities) {
            await httpService.put("quality/" + qual._id, qual);
            incrementCount();
         }
      } catch (error) {
         setError(error);
      }
   }
   return ({ error, initialize, progress, status });
};

export default useMockData;
