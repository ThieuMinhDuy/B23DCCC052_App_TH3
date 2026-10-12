import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import {
  RootStackParamList,
  Assignment,
  AssignmentStatus,
  AssignmentStatusLabels,
} from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import {
  ScreenHeader,
  Card,
  SearchBar,
  FilterChips,
  StatusBadge,
  EmptyState,
} from '../../components';
import { formatDateTime, getDeadlineInfo } from '../../utils/date';

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  ...(Object.keys(AssignmentStatusLabels) as AssignmentStatus[]).map(s => ({
    value: s,
    label: AssignmentStatusLabels[s],
  })),
];

export default function AssignmentsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { assignments, updateAssignmentStatus } = useAppContext();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [statusModalFor, setStatusModalFor] = useState<Assignment | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assignments
      .filter(a => {
        const matchQuery = q.length === 0 || a.title.toLowerCase().includes(q);
        const isOverdue =
          getDeadlineInfo(a.deadline).isOverdue && a.status !== 'completed';
        const matchFilter =
          filter === 'all' ||
          (filter === 'overdue' ? isOverdue : a.status === filter);
        return matchQuery && matchFilter;
      })
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
  }, [assignments, query, filter]);

  const renderItem = ({ item }: { item: Assignment }) => {
    const deadlineInfo = getDeadlineInfo(item.deadline);
    const isOverdue = deadlineInfo.isOverdue && item.status !== 'completed';
    return (
      <Card
        onPress={() =>
          navigation.navigate('AssignmentDetail', { assignmentId: item.id })
        }
        style={[
          styles.card,
          isOverdue && styles.cardOverdue,
          !isOverdue && deadlineInfo.isSoon && styles.cardSoon,
        ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.subjectTag} numberOfLines={1}>
            {item.subjectName}
          </Text>
          <StatusBadge status={item.status} />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.cardFooter}>
          <Text
            style={[
              styles.deadline,
              isOverdue && styles.deadlineOverdue,
              !isOverdue && deadlineInfo.isSoon && styles.deadlineSoon,
            ]}>
            ⏰ {formatDateTime(item.deadline)}
            {isOverdue
              ? ' • Quá hạn'
              : deadlineInfo.isSoon
              ? ` • Còn ${deadlineInfo.daysLeft} ngày`
              : ''}
          </Text>
          <TouchableOpacity
            style={styles.changeBtn}
            onPress={() => setStatusModalFor(item)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.changeBtnText}>Đổi trạng thái</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const handleStatusChange = (status: AssignmentStatus) => {
    if (statusModalFor) {
      updateAssignmentStatus(statusModalFor.id, status);
    }
    setStatusModalFor(null);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Bài tập" subtitle={`${assignments.length} bài tập`} />
      <View style={styles.filterBar}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm bài tập theo tên..."
        />
        <FilterChips
          options={STATUS_OPTIONS}
          selected={filter}
          onSelect={setFilter}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="📝"
            title="Không có bài tập nào"
            message="Thử đổi từ khóa tìm kiếm hoặc bộ lọc trạng thái."
          />
        }
      />

      <Modal
        visible={statusModalFor !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setStatusModalFor(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật trạng thái</Text>
            <Text style={styles.modalSubtitle} numberOfLines={2}>
              {statusModalFor?.title}
            </Text>
            {(Object.keys(AssignmentStatusLabels) as AssignmentStatus[]).map(
              status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.modalOption,
                    statusModalFor?.status === status &&
                      styles.modalOptionActive,
                  ]}
                  onPress={() => handleStatusChange(status)}>
                  <Text
                    style={[
                      styles.modalOptionText,
                      statusModalFor?.status === status &&
                        styles.modalOptionTextActive,
                    ]}>
                    {AssignmentStatusLabels[status]}
                  </Text>
                  {statusModalFor?.status === status ? (
                    <Text style={styles.modalCheck}>✓</Text>
                  ) : null}
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setStatusModalFor(null)}>
              <Text style={styles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  card: {
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  cardOverdue: {
    borderLeftColor: Colors.danger,
  },
  cardSoon: {
    borderLeftColor: Colors.warning,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  subjectTag: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.primaryLight,
    flexShrink: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  deadline: {
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
    flexShrink: 1,
  },
  deadlineOverdue: {
    color: Colors.danger,
  },
  deadlineSoon: {
    color: Colors.warning,
  },
  changeBtn: {
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    marginLeft: Spacing.sm,
  },
  changeBtnText: {
    fontSize: Typography.small,
    fontWeight: '600',
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '100%',
  },
  modalTitle: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  modalSubtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  modalOption: {
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
  modalOptionActive: {
    backgroundColor: Colors.primarySurface,
    borderColor: Colors.primary,
  },
  modalOptionText: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
  },
  modalOptionTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  modalCheck: {
    fontSize: Typography.body,
    color: Colors.primary,
    fontWeight: '700',
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    marginTop: Spacing.xs,
  },
  modalCancelText: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
