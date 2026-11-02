import React, { useState } from 'react';
import { X, Target, Zap, Activity, Info, Check, UtensilsCrossed } from 'lucide-react';
import {
  ACTIVITY_LEVELS,
  DIET_MODES,
  calculateBMI,
  calculateNutritionTargets,
} from '../utils/calculator';

export default function TdeeModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  onOpenMealPlannerModal,
}) {
  const [profile, setProfile] = useState(currentProfile);

  if (!isOpen) return null;

  const targets = calculateNutritionTargets(profile);
  const bmiInfo = calculateBMI(profile.weightKg, profile.heightCm);

  const handleSave = () => {
    onSaveProfile({
      ...profile,
      targetCalories: targets.targetCalories,
      targetProtein: targets.targetProtein,
      targetCarbs: targets.targetCarbs,
      targetFat: targets.targetFat,
    });
    onClose();
  };

  const handleSaveAndOpenPlanner = () => {
    onSaveProfile({
      ...profile,
      targetCalories: targets.targetCalories,
      targetProtein: targets.targetProtein,
      targetCarbs: targets.targetCarbs,
      targetFat: targets.targetFat,
    });
    onClose();
    if (onOpenMealPlannerModal) {
      onOpenMealPlannerModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Chỉ số Cơ thể BMI & TDEE
              </h2>
              <p className="text-xs text-slate-500">Cá nhân hóa theo cân nặng, chiều cao & chế độ tập</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Giới tính</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProfile({ ...profile, gender: 'male' })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  profile.gender === 'male'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Nam 👨
              </button>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, gender: 'female' })}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  profile.gender === 'female'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Nữ 👩
              </button>
            </div>
          </div>

          {/* Age, Height, Weight */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tuổi</label>
              <input
                type="number"
                min="10"
                max="100"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) || 20 })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chiều cao (cm)</label>
              <input
                type="number"
                min="100"
                max="250"
                value={profile.heightCm}
                onChange={(e) =>
                  setProfile({ ...profile, heightCm: Number(e.target.value) || 165 })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cân nặng (kg)</label>
              <input
                type="number"
                step="0.5"
                min="30"
                max="200"
                value={profile.weightKg}
                onChange={(e) =>
                  setProfile({ ...profile, weightKg: Number(e.target.value) || 60 })
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
          </div>

          {/* BMI Card */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 font-medium">Chỉ số BMI chuẩn châu Á:</span>
              <div className="font-bold text-slate-800 text-sm mt-0.5">
                {bmiInfo.bmi} • <span className={bmiInfo.color}>{bmiInfo.category}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400 text-[11px]">Cân nặng lý tưởng:</span>
              <div className="font-semibold text-emerald-700">{bmiInfo.idealRange}</div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mức độ vận động / thể thao
            </label>
            <select
              value={profile.activityLevel}
              onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              {ACTIVITY_LEVELS.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.label}
                </option>
              ))}
            </select>
          </div>

          {/* Diet Mode Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Chế độ Vóc dáng & Mục tiêu
            </label>
            <select
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 font-semibold text-slate-800"
            >
              {DIET_MODES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.emoji} {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Calculation Summary Card */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200 text-center">
              <div>
                <span className="text-xs text-slate-500 font-medium">BMR (Tiêu hao cơ bản)</span>
                <div className="text-lg font-bold text-slate-800">{targets.bmr} kcal</div>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium">TDEE (Tiêu hao hằng ngày)</span>
                <div className="text-lg font-bold text-slate-800">{targets.tdee} kcal</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase">
                  Mục tiêu calo đề xuất
                </span>
                <p className="text-[11px] text-slate-500">
                  {targets.currentMode?.name || 'Chế độ đã chọn'}
                </p>
              </div>
              <div className="text-2xl font-black text-emerald-600">
                {targets.targetCalories} <span className="text-xs text-slate-500">kcal/ngày</span>
              </div>
            </div>

            {/* Macro recommendations */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-sky-800 block">Đạm (Protein)</span>
                <span className="font-extrabold text-slate-800">{targets.targetProtein}g</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-amber-800 block">Tinh bột (Carb)</span>
                <span className="font-extrabold text-slate-800">{targets.targetCarbs}g</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-rose-800 block">Chất béo (Fat)</span>
                <span className="font-extrabold text-slate-800">{targets.targetFat}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 bg-slate-50/50">
          <button
            type="button"
            onClick={handleSaveAndOpenPlanner}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-teal-700 hover:bg-teal-50 rounded-xl flex items-center justify-center gap-1.5 border border-teal-200 transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Xem Thực đơn theo dáng</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Lưu & Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
