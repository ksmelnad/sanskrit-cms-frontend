import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const myContext = createContext({});

function Context(props) {
  const [userObject, setUserObject] = useState();

  useEffect(() => {
    axios
      .get("https://sanskrit-cms-backend.onrender.com/getuser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  return (
    <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
  );
}

export default Context;
