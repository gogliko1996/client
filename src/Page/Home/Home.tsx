import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
import {
  Input,
  Row,
  Select,
  Text,
} from "../../Components/ScreenRoote/ScreenRoote";
import {
  creatTodo,
  deleteTodo,
  getTodo,
  TodoObject,
  updateTodo,
} from "../../redux/reducers/todoreducer";
import { Spacer } from "../../Components/Spacer/Spacer";

export const Home: React.FC = () => {
  const [todoList, setTodoList] = useState({
    title: "",
    description: "",
    status: "activ",
  });

  const [updateTodoList, setUpdateTodoList] = useState({
    title: "",
    description: "",
    status: "activ",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.createUser.user);
  const { todos } = useSelector((state: RootState) => state.todolist);

  const userId = user.id;
  

  const dispatch = useDispatch<AppDispatch>();

  const hundlerSubmit = () => {
    dispatch(creatTodo({ ...todoList, userId })).then(() => {
      setTodoList({
        title: "",
        description: "",
        status: "activ",
      });
    });
  };

  const handleChange = (e: any) => {
    setTodoList({
      ...todoList,
      [e.target.name]: e.target.value,
    });
  };

  const updateHandleChange = (e: any) => {
    setUpdateTodoList({
      ...updateTodoList,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTodos = (id: number) => {
    dispatch(deleteTodo(id)).then(() => {
      dispatch(getTodo(userId));
    });
  };

  const saveUpdateTodo = () => {
    if (currentTodoId !== null) {
      dispatch(
        updateTodo({ id: currentTodoId, updateData: updateTodoList })
      ).then(() => {
        setIsEditing(false);
        setCurrentTodoId(null);
      });
    }
  };

  const handleUpdate = (todo: TodoObject) => {
    setUpdateTodoList({
      title: todo.title,
      description: todo.description,
      status: todo.status,
    });
    setIsEditing(true);
    setCurrentTodoId(Number(todo.id));
  };

  useEffect(() => {
    dispatch(getTodo(userId));
  }, []);

  return (
    <>
      <Spacer mt={20} mb={40}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            name="title"
            type="text"
            value={todoList.title}
            onChange={handleChange}
          />
          <Spacer mb={10} mt={10}>
            <Input
              name="description"
              type="text"
              value={todoList.description}
              onChange={handleChange}
            />
          </Spacer>
          <Select name="status" value={todoList.status} onChange={handleChange}>
            <option value="activ">Activ</option>
            <option value="noqctiv">Not activ</option>
          </Select>
          <Spacer mt={10} mb={10}>
            <Input type="submit" onClick={hundlerSubmit} />
          </Spacer>
        </form>
      </Spacer>

      <Spacer>
        {todos?.map((item: TodoObject, index: number) => (
          <Row key={index} width={700} justifyContent="space-between">
            {isEditing && currentTodoId === item.id ? (
              <>
                <Input
                  width={100}
                  name="title"
                  type="text"
                  value={updateTodoList.title}
                  onChange={updateHandleChange}
                />
                <Input
                  width={100}
                  name="description"
                  type="text"
                  value={updateTodoList.description}
                  onChange={updateHandleChange}
                />
                <Select
                  width={100}
                  name="status"
                  value={updateTodoList.status}
                  onChange={updateHandleChange}
                >
                  <option value="activ">Activ</option>
                  <option value="noqctiv">Not activ</option>
                </Select>
                <button onClick={saveUpdateTodo}>Save</button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentTodoId(null);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text>{item.status}</Text>
                <button onClick={() => handleUpdate(item)}>Update</button>
                <button onClick={() => deleteTodos(Number(item.id))}>
                  Delete
                </button>
              </>
            )}
          </Row>
        ))}
      </Spacer>
    </>
  );
};
