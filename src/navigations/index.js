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
import Biometric from '../containers/Biometric';
import SensorDemoScreen from '../containers/Sensors';
import GyroscopeDemo from '../containers/Sensors/Gyroscope';

const Stack = createStackNavigator();

const GoogleMapStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={GoogleMap}
      name="GoogleMap"
      options={{
        title: 'Google Map',
      }}
    />
    <Stack.Screen
      component={LocationSuggestions}
      name="LocationSuggestions"
      options={{
        title: 'Search',
      }}
    />
  </Stack.Navigator>
);

const SensorDemoStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      component={SensorDemoScreen}
      name="Sensors"
      options={{
        title: 'Sensors Demo',
      }}
    />
    <Stack.Screen
      component={GyroscopeDemo}
      name="GyroscopeDemo"
      options={{
        title: 'Gyroscope',
      }}
    />
  </Stack.Navigator>
);

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
                title: 'Playground',
              }}
            />
            <Stack.Screen
              component={Biometric}
              name="Biometric"
              options={{
                title: 'Biometric',
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
            <Stack.Screen
              component={CompoundComponentScreen}
              name="CompoundComponent"
              options={{
                title: 'Compound Component',
              }}
            />
            <Stack.Screen
              component={ControlPropsScreen}
              name="ControlProps"
              options={{
                title: 'Control Props',
              }}
            />
            <Stack.Screen
              component={CustomHookScreen}
              name="CustomHook"
              options={{
                title: 'Custom Hook',
              }}
            />
            <Stack.Screen
              component={GoogleMapStack}
              name="GoogleMap"
              options={{
                title: 'Google Map',
              }}
            />
            <Stack.Screen
              component={SensorDemoStack}
              name="SensorsDemo"
              options={{headerShown: false}}
            />
          </React.Fragment>
        )}
      </Stack.Navigator>
    );
  }),
);

const linking = {
  prefixes: ['playground://'],
};

const Root = () => {
  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
