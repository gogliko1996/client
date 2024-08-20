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
