import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import {
  RootStackParamList,
  ScheduleItem,
  Assignment,
  DayOfWeekLabels,
  SemesterLabels,
} from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Card, InfoRow, EmptyState, StatusBadge } from '../../components';
import { getSessionStatus, SessionStatusLabels } from '../../utils/date';

type SubjectDetailRoute = RouteProp<RootStackParamList, 'SubjectDetail'>;

export default function SubjectDetailScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { subjectId } = useRoute<SubjectDetailRoute>().params;
  const { subjects, schedule, assignments, grades } = useAppContext();

  const subject = subjects.find(s => s.id === subjectId);
  const subjectSchedule = schedule.filter(item => item.subjectId === subjectId);
  const subjectAssignments = assignments
    .filter(a => a.subjectId === subjectId)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
  const grade = grades.find(g => g.subjectId === subjectId);

  useEffect(() => {
    if (subject) {
      navigation.setOptions({ title: subject.code });
    }
  }, [navigation, subject]);

  if (!subject) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyState
          icon="❓"
          title="Không tìm thấy môn học"
          message="Môn học này không tồn tại hoặc đã bị xóa."
        />
      </View>
    );
  }

  const renderSchedule = ({ item }: { item: ScheduleItem }) => {
    const status = getSessionStatus(
      item.dayOfWeek,
      item.startTime,
      item.endTime,
    );
    return (
      <Card
        onPress={() =>
          navigation.navigate('ScheduleDetail', { scheduleId: item.id })
        }>
        <View style={styles.scheduleRow}>
          <View style={styles.dayBadge}>
            <Text style={styles.dayBadgeText}>
              {DayOfWeekLabels[item.dayOfWeek]}
            </Text>
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTime}>
              {item.startTime} - {item.endTime}
            </Text>
            <Text style={styles.scheduleMeta}>
              📍 {item.room} • {SessionStatusLabels[status]}
            </Text>
          </View>
        </View>
      </Card>
    );
  };

  const renderAssignment = ({ item }: { item: Assignment }) => (
    <Card
      onPress={() =>
        navigation.navigate('AssignmentDetail', { assignmentId: item.id })
      }>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <StatusBadge status={item.status} />
      </View>
    </Card>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Card>
        <Text style={styles.subjectName}>{subject.name}</Text>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{subject.code}</Text>
          </View>
          <View style={[styles.tag, styles.tagAccent]}>
            <Text style={[styles.tagText, styles.tagTextAccent]}>
              {subject.credits} tín chỉ
            </Text>
          </View>
          <View style={[styles.tag, styles.tagNeutral]}>
            <Text style={[styles.tagText, styles.tagTextNeutral]}>
              Nhóm {subject.group}
            </Text>
          </View>
        </View>
        <InfoRow
          label="Giảng viên"
          value={subject.instructor}
          valueBold
        />
        <InfoRow
          label="Học kỳ"
          value={SemesterLabels[subject.semester]}
        />
        {subject.description ? (
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>Mô tả môn học</Text>
            <Text style={styles.descriptionText}>{subject.description}</Text>
          </View>
        ) : null}
      </Card>

      <Text style={styles.sectionTitle}>Lịch học</Text>
      {subjectSchedule.length === 0 ? (
        <EmptyState icon="📅" title="Môn này chưa có lịch học" />
      ) : (
        <FlatList
          data={subjectSchedule}
          keyExtractor={item => item.id}
          renderItem={renderSchedule}
          scrollEnabled={false}
        />
      )}

      <Text style={styles.sectionTitle}>Bài tập</Text>
      {subjectAssignments.length === 0 ? (
        <EmptyState icon="📝" title="Chưa có bài tập nào" />
      ) : (
        <FlatList
          data={subjectAssignments}
          keyExtractor={item => item.id}
          renderItem={renderAssignment}
          scrollEnabled={false}
        />
      )}

      <Text style={styles.sectionTitle}>Kết quả học tập</Text>
      {grade ? (
        <Card>
          <InfoRow
            label="Điểm chuyên cần"
            value={grade.attendanceScore.toFixed(1)}
          />
          <InfoRow
            label="Điểm giữa kỳ"
            value={grade.midtermScore.toFixed(1)}
          />
          <InfoRow
            label="Điểm cuối kỳ"
            value={grade.finalScore.toFixed(1)}
          />
          <InfoRow
            label="Điểm tổng kết (10)"
            value={grade.totalScore10.toFixed(2)}
            valueBold
          />
        </Card>
      ) : (
        <EmptyState
          icon="📊"
          title="Chưa có kết quả học tập"
          message="Điểm số sẽ hiển thị khi giảng viên nhập điểm."
        />
      )}
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
  subjectName: {
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  tag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  tagAccent: {
    backgroundColor: Colors.accentLight,
  },
  tagNeutral: {
    backgroundColor: Colors.surfaceSecondary,
  },
  tagText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  tagTextAccent: {
    color: Colors.primaryDark,
  },
  tagTextNeutral: {
    color: Colors.textSecondary,
  },
  descriptionBox: {
    marginTop: Spacing.md,
    backgroundColor: Colors.primarySurface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
  },
  descriptionTitle: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  descriptionText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    lineHeight: 21,
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
  dayBadge: {
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.md,
  },
  dayBadgeText: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.primary,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTime: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  scheduleMeta: {
    marginTop: 2,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assignmentTitle: {
    flex: 1,
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginRight: Spacing.md,
  },
});
