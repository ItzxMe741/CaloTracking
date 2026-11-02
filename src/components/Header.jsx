import React from 'react';
import {
  Flame,
  Search,
  UtensilsCrossed,
  BarChart3,
  Target,
  Sparkles,
} from 'lucide-react';

export default function Header({
  activeTab,
  onTabChange,
  onOpenTdeeModal,
  onOpenStatsModal,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-4xl mx-auto px-4 pt-3 pb-2.5 space-y-2.5">
        {/* Top brand & quick tools */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & App Name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent leading-none">
                CaloTrack VN
              </h1>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Tra cứu Calo món ăn & Thực đơn vóc dáng
              </p>
            </div>
          </div>

          {/* Quick utility buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenStatsModal}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200"
              title="Xem thống kê 7 ngày & sao lưu"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenTdeeModal}
              className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors border border-slate-200"
              title="Tính toán BMI, TDEE & Mục tiêu calo"
            >
              <Target className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRIMARY TAB NAVIGATION BAR */}
        <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => onTabChange('lookup')}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'lookup'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span>Tab 1: Tra Cứu & Quét AI</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('mealplan')}
            className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'mealplan'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
            <span>Tab 2: Thực Đơn Vóc Dáng</span>
          </button>
        </div>
      </div>
    </header>
  );
}
