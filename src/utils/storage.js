import { DEFAULT_FOODS } from '../data/defaultFoods';

const STORAGE_KEYS = {
  PROFILE: 'calotrack_user_profile',
  CUSTOM_FOODS: 'calotrack_custom_foods',
  DAILY_LOGS: 'calotrack_daily_logs',
  GEMINI_API_KEY: 'calotrack_gemini_api_key',
};

export const DEFAULT_PROFILE = {
  gender: 'male',
  age: 26,
  heightCm: 170,
  weightKg: 65,
  activityLevel: 'light',
  goal: 'maintain',
  targetCalories: 2000,
  targetProtein: 125,
  targetCarbs: 250,
  targetFat: 55,
};

export function getTodayDateString(offsetDays = 0) {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function loadCustomFoods() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomFoods(foods) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(foods));
  } catch (e) {
    console.error('Failed to save custom foods', e);
  }
}

export function loadAllDailyLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function loadDayLog(dateString) {
  const allLogs = loadAllDailyLogs();
  return (
    allLogs[dateString] || {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    }
  );
}

export function saveDayLog(dateString, dayLog) {
  try {
    const allLogs = loadAllDailyLogs();
    allLogs[dateString] = dayLog;
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(allLogs));
  } catch (e) {
    console.error('Failed to save day log', e);
  }
}

export function loadApiKey() {
  return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '';
}

export function saveApiKey(key) {
  localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
}

/**
 * Tạo dữ liệu mẫu nếu người dùng mới mở lần đầu để họ hình dung trực quan ngay
 */
export function initializeSampleDataIfEmpty() {
  const allLogs = loadAllDailyLogs();
  const today = getTodayDateString();
  
  if (Object.keys(allLogs).length === 0) {
    const sampleDay = {
      breakfast: [
        {
          id: 'sample-1',
          foodId: 'banh-mi-thit',
          name: 'Bánh mì thịt pate chả lụa',
          quantity: 1,
          servingUnit: 'ổ (cái)',
          calories: 420,
          protein: 18,
          carbs: 52,
          fat: 16,
          emoji: '🥖',
        },
        {
          id: 'sample-2',
          foodId: 'ca-phe-sua-da',
          name: 'Cà phê sữa đá Sài Gòn',
          quantity: 1,
          servingUnit: 'ly (cốc)',
          calories: 140,
          protein: 3,
          carbs: 22,
          fat: 4,
          emoji: '☕',
        }
      ],
      lunch: [
        {
          id: 'sample-3',
          foodId: 'com-tam-suon-bi-cha',
          name: 'Cơm tấm sườn bì chả',
          quantity: 1,
          servingUnit: 'dĩa',
          calories: 720,
          protein: 36,
          carbs: 88,
          fat: 25,
          emoji: '🍽️',
        }
      ],
      dinner: [
        {
          id: 'sample-4',
          foodId: 'pho-bo',
          name: 'Phở bò tái chín',
          quantity: 1,
          servingUnit: 'bát (tô)',
          calories: 480,
          protein: 28,
          carbs: 65,
          fat: 12,
          emoji: '🍜',
        }
      ],
      snacks: [
        {
          id: 'sample-5',
          foodId: 'chuoi-tieu',
          name: 'Chuối tiêu chín',
          quantity: 1,
          servingUnit: 'trái (quả vừa)',
          calories: 95,
          protein: 1.2,
          carbs: 23,
          fat: 0.3,
          emoji: '🍌',
        }
      ]
    };
    saveDayLog(today, sampleDay);
  }
}
