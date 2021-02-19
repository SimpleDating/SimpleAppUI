import React, {useRef, useState, useEffect} from 'react';
import {Text, StyleSheet, Button} from 'react-native';
import CallUtils from './util';

import {RTCView, MediaStream} from 'react-native-webrtc';

function toggleVideo(stream: MediaStream) {
  const videoTrack = stream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
}

function toggleAudio(stream: MediaStream) {
  const audioTrack = stream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
}

const Call = () => {
  const utils = useRef(new CallUtils());
  const [stream, setStream] = useState(utils.current.stream);

  useEffect(() => {
    if (!stream) {
      (async () => {
        await utils.current.initializeStream();
        setStream(utils.current.stream);
      })();
    }
  }, [stream]);

  if (stream) {
    return (
      <>
        <RTCView
          streamURL={(stream as MediaStream)?.toURL()}
          style={styles.viewer}
        />
        <RTCView
          streamURL={(stream as MediaStream)?.toURL()}
          mirror={true}
          style={styles.viewer}
        />
        <Button
          onPress={() => toggleVideo(stream as MediaStream)}
          title="Video toggle"
          color="#841584"
        />
        <Button
          onPress={() => toggleAudio(stream as MediaStream)}
          title="Audio toggle"
          color="#841584"
        />
      </>
    );
  } else {
    return <Text>Waiting!</Text>;
  }
};

export default Call;

const styles = StyleSheet.create({
  viewer: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#bb00bb',
  },
});
