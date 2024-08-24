import { TodoObject } from "../../redux/reducers/todoreducer";

export interface Dndtype {
  id: number;
  description?: string;
  startStatus?: string;
  status?: string;
  title?: string;
  source?: string;
  value?: string;
}

export interface DndProps {
  todoList: TodoObject[] | null;
}

export type Status = "inProgres" | "todo" | "done"


export interface StatusMap {
  inProgres: {
    list: Dndtype[];
    setList: React.Dispatch<React.SetStateAction<Dndtype[]>>;
  };
  todo: {
    list: Dndtype[];
    setList: React.Dispatch<React.SetStateAction<Dndtype[]>>;
  };
  done: {
    list: Dndtype[];
    setList: React.Dispatch<React.SetStateAction<Dndtype[]>>;
  };
}
