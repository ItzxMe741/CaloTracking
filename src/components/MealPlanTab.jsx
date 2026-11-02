import React, { useState, useMemo } from 'react';
import DailySummary from './DailySummary';
import MealSection from './MealSection';
import {
  UtensilsCrossed,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  Target,
  ArrowRight,
} from 'lucide-react';
import { calculateBMI, calculateNutritionTargets, DIET_MODES } from '../utils/calculator';
import { generateDailyMealPlan, WEEK_DAYS } from '../data/mealPlans';
import { getTodayDateString } from '../utils/storage';

export default function MealPlanTab({
  selectedDate,
  onDateChange,
  profile,
  dayLog,
  dailyTotals,
  onOpenTdeeModal,
  onOpenAddModal,
  onOpenAiModal,
  onRemoveItem,
  onApplyMealPlanToDiary,
}) {
  const todayStr = getTodayDateString();
  const isToday = selectedDate === todayStr;

  // Selected Day Index for Weekly Meal Plan (0 = Thứ 2, ..., 6 = CN)
  const [selectedPlanDayIndex, setSelectedPlanDayIndex] = useState(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  });

  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Targets & BMI
  const targets = useMemo(() => {
    return calculateNutritionTargets(profile);
  }, [profile]);

  const bmiInfo = useMemo(() => {
    return calculateBMI(profile.weightKg, profile.heightCm);
  }, [profile.weightKg, profile.heightCm]);

  const activeMode = DIET_MODES.find((m) => m.id === profile.goal) || DIET_MODES[0];

  // Auto-scaled meal plan for selected day
  const currentPlan = useMemo(() => {
    return generateDailyMealPlan(
      profile.goal || 'cardio_recomp',
      targets.targetCalories,
      selectedPlanDayIndex
    );
  }, [profile.goal, targets.targetCalories, selectedPlanDayIndex]);

  const handleShufflePlan = () => {
    setSelectedPlanDayIndex((prev) => (prev + 1) % 7);
  };

  const handleApplyPlan = () => {
    onApplyMealPlanToDiary(currentPlan.meals);
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 2000);
  };

  const mealHeaders = [
    { key: 'breakfast', label: 'Bữa Sáng', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
    { key: 'lunch', label: 'Bữa Trưa', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { key: 'dinner', label: 'Bữa Tối', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { key: 'snacks', label: 'Bữa Phụ', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
  ];

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const formatDisplayDate = (dateStr) => {
    if (dateStr === todayStr) return 'Hôm nay';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dayOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][d.getDay()];
    return `${dayOfWeek}, ${day}/${month}`;
  };

  return (
    <div className="space-y-6">
      {/* 1. PERSONAL BODY METRICS & GOAL BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeMode.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Chế độ: {activeMode.name}
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  {activeMode.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{activeMode.description}</p>
            </div>
          </div>

          <button
            onClick={onOpenTdeeModal}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0"
          >
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Đổi mục tiêu / Cân nặng</span>
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[11px] text-slate-400 block font-medium">Thể trạng cá nhân</span>
            <span className="text-sm font-bold text-white">
              {profile.weightKg}kg • {profile.heightCm}cm
            </span>
            <span className="text-[10px] text-emerald-400 block">BMI: {bmiInfo.bmi}</span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[11px] text-slate-400 block font-medium">BMR (Cơ bản)</span>
            <span className="text-sm font-bold text-white">{targets.bmr} kcal</span>
            <span className="text-[10px] text-slate-400 block">TDEE: {targets.tdee} kcal</span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[11px] text-slate-400 block font-medium">Mục tiêu Calo/ngày</span>
            <span className="text-base font-extrabold text-emerald-400">
              {targets.targetCalories} <span className="text-xs font-normal text-slate-300">kcal</span>
            </span>
            <span className="text-[10px] text-slate-400 block">
              {activeMode.caloAdjustment > 0
                ? `+${activeMode.caloAdjustment}`
                : activeMode.caloAdjustment || 'Chuẩn TDEE'}{' '}
              kcal
            </span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5">
            <span className="text-[11px] text-slate-400 block font-medium">Tỷ lệ Macro mục tiêu</span>
            <div className="text-[11px] font-bold text-slate-200 mt-1 flex justify-around">
              <span className="text-sky-300">P: {targets.targetProtein}g</span>
              <span className="text-amber-300">C: {targets.targetCarbs}g</span>
              <span className="text-rose-300">F: {targets.targetFat}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SMART RECOMMENDED MEAL PLAN (THỰC ĐƠN GỢI Ý 7 NGÀY) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Gợi Ý Thực Đơn 7 Ngày Chuẩn Vóc Dáng
              </h2>
              <p className="text-xs text-slate-500">
                Định lượng từng món đã được tự động co giãn khớp 100% với calo cơ thể bạn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleShufflePlan}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200 flex items-center gap-1"
              title="Đổi thực đơn mẫu ngày khác"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Đổi món 🎲</span>
            </button>

            <button
              onClick={handleApplyPlan}
              disabled={appliedSuccess}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
            >
              {appliedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Đã áp dụng vào nhật ký!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Áp dụng thực đơn này 🚀</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Weekday Switcher Bar */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {WEEK_DAYS.map((wDay, idx) => (
            <button
              key={wDay}
              type="button"
              onClick={() => setSelectedPlanDayIndex(idx)}
              className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all ${
                selectedPlanDayIndex === idx
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {wDay}
            </button>
          ))}
        </div>

        {/* Day plan title & total calo */}
        <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
          <span className="font-bold text-slate-700">
            {currentPlan.day}: {currentPlan.title}
          </span>
          <span className="text-slate-500">
            Tổng năng lượng:{' '}
            <strong className="text-emerald-700 font-extrabold text-sm">
              {currentPlan.totals.calories} kcal
            </strong>
          </span>
        </div>

        {/* 4 Meals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mealHeaders.map(({ key, label, color, bg, border }) => {
            const mealItems = currentPlan.meals[key] || [];
            const mealCal = mealItems.reduce((s, it) => s + it.calories, 0);

            return (
              <div key={key} className={`rounded-xl border ${border} ${bg}/40 p-3 space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${color}`}>{label}</span>
                  <span className="text-xs font-extrabold text-slate-700">{mealCal} kcal</span>
                </div>

                <div className="space-y-1.5">
                  {mealItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white/90 rounded-lg p-2 border border-slate-100 flex items-start justify-between gap-2 text-xs"
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="text-base shrink-0">{item.emoji}</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-800 leading-snug">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.portion}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-800">{item.calories}</span>
                        <span className="text-[10px] text-slate-400 block -mt-1">kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. DAILY TRACKER DIARY (NHẬT KÝ ĂN UỐNG THỰC TẾ HÔM NAY) */}
      <div className="space-y-4 pt-2">
        {/* Date Navigator Bar */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-2.5 border border-slate-200/90 shadow-2xs">
          <button
            onClick={handlePrevDay}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            title="Ngày trước đó"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="bg-transparent font-bold text-sm text-slate-800 cursor-pointer focus:outline-none"
            />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {formatDisplayDate(selectedDate)}
            </span>
            {!isToday && (
              <button
                onClick={() => onDateChange(todayStr)}
                className="text-xs text-emerald-600 hover:underline font-semibold ml-1"
              >
                Về hôm nay
              </button>
            )}
          </div>

          <button
            onClick={handleNextDay}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            title="Ngày tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Summary: Circular calo ring + Macro progress */}
        <DailySummary
          totals={dailyTotals}
          targets={{
            targetCalories: targets.targetCalories,
            targetProtein: targets.targetProtein,
            targetCarbs: targets.targetCarbs,
            targetFat: targets.targetFat,
          }}
          onOpenTdeeModal={onOpenTdeeModal}
          onOpenMealPlannerModal={() => {}}
        />

        {/* 4 Meal Sections (Actual Logged Meals) */}
        <div className="space-y-4">
          <MealSection
            mealKey="breakfast"
            items={dayLog.breakfast || []}
            onOpenAddModal={(mealKey) => onOpenAddModal(mealKey)}
            onOpenAiModal={(mealKey) => onOpenAiModal(mealKey)}
            onRemoveItem={onRemoveItem}
          />

          <MealSection
            mealKey="lunch"
            items={dayLog.lunch || []}
            onOpenAddModal={(mealKey) => onOpenAddModal(mealKey)}
            onOpenAiModal={(mealKey) => onOpenAiModal(mealKey)}
            onRemoveItem={onRemoveItem}
          />

          <MealSection
            mealKey="dinner"
            items={dayLog.dinner || []}
            onOpenAddModal={(mealKey) => onOpenAddModal(mealKey)}
            onOpenAiModal={(mealKey) => onOpenAiModal(mealKey)}
            onRemoveItem={onRemoveItem}
          />

          <MealSection
            mealKey="snacks"
            items={dayLog.snacks || []}
            onOpenAddModal={(mealKey) => onOpenAddModal(mealKey)}
            onOpenAiModal={(mealKey) => onOpenAiModal(mealKey)}
            onRemoveItem={onRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}
