import {createSlice} from '@reduxjs/toolkit';

const stream = createSlice({
  name: 'stream',
  initialState: {
    meetingId: '',
  },
  reducers: {
    setMeetingId: (state, {payload}) => {
      state.meetingId = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setMeetingId} = stream.actions;

export const streamReducer = stream.reducer;
