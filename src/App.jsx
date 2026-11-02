import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FoodLookupTab from './components/FoodLookupTab';
import MealPlanTab from './components/MealPlanTab';
import AddFoodModal from './components/AddFoodModal';
import AiScannerModal from './components/AiScannerModal';
import TdeeModal from './components/TdeeModal';
import StatsModal from './components/StatsModal';

import { DEFAULT_FOODS } from './data/defaultFoods';
import { calculateNutritionTargets } from './utils/calculator';
import {
  getTodayDateString,
  loadProfile,
  saveProfile,
  loadCustomFoods,
  saveCustomFoods,
  loadAllDailyLogs,
  loadDayLog,
  saveDayLog,
  loadApiKey,
  saveApiKey,
  initializeSampleDataIfEmpty,
} from './utils/storage';

export default function App() {
  // Main Tab Navigation: 'lookup' (Tab 1: Tra cứu & Quét AI) | 'mealplan' (Tab 2: Thực đơn)
  const [activeTab, setActiveTab] = useState('lookup');

  const [selectedDate, setSelectedDate] = useState(() => getTodayDateString());
  const [profile, setProfileState] = useState(() => loadProfile());
  const [customFoods, setCustomFoodsState] = useState(() => loadCustomFoods());
  const [dayLog, setDayLogState] = useState(() => {
    initializeSampleDataIfEmpty();
    return loadDayLog(getTodayDateString());
  });
  const [apiKey, setApiKeyState] = useState(() => loadApiKey());

  // Modals state
  const [addFoodModal, setAddFoodModal] = useState({ isOpen: false, mealKey: 'lunch' });
  const [aiModal, setAiModal] = useState({ isOpen: false, mealKey: 'lunch' });
  const [isTdeeOpen, setIsTdeeOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  // Load day log whenever selectedDate changes
  useEffect(() => {
    const log = loadDayLog(selectedDate);
    setDayLogState(log);
  }, [selectedDate]);

  // Combined foods (default + custom)
  const allFoods = useMemo(() => {
    return [...customFoods, ...DEFAULT_FOODS];
  }, [customFoods]);

  // Calculate daily totals
  const dailyTotals = useMemo(() => {
    const allItems = [
      ...(dayLog.breakfast || []),
      ...(dayLog.lunch || []),
      ...(dayLog.dinner || []),
      ...(dayLog.snacks || []),
    ];

    const totalCalories = allItems.reduce((sum, item) => sum + (Number(item.calories) || 0), 0);
    const totalProtein = allItems.reduce((sum, item) => sum + (Number(item.protein) || 0), 0);
    const totalCarbs = allItems.reduce((sum, item) => sum + (Number(item.carbs) || 0), 0);
    const totalFat = allItems.reduce((sum, item) => sum + (Number(item.fat) || 0), 0);

    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    };
  }, [dayLog]);

  // Handlers
  const handleAddFoodToMeal = (mealKey, item) => {
    setDayLogState((prev) => {
      const updatedMeal = [...(prev[mealKey] || []), item];
      const updatedLog = { ...prev, [mealKey]: updatedMeal };
      saveDayLog(selectedDate, updatedLog);
      return updatedLog;
    });
  };

  const handleRemoveItem = (mealKey, itemId) => {
    setDayLogState((prev) => {
      const updatedMeal = (prev[mealKey] || []).filter((item) => item.id !== itemId);
      const updatedLog = { ...prev, [mealKey]: updatedMeal };
      saveDayLog(selectedDate, updatedLog);
      return updatedLog;
    });
  };

  const handleSaveCustomFood = (newFood) => {
    const updated = [newFood, ...customFoods];
    setCustomFoodsState(updated);
    saveCustomFoods(updated);
  };

  const handleSaveProfile = (newProfile) => {
    setProfileState(newProfile);
    saveProfile(newProfile);
  };

  const handleApplyMealPlanToDiary = (mealsFromPlan) => {
    const updatedLog = {
      breakfast: mealsFromPlan.breakfast || [],
      lunch: mealsFromPlan.lunch || [],
      dinner: mealsFromPlan.dinner || [],
      snacks: mealsFromPlan.snacks || [],
    };
    setDayLogState(updatedLog);
    saveDayLog(selectedDate, updatedLog);
  };

  const handleSaveApiKey = (newKey) => {
    setApiKeyState(newKey);
    saveApiKey(newKey);
  };

  const handleResetData = () => {
    localStorage.clear();
    setCustomFoodsState([]);
    const defaultP = loadProfile();
    setProfileState(defaultP);
    initializeSampleDataIfEmpty();
    const todayLog = loadDayLog(selectedDate);
    setDayLogState(todayLog);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Sticky Header with Primary Tabs */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTdeeModal={() => setIsTdeeOpen(true)}
        onOpenStatsModal={() => setIsStatsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5">
        {activeTab === 'lookup' ? (
          /* TAB 1: TRA CỨU CALO & QUÉT AI */
          <FoodLookupTab
            allFoods={allFoods}
            apiKey={apiKey}
            onSaveApiKey={handleSaveApiKey}
            onAddCustomFood={handleSaveCustomFood}
            onAddFoodToDiary={handleAddFoodToMeal}
          />
        ) : (
          /* TAB 2: THỰC ĐƠN VÓC DÁNG & NHẬT KÝ */
          <MealPlanTab
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            profile={profile}
            dayLog={dayLog}
            dailyTotals={dailyTotals}
            onOpenTdeeModal={() => setIsTdeeOpen(true)}
            onOpenAddModal={(mealKey) => setAddFoodModal({ isOpen: true, mealKey })}
            onOpenAiModal={(mealKey) => setAiModal({ isOpen: true, mealKey })}
            onRemoveItem={handleRemoveItem}
            onApplyMealPlanToDiary={handleApplyMealPlanToDiary}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 mt-10">
        <p>CaloTrack VN • Ứng dụng tra cứu Calo & Thực đơn dinh dưỡng thông minh</p>
        <p className="mt-1">Dữ liệu calo & đa lượng chuẩn theo bảng thành phần thực phẩm Việt Nam</p>
      </footer>

      {/* Global Modals */}
      <AddFoodModal
        isOpen={addFoodModal.isOpen}
        onClose={() => setAddFoodModal({ isOpen: false, mealKey: 'lunch' })}
        mealKey={addFoodModal.mealKey}
        allFoods={allFoods}
        onAddFoodToMeal={handleAddFoodToMeal}
        onSaveCustomFood={handleSaveCustomFood}
      />

      <AiScannerModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal({ isOpen: false, mealKey: 'lunch' })}
        initialMealKey={aiModal.mealKey}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        onAddFoodToMeal={handleAddFoodToMeal}
      />

      <TdeeModal
        isOpen={isTdeeOpen}
        onClose={() => setIsTdeeOpen(false)}
        currentProfile={profile}
        onSaveProfile={handleSaveProfile}
        onOpenMealPlannerModal={() => setActiveTab('mealplan')}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        allLogs={loadAllDailyLogs()}
        targetCalories={profile.targetCalories || 2000}
        onResetData={handleResetData}
      />
    </div>
  );
}
