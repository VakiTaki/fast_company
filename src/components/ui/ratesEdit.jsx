import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import localStorageServise from "../../service/localStorage.service";
import { getUserById, editUserBookmark } from "../../store/usersSlice";
import { addRateList } from "../../store/ratesSlice";

const starsInitialState = [
    { id: 1, isFill: false },
    { id: 2, isFill: false },
    { id: 3, isFill: false },
    { id: 4, isFill: false },
    { id: 5, isFill: false }
];

function RatesEdit() {
    const { id: userId } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(
        getUserById(localStorageServise.getUserId())
    );
    const rate = currentUser.rates?.find(
        (rate) => rate.userId === userId
    )?.rate;
    const clsIcon = "bi fs-3 text-warning bi-star";
    const [stars, setStars] = useState(
        rate
            ? starsInitialState.map((star) => {
                  if (star.id <= rate) {
                      return { ...star, isFill: true };
                  } else {
                      return { ...star, isFill: false };
                  }
              })
            : starsInitialState
    );
    const handleClick = async (rateCount) => {
        setStars((prev) =>
            prev.map((star) => {
                if (star.id <= rateCount) {
                    return { ...star, isFill: true };
                } else {
                    return { ...star, isFill: false };
                }
            })
        );
        const isRates = currentUser.rates
            ? currentUser.rates.some((rate) => rate.userId === userId)
            : false;
        const newData = {
            ...currentUser,
            rates: currentUser.rates
                ? isRates
                    ? currentUser.rates.map((rate) => {
                          if (rate.userId !== userId) {
                              return rate;
                          } else {
                              return { userId, rate: rateCount };
                          }
                      })
                    : !currentUser.rates
                    ? { userId, rate: rateCount }
                    : [...currentUser.rates, { userId, rate: rateCount }]
                : [{ userId, rate: rateCount }]
        };
        await dispatch(editUserBookmark(newData));
        dispatch(addRateList());
    };
    return (
        <div>
            {stars.map((star) => (
                <i
                    className={star.isFill ? clsIcon + "-fill" : clsIcon}
                    key={star.id}
                    onClick={() => handleClick(star.id)}
                ></i>
            ))}
        </div>
    );
}

export default RatesEdit;
