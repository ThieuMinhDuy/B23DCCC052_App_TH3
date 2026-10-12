import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList, DayOfWeekLabels } from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Card, InfoRow, EmptyState } from '../../components';
import { getSessionStatus, SessionStatusLabels } from '../../utils/date';

type ScheduleDetailRoute = RouteProp<RootStackParamList, 'ScheduleDetail'>;

export default function ScheduleDetailScreen() {
  const { scheduleId } = useRoute<ScheduleDetailRoute>().params;
  const { schedule, subjects } = useAppContext();

  const session = schedule.find(item => item.id === scheduleId);

  if (!session) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyState
          icon="❓"
          title="Không tìm thấy buổi học"
          message="Buổi học này không tồn tại hoặc đã bị xóa."
        />
      </View>
    );
  }

  const subject = subjects.find(s => s.id === session.subjectId);
  const status = getSessionStatus(
    session.dayOfWeek,
    session.startTime,
    session.endTime,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.heroCard}>
        <Text style={styles.subjectName}>{session.subjectName}</Text>
        <View
          style={[
            styles.statusBadge,
            status === 'ongoing' && styles.statusOngoing,
            status === 'ended' && styles.statusEnded,
          ]}>
          <Text
            style={[
              styles.statusText,
              status === 'ongoing' && styles.statusTextOngoing,
              status === 'ended' && styles.statusTextEnded,
            ]}>
            {SessionStatusLabels[status]}
          </Text>
        </View>
      </Card>

      <Card>
        <InfoRow label="Ngày học" value={DayOfWeekLabels[session.dayOfWeek]} />
        <InfoRow
          label="Thời gian"
          value={`${session.startTime} - ${session.endTime}`}
          valueBold
        />
        <InfoRow label="Phòng học" value={session.room} />
        <InfoRow label="Giảng viên" value={session.instructor} />
        {subject ? (
          <InfoRow label="Mã môn học" value={subject.code} />
        ) : null}
        <InfoRow
          label="Số tín chỉ"
          value={subject ? `${subject.credits} tín chỉ` : '—'}
        />
      </Card>

      <Card style={styles.noteCard}>
        <Text style={styles.noteTitle}>📌 Ghi chú</Text>
        <Text style={styles.noteText}>
          Vui lòng có mặt trước giờ học 5 phút. Vắng mặt quá 3 lần sẽ không
          được thi cuối kỳ. Mang theo thẻ sinh viên khi vào phòng học.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  heroCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  subjectName: {
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  statusBadge: {
    backgroundColor: Colors.infoLight,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  statusText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.info,
  },
  statusOngoing: {
    backgroundColor: Colors.successLight,
  },
  statusTextOngoing: {
    color: Colors.success,
  },
  statusEnded: {
    backgroundColor: Colors.surfaceSecondary,
  },
  statusTextEnded: {
    color: Colors.textSecondary,
  },
  noteCard: {
    backgroundColor: Colors.warningLight,
  },
  noteTitle: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.warning,
    marginBottom: Spacing.sm,
  },
  noteText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    lineHeight: 21,
  },
});
