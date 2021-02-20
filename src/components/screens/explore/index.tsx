import React from 'react';
import {Button, Text, View} from 'react-native';
import {connect} from 'react-redux';
import CallUtils from '../call/util';

const Explore = ({navigation, username}: any) => {
  return (
    <>
      {/* <Text>Explore! Meet People</Text>; */}
      <Button
        title="Match Search"
        onPress={() => {
          CallUtils.getInstance().setUpCall(username);
          navigation.navigate('Call');
        }}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  console.log("in Explore component's mapStateToProps");

  return {
    username: state.auth.username,
  };
};

export default connect(mapStateToProps)(Explore);
