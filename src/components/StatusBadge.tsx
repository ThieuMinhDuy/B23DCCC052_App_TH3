import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  AssignmentStatus,
  AssignmentStatusLabels,
} from '../types';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

const STATUS_STYLES: Record<AssignmentStatus, { bg: string; fg: string }> = {
  pending: { bg: Colors.statusPendingBg, fg: Colors.statusPending },
  in_progress: { bg: Colors.statusInProgressBg, fg: Colors.statusInProgress },
  completed: { bg: Colors.statusCompletedBg, fg: Colors.statusCompleted },
  overdue: { bg: Colors.statusOverdueBg, fg: Colors.statusOverdue },
};

interface StatusBadgeProps {
  status: AssignmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = STATUS_STYLES[status];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.fg }]}>
        {AssignmentStatusLabels[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Typography.small,
    fontWeight: '600',
  },
});
