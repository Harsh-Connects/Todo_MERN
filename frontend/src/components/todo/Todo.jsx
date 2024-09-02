import React, { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });
  const [array, setArray] = useState([]);
  const [toUpdateArray, setToUpdateArray] = useState({});
  const id = sessionStorage.getItem("id");

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.body === "") {
      toast.error("Title or Body can't be empty");
    } else {
      if (id) {
        try {
          await axios.post("http://localhost:1000/api/v2/addTask", {
            title: inputs.title,
            body: inputs.body,
            id: id,
          });
          setInputs({ title: "", body: "" });
          toast.success("Your task is added");
          fetchTasks(); // Fetch tasks after adding
        } catch (error) {
          console.error("Error adding task:", error);
          toast.error("Failed to add task");
        }
      } else {
        toast.error("Please sign up first");
      }
    }
  };

  const del = async (cardId) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:1000/api/v2/deleteTask/${cardId}`, {
          data: { id: id },
        });
        toast.success("Your task is deleted");
        fetchTasks(); // Fetch tasks after deletion
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      }
    } else {
      toast.error("Please sign up first");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  const update = (index) => {
    setToUpdateArray(array[index]); // Set the task to update
  };

  const fetchTasks = async () => {
    if (id) {
      try {
        const response = await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`);
        setArray(response.data.list);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column"></div>
        <div className="d-flex flex-column todo-inputs-div w-100 p-1">
          <input
            type="text"
            placeholder="TITLE"
            className="my-2 p-2 todo-inputs"
            onClick={show}
            name="title"
            value={inputs.title}
            onChange={change}
          />
          <textarea
            id="textarea"
            type="text"
            placeholder="BODY"
            className="p-2 todo-inputs"
            name="body"
            value={inputs.body}
            onChange={change}
          ></textarea>
        </div>
        <div className=" w-lg-50 w-100 d-flex justify-content-center my-3">
          <button className="home-btn px-2 py-1" onClick={submit}>
            Add
          </button>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row ">
              {array && array.map((item, index) => (
                <div
                  className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                  key={item._id}
                >
                  <TodoCards
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={del}
                    display={dis}
                    updateId={index}
                    toBeUpdate={update}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} fetchTasks={fetchTasks} />
        </div>
      </div>
    </>
  );
};

export default Todo;
