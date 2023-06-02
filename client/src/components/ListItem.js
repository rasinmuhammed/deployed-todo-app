import React from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import { useState } from "react";
import Model from "./Model";

const ListItem = ({ task, getData }) => {
  const [showModel, setShowModel] = useState(false)
  const deleteItem = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE'

      }
      );
      if (response.status === 200) {
        getData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModel(true)}>EDIT</button>
        <button className="delete" onClick={deleteItem}>DELETE</button>
      </div>
      {showModel && <Model mode={'edit'} setShowModel={setShowModel} getData={getData} task = {task} />}
    </li>
  );
};

export default ListItem;
