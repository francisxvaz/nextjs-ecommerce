"use client";
import React, { useState } from "react";
import { TiTickOutline } from "react-icons/ti";
import { changeName } from "./actions";

function PortfolioName({ id, name }: { id: string; name: string }) {
  const [updatedName, setUpdatedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const saveName = () => {
    changeName(id, updatedName);
    setIsEditing(false)
  };

  return (
    <div>
      {!isEditing && <span onClick={() => setIsEditing(true)}>{name}</span>}
      {isEditing && (
        <>
          <input
            type="text"
            name="pName"
            value={updatedName}
            onChange={handleNameChange}
          />
          <button onClick={saveName}>save</button>
          <button onClick={() => setIsEditing(false)}>cancel</button>
        </>
      )}
    </div>
  );
}

export default PortfolioName;
