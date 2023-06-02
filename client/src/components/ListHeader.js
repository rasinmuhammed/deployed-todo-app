import React, { useState } from "react";
import Model from "./Model";
import { useCookies } from "react-cookie";
const ListHeader = ({ listName, getData }) => {
  const [showModel, setShowModel] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
 

  const signOut = () => {
    console.log("signout");
    removeCookie('Email');
    removeCookie('AuthToken');
    window.location.reload()

  };

  const handleCreateButtonClick = () => {
    setShowModel(true);
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={handleCreateButtonClick}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModel && <Model mode="create" setShowModel={setShowModel} getData={getData}/>}
    </div>
  );
};

export default ListHeader;
