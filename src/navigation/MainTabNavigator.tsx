import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import { Colors } from '../constants/theme';
import { TabIcon } from '../components';
import DashboardScreen from '../screens/tab/DashboardScreen';
import SubjectsScreen from '../screens/tab/SubjectsScreen';
import TimetableScreen from '../screens/tab/TimetableScreen';
import AssignmentsScreen from '../screens/tab/AssignmentsScreen';
import ProfileScreen from '../screens/tab/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 4,
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Tổng quan',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Subjects"
        component={SubjectsScreen}
        options={{
          title: 'Môn học',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📚" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Timetable"
        component={TimetableScreen}
        options={{
          title: 'Thời khóa biểu',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📅" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Assignments"
        component={AssignmentsScreen}
        options={{
          title: 'Bài tập',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📝" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
