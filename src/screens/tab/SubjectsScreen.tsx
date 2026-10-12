import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList, Subject, SemesterLabels } from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import {
  ScreenHeader,
  Card,
  SearchBar,
  FilterChips,
  EmptyState,
} from '../../components';

type SemesterFilter = 'all' | keyof typeof SemesterLabels;

const SEMESTER_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  ...Object.entries(SemesterLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function SubjectsScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { subjects } = useAppContext();
  const [query, setQuery] = useState('');
  const [semester, setSemester] = useState<SemesterFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subjects.filter(s => {
      const matchQuery =
        q.length === 0 ||
        s.code.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q);
      const matchSemester = semester === 'all' || s.semester === semester;
      return matchQuery && matchSemester;
    });
  }, [subjects, query, semester]);

  const renderItem = ({ item }: { item: Subject }) => (
    <Card
      onPress={() =>
        navigation.navigate('SubjectDetail', { subjectId: item.id })
      }>
      <View style={styles.cardHeader}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{item.code}</Text>
        </View>
        <View style={styles.creditBadge}>
          <Text style={styles.creditText}>{item.credits} TC</Text>
        </View>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <View style={styles.divider} />
      <Text style={styles.instructor}>👨‍🏫 {item.instructor}</Text>
      <Text style={styles.meta}>
        Nhóm {item.group} • {SemesterLabels[item.semester]}
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Môn học"
        subtitle={`${subjects.length} môn đã đăng ký`}
      />
      <View style={styles.filterBar}>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Tìm theo mã hoặc tên môn học..."
        />
        <FilterChips
          options={SEMESTER_OPTIONS}
          selected={semester}
          onSelect={value => setSemester(value as SemesterFilter)}
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
            icon="🔍"
            title="Không tìm thấy môn học"
            message="Thử đổi từ khóa tìm kiếm hoặc chọn học kỳ khác."
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
  filterBar: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  listContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  codeBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  codeText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  creditBadge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  creditText: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  name: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  instructor: {
    fontSize: Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  meta: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
});
