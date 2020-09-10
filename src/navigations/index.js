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
import LoginScreen from '../containers/Login';
import {inject, observer} from 'mobx-react';

const Stack = createStackNavigator();

const MainStack = inject('authStore')(
  observer(({authStore}) => {
    const isAuthenticated = authStore.isAuthenticated;
    console.log('isAuthenticated :>> ', isAuthenticated);
    return (
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen
            component={LoginScreen}
            name="Login"
            options={{
              title: 'Login',
            }}
          />
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </Stack.Navigator>
    );
  }),
);

const Root = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
