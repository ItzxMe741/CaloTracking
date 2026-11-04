/**
 * Bộ máy đánh giá dinh dưỡng & mức độ calo món ăn (Nutri-Score & Calorie Evaluator)
 */

export function evaluateFoodByCalories(food) {
  if (!food) return null;

  const cal = Number(food.calories) || 0;
  const p = Number(food.protein) || 0;
  const c = Number(food.carbs) || 0;
  const f = Number(food.fat) || 0;

  // 1. Phân loại mức độ Calo
  let caloTier = {
    label: 'Calo Vừa phải',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    code: 'medium',
    description: 'Khẩu phần năng lượng tiêu chuẩn, phù hợp làm bữa chính cân bằng.',
  };

  if (cal < 150) {
    caloTier = {
      label: 'Calo Rất Thấp',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      code: 'very_low',
      description: 'Nhẹ calo, giàu nước/chất xơ, ăn no không lo tích mỡ, rất tốt cho giảm cân.',
    };
  } else if (cal <= 350) {
    caloTier = {
      label: 'Calo Thấp / Eat Clean',
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      dot: 'bg-teal-500',
      code: 'low',
      description: 'Mức calo lý tưởng cho bữa ăn nhẹ, bữa sáng nhẹ hoặc bữa tối siết mỡ.',
    };
  } else if (cal <= 550) {
    caloTier = {
      label: 'Calo Trung Bình',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      code: 'medium',
      description: 'Bữa chính cân bằng năng lượng tiêu chuẩn cho người đi làm và tập thể dục.',
    };
  } else if (cal <= 750) {
    caloTier = {
      label: 'Calo Cao',
      color: 'text-orange-700',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      dot: 'bg-orange-500',
      code: 'high',
      description: 'Năng lượng đậm đặc, nhiều tinh bột hoặc chất béo. Cần cân đối trong ngày.',
    };
  } else {
    caloTier = {
      label: 'Calo Rất Cao',
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
      code: 'very_high',
      description: 'Món ăn giàu năng lượng (chiên rán, mỡ hành, trà sữa). Nên ăn lượng nhỏ khi đang giảm cân.',
    };
  }

  // 2. Chấm điểm Nutri-Score (A, B, C, D)
  let score = 'B';
  let scoreColor = 'bg-emerald-500 text-white';
  let scoreText = 'Tốt & Cân Bằng';

  // Thuật toán tính điểm: Thưởng đạm, phạt mỡ cao và calo quá đặc
  const proteinRatio = p / (cal / 100 || 1); // g đạm trên 100 kcal
  const fatCaloriesRatio = (f * 9) / (cal || 1);

  if (proteinRatio >= 8 && fatCaloriesRatio <= 0.25) {
    score = 'A';
    scoreColor = 'bg-emerald-600 text-white';
    scoreText = 'Rất Tốt (Giàu Đạm, Ít Béo)';
  } else if (proteinRatio >= 5 && cal <= 500) {
    score = 'B';
    scoreColor = 'bg-teal-600 text-white';
    scoreText = 'Tốt & Cân Đối';
  } else if (cal > 650 || fatCaloriesRatio > 0.45) {
    score = 'D';
    scoreColor = 'bg-rose-600 text-white';
    scoreText = 'Đậm Calo / Nhiều Béo hoặc Đường';
  } else {
    score = 'C';
    scoreColor = 'bg-amber-500 text-white';
    scoreText = 'Trung Bình (Nên kiểm soát lượng)';
  }

  // 3. Phù hợp với mục tiêu nào
  const suitability = [];
  if (p >= 25) {
    suitability.push({ label: 'Tốt cho Tăng cơ & Gym 💪', badge: 'bg-sky-100 text-sky-800' });
  }
  if (cal <= 380 && p >= 15) {
    suitability.push({ label: 'Lý tưởng cho Giảm mỡ 🔥', badge: 'bg-emerald-100 text-emerald-800' });
  }
  if (c >= 45 && cal <= 550) {
    suitability.push({ label: 'Phù hợp nạp sức bền Cardio 🏃', badge: 'bg-amber-100 text-amber-800' });
  }
  if (c <= 15 && f >= 10) {
    suitability.push({ label: 'Phù hợp chế độ Low-Carb 🥑', badge: 'bg-teal-100 text-teal-800' });
  }
  if (cal >= 600) {
    suitability.push({ label: 'Nên ăn vừa phải khi siết cân ⚠️', badge: 'bg-rose-100 text-rose-800' });
  }

  // 4. Ưu điểm & Điểm cần lưu ý
  const pros = [];
  const cons = [];

  if (p >= 25) pros.push(`Hàm lượng đạm cao (${p}g), nuôi dưỡng cơ bắp và giúp no lâu.`);
  else if (p >= 15) pros.push(`Cung cấp lượng đạm vừa vặn (${p}g) cho bữa ăn cân bằng.`);

  if (cal <= 250) pros.push(`Calo thấp (${cal} kcal), không gây áp lực lên cân nặng.`);
  if (f <= 5) pros.push(`Rất ít chất béo (${f}g), hỗ trợ mạch máu và tim mạch khỏe mạnh.`);

  if (f >= 20) cons.push(`Khá nhiều chất béo (${f}g), nên hạn chế thêm mỡ hành, tóp mỡ hay nước béo.`);
  if (c >= 70) cons.push(`Lượng tinh bột cao (${c}g), có thể giảm bớt bánh phở hoặc cơm trắng nếu ít vận động.`);
  if (cal >= 650) cons.push(`Calo cao (${cal} kcal), nếu ăn món này thì các bữa còn lại nên chọn món thanh đạm.`);

  if (pros.length === 0) pros.push('Hương vị thơm ngon truyền thống, dễ ăn.');
  if (cons.length === 0) cons.push('Món ăn có thành phần hài hòa, không có điểm đáng lo ngại.');

  return {
    caloTier,
    score,
    scoreColor,
    scoreText,
    suitability,
    pros,
    cons,
  };
}
