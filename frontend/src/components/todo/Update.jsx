import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update, fetchTasks }) => {
  const [inputs, setInputs] = useState({ title: "", body: "" });

  useEffect(() => {
    if (update) {
      console.log("Received update prop:", update); // Debugging
      setInputs({
        title: update.title || "",
        body: update.body || "",
      });
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body cannot be empty");
      return;
    }
    try {
      await axios.put(`http://localhost:1000/api/v2/updateTask/${update._id}`, inputs);
      toast.success("Task updated successfully");
      fetchTasks(); // Fetch updated tasks
      display("none");
    } catch (error) {
      toast.error("Failed to update the task");
    }
  };

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        onChange={handleChange}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={inputs.body}
        name="body"
        onChange={handleChange}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={handleSubmit}>UPDATE</button>
        <button className="btn btn-danger my-4 mx-3" onClick={() => display("none")}>Close</button>
      </div>
    </div>
  );
};

export default Update;
