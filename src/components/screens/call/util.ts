import io from 'socket.io-client';
// @ts-ignore
import Peer from 'react-native-peerjs';
import {mediaDevices, MediaStream} from 'react-native-webrtc';
import store from 'store';
import {setLocalStream} from 'store/slices/streamSlice';

const url = 'http://localhost:3000/match';

class CallUtils {
  peer: Peer | null;
  socket: SocketIOClient.Socket | null = null;
  peerId: string = '';
  callInitiated: boolean = false;
  stream: boolean | MediaStream = false;
  matchStream: boolean | MediaStream = false;

  static instance: CallUtils | null = null;
  static getInstance() {
    if (CallUtils.instance == null) {
      CallUtils.instance = new CallUtils();
    }

    return CallUtils.instance;
  }

  constructor() {
    console.log('constructor');
  }

  async setUpCall() {
    this.peer = new Peer();
    this.socket = io(
      url,
      //   , {
      //   // secure: true,
      //   reconnection: true,
      //   rejectUnauthorized: false,
      //   reconnectionAttempts: 10,
      // }
    );
    this.socketEventHandlers();
    this.peerEventHandlers();
    this.peerCallHandlers();
    await this.initializeStream();
  }

  socketEventHandlers() {
    if (!this.socket) {
      console.log('Socket connect not initialized');
      return;
    }
    const socket = this.socket as SocketIOClient.Socket;

    socket.on('connect', () => {
      console.log('socket connected');
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected --');
    });
    socket.on('error', (err: Error) => {
      console.log('socket error --', err);
    });

    // Custom Events
    socket.on('foundMatch', (matchPeerId: string) => {
      if (!this.callInitiated) {
        this.callMatch(matchPeerId);
      }
    });
  }

  peerEventHandlers() {
    if (!this.peer) {
      console.log('null peer 2');
      return;
    }
    const socket = this.socket as SocketIOClient.Socket;

    this.peer.on('open', (id: any) => {
      this.peerId = id;
      console.log('Peer ID:-', id);
      socket.emit('findMatch', this.peerId);
    });

    this.peer.on('error', (err: Error) => {
      console.log('peer connection error', err);
      this.peer.reconnect();
    });
  }

  callMatch(matchPeerId: string) {
    if (!this.peer) {
      console.log('null peer 1');
      return;
    }
    const call = this.peer.call(matchPeerId, this.stream, {
      metadata: {id: this.peerId},
    });
    call.on('stream', (matchStream: MediaStream) => {
      this.matchStream = matchStream;
    });
    call.on('close', () => {
      console.log('closing new user', matchPeerId);
    });
    call.on('error', () => {
      console.log('peer error ------');
    });
  }

  peerCallHandlers() {
    if (!this.peer) {
      console.log('null peer');
      return;
    }
    const peer = this.peer as Peer;

    peer.on('call', (call: any) => {
      while (!this.stream) {
        console.log('Waiting for initialization');
      }
      call.answer(this.stream);
      this.callInitiated = true;

      call.on('stream', (matchStream: MediaStream) => {
        this.matchStream = matchStream;
      });
      call.on('close', () => {
        console.log('closing peers listeners', call.metadata.id);
      });
      call.on('error', () => {
        console.log('peer error ------');
      });
    });
  }

  async initializeStream() {
    const availableDevices = await mediaDevices.enumerateDevices();
    const {deviceId: sourceId} = availableDevices.find(
      (device: any) =>
        device.kind === 'videoinput' && device.facing === 'front',
    );

    this.stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minWidth: 640,
          minHeight: 480,
          minFrameRate: 30,
        },
        facingMode: 'user',
        optional: [{sourceId}],
      },
    });
    store.dispatch(setLocalStream({stream: this.stream}));
    console.log('Stream created');
  }
}

export default CallUtils;
