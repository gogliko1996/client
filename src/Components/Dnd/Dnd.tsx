import React, { DragEvent, useState } from "react";
import {
  Button,
  Card,
  Conteiner,
  Input,
  Row,
  Text,
} from "../ScreenRoote/ScreenRoote";
import { Spacer } from "../Spacer/Spacer";
import { DndProps } from "./dndPops";

export const Dnd: React.FC = () => {
  const [todos, setTodos] = useState<DndProps[]>([
    { id: 1, taskName: "title" },
    { id: 2, taskName: "description" },
    { id: 3, taskName: "todo" },
  ]);

  const [inProgreses, setInProgreses] = useState<DndProps[]>([]);
  const [done, setDone] = useState<DndProps[]>([]);

  const [draggedItem, setDraggedItem] = useState<DndProps | null>(null);
  const [showAddInput, setShowAddInput] = useState<boolean>(false);

  const [newTodoName, setNewTodoName] = useState<string>("");

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
      source === "InProgres" ? inProgreses : source === "todos" ? todos : done;
    const removedObject =
      target === "InProgres" ? inProgreses : target === "todos" ? todos : done;
    const wheremovetheobject =
      target === "InProgres"
        ? setInProgreses
        : target === "todos"
        ? setTodos
        : setDone;
    const wheretofiltertheobject =
      source === "InProgres"
        ? setInProgreses
        : source === "todos"
        ? setTodos
        : setDone;

    if (source === target) return;

    const todo = heretofindtheobject.find((item) => item.id === id)!;
    wheretofiltertheobject(
      heretofindtheobject.filter((item) => item.id !== id)
    );
    wheremovetheobject([...removedObject, todo]);

    setDraggedItem(null);
  };

  const handleInputChange = (id: number, value: string, source: string) => {
    if (source === "todos") {
      setTodos(
        todos.map((item) =>
          item.id === id ? { ...item, taskName: value } : item
        )
      );
    }

    if (source === "InProgres") {
      setInProgreses(
        inProgreses.map((item) =>
          item.id === id ? { ...item, taskName: value } : item
        )
      );
    }

    if (source === "done") {
      setDone(
        done.map((item) =>
          item.id === id ? { ...item, taskName: value } : item
        )
      );
    }
  };

  const handleAddTask = () => {
    if (newTodoName.trim()) {
      setTodos([...todos, { id: Date.now(), taskName: newTodoName }]);
      setNewTodoName("");
    }
  };

  const hanhleClickButton = () => {
    if (showAddInput) {
      handleAddTask();
      setShowAddInput(!showAddInput);
    } else {
      setShowAddInput(!showAddInput);
    }
  };

  //   const handleDeleteTask = (id: number, source: string) => {
  //     if (source === "todos") {
  //       setTodos(todos.filter((item) => item.id !== id));
  //     } else {
  //       setInProgreses(inProgreses.filter((item) => item.id !== id));
  //     }
  //   };

  return (
    <div>
      <Row>
        <Spacer mr={20}>
          <Card
            width={300}
            paddingLeft={30}
            paddingRight={30}
            paddingBottom={30}
            minHeight={100}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "todos")}
          >
            <Conteiner>
              <Row>
                <Text>ToDo</Text>
              </Row>
              {todos.map((item) => (
                <Conteiner
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id, "todos")}
                >
                  <Spacer mb={10}>
                    <Input
                      type="text"
                      height={35}
                      value={item.taskName}
                      onChange={(e) =>
                        handleInputChange(item.id, e.target.value, "todos")
                      }
                    />
                  </Spacer>
                </Conteiner>
              ))}
              {showAddInput && (
                <Input
                  value={newTodoName}
                  onChange={(e) => setNewTodoName(e.target.value)}
                />
              )}
              <Spacer mt={20}>
                <Row>
                  <Button
                    color="green"
                    onClick={hanhleClickButton}
                    height={35}
                    width={100}
                  >
                    {!showAddInput ? "ADD card" : "SAVE"}
                  </Button>
                  {showAddInput && <Button onClick={() => setShowAddInput(false)}>Close</Button>}
                  
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
            paddingRight={30}
            paddingBottom={30}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "InProgres")}
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
                      handleDragStart(e, item.id, "InProgres")
                    }
                  >
                    <Spacer mb={10}>
                      <Input
                        type="text"
                        height={35}
                        value={item.taskName}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            e.target.value,
                            "InProgres"
                          )
                        }
                      />
                    </Spacer>
                  </Conteiner>
                ))}
              </Conteiner>
            </Conteiner>
          </Card>
        </Spacer>

        <Spacer>
          <Card
            width={300}
            minHeight={100}
            paddingLeft={30}
            paddingRight={30}
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
                      <Input
                        type="text"
                        height={35}
                        value={item.taskName}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value, "done")
                        }
                      />
                    </Spacer>
                  </Conteiner>
                ))}
              </Conteiner>
            </Conteiner>
          </Card>
        </Spacer>
      </Row>
    </div>
  );
};
