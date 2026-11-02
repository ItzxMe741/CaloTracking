import React from 'react';
import {
  Flame,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Target,
  BarChart3,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { getTodayDateString } from '../utils/storage';

export default function Header({
  selectedDate,
  onDateChange,
  onOpenTdeeModal,
  onOpenStatsModal,
  onOpenAiModal,
  onOpenMealPlannerModal,
}) {
  const todayStr = getTodayDateString();
  const isToday = selectedDate === todayStr;

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    const dateStr = d.toISOString().split('T')[0];
    onDateChange(dateStr);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    const dateStr = d.toISOString().split('T')[0];
    onDateChange(dateStr);
  };

  const formatDisplayDate = (dateStr) => {
    if (dateStr === todayStr) return 'Hôm nay';
    const d = new Date(dateStr);
    const today = new Date(todayStr);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Hôm qua';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const dayOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][d.getDay()];
    return `${dayOfWeek}, ${day}/${month}/${year}`;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & App Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent leading-none">
                CaloTrack VN
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Dinh dưỡng & Thực đơn vóc dáng</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Meal Planner Button */}
            <button
              onClick={onOpenMealPlannerModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs hover:from-emerald-700 hover:to-teal-700 active:scale-95 transition-all"
              title="Gợi ý thực đơn mẫu chuẩn theo chiều cao, cân nặng và chế độ tập luyện"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Thực đơn theo dáng</span>
              <span className="sm:hidden">Thực đơn</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={() => onOpenAiModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all"
              title="Quét calo bằng AI hoặc mô tả món"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Trợ lý AI</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Stats */}
            <button
              onClick={onOpenStatsModal}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
              title="Xem thống kê 7 ngày"
            >
              <BarChart3 className="w-5 h-5" />
            </button>

            {/* TDEE / Profile */}
            <button
              onClick={onOpenTdeeModal}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
              title="Chỉ số BMI, TDEE & Mục tiêu calo"
            >
              <Target className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Date Navigator Bar */}
        <div className="mt-3 flex items-center justify-between bg-slate-100/80 rounded-xl p-1 text-slate-700">
          <button
            onClick={handlePrevDay}
            className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-600"
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
              className="bg-transparent font-medium text-sm text-slate-800 cursor-pointer focus:outline-none"
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
            className="p-1.5 hover:bg-white rounded-lg transition-colors text-slate-600"
            title="Ngày tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
