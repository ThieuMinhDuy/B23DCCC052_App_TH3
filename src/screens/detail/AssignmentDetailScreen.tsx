import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import {
  RootStackParamList,
  AssignmentStatus,
  AssignmentStatusLabels,
} from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Card, InfoRow, EmptyState, StatusBadge } from '../../components';
import { formatDateTime, getDeadlineInfo } from '../../utils/date';

type AssignmentDetailRoute = RouteProp<
  RootStackParamList,
  'AssignmentDetail'
>;

export default function AssignmentDetailScreen() {
  const { assignmentId } = useRoute<AssignmentDetailRoute>().params;
  const { assignments, updateAssignmentStatus } = useAppContext();

  const assignment = assignments.find(a => a.id === assignmentId);

  if (!assignment) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyState
          icon="❓"
          title="Không tìm thấy bài tập"
          message="Bài tập này không tồn tại hoặc đã bị xóa."
        />
      </View>
    );
  }

  const deadlineInfo = getDeadlineInfo(assignment.deadline);
  const isOverdue =
    deadlineInfo.isOverdue && assignment.status !== 'completed';

  const handleChangeStatus = (status: AssignmentStatus) => {
    if (status === assignment.status) {
      return;
    }
    updateAssignmentStatus(assignment.id, status);
    Alert.alert(
      'Thành công',
      `Đã cập nhật trạng thái: ${AssignmentStatusLabels[status]}`,
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Card>
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <Text style={styles.subjectName}>{assignment.subjectName}</Text>
            <Text style={styles.title}>{assignment.title}</Text>
          </View>
          <StatusBadge status={assignment.status} />
        </View>
        <View
          style={[
            styles.deadlineBox,
            isOverdue && styles.deadlineBoxOverdue,
            !isOverdue && deadlineInfo.isSoon && styles.deadlineBoxSoon,
          ]}>
          <Text
            style={[
              styles.deadlineLabel,
              isOverdue && styles.deadlineTextOverdue,
              !isOverdue && deadlineInfo.isSoon && styles.deadlineTextSoon,
            ]}>
            ⏰ Hạn nộp: {formatDateTime(assignment.deadline)}
          </Text>
          <Text
            style={[
              styles.deadlineSub,
              isOverdue && styles.deadlineTextOverdue,
              !isOverdue && deadlineInfo.isSoon && styles.deadlineTextSoon,
            ]}>
            {isOverdue
              ? 'Đã quá hạn nộp!'
              : deadlineInfo.isSoon
              ? `Còn ${deadlineInfo.daysLeft} ngày để nộp`
              : 'Còn nhiều thời gian'}
          </Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitleInside}>📋 Mô tả đề bài</Text>
        <Text style={styles.sectionText}>{assignment.description}</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitleInside}>✅ Yêu cầu nộp</Text>
        <Text style={styles.sectionText}>{assignment.requirements}</Text>
      </Card>

      <Card>
        <Text style={styles.sectionTitleInside}>🔄 Cập nhật trạng thái</Text>
        {(Object.keys(AssignmentStatusLabels) as AssignmentStatus[]).map(
          status => {
            const active = assignment.status === status;
            return (
              <TouchableOpacity
                key={status}
                style={[styles.statusOption, active && styles.statusOptionActive]}
                onPress={() => handleChangeStatus(status)}>
                <Text
                  style={[
                    styles.statusOptionText,
                    active && styles.statusOptionTextActive,
                  ]}>
                  {AssignmentStatusLabels[status]}
                </Text>
                {active ? (
                  <Text style={styles.statusCheck}>✓</Text>
                ) : null}
              </TouchableOpacity>
            );
          },
        )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  subjectName: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.primaryLight,
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  deadlineBox: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.infoLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  deadlineBoxOverdue: {
    backgroundColor: Colors.dangerLight,
  },
  deadlineBoxSoon: {
    backgroundColor: Colors.warningLight,
  },
  deadlineLabel: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.info,
  },
  deadlineSub: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.info,
  },
  deadlineTextOverdue: {
    color: Colors.danger,
  },
  deadlineTextSoon: {
    color: Colors.warning,
  },
  sectionTitleInside: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  sectionText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    lineHeight: 21,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  statusOptionActive: {
    backgroundColor: Colors.primarySurface,
    borderColor: Colors.primary,
  },
  statusOptionText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
  statusOptionTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  statusCheck: {
    fontSize: Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
});
