import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Colors } from '../constants/theme';
import MainTabNavigator from './MainTabNavigator';
import SubjectDetailScreen from '../screens/detail/SubjectDetailScreen';
import ScheduleDetailScreen from '../screens/detail/ScheduleDetailScreen';
import AssignmentDetailScreen from '../screens/detail/AssignmentDetailScreen';
import GradeDetailScreen from '../screens/detail/GradeDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={NavTheme}>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.textWhite,
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}>
        { }
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />

        { }
        <Stack.Screen
          name="SubjectDetail"
          component={SubjectDetailScreen}
          options={{ title: 'Chi tiết môn học' }}
        />
        <Stack.Screen
          name="ScheduleDetail"
          component={ScheduleDetailScreen}
          options={{ title: 'Chi tiết buổi học' }}
        />
        <Stack.Screen
          name="AssignmentDetail"
          component={AssignmentDetailScreen}
          options={{ title: 'Chi tiết bài tập' }}
        />
        <Stack.Screen
          name="GradeDetail"
          component={GradeDetailScreen}
          options={{ title: 'Kết quả học tập' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
