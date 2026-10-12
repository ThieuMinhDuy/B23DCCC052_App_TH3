import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList } from '../../types';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
} from '../../constants/theme';
import { Card, StatusBadge, EmptyState } from '../../components';
import {
  getTodayDayOfWeek,
  formatDateTime,
  getDeadlineInfo,
} from '../../utils/date';
import { computeGpa10 } from '../../utils/grade';

export default function DashboardScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { student, subjects, schedule, assignments, grades, isLoading } =
    useAppContext();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const today = getTodayDayOfWeek();
  const todaySchedule = schedule
    .filter(item => item.dayOfWeek === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const unfinished = assignments.filter(a => a.status !== 'completed');
  const upcomingAssignments = [...unfinished].sort((a, b) =>
    a.deadline.localeCompare(b.deadline),
  );
  const gpa = computeGpa10(grades);

  const initials = student.name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials || 'SV'}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentMeta}>
            {student.id} • {student.className}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={styles.statValue}>{gpa.toFixed(2)}</Text>
            <Text style={[styles.statLabel, styles.statLabelLight]}>
              Điểm TB học kỳ
            </Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.warning }]}>
              {unfinished.length}
            </Text>
            <Text style={styles.statLabel}>Bài tập chưa hoàn thành</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Lịch học hôm nay</Text>
        {todaySchedule.length === 0 ? (
          <EmptyState
            icon="🎉"
            title="Hôm nay không có lịch học"
            message="Hãy tận dụng thời gian rảnh để hoàn thành bài tập nhé!"
          />
        ) : (
          todaySchedule.map(item => (
            <Card
              key={item.id}
              onPress={() =>
                navigation.navigate('ScheduleDetail', { scheduleId: item.id })
              }>
              <View style={styles.scheduleRow}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>{item.startTime}</Text>
                  <Text style={styles.timeText}>{item.endTime}</Text>
                </View>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.subjectName} numberOfLines={2}>
                    {item.subjectName}
                  </Text>
                  <Text style={styles.scheduleMeta}>
                    📍 {item.room} • 👨‍🏫 {item.instructor}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </Card>
          ))
        )}

        <Text style={styles.sectionTitle}>Bài tập sắp đến hạn</Text>
        {upcomingAssignments.length === 0 ? (
          <EmptyState
            icon="✅"
            title="Không có bài tập nào"
            message="Bạn đã hoàn thành tất cả bài tập!"
          />
        ) : (
          upcomingAssignments.map(item => {
            const deadlineInfo = getDeadlineInfo(item.deadline);
            const isOverdue =
              deadlineInfo.isOverdue && item.status !== 'completed';
            return (
              <Card
                key={item.id}
                onPress={() =>
                  navigation.navigate('AssignmentDetail', {
                    assignmentId: item.id,
                  })
                }
                style={[
                  styles.assignmentCard,
                  isOverdue && styles.cardOverdue,
                  !isOverdue && deadlineInfo.isSoon && styles.cardSoon,
                ]}>
                <View style={styles.assignmentHeader}>
                  <Text style={styles.subjectName} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.chevron}>›</Text>
                </View>
                <Text style={styles.scheduleMeta}>{item.subjectName}</Text>
                <View style={styles.assignmentFooter}>
                  <StatusBadge status={item.status} />
                  <Text
                    style={[
                      styles.deadlineText,
                      isOverdue && styles.deadlineOverdue,
                      !isOverdue && deadlineInfo.isSoon && styles.deadlineSoon,
                    ]}>
                    ⏰ {formatDateTime(item.deadline)}
                    {isOverdue
                      ? ' (Quá hạn)'
                      : deadlineInfo.isSoon
                      ? ` (Còn ${deadlineInfo.daysLeft} ngày)`
                      : ''}
                  </Text>
                </View>
              </Card>
            );
          })
        )}

        <Text style={styles.sectionTitle}>Môn học kỳ này</Text>
        {subjects.length === 0 ? (
          <EmptyState icon="📚" title="Chưa có môn học nào" />
        ) : (
          subjects.map(subject => (
            <Card
              key={subject.id}
              onPress={() =>
                navigation.navigate('SubjectDetail', { subjectId: subject.id })
              }>
              <View style={styles.scheduleRow}>
                <View style={styles.subjectBadge}>
                  <Text style={styles.subjectBadgeText}>{subject.code}</Text>
                </View>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.subjectName} numberOfLines={2}>
                    {subject.name}
                  </Text>
                  <Text style={styles.scheduleMeta}>
                    {subject.credits} tín chỉ • {subject.instructor}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  headerInfo: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  studentName: {
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  studentMeta: {
    marginTop: 2,
    fontSize: Typography.caption,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: 0,
  },
  statCardPrimary: {
    backgroundColor: Colors.primarySurface,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  statLabelLight: {
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBox: {
    backgroundColor: Colors.primarySurface,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  timeText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.primary,
  },
  scheduleInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  scheduleMeta: {
    marginTop: 4,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  subjectBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.md,
    alignSelf: 'center',
  },
  subjectBadgeText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  chevron: {
    fontSize: Typography.h1,
    color: Colors.textTertiary,
    marginLeft: Spacing.sm,
  },
  assignmentCard: {
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  cardOverdue: {
    borderLeftColor: Colors.danger,
  },
  cardSoon: {
    borderLeftColor: Colors.warning,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assignmentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  deadlineText: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    flexShrink: 1,
    marginLeft: Spacing.sm,
    textAlign: 'right',
  },
  deadlineOverdue: {
    color: Colors.danger,
  },
  deadlineSoon: {
    color: Colors.warning,
  },
});
