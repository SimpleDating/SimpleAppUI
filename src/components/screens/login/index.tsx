import React from 'react';
import {Button, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {signIn} from 'store/slices/authSlice';

const LoginScreen = ({signIn}: any) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem('userToken');
  //     } catch (e) {
  //       // Restoring token failed
  //     }

  //     // After restoring token, we may need to validate it in production apps

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     restoreToken({token: userToken});
  //   };

  //   bootstrapAsync();
  // }, []);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign in"
        onPress={() => signIn({username, password, token: 'testing'})}
      />
    </View>
  );
};

export default connect(null, {signIn})(LoginScreen);
