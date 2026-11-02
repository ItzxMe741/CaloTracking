import React from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, AlertCircle, UtensilsCrossed } from 'lucide-react';

export default function DailySummary({
  totals,
  targets,
  onOpenTdeeModal,
  onOpenMealPlannerModal,
}) {
  const { totalCalories, totalProtein, totalCarbs, totalFat } = totals;
  const { targetCalories, targetProtein, targetCarbs, targetFat } = targets;

  const remainingCalories = targetCalories - totalCalories;
  const caloPercentage = Math.min(100, Math.round((totalCalories / targetCalories) * 100)) || 0;
  const isOver = remainingCalories < 0;

  const proteinPct = Math.min(100, Math.round((totalProtein / (targetProtein || 1)) * 100)) || 0;
  const carbsPct = Math.min(100, Math.round((totalCarbs / (targetCarbs || 1)) * 100)) || 0;
  const fatPct = Math.min(100, Math.round((totalFat / (targetFat || 1)) * 100)) || 0;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
      {/* Top Calorie Overview */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-5 border-b border-slate-100">
        {/* Circular Progress Display */}
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="#f1f5f9"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke={isOver ? '#ef4444' : '#10b981'}
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 60}
              strokeDashoffset={2 * Math.PI * 60 * (1 - Math.min(1, totalCalories / targetCalories))}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {totalCalories}
            </span>
            <span className="text-xs uppercase font-semibold text-slate-500">Đã nạp / kcal</span>
            {totalCalories > 0 && Math.abs(remainingCalories) <= 100 && (
              <button
                onClick={triggerConfetti}
                className="mt-1 text-[11px] text-amber-600 font-bold hover:scale-105 flex items-center gap-0.5"
                title="Chúc mừng! Bạn đã đạt chuẩn calo hôm nay"
              >
                <Award className="w-3 h-3" /> Đạt chuẩn!
              </button>
            )}
          </div>
        </div>

        {/* Calo breakdown numbers */}
        <div className="flex-1 w-full grid grid-cols-2 gap-3 text-center sm:text-left">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">Mục tiêu ngày</div>
              <div className="text-xl font-bold text-slate-800 mt-0.5">
                {targetCalories} <span className="text-xs font-normal text-slate-500">kcal</span>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-slate-200/60 flex items-center gap-2 text-[11px]">
              <button
                onClick={onOpenTdeeModal}
                className="text-emerald-600 hover:underline font-semibold"
              >
                Chỉnh chỉ số
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={onOpenMealPlannerModal}
                className="text-teal-600 hover:underline font-semibold flex items-center gap-0.5"
              >
                <UtensilsCrossed className="w-3 h-3" />
                <span>Gợi ý thực đơn</span>
              </button>
            </div>
          </div>

          <div
            className={`rounded-xl p-3 border flex flex-col justify-between ${
              isOver ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
            }`}
          >
            <div>
              <div className={`text-xs font-medium ${isOver ? 'text-red-600' : 'text-emerald-700'}`}>
                {isOver ? 'Vượt chỉ tiêu' : 'Còn có thể nạp'}
              </div>
              <div
                className={`text-xl font-bold mt-0.5 ${isOver ? 'text-red-700' : 'text-emerald-800'}`}
              >
                {Math.abs(remainingCalories)}{' '}
                <span className="text-xs font-normal opacity-80">kcal</span>
              </div>
            </div>

            <div className="text-[11px] opacity-75 mt-2 flex items-center gap-1">
              {isOver ? (
                <>
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>Nên vận động thêm</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Tiến độ {caloPercentage}%</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrient Bars (Protein, Carbs, Fat) */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Phân bổ đa lượng (Macronutrients)
          </span>
          <span className="text-xs text-slate-500">Đã nạp / Mục tiêu</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Protein */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-sky-800">Đạm (Protein)</span>
              <span className="font-semibold text-sky-700">{proteinPct}%</span>
            </div>
            <div className="w-full bg-sky-200/60 rounded-full h-2 mb-1.5 overflow-hidden">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${proteinPct}%` }}
              />
            </div>
            <div className="text-xs font-medium text-slate-700">
              {Math.round(totalProtein)}g{' '}
              <span className="text-[11px] text-slate-400">/ {targetProtein}g</span>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-800">Tinh bột (Carb)</span>
              <span className="font-semibold text-amber-700">{carbsPct}%</span>
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-2 mb-1.5 overflow-hidden">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${carbsPct}%` }}
              />
            </div>
            <div className="text-xs font-medium text-slate-700">
              {Math.round(totalCarbs)}g{' '}
              <span className="text-[11px] text-slate-400">/ {targetCarbs}g</span>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-rose-800">Chất béo (Fat)</span>
              <span className="font-semibold text-rose-700">{fatPct}%</span>
            </div>
            <div className="w-full bg-rose-200/60 rounded-full h-2 mb-1.5 overflow-hidden">
              <div
                className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${fatPct}%` }}
              />
            </div>
            <div className="text-xs font-medium text-slate-700">
              {Math.round(totalFat)}g{' '}
              <span className="text-[11px] text-slate-400">/ {targetFat}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
