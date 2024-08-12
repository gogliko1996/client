import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
// import {
//   Button,
//   Input,
//   Row,
//   Select,
//   Text,
// } from "../../Components/ScreenRoote/ScreenRoote";
import {
  // creatTodo,
  // deleteTodo,
  getTodo,
  // TodoObject,
  // updateTodo,
} from "../../redux/reducers/todoreducer";
import { Spacer } from "../../Components/Spacer/Spacer";
import { Dnd } from "../../Components/Dnd/Dnd";
import { Header } from "../../Components/Header/Header";

export const Home: React.FC = () => {
  // const [updateTodoList, setUpdateTodoList] = useState({
  //   title: "",
  //   description: "",
  //   status: "todo",
  // });
  // const [isEditing, setIsEditing] = useState(false);
  // const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.createUser.user);
  const { todos } = useSelector((state: RootState) => state.todolist);

  const userId = user.id;

  const dispatch = useDispatch<AppDispatch>();

  // const updateHandleChange = (e: any) => {
  //   setUpdateTodoList({
  //     ...updateTodoList,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleUpdate = (todo: TodoObject) => {
  //   setUpdateTodoList({
  //     title: todo.title,
  //     description: todo.description,
  //     status: todo.status,
  //   });
  //   setIsEditing(true);
  //   setCurrentTodoId(Number(todo.id));
  // };

  useEffect(() => {
    dispatch(getTodo(userId));
  }, []);

  return (
    <>
    <Header/>
      <Spacer>
        <Dnd todoList={todos} />
      </Spacer>
    </>
  );
};
