import React, { useMemo } from 'react';
import { X, BarChart3, Download, RotateCcw, Calendar, CheckCircle2, TrendingUp } from 'lucide-react';
import { getTodayDateString } from '../utils/storage';

export default function StatsModal({
  isOpen,
  onClose,
  allLogs,
  targetCalories,
  onResetData,
}) {
  if (!isOpen) return null;

  // Generate last 7 days stats
  const last7Days = useMemo(() => {
    const list = [];
    for (let i = 6; i >= 0; i--) {
      const dateStr = getTodayDateString(-i);
      const dayLog = allLogs[dateStr] || { breakfast: [], lunch: [], dinner: [], snacks: [] };
      const allItems = [
        ...(dayLog.breakfast || []),
        ...(dayLog.lunch || []),
        ...(dayLog.dinner || []),
        ...(dayLog.snacks || []),
      ];
      const cal = allItems.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
      const d = new Date(dateStr);
      const label = i === 0 ? 'Hôm nay' : `${d.getDate()}/${d.getMonth() + 1}`;
      list.push({
        date: dateStr,
        label,
        calories: cal,
      });
    }
    return list;
  }, [allLogs]);

  const maxCaloInView = Math.max(targetCalories * 1.2, ...last7Days.map((d) => d.calories));
  const activeDays = last7Days.filter((d) => d.calories > 0);
  const avgCalories =
    activeDays.length > 0
      ? Math.round(activeDays.reduce((sum, d) => sum + d.calories, 0) / activeDays.length)
      : 0;

  // Export data
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(allLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `calotrack_backup_${getTodayDateString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleConfirmReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử ăn uống và đưa về ban đầu?')) {
      onResetData();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Thống kê Calo 7 ngày qua
              </h2>
              <p className="text-xs text-slate-400">Theo dõi xu hướng và tính nhất quán</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
              <span className="text-xs text-slate-500 font-medium">Trung bình calo/ngày</span>
              <div className="text-xl font-black text-slate-800 mt-0.5">
                {avgCalories} <span className="text-xs font-normal text-slate-500">kcal</span>
              </div>
              <span className="text-[11px] text-slate-400">
                Tính trên {activeDays.length} ngày đã ghi
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <span className="text-xs text-emerald-700 font-medium">Mục tiêu hằng ngày</span>
              <div className="text-xl font-black text-emerald-800 mt-0.5">
                {targetCalories} <span className="text-xs font-normal opacity-70">kcal</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">
                Chênh lệch: {avgCalories ? avgCalories - targetCalories : 0} kcal
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span className="font-bold text-slate-700">Biểu đồ calo 7 ngày gần nhất</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-emerald-500 inline-block"></span>
                <span>Mục tiêu ({targetCalories} kcal)</span>
              </span>
            </div>

            <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1">
              {last7Days.map((day) => {
                const heightPct = Math.min(100, Math.round((day.calories / maxCaloInView) * 100)) || 4;
                const isOver = day.calories > targetCalories;
                return (
                  <div key={day.date} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-bold text-slate-600 truncate">
                      {day.calories > 0 ? day.calories : '-'}
                    </span>
                    <div className="w-full max-w-[28px] bg-slate-200/70 rounded-t-lg h-full flex items-end overflow-hidden">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isOver ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 mt-1 whitespace-nowrap">
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backup & Tools */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
            <button
              onClick={handleExportJson}
              className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Sao lưu dữ liệu (JSON)</span>
            </button>

            <button
              onClick={handleConfirmReset}
              className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold rounded-xl text-red-600 hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Đặt lại dữ liệu ban đầu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
