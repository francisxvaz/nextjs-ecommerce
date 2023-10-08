"use client";
import React, { useState } from "react";
import { TiTickOutline, TiPencil } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { changeName } from "./actions";

function PortfolioName({ id, name }: { id: string; name: string }) {
  const [updatedName, setUpdatedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const saveName = async () => {
    const success = await changeName(id, updatedName);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div>
      {!isEditing && (
        <div className="flex items-center gap-2">
          <span>{updatedName}</span>
          <TiPencil
            className="h-5 w-5 cursor-pointer"
            onClick={() => setIsEditing(true)}
          />
        </div>
      )}
      {isEditing && (
        <div className="flex gap-4">
          <input
            type="text"
            className="text-base"
            name="pName"
            value={updatedName}
            onChange={handleNameChange}
          />
          <TiTickOutline className="cursor-pointer" onClick={saveName}/>
          <RxCross2 className="cursor-pointer" onClick={() => setIsEditing(false)}/>
          
        </div>
      )}
    </div>
  );
}

export default PortfolioName;
