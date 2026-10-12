import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import {
  RootStackParamList,
  ScheduleItem,
  DayOfWeek,
  DayOfWeekLabels,
} from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { ScreenHeader, Card, FilterChips, EmptyState } from '../../components';
import {
  getTodayDayOfWeek,
  getSessionStatus,
  SessionStatusLabels,
} from '../../utils/date';

const DAY_OPTIONS = (Object.keys(DayOfWeekLabels) as DayOfWeek[]).map(day => ({
  value: day,
  label: DayOfWeekLabels[day],
}));

const STATUS_COLORS = {
  ended: Colors.textTertiary,
  ongoing: Colors.success,
  upcoming: Colors.info,
};

export default function TimetableScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { schedule } = useAppContext();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(
    getTodayDayOfWeek(),
  );

  const daySessions = useMemo(
    () =>
      schedule
        .filter(item => item.dayOfWeek === selectedDay)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [schedule, selectedDay],
  );

  const renderItem = ({ item }: { item: ScheduleItem }) => {
    const status = getSessionStatus(
      item.dayOfWeek,
      item.startTime,
      item.endTime,
    );
    const statusColor = STATUS_COLORS[status];
    return (
      <Card
        onPress={() =>
          navigation.navigate('ScheduleDetail', { scheduleId: item.id })
        }
        style={[
          styles.sessionCard,
          status === 'ended' && styles.sessionEnded,
          status === 'ongoing' && styles.sessionOngoing,
        ]}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <View style={styles.timeColumn}>
          <Text style={styles.timeStart}>{item.startTime}</Text>
          <Text style={styles.timeSeparator}>↓</Text>
          <Text style={styles.timeEnd}>{item.endTime}</Text>
        </View>
        <View style={styles.sessionInfo}>
          <Text
            style={[
              styles.sessionSubject,
              status === 'ended' && styles.textMuted,
            ]}
            numberOfLines={2}>
            {item.subjectName}
          </Text>
          <Text
            style={[
              styles.sessionMeta,
              status === 'ended' && styles.textMuted,
            ]}>
            📍 {item.room} • 👨‍🏫 {item.instructor}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}1A` },
            ]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {status === 'ongoing' ? '🟢 ' : ''}
              {SessionStatusLabels[status]}
            </Text>
          </View>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Thời khóa biểu"
        subtitle={DayOfWeekLabels[selectedDay]}
      />
      <View style={styles.dayBar}>
        <FilterChips
          options={DAY_OPTIONS}
          selected={selectedDay}
          onSelect={value => setSelectedDay(value as DayOfWeek)}
        />
      </View>
      <FlatList
        data={daySessions}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="📅"
            title={`Không có lịch học ngày ${DayOfWeekLabels[selectedDay]}`}
            message="Chọn ngày khác để xem lịch học."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  dayBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionEnded: {
    opacity: 0.55,
  },
  sessionOngoing: {
    borderWidth: 1.5,
    borderColor: Colors.success,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.md,
  },
  timeColumn: {
    alignItems: 'center',
    marginRight: Spacing.md,
    width: 48,
  },
  timeStart: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.primary,
  },
  timeSeparator: {
    fontSize: Typography.small,
    color: Colors.textTertiary,
  },
  timeEnd: {
    fontSize: Typography.caption,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionSubject: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  sessionMeta: {
    marginTop: 4,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  textMuted: {
    textDecorationLine: 'line-through',
  },
  statusBadge: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: Typography.small,
    fontWeight: '600',
  },
  chevron: {
    fontSize: Typography.h1,
    color: Colors.textTertiary,
    marginLeft: Spacing.sm,
  },
});
