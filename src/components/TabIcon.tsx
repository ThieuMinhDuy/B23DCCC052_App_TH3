import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface TabIconProps {

  icon: string;
  focused: boolean;
}

export function TabIcon({ icon, focused }: TabIconProps) {
  return (
    <Text style={[styles.icon, { opacity: focused ? 1 : 0.45 }]}>{icon}</Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'center',
  },
});
