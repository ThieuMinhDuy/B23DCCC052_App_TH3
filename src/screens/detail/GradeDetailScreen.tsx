import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList } from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Card, EmptyState } from '../../components';

type GradeDetailRoute = RouteProp<RootStackParamList, 'GradeDetail'>;

const SCORE_ROWS = [
  { key: 'attendanceScore', label: 'Điểm chuyên cần', weight: '10%' },
  { key: 'midtermScore', label: 'Điểm giữa kỳ', weight: '30%' },
  { key: 'finalScore', label: 'Điểm cuối kỳ', weight: '60%' },
] as const;

export default function GradeDetailScreen() {
  const { subjectId } = useRoute<GradeDetailRoute>().params;
  const { grades } = useAppContext();

  const grade = grades.find(g => g.subjectId === subjectId);

  if (!grade) {
    return (
      <View style={styles.emptyWrapper}>
        <EmptyState
          icon="❓"
          title="Không tìm thấy kết quả học tập"
          message="Kết quả học tập của môn này không tồn tại."
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.heroCard}>
        <Text style={styles.subjectCode}>{grade.subjectCode}</Text>
        <Text style={styles.subjectName}>{grade.subjectName}</Text>
        <Text style={styles.creditText}>{grade.credits} tín chỉ</Text>
        <View style={styles.letterBadge}>
          <Text style={styles.letterText}>{grade.letterGrade}</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Bảng điểm chi tiết</Text>
        {SCORE_ROWS.map(row => (
          <View key={row.key} style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>{row.label}</Text>
            <View style={styles.scoreRight}>
              <Text style={styles.scoreWeight}>Hệ số {row.weight}</Text>
              <Text style={styles.scoreValue}>
                {grade[row.key].toFixed(1)}
              </Text>
            </View>
          </View>
        ))}
      </Card>

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {grade.totalScore10.toFixed(2)}
          </Text>
          <Text style={styles.summaryLabel}>Điểm thang 10</Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: Colors.accentDark }]}>
            {grade.totalScore4.toFixed(1)}
          </Text>
          <Text style={styles.summaryLabel}>Điểm thang 4</Text>
        </Card>
      </View>
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
  subjectCode: {
    fontSize: Typography.caption,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  subjectName: {
    marginTop: 4,
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 26,
  },
  creditText: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  letterBadge: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.primary,
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: Typography.h2,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  scoreLabel: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  scoreRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreWeight: {
    fontSize: Typography.small,
    color: Colors.textTertiary,
    marginRight: Spacing.md,
  },
  scoreValue: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginBottom: 0,
  },
  summaryValue: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.primary,
  },
  summaryLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
});
