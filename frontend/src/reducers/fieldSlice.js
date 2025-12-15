import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  list: []
};

const fieldsSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(type = "signature", defaults = {}) {
        return {
          payload: {
            id: nanoid(),
            type,
            page: 1,
            left: defaults.left ?? 120,
            top: defaults.top ?? 140,
            width: defaults.width ?? (type === "signature" ? 220 : 180),
            height: defaults.height ?? (type === "signature" ? 90 : 40),
            ...defaults
          }
        };
      }
    },
    updateField(state, action) {
      const { id, changes } = action.payload;
      const item = state.list.find((x) => x.id === id);
      if (item) Object.assign(item, changes);
    },
    removeField(state, action) {
      state.list = state.list.filter((f) => f.id !== action.payload);
    },
    setFields(state, action) {
      state.list = action.payload;
    }
  }
});

export const { addField, updateField, removeField, setFields } = fieldsSlice.actions;
export default fieldsSlice.reducer;
