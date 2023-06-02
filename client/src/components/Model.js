import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const Model = ({ mode, setShowModel, getData, task }) => {
  const [cookies,setCookie, removeCookie] = useCookies(null)
  const editMode = mode === "edit";
  const [data, setData] = useState({
    user_email: editMode ? (task && task.user_email) || "" : cookies.Email,
    title: editMode ? (task && task.title) || "" : "",
    progress: editMode ? (task && task.progress) || 50 : 50,
    date: editMode ? (task && task.date) || "" : new Date()
  });
  
  const postData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`,{
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('WORKED');
        setShowModel(false);
        getData();
      }
    } catch(err) {
      console.error(err)
    }
  }
  useEffect(() => {
    console.log(data);
  }, [data]);

  const editData = async(e) => {
    e.preventDefault()
    try{
      const response1 = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data)
      });

    
    if (response1.status == 200){
      setShowModel(false);
      getData(task);
    }
    }catch(err){
      console.error(err);
    }
  }
  const handleChange = (e) => {
    console.log("changing!", e);
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3>Let's {mode} your task.</h3>
          <button onClick={() => setShowModel(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            placeholder="Your Task goes here."
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />

          <label htmlFor="range">Drag to select your current progress.</label>
          <input
            required
            type="range"
            id="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input className={mode} type="submit" onClick={editMode ? editData: postData} />
        </form>
      </div>
    </div>
  );
};

export default Model;

