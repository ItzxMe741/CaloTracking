/**
 * Tính toán BMR, TDEE, BMI và các Chế độ dinh dưỡng / Vóc dáng chuyên sâu
 */

export const ACTIVITY_LEVELS = [
  { id: 'sedentary', label: 'Ít vận động (làm việc văn phòng, ít thể dục)', factor: 1.2 },
  { id: 'light', label: 'Vận động nhẹ (tập thể dục / cardio nhẹ 1-3 ngày/tuần)', factor: 1.375 },
  { id: 'moderate', label: 'Vận động vừa (tập gym / cardio 3-5 ngày/tuần)', factor: 1.55 },
  { id: 'veryActive', label: 'Vận động nhiều (tập thể thao 6-7 ngày/tuần)', factor: 1.725 },
  { id: 'extraActive', label: 'Vận động cực nặng (vận động viên, tập 2 buổi/ngày)', factor: 1.9 },
];

export const DIET_MODES = [
  {
    id: 'cardio_recomp',
    name: 'Cardio Tăng Cơ & Thể Lực (Hybrid Athlete)',
    shortName: 'Cardio Tăng Cơ',
    emoji: '🏃‍♂️⚡',
    badge: 'Vừa bền vừa cơ',
    description: 'Vừa siết mỡ tăng sức bền tim mạch, vừa xây dựng khối cơ nạc (Body Recomposition). Đạm cực cao (35%) chống teo cơ.',
    caloAdjustment: 100, // Thặng dư nhẹ hoặc chuẩn năng lượng
    macroSplit: { protein: 0.35, carbs: 0.45, fat: 0.20 }, // 35% P, 45% C, 20% F
    tips: 'Tập kháng lực (tạ/calisthenics) trước, cardio sau (hoặc tập khác buổi). Bổ sung ngay chuối + protein sau tập 30 phút.',
  },
  {
    id: 'cardio_toning',
    name: 'Cardio đẹp dáng & Săn chắc',
    shortName: 'Cardio đẹp dáng',
    emoji: '🏃‍♀️',
    badge: 'Phổ biến nhất',
    description: 'Thâm hụt nhẹ kết hợp carb sạch giúp eo thon, vòng 3 săn chắc, tràn đầy năng lượng tập luyện.',
    caloAdjustment: -250,
    macroSplit: { protein: 0.30, carbs: 0.45, fat: 0.25 }, // 30% P, 45% C, 25% F
    tips: 'Nên uống 2.5 - 3 lít nước mỗi ngày và bổ sung carb chậm trước buổi tập cardio 45 phút.',
  },
  {
    id: 'lose_fat',
    name: 'Giảm mỡ cấp tốc / Siết eo',
    shortName: 'Giảm cân siết mỡ',
    emoji: '🔥',
    badge: 'Đốt mỡ nhanh',
    description: 'Thâm hụt 500 kcal với lượng protein cao bảo tồn cơ bắp, ép mỡ thừa vùng bụng và đùi.',
    caloAdjustment: -500,
    macroSplit: { protein: 0.35, carbs: 0.35, fat: 0.30 }, // 35% P, 35% C, 30% F
    tips: 'Hạn chế tối đa đường tinh luyện, nước ngọt có ga và đồ chiên ngập dầu.',
  },
  {
    id: 'lean_muscle',
    name: 'Tăng cơ nạc / Gym & Thể hình',
    shortName: 'Tăng cơ nạc',
    emoji: '💪',
    badge: 'Xây dựng cơ',
    description: 'Thặng dư calo thông minh kết hợp protein cao để kích thích tổng hợp sợi cơ mà không tích tụ mỡ.',
    caloAdjustment: 350,
    macroSplit: { protein: 0.30, carbs: 0.50, fat: 0.20 }, // 30% P, 50% C, 20% F
    tips: 'Chia đều lượng đạm vào cả 4 bữa ăn để cơ bắp liên tục được cung cấp axit amin phục hồi.',
  },
  {
    id: 'eat_clean',
    name: 'Eat Clean thuần Việt / Lành mạnh',
    shortName: 'Eat Clean Việt',
    emoji: '🥗',
    badge: 'Thanh lọc cơ thể',
    description: 'Duy trì vóc dáng lý tưởng với thực phẩm nguyên bản, giảm gia vị mặn ngọt, da dẻ mịn màng.',
    caloAdjustment: 0,
    macroSplit: { protein: 0.25, carbs: 0.50, fat: 0.25 }, // 25% P, 50% C, 25% F
    tips: 'Ưu tiên các món luộc, hấp, áp chảo và ăn nhiều loại rau củ đa sắc màu.',
  },
  {
    id: 'low_carb',
    name: 'Low-Carb / Siết mỡ vòng 2',
    shortName: 'Low-Carb',
    emoji: '🥑',
    badge: 'Siết vòng eo',
    description: 'Cắt giảm tinh bột nhanh, tập trung đạm sạch và chất béo tốt (bơ, các loại hạt, trứng).',
    caloAdjustment: -350,
    macroSplit: { protein: 0.30, carbs: 0.20, fat: 0.50 }, // 30% P, 20% C, 50% F
    tips: 'Tránh ăn tinh bột nhanh như cơm trắng, bánh ngọt sau 19h tối.',
  },
  {
    id: 'vegetarian',
    name: 'Ăn chay thực dưỡng / Giữ dáng',
    shortName: 'Ăn chay Healthy',
    emoji: '🌱',
    badge: 'Thuần thực vật',
    description: 'Nguồn đạm từ đậu phụ, nấm, các loại hạt ngũ cốc, dồi dào chất xơ giúp hệ tiêu hóa nhẹ nhàng.',
    caloAdjustment: -200,
    macroSplit: { protein: 0.22, carbs: 0.53, fat: 0.25 }, // 22% P, 53% C, 25% F
    tips: 'Kết hợp đa dạng các loại đậu và hạt để cơ thể không thiếu hụt các axit amin thiết yếu.',
  },
];

// Khả năng tương thích ngược
export const GOALS = DIET_MODES.map(d => ({
  id: d.id,
  label: d.name,
  caloAdjustment: d.caloAdjustment,
}));

export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm) return { bmi: 21, category: 'Bình thường', color: 'text-emerald-600', idealRange: '53 - 65 kg' };
  const hM = heightCm / 100;
  const bmi = Math.round((weightKg / (hM * hM)) * 10) / 10;
  
  let category = 'Bình thường';
  let color = 'text-emerald-600';
  if (bmi < 18.5) {
    category = 'Hơi gầy';
    color = 'text-amber-600';
  } else if (bmi < 23) { // Chuẩn WHO dành cho người châu Á
    category = 'Cân đối lý tưởng';
    color = 'text-emerald-600';
  } else if (bmi < 25) {
    category = 'Thừa cân nhẹ';
    color = 'text-amber-600';
  } else {
    category = 'Tiền béo phì / Cần giảm mỡ';
    color = 'text-rose-600';
  }

  const minIdeal = Math.round(18.5 * hM * hM);
  const maxIdeal = Math.round(22.9 * hM * hM);

  return {
    bmi,
    category,
    color,
    idealRange: `${minIdeal} - ${maxIdeal} kg`,
  };
}

export function calculateBMR({ gender, weightKg, heightCm, age }) {
  if (!weightKg || !heightCm || !age) return 1500;
  // Công thức Mifflin-St Jeor
  if (gender === 'female') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
}

export function calculateTDEE(profile) {
  const bmr = calculateBMR(profile);
  const activity = ACTIVITY_LEVELS.find(a => a.id === profile.activityLevel) || ACTIVITY_LEVELS[1];
  return Math.round(bmr * activity.factor);
}

export function calculateNutritionTargets(profile) {
  const tdee = calculateTDEE(profile);
  const mode = DIET_MODES.find(m => m.id === profile.goal) || DIET_MODES[0];
  
  const targetCalories = Math.max(1200, tdee + mode.caloAdjustment);

  const { protein, carbs, fat } = mode.macroSplit;

  const proteinGrams = Math.round((targetCalories * protein) / 4);
  const carbsGrams = Math.round((targetCalories * carbs) / 4);
  const fatGrams = Math.round((targetCalories * fat) / 9);

  return {
    bmr: calculateBMR(profile),
    tdee,
    targetCalories,
    targetProtein: proteinGrams,
    targetCarbs: carbsGrams,
    targetFat: fatGrams,
    currentMode: mode,
  };
}
