import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, Shadows } from '../constants/theme';

interface ScreenHeaderProps {

  title: string;

  subtitle?: string;

  right?: ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {right ? <View style={styles.right}>{right}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    ...Shadows.header,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 36,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  subtitle: {
    marginTop: 2,
    fontSize: Typography.caption,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  right: {
    marginLeft: Spacing.md,
  },
});
