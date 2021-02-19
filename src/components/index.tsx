import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import HomeNavigator from './HomeNavigator';
import {Call, Login} from './screens';

const Stack = createStackNavigator();

function MyStack({token}: any) {
  const [userToken, setUserToken] = useState(token);
  useEffect(() => {
    console.log('token', token);
    setUserToken(token);
  }, [token]);

  return (
    <Stack.Navigator>
      {userToken == null ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="HomeNav" component={HomeNavigator} />
      )}
      <Stack.Screen name="Call" component={Call} />
    </Stack.Navigator>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.userToken,
  };
};

export default connect(mapStateToProps)(MyStack);
