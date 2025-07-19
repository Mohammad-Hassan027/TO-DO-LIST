import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-details/index";
import { Skeleton } from "@mui/material";

function App() {
  const [loading, setloading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchAllTodos() {
    const apiResponse = await fetch("https://dummyjson.com/todos");
    const result = await apiResponse.json();

    try {
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setErrorMsg("");
      } else {
        setTodoList([]);
        setErrorMsg("No todos found.");
      }
    } catch (e) {
      console.log(e);
      setErrorMsg("Some error occuried.");
    } finally {
      setloading(false);
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    const Response = await fetch(
      `https://dummyjson.com/todos/${getCurrentTodoId}`
    );
    const details = await Response.json();

    if (details) {
      setOpenDialog(true);
      setTodoDetails(details);
    } else {
      setTodoDetails(null);
      setOpenDialog(false);
      setErrorMsg("Error fetching details");
    }
  }

  useEffect(() => {
    fetchAllTodos();
  }, []);

  {
    if (loading)
      return <Skeleton variant="rectangular" width={650} height={650} />;
  }
  

  return (
    <div className={classes.mainWrapper}>
      <h1 className={classes.headerTitle}>
        Simple Todo list using Material UI
      </h1>
      <div className={classes.todoListWrapper}>
        {todoList && todoList.length > 0
          ? todoList.map((todoItem) => (
              <TodoItem
                todo={todoItem}
                fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
                key={todoItem.id}
              />
            ))
          : null}
      </div>
      <TodoDetails
        todoDetails={todoDetails}
        setTodoDetails={setTodoDetails}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
}

export default App;
