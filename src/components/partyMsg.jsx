import React from "react";

const PartyMsg = ({ numUsers }) => {
  const rednerPhrase = (numUsers) => {
    if (numUsers === 0)
      return (
        <span className="badge  bg-danger fs-4 m-2">
          Никто с тобой не тусанет
        </span>
      );
    let wordSuf;
    if (numUsers >= 5 && numUsers <= 20) {
      wordSuf = "";
    } else {
      const rule = ["2", "3", "4"];
      const numUsersArr = numUsers.toString().split("").reverse();
      rule.includes(numUsersArr[0]) ? (wordSuf = "а") : (wordSuf = "");
    }
    return (
      <span className="badge  bg-primary fs-4 m-2">
        {numUsers} человек{wordSuf} тусанет с тобой сегодня
      </span>
    );
  };
  return <>{rednerPhrase(numUsers)}</>;
};

export default PartyMsg;
