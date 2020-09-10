import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../containers/Home';
import CompoundComponentScreen from '../containers/CompoundComponent';
import ControlPropsScreen from '../containers/ControlProps';
import CustomHookScreen from '../containers/CustomHook';
import GoogleMap from '../containers/GoogleMap';
import LocationSuggestions from '../containers/LocationSuggestions';
import AnimationsDemoScreen from '../containers/AnimationsDemo';
import AppleSigninDemoScreen from '../containers/AppleSignin';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: 'Advanced Pattern Demo',
        }}
      />
      <Stack.Screen
        component={AnimationsDemoScreen}
        name="AnimationsDemo"
        options={{
          title: 'Animtions Playground',
        }}
      />
      <Stack.Screen
        component={AppleSigninDemoScreen}
        name="AppleSignin"
        options={{
          title: 'Apple Signin',
        }}
      />
    </Stack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
