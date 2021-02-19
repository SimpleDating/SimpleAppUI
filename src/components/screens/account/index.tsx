import {AuthContext} from 'contexts';
import React from 'react';
import {Button, Text} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from 'store/slices/authSlice';

const Account = ({signOut}: any) => {
  return (
    <>
      <Text>Account!</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </>
  );
};

export default connect(null, {signOut})(Account);
