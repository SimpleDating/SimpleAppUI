import {createSlice} from '@reduxjs/toolkit';

const streamSlice = createSlice({
  name: 'stream',
  initialState: {
    localStream: false,
    remoteStream: false,
  },
  reducers: {
    setLocalStream(state, action) {
      state.localStream = action.payload.stream;
    },
    setRemoteStream(state, action) {
      state.remoteStream = action.payload.stream;
    },
  },
});

export const {setLocalStream, setRemoteStream} = streamSlice.actions;

export default streamSlice.reducer;
