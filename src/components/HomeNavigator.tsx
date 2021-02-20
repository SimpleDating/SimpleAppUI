import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';

import {Account, Explore, Matches} from '@screens';

const Tabs = AnimatedTabBarNavigator();

const TabBarIcon = (props: any) => {
  return (
    <Icon
      name={props.name}
      size={props.size ? props.size : 24}
      color={props.tintColor}
    />
  );
};

export default () => (
  <Tabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#ffffff',
      inactiveTintColor: '#223322',
      activeBackgroundColor: 'black',
    }}
    appearence={{
      shadow: true,
      floating: false,
      whenActiveShow: TabElementDisplayOptions.BOTH,
      dotSize: DotSize.SMALL,
      dotCornerRadius: 10,
      tabBarBackground: 'purple',
    }}>
    <Tabs.Screen
      name="Explore"
      component={Explore}
      options={{
        tabBarIcon: ({focused, color}: any) => (
          <TabBarIcon focused={focused} tintColor={color} name="home" />
        ),
      }}
    />
    <Tabs.Screen
      name="Matches"
      component={Matches}
      options={{
        tabBarIcon: ({focused, color}: any) => (
          <TabBarIcon focused={focused} tintColor={color} name="image" />
        ),
      }}
    />
    <Tabs.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({focused, color}: any) => (
          <TabBarIcon focused={focused} tintColor={color} name="user" />
        ),
      }}
    />
  </Tabs.Navigator>
);
