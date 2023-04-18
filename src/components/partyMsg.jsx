import React from "react";
import PropTypes from "prop-types";

const PartyMsg = ({ numUsers }) => {
    const rednerPhrase = (numUsers) => {
        if (numUsers === 0) {
            return (
                <span className="badge  bg-danger fs-4 m-2">
                    Никто с тобой не тусанет
                </span>
            );
        }
        const wordSuf = [];
        if (numUsers >= 5 && numUsers <= 20) {
            wordSuf[0] = "";
            wordSuf[1] = "е";
        } else {
            const rule = ["2", "3", "4"];
            const numUsersArr = numUsers.toString().split("").reverse();
            if (rule.includes(numUsersArr[0])) {
                wordSuf[0] = "а";
                wordSuf[1] = "у";
            } else {
                wordSuf[0] = "";
                wordSuf[1] = "е";
            }
        }
        return (
            <span className="badge  bg-primary fs-4 m-2">
                {numUsers} человек{wordSuf[0]} тусан{wordSuf[1]}т с тобой
                сегодня
            </span>
        );
    };
    return <>{rednerPhrase(numUsers)}</>;
};

PartyMsg.propTypes = {
    numUsers: PropTypes.number.isRequired
};

export default PartyMsg;
