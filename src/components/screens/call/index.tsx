import React from 'react';
import {Text, StyleSheet, Button} from 'react-native';

import {RTCView, MediaStream} from 'react-native-webrtc';
import {connect} from 'react-redux';

function toggleVideo(stream: MediaStream) {
  const videoTrack = stream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
}

function toggleAudio(stream: MediaStream) {
  const audioTrack = stream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
}

const Call = ({navigation, localStream, remoteStream}: any) => {
  if (remoteStream) {
    return (
      <>
        <RTCView
          streamURL={(remoteStream as MediaStream)?.toURL()}
          mirror={true}
          style={styles.viewer}
        />
        <RTCView
          streamURL={(localStream as MediaStream)?.toURL()}
          mirror={true}
          style={styles.viewer}
        />
        <Button
          onPress={() => toggleVideo(localStream as MediaStream)}
          title="Video toggle"
          color="#841584"
        />
        <Button
          onPress={() => toggleAudio(localStream as MediaStream)}
          title="Audio toggle"
          color="#841584"
        />
        <Button
          onPress={() => navigation.goBack()}
          title="End Call"
          color="#841584"
        />
      </>
    );
  } else {
    return <Text>Waiting for match!</Text>;
  }
};

const mapStateToProps = (state: any) => {
  console.log("in Call component's mapStateToProps");

  const {localStream, remoteStream} = state.stream;

  console.log('remoteStream', remoteStream);
  return {
    localStream,
    remoteStream,
  };
};

export default connect(mapStateToProps)(Call);

const styles = StyleSheet.create({
  viewer: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#bb00bb',
  },
});
