import React from 'react';
import { Sun, Sunrise, Moon, Apple, Plus, Sparkles, Trash2 } from 'lucide-react';

const MEAL_CONFIG = {
  breakfast: {
    label: 'Bữa Sáng',
    icon: Sunrise,
    color: 'from-amber-500 to-orange-400',
    badge: 'bg-amber-100 text-amber-800',
    border: 'border-amber-200/80',
    recommend: 'Khuyến nghị: 20 - 25% calo ngày',
  },
  lunch: {
    label: 'Bữa Trưa',
    icon: Sun,
    color: 'from-emerald-500 to-teal-400',
    badge: 'bg-emerald-100 text-emerald-800',
    border: 'border-emerald-200/80',
    recommend: 'Khuyến nghị: 35 - 40% calo ngày',
  },
  dinner: {
    label: 'Bữa Tối',
    icon: Moon,
    color: 'from-indigo-500 to-blue-400',
    badge: 'bg-indigo-100 text-indigo-800',
    border: 'border-indigo-200/80',
    recommend: 'Khuyến nghị: 25 - 30% calo ngày',
  },
  snacks: {
    label: 'Bữa Phụ / Ăn vặt',
    icon: Apple,
    color: 'from-rose-500 to-pink-400',
    badge: 'bg-rose-100 text-rose-800',
    border: 'border-rose-200/80',
    recommend: 'Khuyến nghị: 10 - 15% calo ngày',
  },
};

export default function MealSection({
  mealKey,
  items = [],
  onOpenAddModal,
  onOpenAiModal,
  onRemoveItem,
}) {
  const config = MEAL_CONFIG[mealKey] || MEAL_CONFIG.breakfast;
  const IconComponent = config.icon;

  const totalMealCalories = items.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
  const totalMealProtein = items.reduce((sum, item) => sum + (Number(item.protein) || 0), 0);
  const totalMealCarbs = items.reduce((sum, item) => sum + (Number(item.carbs) || 0), 0);
  const totalMealFat = items.reduce((sum, item) => sum + (Number(item.fat) || 0), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-sm">
      {/* Meal Header */}
      <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${config.color} text-white flex items-center justify-center shadow-xs`}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">{config.label}</h2>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
                {items.length} món
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">{config.recommend}</p>
          </div>
        </div>

        {/* Meal total calo badge */}
        <div className="text-right">
          <span className="text-base font-extrabold text-slate-800">{totalMealCalories}</span>
          <span className="text-xs text-slate-400 font-medium ml-1">kcal</span>
          <div className="text-[11px] text-slate-500 font-medium space-x-1">
            <span>P: {Math.round(totalMealProtein)}g</span>
            <span>•</span>
            <span>C: {Math.round(totalMealCarbs)}g</span>
            <span>•</span>
            <span>F: {Math.round(totalMealFat)}g</span>
          </div>
        </div>
      </div>

      {/* Food Items List */}
      <div className="p-3 divide-y divide-slate-100">
        {items.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-xs">
            Chưa có món nào trong {config.label.toLowerCase()}. Hãy thêm món ăn ngay!
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="py-2.5 px-2 flex items-center justify-between gap-3 group hover:bg-slate-50/80 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-2xl shrink-0">{item.emoji || '🍲'}</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>
                      {item.quantity} {item.servingUnit || 'phần'}
                    </span>
                    <span>•</span>
                    <span className="text-sky-600 font-medium">P: {item.protein}g</span>
                    <span className="text-amber-600 font-medium">C: {item.carbs}g</span>
                    <span className="text-rose-600 font-medium">F: {item.fat}g</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-800">{item.calories}</div>
                  <div className="text-[10px] text-slate-400 uppercase">kcal</div>
                </div>

                <button
                  onClick={() => onRemoveItem(mealKey, item.id)}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Xóa món này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-3 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onOpenAddModal(mealKey)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100/80 active:scale-[0.99] transition-all shadow-2xs"
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>Thêm món từ thực đơn</span>
        </button>

        <button
          onClick={() => onOpenAiModal(mealKey)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 hover:bg-amber-100/80 active:scale-[0.99] transition-all"
          title="Ước tính tự động bằng mô tả hoặc ảnh"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">Ước tính AI</span>
        </button>
      </div>
    </div>
  );
}
