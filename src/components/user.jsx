import React from "react";
import API from "../api";

const User = (props) => {
  console.log(API.users.fetchAll());
  return <div className="">User</div>;
};

export default User;
