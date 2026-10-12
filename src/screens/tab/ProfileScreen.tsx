import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppContext } from '../../context/AppContext';
import { RootStackParamList, Grade } from '../../types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { ScreenHeader, Card, EmptyState } from '../../components';
import { computeGpa10, computeTotalCredits } from '../../utils/grade';

export default function ProfileScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { student, grades, updateStudent } = useAppContext();

  const [editVisible, setEditVisible] = useState(false);
  const [email, setEmail] = useState(student.email);
  const [phone, setPhone] = useState(student.phone);

  useEffect(() => {
    setEmail(student.email);
    setPhone(student.phone);
  }, [student]);

  const gpa = computeGpa10(grades);
  const totalCredits = computeTotalCredits(grades);

  const handleSave = async () => {
    if (!email.trim() || !phone.trim()) {
      Alert.alert('Lỗi', 'Email và số điện thoại không được để trống.');
      return;
    }
    await updateStudent({ email: email.trim(), phone: phone.trim() });
    setEditVisible(false);
    Alert.alert('Thành công', 'Đã cập nhật thông tin liên hệ.');
  };

  const renderGrade = ({ item }: { item: Grade }) => (
    <Card
      onPress={() =>
        navigation.navigate('GradeDetail', { subjectId: item.subjectId })
      }>
      <View style={styles.gradeRow}>
        <View style={styles.gradeInfo}>
          <Text style={styles.gradeCode}>{item.subjectCode}</Text>
          <Text style={styles.gradeName} numberOfLines={2}>
            {item.subjectName}
          </Text>
          <Text style={styles.gradeMeta}>{item.credits} tín chỉ</Text>
        </View>
        <View style={styles.gradeScore}>
          <Text style={styles.scoreValue}>{item.totalScore10.toFixed(1)}</Text>
          <View style={styles.letterBadge}>
            <Text style={styles.letterText}>{item.letterGrade}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Cá nhân" subtitle="Thông tin và kết quả học tập" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileTop}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {student.name
                  .split(' ')
                  .filter(Boolean)
                  .slice(-2)
                  .map(w => w[0])
                  .join('')
                  .toUpperCase() || 'SV'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.studentId}>{student.id}</Text>
            </View>
          </View>
          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lớp</Text>
              <Text style={styles.infoValue}>{student.className}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Ngành học</Text>
              <Text style={styles.infoValue}>{student.major}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Khóa học</Text>
              <Text style={styles.infoValue}>{student.cohort}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={[styles.infoValue, styles.infoValueSmall]}>
                {student.email}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Số điện thoại</Text>
              <Text style={styles.infoValue}>{student.phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditVisible(true)}>
            <Text style={styles.editButtonText}>
              ✏️ Cập nhật thông tin liên hệ
            </Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{gpa.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Điểm TB tích lũy</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: Colors.accentDark }]}>
              {totalCredits}
            </Text>
            <Text style={styles.statLabel}>Tín chỉ tích lũy</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Kết quả học tập</Text>
        <FlatList
          data={grades}
          keyExtractor={item => item.id}
          renderItem={renderGrade}
          scrollEnabled={false}
          ListEmptyComponent={
            <EmptyState
              icon="📊"
              title="Chưa có kết quả học tập"
              message="Kết quả học tập sẽ hiển thị sau khi có điểm."
            />
          }
        />
      </ScrollView>

      <Modal
        visible={editVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật thông tin liên hệ</Text>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Nhập email"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={Colors.textTertiary}
              keyboardType="phone-pad"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setEditVisible(false)}>
                <Text style={styles.modalButtonSecondaryText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleSave}>
                <Text style={styles.modalButtonPrimaryText}>Lưu</Text>
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  profileCard: {
    marginBottom: Spacing.sm,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  avatarText: {
    fontSize: Typography.h2,
    fontWeight: '700',
    color: Colors.textWhite,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: Typography.h3,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  studentId: {
    marginTop: 2,
    fontSize: Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  infoList: {
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.borderLight,
  },
  infoLabel: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
  },
  infoValue: {
    flex: 1,
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'right',
  },
  infoValueSmall: {
    fontSize: Typography.caption,
  },
  editButton: {
    backgroundColor: Colors.primarySurface,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginVertical: Spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    marginBottom: 0,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.primary,
  },
  statLabel: {
    marginTop: Spacing.xs,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  gradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gradeInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  gradeCode: {
    fontSize: Typography.small,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  gradeName: {
    marginTop: 2,
    fontSize: Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  gradeMeta: {
    marginTop: 2,
    fontSize: Typography.caption,
    color: Colors.textSecondary,
  },
  gradeScore: {
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: Typography.h2,
    fontWeight: '700',
    color: Colors.primary,
  },
  letterBadge: {
    marginTop: Spacing.xs,
    backgroundColor: Colors.primarySurface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  letterText: {
    fontSize: Typography.caption,
    fontWeight: '700',
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
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.caption,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  modalButtonPrimaryText: {
    color: Colors.textWhite,
    fontWeight: '700',
    fontSize: Typography.body,
  },
  modalButtonSecondary: {
    backgroundColor: Colors.surfaceSecondary,
  },
  modalButtonSecondaryText: {
    color: Colors.textSecondary,
    fontWeight: '600',
    fontSize: Typography.body,
  },
});
