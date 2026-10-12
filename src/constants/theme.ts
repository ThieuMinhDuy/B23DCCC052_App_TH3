

export const Colors = {

  primary: '#1E3A5F',
  primaryLight: '#2E5A8F',
  primaryDark: '#0F2340',
  primarySurface: '#E8F0FE',

  accent: '#00B4D8',
  accentLight: '#48CAE4',
  accentDark: '#0096B7',

  success: '#2ECC71',
  successLight: '#D5F5E3',
  warning: '#F39C12',
  warningLight: '#FEF5E7',
  danger: '#E74C3C',
  dangerLight: '#FDEDEC',
  info: '#3498DB',
  infoLight: '#EBF5FB',

  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F0F2F5',
  border: '#E1E5EB',
  borderLight: '#F0F2F5',

  textPrimary: '#1A1D21',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textWhite: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  statusPending: '#95A5A6',
  statusPendingBg: '#F2F3F4',
  statusInProgress: '#3498DB',
  statusInProgressBg: '#EBF5FB',
  statusCompleted: '#2ECC71',
  statusCompletedBg: '#D5F5E3',
  statusOverdue: '#E74C3C',
  statusOverdueBg: '#FDEDEC',

  tabActive: '#1E3A5F',
  tabInactive: '#9CA3AF',

  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
} as const;

export const Typography = {

  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  body: 14,
  caption: 12,
  small: 11,

  bold: '700' as const,
  semiBold: '600' as const,
  medium: '500' as const,
  regular: '400' as const,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
