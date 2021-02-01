import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';

const RegistrationScreen = ({ navigation }: any) => (
    <SafeAreaView>
        <Text>Screen: Login</Text>

        <TouchableHighlight onPress={() => navigation.navigate('Home')}>
            <Text>Go to home </Text>
        </TouchableHighlight>
    </SafeAreaView>
);

export default RegistrationScreen;