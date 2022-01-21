import { createSlice } from '@reduxjs/toolkit';

const defaultValue = {
  isLoadingApp: false,
};

const App = createSlice({
  name: 'App',

  initialState: defaultValue,

  reducers: {
    toggleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const appAction = App.actions;
export default App.reducer;
