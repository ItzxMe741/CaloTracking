import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DailySummary from './components/DailySummary';
import MealSection from './components/MealSection';
import AddFoodModal from './components/AddFoodModal';
import AiScannerModal from './components/AiScannerModal';
import TdeeModal from './components/TdeeModal';
import StatsModal from './components/StatsModal';
import MealPlannerModal from './components/MealPlannerModal';

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
  const [isMealPlannerOpen, setIsMealPlannerOpen] = useState(false);

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

  const handleUpdateProfileMode = (modeId) => {
    const updated = { ...profile, goal: modeId };
    const targets = calculateNutritionTargets(updated);
    const finalProfile = {
      ...updated,
      targetCalories: targets.targetCalories,
      targetProtein: targets.targetProtein,
      targetCarbs: targets.targetCarbs,
      targetFat: targets.targetFat,
    };
    setProfileState(finalProfile);
    saveProfile(finalProfile);
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
      {/* Sticky Header */}
      <Header
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onOpenTdeeModal={() => setIsTdeeOpen(true)}
        onOpenStatsModal={() => setIsStatsOpen(true)}
        onOpenAiModal={(meal = 'lunch') => setAiModal({ isOpen: true, mealKey: meal })}
        onOpenMealPlannerModal={() => setIsMealPlannerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 space-y-5">
        {/* Daily Calorie & Macro Target Progress */}
        <DailySummary
          totals={dailyTotals}
          targets={{
            targetCalories: profile.targetCalories || 2000,
            targetProtein: profile.targetProtein || 125,
            targetCarbs: profile.targetCarbs || 250,
            targetFat: profile.targetFat || 55,
          }}
          onOpenTdeeModal={() => setIsTdeeOpen(true)}
          onOpenMealPlannerModal={() => setIsMealPlannerOpen(true)}
        />

        {/* Meals Sections: Breakfast, Lunch, Dinner, Snacks */}
        <div className="space-y-4">
          <MealSection
            mealKey="breakfast"
            items={dayLog.breakfast || []}
            onOpenAddModal={(mealKey) => setAddFoodModal({ isOpen: true, mealKey })}
            onOpenAiModal={(mealKey) => setAiModal({ isOpen: true, mealKey })}
            onRemoveItem={handleRemoveItem}
          />

          <MealSection
            mealKey="lunch"
            items={dayLog.lunch || []}
            onOpenAddModal={(mealKey) => setAddFoodModal({ isOpen: true, mealKey })}
            onOpenAiModal={(mealKey) => setAiModal({ isOpen: true, mealKey })}
            onRemoveItem={handleRemoveItem}
          />

          <MealSection
            mealKey="dinner"
            items={dayLog.dinner || []}
            onOpenAddModal={(mealKey) => setAddFoodModal({ isOpen: true, mealKey })}
            onOpenAiModal={(mealKey) => setAiModal({ isOpen: true, mealKey })}
            onRemoveItem={handleRemoveItem}
          />

          <MealSection
            mealKey="snacks"
            items={dayLog.snacks || []}
            onOpenAddModal={(mealKey) => setAddFoodModal({ isOpen: true, mealKey })}
            onOpenAiModal={(mealKey) => setAiModal({ isOpen: true, mealKey })}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 mt-10">
        <p>CaloTrack VN • Ứng dụng theo dõi Calo & Dinh dưỡng thông minh</p>
        <p className="mt-1">Dữ liệu calo & macro chuẩn theo bảng thành phần thực phẩm Việt Nam</p>
      </footer>

      {/* Modals */}
      <MealPlannerModal
        isOpen={isMealPlannerOpen}
        onClose={() => setIsMealPlannerOpen(false)}
        currentProfile={profile}
        onApplyMealPlanToDiary={handleApplyMealPlanToDiary}
        onUpdateProfileMode={handleUpdateProfileMode}
      />

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
        onOpenMealPlannerModal={() => setIsMealPlannerOpen(true)}
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
