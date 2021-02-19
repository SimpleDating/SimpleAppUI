import io from 'socket.io-client';
// @ts-ignore
import Peer from 'react-native-peerjs';
import {mediaDevices, MediaStream} from 'react-native-webrtc';

const url = 'http://localhost:3000/match';

export default class CallUtils {
  peer: Peer;
  socket: SocketIOClient.Socket;
  peerId: string = '';
  callInitiated: boolean = false;
  stream: boolean | MediaStream = false;
  matchStream: boolean | MediaStream = false;

  constructor() {
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
    console.log('constructor');
    this.socketEventHandlers();
    this.peerEventHandlers();
    this.peerCallHandlers();
  }

  socketEventHandlers() {
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected --');
    });
    this.socket.on('error', (err: Error) => {
      console.log('socket error --', err);
    });

    // Custom Events
    this.socket.on('foundMatch', (matchPeerId: string) => {
      if (!this.callInitiated) {
        this.callMatch(matchPeerId);
      }
    });
  }

  peerEventHandlers() {
    this.peer.on('open', (id: any) => {
      this.peerId = id;
      console.log('Peer ID:-', id);
      this.socket.emit('findMatch', this.peerId);
    });

    this.peer.on('error', (err: Error) => {
      console.log('peer connection error', err);
      this.peer.reconnect();
    });
  }

  callMatch(matchPeerId: string) {
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
    this.peer.on('call', (call: any) => {
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
  }
}
