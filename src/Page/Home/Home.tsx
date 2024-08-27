import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
import { Spacer } from "../../components/Spacer/Spacer";
import { Header } from "../../components/Header/Header";
import { getTodo } from "./redux/todoreducer";
import { Dnd } from "./components/Dnd/Dnd";


export const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.createUser.user);
  const { todos } = useSelector((state: RootState) => state.todolist);

  const userId = user.id;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodo(userId));
  }, []);

  return (
    <>
      <Header />
      <Spacer>
        <Dnd todoList={todos} />
      </Spacer>
    </>
  );
};
