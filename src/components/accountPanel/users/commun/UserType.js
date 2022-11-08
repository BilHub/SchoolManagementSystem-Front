import React from "react";
import UserTypeMedium from "./UserTypeMedium";
import UserTypeMobile from "./UserTypeMobile";

const UserType = () => {
  return (
    <div>
      <UserTypeMobile />
      <UserTypeMedium />
    </div>
  );
};

export default UserType;
