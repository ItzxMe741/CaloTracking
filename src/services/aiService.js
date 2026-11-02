import { DEFAULT_FOODS } from '../data/defaultFoods';

/**
 * Phân tích món ăn bằng Gemini API (hỗ trợ cả văn bản & ảnh)
 * hoặc dùng Smart Local Fallback nếu chưa nhập API Key.
 */
export async function analyzeFoodWithAI({ promptText, imageBase64, mimeType, apiKey }) {
  // Nếu có API Key, thử gọi Google Gemini API
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const result = await callGeminiApi({ promptText, imageBase64, mimeType, apiKey });
      if (result) return result;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local estimator:', err);
      // Tiếp tục xuống fallback phía dưới nếu gọi lỗi
    }
  }

  // Smart Fallback Local Estimator (Hoạt động offline mượt mà không cần key)
  return smartLocalEstimate(promptText || 'Món ăn hỗn hợp');
}

async function callGeminiApi({ promptText, imageBase64, mimeType = 'image/jpeg', apiKey }) {
  const systemInstruction = `Bạn là chuyên gia dinh dưỡng và ẩm thực Việt Nam hàng đầu.
Nhiệm vụ: Phân tích món ăn từ ảnh hoặc mô tả của người dùng, ước tính khẩu phần, lượng Calo, Đạm (Protein), Tinh bột (Carbs), Chất béo (Fat).
Hãy trả về DUY NHẤT một chuỗi JSON hợp lệ (không kèm markdown \`\`\`json) với cấu trúc sau:
{
  "dishName": "Tên món ăn cụ thể",
  "estimatedServing": "Mô tả khẩu phần (vd: 1 bát tô lớn 450g)",
  "calories": 480,
  "protein": 26,
  "carbs": 62,
  "fat": 12,
  "advice": "Lời khuyên dinh dưỡng ngắn gọn (1-2 câu)",
  "breakdown": [
    { "item": "Thành phần 1", "cal": 200 },
    { "item": "Thành phần 2", "cal": 150 }
  ]
}`;

  const contents = [];
  const parts = [];

  if (imageBase64) {
    // Xóa header data:image/png;base64,... nếu có
    const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    parts.push({
      inline_data: {
        mime_type: mimeType,
        data: cleanBase64,
      },
    });
  }

  const userPrompt = promptText
    ? `Hãy phân tích món ăn sau và ước lượng dinh dưỡng: "${promptText}".`
    : `Hãy nhận diện món ăn trong bức ảnh này và ước lượng chi tiết Calo và Macro.`;

  parts.push({ text: userPrompt });
  contents.push({ role: 'user', parts });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Lỗi Gemini API HTTP ${response.status}`);
  }

  const data = await response.json();
  const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) throw new Error('Không nhận được phản hồi từ AI');

  // Làm sạch JSON nếu model vẫn bọc trong markdown
  const cleanedText = textResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanedText);

  return {
    dishName: parsed.dishName || 'Món ăn phân tích',
    estimatedServing: parsed.estimatedServing || '1 phần tiêu chuẩn',
    calories: Math.round(Number(parsed.calories) || 350),
    protein: Math.round(Number(parsed.protein) || 20),
    carbs: Math.round(Number(parsed.carbs) || 40),
    fat: Math.round(Number(parsed.fat) || 10),
    advice: parsed.advice || 'Bữa ăn cân đối các nhóm chất.',
    breakdown: parsed.breakdown || [],
    isAiLive: true,
  };
}

/**
 * Trình phân tích từ khóa thông minh tích hợp sẵn
 * Giúp người dùng trải nghiệm tức thì ngay cả khi chưa có API Key!
 */
function smartLocalEstimate(description) {
  const lower = description.toLowerCase().trim();
  
  // Tìm kiếm theo các món trong thư viện
  let matchedFood = null;
  for (const food of DEFAULT_FOODS) {
    const fName = food.name.toLowerCase();
    if (lower.includes(fName) || fName.split(' ').some(word => word.length > 2 && lower.includes(word))) {
      matchedFood = food;
      break;
    }
  }

  // Kiểm tra số lượng
  let multiplier = 1;
  const matchNum = lower.match(/(\d+(\.\d+)?)\s*(bát|tô|đĩa|dĩa|cái|ổ|ly|cốc|gói|suất|phần)/);
  if (matchNum) {
    multiplier = parseFloat(matchNum[1]);
  } else if (lower.includes('nửa') || lower.includes('1/2')) {
    multiplier = 0.5;
  } else if (lower.includes('hai') || lower.includes('2')) {
    multiplier = 2;
  } else if (lower.includes('ba') || lower.includes('3')) {
    multiplier = 3;
  }

  // Tinh chỉnh bổ sung nếu có từ khóa đặc biệt
  let extraCal = 0;
  let extraPro = 0;
  let extraCarb = 0;
  let extraFat = 0;

  if (lower.includes('trứng') || lower.includes('ốp la')) {
    extraCal += 78;
    extraPro += 6;
    extraFat += 5;
  }
  if (lower.includes('quẩy')) {
    extraCal += 120;
    extraCarb += 18;
    extraFat += 6;
  }
  if (lower.includes('nhiều thịt') || lower.includes('thêm thịt')) {
    extraCal += 120;
    extraPro += 18;
    extraFat += 5;
  }
  if (lower.includes('nước ngọt') || lower.includes('coca') || lower.includes('pepsi')) {
    extraCal += 140;
    extraCarb += 35;
  }

  if (matchedFood) {
    const totalCal = Math.round(matchedFood.calories * multiplier + extraCal);
    const totalPro = Math.round(matchedFood.protein * multiplier + extraPro);
    const totalCarb = Math.round(matchedFood.carbs * multiplier + extraCarb);
    const totalFat = Math.round(matchedFood.fat * multiplier + extraFat);

    return {
      dishName: matchedFood.name + (multiplier !== 1 ? ` (x${multiplier})` : ''),
      estimatedServing: `${multiplier} ${matchedFood.servingUnit}`,
      calories: totalCal,
      protein: totalPro,
      carbs: totalCarb,
      fat: totalFat,
      advice: `Món ăn này cung cấp ${totalCal} kcal. ${totalPro > 25 ? 'Lượng đạm rất dồi dào, tốt cho cơ bắp.' : 'Nên bổ sung thêm rau xanh để cân bằng vi chất.'}`,
      breakdown: [
        { item: matchedFood.name, cal: Math.round(matchedFood.calories * multiplier) },
        ...(extraCal > 0 ? [{ item: 'Phần gọi thêm / đồ uống kèm', cal: extraCal }] : []),
      ],
      isAiLive: false,
    };
  }

  // Trường hợp không tìm thấy món chính xác: ước tính dựa trên đặc tính chung
  return {
    dishName: description.slice(0, 40) || 'Bữa ăn tùy chỉnh',
    estimatedServing: '1 phần ăn tiêu chuẩn (~300g)',
    calories: Math.round(450 * multiplier + extraCal),
    protein: Math.round(22 * multiplier + extraPro),
    carbs: Math.round(55 * multiplier + extraCarb),
    fat: Math.round(14 * multiplier + extraFat),
    advice: 'Ước lượng theo khẩu phần bữa ăn thông thường. Bạn có thể tự chỉnh sửa lại các chỉ số cho chính xác hơn trước khi lưu.',
    breakdown: [
      { item: 'Tinh bột & Đạm chính', cal: 320 },
      { item: 'Gia vị & Dầu mỡ chế biến', cal: 130 },
    ],
    isAiLive: false,
  };
}
