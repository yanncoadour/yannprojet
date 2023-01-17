import { Todo } from "./todo";

export interface Group {
  id: number;
  label: string;
  todos: Todo[];
}
