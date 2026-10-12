import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../constants/theme';

interface InfoRowProps {
  label: string;
  value: string;
  valueBold?: boolean;
}

export function InfoRow({ label, value, valueBold }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, valueBold && styles.valueBold]} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  label: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    width: 120,
  },
  value: {
    flex: 1,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  valueBold: {
    fontWeight: '700',
  },
});
