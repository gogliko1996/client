import React, { ChangeEvent, DragEvent, useEffect, useState } from "react";
import {
  Button,
  Card,
  Conteiner,
  Input,
  Row,
  Text,
} from "../ScreenRoote/ScreenRoote";
import { Spacer } from "../Spacer/Spacer";
import { DndProps, Dndtype } from "./dndPops";
import { IconButtom } from "./iconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/reducerStore/store";
import {
  creatTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../../redux/reducers/todoreducer";

export const Dnd: React.FC<DndProps> = (props) => {
  const { todoList } = props;

  const [createTodoList, setCreateTodoList] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const [todos, setTodos] = useState<Dndtype[]>([]);
  const [inProgreses, setInProgreses] = useState<Dndtype[]>([]);
  const [done, setDone] = useState<Dndtype[]>([]);

  const [draggedItem, setDraggedItem] = useState<Dndtype | null>(null);
  const [showTodoInput, setShowTodoInput] = useState<boolean>(false);
  const [showInProgresInput, setShowInProgresInput] = useState<boolean>(false);
  const [showDoneInput, setShowDoneInput] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.createUser.user);

  const userId = user.id;

  useEffect(() => {
    todoList?.map((item) => {
      if (item.status === "todo") {
        if (!todos.some((todo) => todo.id === item.id)) {
          setTodos((prevTodos) => [
            ...prevTodos,
            {
              id: Number(item.id),
              description: item.description,
              title: item.title,
              status: item.status,
            },
          ]);
        }
      } else if (item.status === "inProgres") {
        if (!inProgreses.some((inProgres) => inProgres.id === item.id)) {
          setInProgreses((prevInProgreses) => [
            ...prevInProgreses,
            {
              id: Number(item.id),
              description: item.description,
              title: item.title,
              status: item.status,
            },
          ]);
        }
      } else if (item.status === "done") {
        if (!done.some((doneItem) => doneItem.id === item.id)) {
          setDone((prevDone) => [
            ...prevDone,
            {
              id: Number(item.id),
              description: item.description,
              title: item.title,
              status: item.status,
            },
          ]);
        }
      }
    });
  }, [todoList]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCreateTodoList({
      ...createTodoList,
      [e.target.name]: e.target.value,
    });
  };

  const hundlerSubmit = (target: string) => {
    dispatch(creatTodo({ ...createTodoList, status: target, userId })).then(
      () => {
        setCreateTodoList({
          title: "",
          description: "",
          status: target,
        });
      }
    );
  };

  const detailsTodos = (option: string, id: number, source: string) => {
    if (option === "delete") {
      dispatch(deleteTodo(id)).then(() => {
        dispatch(getTodo(userId));
        handleDeleteTask(id, source);
      });
    }
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    id: number,
    source: string
  ) => {
    e.dataTransfer.setData("id", id.toString());
    e.dataTransfer.setData("source", source);
    setDraggedItem({ id, source });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, target: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { id, source } = draggedItem;

    const heretofindtheobject =
      source === "inProgres" ? inProgreses : source === "todo" ? todos : done;
    const removedObject =
      target === "inProgres" ? inProgreses : target === "todo" ? todos : done;
    const wheremovetheobject =
      target === "inProgres"
        ? setInProgreses
        : target === "todo"
        ? setTodos
        : setDone;
    const wheretofiltertheobject =
      source === "inProgres"
        ? setInProgreses
        : source === "todo"
        ? setTodos
        : setDone;

    if (source === target) return;

    const todo = heretofindtheobject.find((item) => item.id === id)!;
    wheretofiltertheobject(
      heretofindtheobject.filter((item) => item.id !== id)
    );
    wheremovetheobject([...removedObject, todo]);

    const { title, description } = todo;
    if (title && description) {
      dispatch(
        updateTodo({
          id: Number(todo.id),
          updateData: { title, description, status: target },
        })
      );
    }

    setDraggedItem(null);
  };

  const handleInputChange = (id: number, value: string, source: string) => {
    if (source === "todo") {
      setTodos(
        todos.map((item) => (item.id === id ? { ...item, value: value } : item))
      );
    }

    if (source === "inProgres") {
      setInProgreses(
        inProgreses.map((item) =>
          item.id === id ? { ...item, value: value } : item
        )
      );
    }

    if (source === "done") {
      setDone(
        done.map((item) => (item.id === id ? { ...item, value: value } : item))
      );
    }
  };

  // const handleAddTask = () => {
  //   if (newTodoName.trim()) {
  //     setTodos([...todos, { id: Date.now(), taskName: newTodoName }]);
  //     setNewTodoName("");
  //   }
  // };

  const hanhleClickButton = (target: string) => {
    if (target === "todo") {
      if (showTodoInput) {
        hundlerSubmit(target);
        setShowTodoInput(!showTodoInput);
      } else {
        setShowTodoInput(!showTodoInput);
      }
      return;
    }
    if (target === "inProgres") {
      if (showInProgresInput) {
        hundlerSubmit(target);
        setShowInProgresInput(!showInProgresInput);
      } else {
        setShowInProgresInput(!showInProgresInput);
      }
      return;
    }
    if (target === "done") {
      if (showDoneInput) {
        hundlerSubmit(target);
        setShowDoneInput(!showDoneInput);
      } else {
        setShowDoneInput(!showDoneInput);
      }
    }
  };

  const handleDeleteTask = (id: number, source: string) => {
    if (source === "todo") {
      setTodos(todos.filter((item) => item.id !== id));
    }

    if (source === "inProgres") {
      setInProgreses(inProgreses.filter((item) => item.id !== id));
    }

    if (source === "done") {
      setDone(done.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      <Row>
        <Spacer mr={20}>
          <Card
            width={300}
            paddingLeft={30}
            paddingRight={10}
            paddingBottom={30}
            minHeight={100}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todo")}
          >
            <Conteiner>
              <Row justifyContent="space-between">
                <Text>ToDo</Text>
              </Row>
              {todos.map((item) => (
                <Conteiner
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, "todo")}
                >
                  <Spacer mb={10}>
                    <Spacer mb={-10}>
                      <Text>Title</Text>
                    </Spacer>
                    <Row justifyContent="space-between" alignItems="center">
                      <Input
                        type="text"
                        width={200}
                        height={35}
                        placeholder={item.title}
                        disabled
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value, "todo")
                        }
                      />
                      <IconButtom
                        onClick={(e) => detailsTodos(e, item.id, "todo")}
                      />
                    </Row>
                  </Spacer>
                </Conteiner>
              ))}
              {showTodoInput && (
                <Spacer mt={20} mb={40}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                      width={240}
                      height={35}
                      name="title"
                      type="text"
                      placeholder="title"
                      value={createTodoList.title}
                      onChange={handleChange}
                    />
                    <Spacer mb={10} mt={10}>
                      <Input
                        width={240}
                        height={60}
                        name="description"
                        type="text"
                        placeholder="descriptions"
                        value={createTodoList.description}
                        onChange={handleChange}
                      />
                    </Spacer>
                  </form>
                </Spacer>
              )}
              <Spacer mt={20}>
                <Row>
                  <Button
                    color="wite"
                    onClick={() => hanhleClickButton("todo")}
                    height={35}
                    width={100}
                  >
                    {!showTodoInput ? "ADD card" : "SAVE"}
                  </Button>
                  {showTodoInput && (
                    <Button onClick={() => setShowTodoInput(false)}>
                      Close
                    </Button>
                  )}
                </Row>
              </Spacer>
            </Conteiner>
          </Card>
        </Spacer>

        <Spacer mr={20}>
          <Card
            width={300}
            minHeight={100}
            paddingLeft={30}
            paddingRight={10}
            paddingBottom={30}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "inProgres")}
          >
            <Conteiner>
              <Row>
                <Text>InProgres</Text>
              </Row>
              <Conteiner>
                {inProgreses.map((item) => (
                  <Conteiner
                    key={item.id}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, item.id, "inProgres")
                    }
                  >
                    <Spacer mb={10}>
                      <Spacer mb={-10}>
                        <Text>title</Text>
                      </Spacer>
                      <Row justifyContent="space-between" alignItems="center">
                        <Input
                          type="text"
                          width={200}
                          height={35}
                          placeholder={item.title}
                          disabled
                          onChange={(e) =>
                            handleInputChange(
                              item.id,
                              e.target.value,
                              "inProgres"
                            )
                          }
                        />
                        <IconButtom
                          onClick={(e) => detailsTodos(e, item.id, "inProgres")}
                        />
                      </Row>
                    </Spacer>
                  </Conteiner>
                ))}

                {showInProgresInput && (
                  <Spacer mt={20} mb={40}>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <Input
                        width={240}
                        height={35}
                        name="title"
                        type="text"
                        placeholder="title"
                        value={createTodoList.title}
                        onChange={handleChange}
                      />
                      <Spacer mb={10} mt={10}>
                        <Input
                          width={240}
                          height={60}
                          name="description"
                          type="text"
                          placeholder="descriptions"
                          value={createTodoList.description}
                          onChange={handleChange}
                        />
                      </Spacer>
                    </form>
                  </Spacer>
                )}
                <Spacer mt={20}>
                  <Row>
                    <Button
                      color="wite"
                      onClick={() => hanhleClickButton("inProgres")}
                      height={35}
                      width={100}
                    >
                      {!showInProgresInput ? "ADD card" : "SAVE"}
                    </Button>
                    {showInProgresInput && (
                      <Button onClick={() => setShowInProgresInput(false)}>
                        Close
                      </Button>
                    )}
                  </Row>
                </Spacer>
              </Conteiner>
            </Conteiner>
          </Card>
        </Spacer>

        <Spacer>
          <Card
            width={300}
            minHeight={100}
            paddingLeft={30}
            paddingRight={10}
            paddingBottom={30}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "done")}
          >
            <Conteiner>
              <Row>
                <Text>Done</Text>
              </Row>
              <Conteiner>
                {done.map((item) => (
                  <Conteiner
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id, "done")}
                  >
                    <Spacer mb={10}>
                      <Spacer mb={-10}>
                        <Text>Title</Text>
                      </Spacer>
                      <Row justifyContent="space-between" alignItems="center">
                        <Input
                          type="text"
                          width={200}
                          height={35}
                          placeholder={item.title}
                          disabled
                          onChange={(e) =>
                            handleInputChange(item.id, e.target.value, "done")
                          }
                        />
                        <IconButtom
                          onClick={(e) => detailsTodos(e, item.id, "done")}
                        />
                      </Row>
                    </Spacer>
                  </Conteiner>
                ))}
                {showDoneInput && (
                  <Spacer mt={20} mb={40}>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <Input
                        width={240}
                        height={35}
                        name="title"
                        type="text"
                        placeholder="title"
                        value={createTodoList.title}
                        onChange={handleChange}
                      />
                      <Spacer mb={10} mt={10}>
                        <Input
                          width={240}
                          height={60}
                          name="description"
                          type="text"
                          placeholder="descriptions"
                          value={createTodoList.description}
                          onChange={handleChange}
                        />
                      </Spacer>
                    </form>
                  </Spacer>
                )}
                <Spacer mt={20}>
                  <Row>
                    <Button
                      color="wite"
                      onClick={() => hanhleClickButton("done")}
                      height={35}
                      width={100}
                    >
                      {!showDoneInput ? "ADD card" : "SAVE"}
                    </Button>
                    {showDoneInput && (
                      <Button onClick={() => setShowDoneInput(false)}>
                        Close
                      </Button>
                    )}
                  </Row>
                </Spacer>
              </Conteiner>
            </Conteiner>
          </Card>
        </Spacer>
      </Row>
    </div>
  );
};
