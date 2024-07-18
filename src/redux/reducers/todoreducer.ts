import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api/api";
import { RootState } from "../reducerStore/store";

export interface TodoObject {
  title: string;
  description: string;
  status: string;
  id?: number ;
  userId?: string;
}
interface UserState {
  status: boolean;
  todos: TodoObject[] | null;
  error: string | null;
}

const initialState: UserState = {
  status: false,
  todos: [],
  error: null,
};

export const creatTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoList: TodoObject, { dispatch, getState }) => {
    const state = getState() as RootState;
    const todos: TodoObject[] | null = state.todolist.todos || [];
    const lastElement: TodoObject = todos[todos.length - 1];
    const tempId: number = lastElement ? Number(lastElement.id) + 1 : 1;
    
    dispatch(addTodoOptimistic({ ...todoList, id: tempId }));

    try {
      const response = await api.post("/todo", todoList);
      dispatch(replaceTempTodoId({ tempId, actualId: response.data.id }));
    } catch (error) {
      dispatch(removeTodoOptimistic(tempId));
      throw error;
    }
  }
);

export const getTodo = createAsyncThunk(
  "todo/getTodo",
  async (userId: number) => {
    const data = api.get(`/getTodo/${userId}`);

    return data;
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (
    { id, updateData }: { id: number; updateData: TodoObject },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateTodoOptimistic({ id, updateData }));
      await api.patch(`/updateTodo/${id}`, updateData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number, { dispatch }) => {
    dispatch(deleteTodoOptimistic(id));

    try {
      await api.delete(`/deleteTodo/${id}`);
    } catch (error) {
      dispatch(addTodoBack(id));
      throw error;
    }
  }
);

const createTodoreducer = createSlice({
  name: "todo",
  initialState,

  reducers: {
    addTodoOptimistic: (state, action: PayloadAction<TodoObject>) => {
      state.todos?.push(action.payload);
    },
    
    replaceTempTodoId: (
      state,
      action: PayloadAction<{ tempId: number; actualId: number }>
    ) => {
      const index = state.todos?.findIndex(
        (todo) => todo.id === action.payload.tempId
      );
      if (index !== undefined && index !== -1) {
        state.todos![index].id = action.payload.actualId;
      }
    },

    updateTodoOptimistic: (
      state,
      action: PayloadAction<{ id: number; updateData: TodoObject }>
    ) => {
      const index = state.todos?.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== undefined && index !== -1) {
        state.todos![index] = {
          ...state.todos![index],
          ...action.payload.updateData,
        };
      }
    },

    removeTodoOptimistic: (state, action: PayloadAction<number>) => {
      state.todos =
        state.todos?.filter((todo) => todo.id !== action.payload) || null;
    },
    deleteTodoOptimistic: (state, action: PayloadAction<number>) => {
      state.todos =
        state.todos?.filter((todo) => todo.id !== action.payload) || null;
    },
    addTodoBack: (state, action: PayloadAction<TodoObject | any>) => {
      state.todos?.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(creatTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(creatTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(creatTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(getTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(getTodo.fulfilled, (state, action) => {
        state.status = false;
        state.todos = action.payload.data;
      })
      .addCase(getTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(updateTodo.pending, (state) => {
        state.status = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });

    builder
      .addCase(deleteTodo.pending, (state) => {
        state.status = true;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.status = false;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message || "Failed";
      });
  },
});

export const {
  addTodoOptimistic,
  replaceTempTodoId,
  removeTodoOptimistic,
  deleteTodoOptimistic,
  addTodoBack,
  updateTodoOptimistic,
} = createTodoreducer.actions;

export default createTodoreducer.reducer;
