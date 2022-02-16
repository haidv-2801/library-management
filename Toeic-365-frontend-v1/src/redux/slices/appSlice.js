import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
  isLoadingApp: false,
  history: [],
};

const App = createSlice({
  name: 'App',

  initialState: defaultValue,

  reducers: {
    toggleLoading: (state, action) => {
      state.isLoadingApp = action.payload;
    },

    changeHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const appAction = App.actions;
export default App.reducer;
