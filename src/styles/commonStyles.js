import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, shadows } from './theme';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.wellness.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.wellness.background,
  },
  
  wellnessCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.wellness[100],
  },
  
  wellnessButton: {
    backgroundColor: colors.wellness[500],
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  wellnessButtonText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  
  wellnessButtonDisabled: {
    backgroundColor: colors.gray[300],
    opacity: 0.6,
  },
  
  wellnessButtonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.wellness[500],
  },
  
  wellnessButtonSecondaryText: {
    color: colors.wellness[600],
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  
  gradient: {
    flex: 1,
  },
  
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.wellness[800],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  
  subtitle: {
    fontSize: fontSize.base,
    color: colors.wellness[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.wellness[800],
    marginBottom: spacing.lg,
  },
  
  progressContainer: {
    marginVertical: spacing.lg,
  },
  
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.wellness[500],
    borderRadius: borderRadius.full,
  },
  
  progressText: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  
  optionButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  
  optionButtonSelected: {
    borderColor: colors.wellness[500],
    backgroundColor: colors.wellness[50],
  },
  
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  optionIcon: {
    fontSize: fontSize['2xl'],
    marginRight: spacing.md,
  },
  
  optionText: {
    flex: 1,
  },
  
  optionTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  
  optionDescription: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
  },
  
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  statIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.xs,
  },
  
  statText: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.wellness[800],
  },
  
  missionCard: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  missionCardCompleted: {
    borderColor: colors.wellness[500],
    backgroundColor: colors.wellness[50],
  },
  
  missionIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.wellness[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  
  missionIconText: {
    fontSize: fontSize['2xl'],
  },
  
  missionContent: {
    flex: 1,
  },
  
  missionTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  
  missionTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.wellness[800],
  },
  
  missionDuration: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
  },
  
  missionButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  missionButtonCompleted: {
    backgroundColor: colors.wellness[500],
  },
  
  missionButtonText: {
    fontSize: fontSize.lg,
    color: colors.gray[500],
  },
  
  missionButtonTextCompleted: {
    color: colors.white,
  },
  
  centeredText: {
    textAlign: 'center',
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    justifyContent: 'space-between',
  },
  
  mb1: { marginBottom: spacing.xs },
  mb2: { marginBottom: spacing.sm },
  mb3: { marginBottom: spacing.md },
  mb4: { marginBottom: spacing.lg },
  mb5: { marginBottom: spacing.xl },
  mb6: { marginBottom: spacing['2xl'] },
  
  mt1: { marginTop: spacing.xs },
  mt2: { marginTop: spacing.sm },
  mt3: { marginTop: spacing.md },
  mt4: { marginTop: spacing.lg },
  mt5: { marginTop: spacing.xl },
  mt6: { marginTop: spacing['2xl'] },
  
  px2: { paddingHorizontal: spacing.sm },
  px3: { paddingHorizontal: spacing.md },
  px4: { paddingHorizontal: spacing.lg },
  px5: { paddingHorizontal: spacing.xl },
  px6: { paddingHorizontal: spacing['2xl'] },
  
  py2: { paddingVertical: spacing.sm },
  py3: { paddingVertical: spacing.md },
  py4: { paddingVertical: spacing.lg },
  py5: { paddingVertical: spacing.xl },
  py6: { paddingVertical: spacing['2xl'] },
});
