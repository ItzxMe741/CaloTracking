import React, { useState, useMemo } from 'react';
import {
  X,
  Sparkles,
  UtensilsCrossed,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Zap,
  Info,
  ChevronRight,
  TrendingDown,
  Dumbbell,
  Heart,
  Leaf,
  Scale,
} from 'lucide-react';
import { DIET_MODES, calculateBMI, calculateNutritionTargets } from '../utils/calculator';
import { generateDailyMealPlan, WEEK_DAYS } from '../data/mealPlans';

export default function MealPlannerModal({
  isOpen,
  onClose,
  currentProfile,
  onApplyMealPlanToDiary,
  onUpdateProfileMode,
}) {
  const [selectedModeId, setSelectedModeId] = useState(
    currentProfile.goal || 'cardio_toning'
  );
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'weekly'
  const [selectedDayIndex, setSelectedDayIndex] = useState(() => {
    // Thứ 2 = 0, ..., Chủ Nhật = 6
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  });
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  // Recalculate target calories based on user profile + selected mode
  const currentTargets = useMemo(() => {
    return calculateNutritionTargets({
      ...currentProfile,
      goal: selectedModeId,
    });
  }, [currentProfile, selectedModeId]);

  const bmiInfo = useMemo(() => {
    return calculateBMI(currentProfile.weightKg, currentProfile.heightCm);
  }, [currentProfile.weightKg, currentProfile.heightCm]);

  const activeMode = DIET_MODES.find((m) => m.id === selectedModeId) || DIET_MODES[0];

  // Generate the plan scaled to target calories
  const currentMealPlan = useMemo(() => {
    return generateDailyMealPlan(
      selectedModeId,
      currentTargets.targetCalories,
      selectedDayIndex
    );
  }, [selectedModeId, currentTargets.targetCalories, selectedDayIndex]);

  if (!isOpen) return null;

  const handleSelectMode = (modeId) => {
    setSelectedModeId(modeId);
    if (onUpdateProfileMode) {
      onUpdateProfileMode(modeId);
    }
  };

  const handleShuffleDay = () => {
    setSelectedDayIndex((prev) => (prev + 1) % 7);
  };

  const handleApplyToDiary = () => {
    onApplyMealPlanToDiary(currentMealPlan.meals);
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      onClose();
    }, 1200);
  };

  const mealLabels = [
    { key: 'breakfast', label: 'Bữa Sáng', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { key: 'lunch', label: 'Bữa Trưa', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { key: 'dinner', label: 'Bữa Tối', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' },
    { key: 'snacks', label: 'Bữa Phụ / Ăn Vặt', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Thực đơn Thông minh theo Vóc dáng & Chỉ số Cơ thể
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span>
                  {currentProfile.gender === 'female' ? 'Nữ' : 'Nam'} • {currentProfile.weightKg}kg • {currentProfile.heightCm}cm
                </span>
                <span>•</span>
                <span className={`font-semibold ${bmiInfo.color}`}>
                  BMI: {bmiInfo.bmi} ({bmiInfo.category})
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {/* Mode Selector Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Chọn Chế độ Vóc dáng & Tập luyện của bạn
              </label>
              <span className="text-[11px] text-emerald-600 font-semibold">
                6 chế độ chuyên sâu
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {DIET_MODES.map((mode) => {
                const isSelected = selectedModeId === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleSelectMode(mode.id)}
                    className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-slate-50/70 border-slate-200/90 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xl">{mode.emoji}</span>
                        {mode.badge && (
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-emerald-200/80 text-emerald-900'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {mode.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {mode.shortName}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                        {mode.description}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Calo:</span>
                      <span
                        className={`font-extrabold ${
                          mode.caloAdjustment < 0
                            ? 'text-rose-600'
                            : mode.caloAdjustment > 0
                            ? 'text-sky-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {mode.caloAdjustment > 0 ? `+${mode.caloAdjustment}` : mode.caloAdjustment || 'Chuẩn TDEE'} kcal
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Mode Banner & Macro Split */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeMode.emoji}</span>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {activeMode.name}
                  </h3>
                  <p className="text-[11px] text-slate-300">{activeMode.tips}</p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-700 sm:pl-4">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                  Mục tiêu calo cá nhân
                </span>
                <span className="text-xl font-black text-emerald-400">
                  {currentTargets.targetCalories}{' '}
                  <span className="text-xs font-normal text-slate-300">kcal/ngày</span>
                </span>
              </div>
            </div>

            {/* Macro percentages */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white/10 rounded-xl p-2">
                <span className="text-[10px] text-sky-300 block font-semibold">
                  Đạm (Protein {Math.round(activeMode.macroSplit.protein * 100)}%)
                </span>
                <span className="text-base font-extrabold text-white">
                  {currentTargets.targetProtein}g
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2">
                <span className="text-[10px] text-amber-300 block font-semibold">
                  Tinh bột (Carb {Math.round(activeMode.macroSplit.carbs * 100)}%)
                </span>
                <span className="text-base font-extrabold text-white">
                  {currentTargets.targetCarbs}g
                </span>
              </div>
              <div className="bg-white/10 rounded-xl p-2">
                <span className="text-[10px] text-rose-300 block font-semibold">
                  Chất béo (Fat {Math.round(activeMode.macroSplit.fat * 100)}%)
                </span>
                <span className="text-base font-extrabold text-white">
                  {currentTargets.targetFat}g
                </span>
              </div>
            </div>
          </div>

          {/* Subtabs: Today vs 7-Day Plan */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('today')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'today'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Thực đơn Hôm Nay ({currentMealPlan.day})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('weekly')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'weekly'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Lịch trình 7 ngày trong tuần
                </button>
              </div>

              {activeTab === 'today' && (
                <button
                  type="button"
                  onClick={handleShuffleDay}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
                  title="Đổi thực đơn mẫu ngày khác"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đổi thực đơn</span>
                </button>
              )}
            </div>

            {/* Weekday Selector Bar when in weekly view */}
            {activeTab === 'weekly' && (
              <div className="flex gap-1.5 overflow-x-auto py-2.5">
                {WEEK_DAYS.map((wDay, idx) => (
                  <button
                    key={wDay}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                      selectedDayIndex === idx
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {wDay}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Daily Meal Plan Display (4 Meals) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">
                {currentMealPlan.day}: {currentMealPlan.title}
              </span>
              <span>
                Tổng calo thực đơn:{' '}
                <strong className="text-emerald-700 font-extrabold">
                  {currentMealPlan.totals.calories} kcal
                </strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mealLabels.map(({ key, label, color, bg, border }) => {
                const mealItems = currentMealPlan.meals[key] || [];
                const mealCal = mealItems.reduce((s, it) => s + it.calories, 0);

                return (
                  <div
                    key={key}
                    className={`rounded-xl border ${border} ${bg}/40 p-3 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold ${color}`}>{label}</span>
                        <span className="text-xs font-extrabold text-slate-700">
                          {mealCal} kcal
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {mealItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-white/80 rounded-lg p-2 border border-slate-100 flex items-start justify-between gap-2 text-xs"
                          >
                            <div className="flex items-start gap-2 min-w-0">
                              <span className="text-base shrink-0">{item.emoji}</span>
                              <div className="min-w-0">
                                <div className="font-semibold text-slate-800 leading-snug">
                                  {item.name}
                                </div>
                                <div className="text-[11px] text-slate-500 mt-0.5">
                                  {item.portion}
                                </div>
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/70">
          <div className="text-xs text-slate-500 hidden sm:block">
            Định lượng đã tự động cân đối chuẩn theo chiều cao & cân nặng của bạn.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl"
            >
              Đóng
            </button>

            <button
              type="button"
              onClick={handleApplyToDiary}
              disabled={appliedSuccess}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              {appliedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Đã thêm vào nhật ký hôm nay!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Áp dụng thực đơn này vào nhật ký hôm nay</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
