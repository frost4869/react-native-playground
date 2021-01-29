import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {inject, observer} from 'mobx-react';
import React from 'react';
import AnimationsDemoScreen from '../containers/AnimationsDemo';
import FlipAnimationScreen from '../containers/AnimationsDemo/3DFlipAnimation';
import AnimatedCarousel from '../containers/AnimationsDemo/AnimatedCarousel';
import AnimatedCarouselMovieDB from '../containers/AnimationsDemo/AnimatedCarouselMovieDB';
import AnimatedFlalist1 from '../containers/AnimationsDemo/ProductShowCase';
import ParalaxFlatlistDemo from '../containers/AnimationsDemo/ParalaxFlatlist';
import ParalaxFlatlistHorizontalDemo from '../containers/AnimationsDemo/ParalaxFlatlistHorizontal';
import AppleSigninDemoScreen from '../containers/AppleSignin';
import Biometric from '../containers/Biometric';
import CompoundComponentScreen from '../containers/CompoundComponent';
import ControlPropsScreen from '../containers/ControlProps';
import CustomHookScreen from '../containers/CustomHook';
import GoogleMap from '../containers/GoogleMap';
import HokkaidoChallenge from '../containers/HokkaidoChallenge';
import HomeScreen from '../containers/Home';
import LocationSuggestions from '../containers/LocationSuggestions';
import LoginScreen from '../containers/Login';
import OnboardScreen from '../containers/Onboard';
import SensorDemoScreen from '../containers/Sensors';
import GyroscopeDemo from '../containers/Sensors/Gyroscope';
import AnimatedFlatlist from '../containers/AnimationsDemo/AnimatedFlatlist';
import SettingScreen from '../containers/Setting';

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

const AnimationDemoStack = () => (
  <Stack.Navigator initialRouteName="AnimationDemo">
    <Stack.Screen
      component={AnimationsDemoScreen}
      name="AnimationsDemo"
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="ParalaxFlatlist"
      component={ParalaxFlatlistDemo}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ParalaxFlatlistHorizontal"
      component={ParalaxFlatlistHorizontalDemo}
      options={{
        title: 'Paralax Horizontal',
      }}
    />
    <Stack.Screen
      name="AnimatedCarousel"
      component={AnimatedCarousel}
      options={{
        title: 'Animated Carousel',
      }}
    />
    <Stack.Screen
      name="FlatlistAnimation1"
      component={AnimatedFlalist1}
      options={{
        title: 'Animated Flatlist',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AnimatedCarouselMovieDB"
      component={AnimatedCarouselMovieDB}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="3DFlipAnimation"
      component={FlipAnimationScreen}
      options={{
        title: '3D Flip Animation',
      }}
    />
  </Stack.Navigator>
);

const MainStack = inject('authStore')(
  observer(({authStore}) => {
    const isAuthenticated = authStore.isAuthenticated;
    return (
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              component={OnboardScreen}
              name="OnBoard"
              options={{headerShown: false}}
            />
            <Stack.Screen
              component={LoginScreen}
              name="Login"
              options={{headerShown: false}}
            />
          </>
        ) : (
          <React.Fragment>
            <Stack.Screen
              component={HomeScreen}
              name="Home"
              options={{
                headerShown: false,
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
            <Stack.Screen
              component={AnimationDemoStack}
              options={{headerShown: false}}
              name="AnimationsDemo"
            />
            <Stack.Screen
              component={SettingScreen}
              options={{headerShown: false}}
              name="SettingScreen"
            />
            <Stack.Screen
              component={HokkaidoChallenge}
              options={{headerShown: false}}
              name="HokkaidoChallenge"
            />
            <Stack.Screen
              name="AnimatedFlatlist"
              component={AnimatedFlatlist}
              options={{
                title: 'Animated Flatlist',
              }}
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
