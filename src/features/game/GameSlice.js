import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    modals: [
      { title: 'screenShow', value: false },
      { title: 'audioShow', value: false },
      { title: 'diceShow', value: false },
      { title: 'timerShow', value: false, isGood: false, isWarn: false, isDanger: false },
    ],
  },
  reducers: {
    showModal(state, action) {
      state.modals.map((el) => (el.value = el.title === action.payload ? true : false));
    },
    hideModal(state, action) {
      state.modals.map((el) => (el.value = false));
    },
    setTimerFlag(state, action) {
      console.log('payload: ', action.payload);
      state.modals.map((el) => {
        if (el.title === 'timerShow') {
          if (action.payload === 'done') {
            for (let prop in el) {
              if (prop === 'title' || prop === 'value') continue;
              el[prop] = false;
            }
          } else {
            for (let prop in el) {
              if (prop === 'title' || prop === 'value') continue;
              el[prop] = prop === action.payload ? true : false;
            }
          }
        }
        return el;
      });
    },
  },
});

export const selectModals = (state) => state.modals;
export const { showModal, hideModal, setTimerFlag } = gameSlice.actions;
export default gameSlice.reducer;
