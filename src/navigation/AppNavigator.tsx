import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import Spalsh from '../screens/Splash';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import Main from '../screens/Main';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Splash'}
          component={Spalsh}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SignUp'}
          component={SignUp}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name={'SignIn'}
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Main'}
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
