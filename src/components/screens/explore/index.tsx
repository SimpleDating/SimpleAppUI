import React from 'react';
import {Button, Text, View} from 'react-native';

const Explore = ({navigation}: any) => {
  return (
    <View>
      {/* <Text>Explore! Meet People</Text>; */}
      <Button
        title="Match Search"
        onPress={() => navigation.navigate('Call')}
      />
    </View>
  );
};

export default Explore;
