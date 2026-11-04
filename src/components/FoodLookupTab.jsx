import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Camera,
  X,
  PlusCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Key,
  Loader2,
  AlertCircle,
  Plus,
  Flame,
  Scale,
  Utensils,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  Award,
  Zap,
} from 'lucide-react';
import { CATEGORIES } from '../data/defaultFoods';
import { analyzeFoodWithAI } from '../services/aiService';
import { evaluateFoodByCalories } from '../utils/foodEvaluator';

const SAMPLE_PROMPTS = [
  '1 bát phở bò tái chín, 2 quẩy giòn và 1 quả trứng chần',
  '1 dĩa cơm sườn nướng mỡ hành, 1 trứng ốp la và canh rong biển',
  '1 ổ bánh mì kẹp thịt xá xíu patê, 1 ly cà phê sữa đá ít đường',
  '1 đĩa salad ức gà sốt mè rang, 1 củ khoai lang luộc',
  '1 ly trà sữa trân châu đường đen 50% đường',
  '1 tô bún bò Huế đầy đủ giò chả nạm bò',
];

const CALORIE_FILTERS = [
  { id: 'all', label: 'Tất cả mức Calo' },
  { id: 'low', label: '🟢 Calo Thấp (< 300 kcal)' },
  { id: 'medium', label: '🟡 Calo Vừa (300 - 550 kcal)' },
  { id: 'high', label: '🔴 Calo Cao (> 550 kcal)' },
  { id: 'high_protein', label: '💪 Giàu Đạm (> 25g)' },
  { id: 'low_carb', label: '🥑 Low-Carb (< 15g Carb)' },
];

export default function FoodLookupTab({
  allFoods,
  apiKey,
  onSaveApiKey,
  onAddCustomFood,
  onAddFoodToDiary, // (mealKey, item)
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedCaloFilter, setSelectedCaloFilter] = useState('all');

  // AI Scanner state
  const [aiPrompt, setAiPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState('image/jpeg');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [targetMealForAi, setTargetMealForAi] = useState('lunch');
  const [aiAddedToast, setAiAddedToast] = useState(false);

  // Gemini Key accordion
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey || '');
  const [keySaved, setKeySaved] = useState(false);

  // Selected food for evaluation, portion calculation & quick add
  const [selectedFood, setSelectedFood] = useState(() => allFoods[0] || null);
  const [portionMultiplier, setPortionMultiplier] = useState(1);
  const [targetMealForFood, setTargetMealForFood] = useState('lunch');
  const [foodAddedToast, setFoodAddedToast] = useState(false);

  // Create custom food modal / form state
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    category: 'Món mặn gia đình',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    servingUnit: 'phần',
    emoji: '🍲',
  });

  // Filtered food list by Search + Category + Calorie Level
  const filteredFoods = useMemo(() => {
    return allFoods.filter((item) => {
      const matchName =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat =
        selectedCategory === 'Tất cả' ||
        (selectedCategory === 'Tự tạo' ? item.isCustom : item.category === selectedCategory);

      // Calorie rating filter
      let matchCalo = true;
      const cal = item.calories || 0;
      const p = item.protein || 0;
      const c = item.carbs || 0;

      if (selectedCaloFilter === 'low') matchCalo = cal < 300;
      else if (selectedCaloFilter === 'medium') matchCalo = cal >= 300 && cal <= 550;
      else if (selectedCaloFilter === 'high') matchCalo = cal > 550;
      else if (selectedCaloFilter === 'high_protein') matchCalo = p >= 25;
      else if (selectedCaloFilter === 'low_carb') matchCalo = c <= 15;

      return matchName && matchCat && matchCalo;
    });
  }, [allFoods, searchTerm, selectedCategory, selectedCaloFilter]);

  // Current food evaluation
  const evaluatedSelectedFood = useMemo(() => {
    if (!selectedFood) return null;
    const scaledFood = {
      ...selectedFood,
      calories: Math.round(selectedFood.calories * (Number(portionMultiplier) || 1)),
      protein: Math.round(selectedFood.protein * (Number(portionMultiplier) || 1) * 10) / 10,
      carbs: Math.round(selectedFood.carbs * (Number(portionMultiplier) || 1) * 10) / 10,
      fat: Math.round(selectedFood.fat * (Number(portionMultiplier) || 1) * 10) / 10,
    };
    return evaluateFoodByCalories(scaledFood);
  }, [selectedFood, portionMultiplier]);

  // Evaluation for AI result
  const evaluatedAiResult = useMemo(() => {
    if (!aiResult) return null;
    return evaluateFoodByCalories(aiResult);
  }, [aiResult]);

  // Handle Image Upload for AI
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAiError('Vui lòng chọn file hình ảnh (JPG, PNG, WebP...)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setImageBase64(event.target.result);
      setImageMime(file.type);
      setAiError('');
    };
    reader.readAsDataURL(file);
  };

  const handleStartAiAnalysis = async () => {
    if (!aiPrompt.trim() && !imageBase64) {
      setAiError('Vui lòng nhập mô tả món ăn hoặc tải ảnh món ăn lên.');
      return;
    }

    setIsAiLoading(true);
    setAiError('');
    setAiResult(null);

    try {
      const result = await analyzeFoodWithAI({
        promptText: aiPrompt,
        imageBase64,
        mimeType: imageMime,
        apiKey,
      });
      setAiResult(result);
    } catch (err) {
      setAiError(err.message || 'Có lỗi xảy ra khi phân tích món ăn');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAddAiResultToDiary = () => {
    if (!aiResult) return;
    const item = {
      id: `ai-${Date.now()}`,
      foodId: `custom-ai-${Date.now()}`,
      name: aiResult.dishName,
      quantity: 1,
      servingUnit: aiResult.estimatedServing || 'phần',
      calories: aiResult.calories,
      protein: aiResult.protein,
      carbs: aiResult.carbs,
      fat: aiResult.fat,
      emoji: '✨',
    };
    onAddFoodToDiary(targetMealForAi, item);
    setAiAddedToast(true);
    setTimeout(() => setAiAddedToast(false), 2000);
  };

  const handleAddSelectedFoodToDiary = () => {
    if (!selectedFood) return;
    const qty = Math.max(0.1, Number(portionMultiplier) || 1);
    const item = {
      id: `food-${Date.now()}`,
      foodId: selectedFood.id,
      name: selectedFood.name,
      quantity: qty,
      servingUnit: selectedFood.servingUnit || 'phần',
      calories: Math.round(selectedFood.calories * qty),
      protein: Math.round(selectedFood.protein * qty * 10) / 10,
      carbs: Math.round(selectedFood.carbs * qty * 10) / 10,
      fat: Math.round(selectedFood.fat * qty * 10) / 10,
      emoji: selectedFood.emoji || '🍲',
    };
    onAddFoodToDiary(targetMealForFood, item);
    setFoodAddedToast(true);
    setTimeout(() => setFoodAddedToast(false), 2000);
  };

  const handleSaveApiKey = () => {
    onSaveApiKey(tempKey.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleCreateCustom = (e) => {
    e.preventDefault();
    if (!customForm.name.trim() || !customForm.calories) return;

    const newFood = {
      id: `custom-${Date.now()}`,
      name: customForm.name.trim(),
      category: customForm.category,
      calories: Number(customForm.calories) || 0,
      protein: Number(customForm.protein) || 0,
      carbs: Number(customForm.carbs) || 0,
      fat: Number(customForm.fat) || 0,
      servingUnit: customForm.servingUnit || 'phần',
      servingWeight: 100,
      emoji: customForm.emoji || '🍲',
      isCustom: true,
      description: 'Món ăn tự tạo của bạn',
    };

    onAddCustomFood(newFood);
    setSelectedFood(newFood);
    setIsCreatingCustom(false);
    setCustomForm({
      name: '',
      category: 'Món mặn gia đình',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      servingUnit: 'phần',
      emoji: '🍲',
    });
  };

  return (
    <div className="space-y-6">
      {/* 🌟 HIGHLIGHT SECTION: BẢNG ĐÁNH GIÁ CHI TIẾT MÓN ĂN ĐANG CHỌN */}
      {selectedFood && evaluatedSelectedFood && (
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-400 shadow-sm space-y-4 animate-in fade-in">
          {/* Header & Nutri-Score */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/80 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedFood.emoji || '🍲'}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800">{selectedFood.name}</h3>
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-md uppercase ${evaluatedSelectedFood.scoreColor}`}
                    title={`Điểm Nutri-Score: ${evaluatedSelectedFood.score}`}
                  >
                    Điểm {evaluatedSelectedFood.score}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${evaluatedSelectedFood.caloTier.bg} ${evaluatedSelectedFood.caloTier.color} border ${evaluatedSelectedFood.caloTier.border} flex items-center gap-1`}
                  >
                    <span className={`w-2 h-2 rounded-full ${evaluatedSelectedFood.caloTier.dot}`} />
                    {evaluatedSelectedFood.caloTier.label}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({Math.round(selectedFood.calories * (Number(portionMultiplier) || 1))} kcal /{' '}
                    {portionMultiplier} {selectedFood.servingUnit})
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Calorie Number Display */}
            <div className="text-left sm:text-right bg-white sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-emerald-200">
              <span className="text-[11px] text-slate-500 font-semibold block">
                Năng Lượng Khẩu Phần
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 leading-tight">
                {Math.round(selectedFood.calories * (Number(portionMultiplier) || 1))}{' '}
                <span className="text-xs font-normal text-slate-500">kcal</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium space-x-1.5 mt-0.5">
                <span className="text-sky-700">
                  P: {Math.round(selectedFood.protein * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
                <span>•</span>
                <span className="text-amber-700">
                  C: {Math.round(selectedFood.carbs * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
                <span>•</span>
                <span className="text-rose-700">
                  F: {Math.round(selectedFood.fat * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
              </div>
            </div>
          </div>

          {/* Fitness Suitability Tags */}
          {evaluatedSelectedFood.suitability.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-700 mr-1">Đánh giá phù hợp:</span>
              {evaluatedSelectedFood.suitability.map((suit, idx) => (
                <span
                  key={idx}
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200/80 ${suit.badge}`}
                >
                  {suit.label}
                </span>
              ))}
            </div>
          )}

          {/* Pros & Cons Nutritional Evaluation Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white/90 p-3 rounded-xl border border-emerald-200 space-y-1.5">
              <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ưu điểm dinh dưỡng:</span>
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                {evaluatedSelectedFood.pros.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 p-3 rounded-xl border border-amber-200 space-y-1.5">
              <div className="font-bold text-amber-800 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Điểm cần lưu ý khi ăn:</span>
              </div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                {evaluatedSelectedFood.cons.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Portion Adjuster & Send to Tab 2 Diary */}
          <div className="pt-2 border-t border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-700">Khẩu phần:</span>
              <div className="flex items-center gap-1">
                {[0.5, 1, 1.5, 2].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPortionMultiplier(num)}
                    className={`px-2 py-0.5 text-xs rounded-lg font-bold transition-all ${
                      portionMultiplier === num
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <input
                type="number"
                step="0.1"
                min="0.1"
                value={portionMultiplier}
                onChange={(e) => setPortionMultiplier(e.target.value)}
                className="w-16 px-2 py-0.5 text-xs text-center bg-white border border-slate-200 rounded-lg font-bold"
              />
              <span className="text-xs text-slate-600">{selectedFood.servingUnit}</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={targetMealForFood}
                onChange={(e) => setTargetMealForFood(e.target.value)}
                className="px-2 py-1.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold"
              >
                <option value="breakfast">Vào Bữa Sáng</option>
                <option value="lunch">Vào Bữa Trưa</option>
                <option value="dinner">Vào Bữa Tối</option>
                <option value="snacks">Vào Bữa Phụ</option>
              </select>

              <button
                onClick={handleAddSelectedFoodToDiary}
                disabled={foodAddedToast}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
              >
                {foodAddedToast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Đã thêm vào Tab 2!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Lưu vào Nhật ký</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: AI CALORIE SCANNER (QUÉT & ĐÁNH GIÁ BẰNG AI) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Trợ Lý AI Quét & Đánh Giá Calo Món Ăn Tức Thì
              </h2>
              <p className="text-xs text-slate-500">
                Gõ tên/mô tả món ăn tự do hoặc tải ảnh chụp món ăn để AI đánh giá
              </p>
            </div>
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Text Description Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              1. Nhập mô tả món ăn bạn ăn:
            </label>
            <textarea
              rows={3}
              placeholder="Ví dụ: 1 tô phở bò nhiều thịt tái, 2 quẩy và 1 quả trứng chần..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none shadow-2xs"
            />

            <div className="flex flex-wrap gap-1 pt-0.5">
              <span className="text-[11px] text-slate-400 self-center">Gợi ý nhanh:</span>
              {SAMPLE_PROMPTS.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAiPrompt(prompt)}
                  className="text-[11px] bg-white border border-amber-200 hover:bg-amber-100/60 text-slate-700 px-2 py-0.5 rounded-lg transition-colors shadow-2xs"
                >
                  {prompt.split(',')[0]}...
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload Box */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              2. Hoặc tải ảnh chụp món ăn (Tùy chọn):
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white h-[92px] flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Ảnh món ăn"
                  className="h-full object-contain w-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setImageBase64(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-sm"
                  title="Xóa ảnh"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl p-3 h-[92px] flex flex-col items-center justify-center cursor-pointer bg-white/70 hover:bg-amber-50/40 transition-all text-center">
                <Camera className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-xs font-bold text-slate-700">Chụp ảnh hoặc Tải ảnh món ăn</span>
                <span className="text-[10px] text-slate-400">AI nhận diện thị giác</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleStartAiAnalysis}
            disabled={isAiLoading || (!aiPrompt.trim() && !imageBase64)}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích khẩu phần & tính calo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt Đầu Đánh Giá Bằng AI</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium px-2 py-1"
          >
            <Key className="w-3.5 h-3.5 text-amber-500" />
            <span>Cài đặt Gemini API Key {apiKey ? '(Đã kết nối)' : '(Tùy chọn)'}</span>
            {showKeyConfig ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Gemini Key Drawer */}
        {showKeyConfig && (
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
            <p className="text-slate-500 text-[11px]">
              Nếu có Google Gemini API Key riêng, bạn có thể nhập vào đây. Nếu không nhập, ứng dụng vẫn phân tích mượt mà bằng bộ máy suy luận tiếng Việt có sẵn.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-black"
              >
                Lưu Key
              </button>
            </div>
            {keySaved && (
              <span className="text-[11px] text-emerald-600 font-bold block">✓ Đã lưu API Key!</span>
            )}
          </div>
        )}

        {aiError && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {/* AI Result Card with Evaluation */}
        {aiResult && evaluatedAiResult && (
          <div className="bg-white border border-amber-300 rounded-xl p-4 space-y-3 shadow-sm animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {aiResult.isAiLive ? 'Gemini AI Vision' : 'Bộ Máy Suy Luận'}
                  </span>
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase ${evaluatedAiResult.scoreColor}`}
                  >
                    Điểm {evaluatedAiResult.score}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-1">{aiResult.dishName}</h3>
                <p className="text-xs text-slate-500">{aiResult.estimatedServing}</p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black text-amber-600">{aiResult.calories}</div>
                <span className="text-[10px] text-slate-400 font-bold block -mt-1">KCAL</span>
              </div>
            </div>

            {/* Macro Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-1.5">
                <span className="text-[10px] font-bold text-sky-800 block">Đạm</span>
                <span className="font-extrabold text-sky-900">{aiResult.protein}g</span>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-1.5">
                <span className="text-[10px] font-bold text-amber-800 block">Tinh bột</span>
                <span className="font-extrabold text-amber-900">{aiResult.carbs}g</span>
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-1.5">
                <span className="text-[10px] font-bold text-rose-800 block">Chất béo</span>
                <span className="font-extrabold text-rose-900">{aiResult.fat}g</span>
              </div>
            </div>

            {/* AI Nutrition Advice */}
            {aiResult.advice && (
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong>💡 Lời khuyên dinh dưỡng:</strong> {aiResult.advice}
              </div>
            )}

            {/* Quick Add */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Lưu vào:</span>
                <select
                  value={targetMealForAi}
                  onChange={(e) => setTargetMealForAi(e.target.value)}
                  className="px-2 py-1 text-xs bg-slate-100 rounded-lg font-semibold"
                >
                  <option value="breakfast">Bữa Sáng</option>
                  <option value="lunch">Bữa Trưa</option>
                  <option value="dinner">Bữa Tối</option>
                  <option value="snacks">Bữa Phụ</option>
                </select>
              </div>

              <button
                onClick={handleAddAiResultToDiary}
                disabled={aiAddedToast}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
              >
                {aiAddedToast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Đã lưu vào Tab 2!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Thêm vào Nhật ký</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: THƯ VIỆN MÓN ĂN & BỘ LỌC ĐÁNH GIÁ THEO CALO */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              <span>Tra Cứu & Đánh Giá Mức Calo Món Ăn</span>
            </h2>
            <p className="text-xs text-slate-500">
              Bấm vào từng món để xem đánh giá chi tiết, điểm Nutri-Score và độ phù hợp vóc dáng
            </p>
          </div>

          <button
            onClick={() => setIsCreatingCustom(true)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Tạo món của bạn</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm: phở bò, cơm tấm, bún chả, ức gà, bánh mì, trà sữa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* BỘ LỌC ĐÁNH GIÁ THEO MỨC ĐỘ CALO */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Lọc theo Đánh Giá Calo & Dinh Dưỡng:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CALORIE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedCaloFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-bold transition-all ${
                  selectedCaloFilter === f.id
                    ? 'bg-slate-800 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
            Danh mục món ăn:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Catalog Grid with Calorie Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[480px] overflow-y-auto pr-1">
          {filteredFoods.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-slate-400 text-xs">
              Không tìm thấy món ăn nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            filteredFoods.map((food) => {
              const isSelected = selectedFood?.id === food.id;
              const evaluation = evaluateFoodByCalories(food);

              return (
                <div
                  key={food.id}
                  onClick={() => {
                    setSelectedFood(food);
                    setPortionMultiplier(1);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/90'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl shrink-0">{food.emoji || '🍲'}</span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-slate-800 truncate flex items-center gap-1.5">
                        <span>{food.name}</span>
                        {food.isCustom && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded font-normal shrink-0">
                            Tự tạo
                          </span>
                        )}
                      </div>

                      {/* Calorie Tier & Nutri-Score Badges */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`text-[10px] font-black px-1.5 py-0.2 rounded uppercase ${evaluation.scoreColor}`}
                        >
                          {evaluation.score}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${evaluation.caloTier.bg} ${evaluation.caloTier.color}`}
                        >
                          {evaluation.caloTier.label}
                        </span>
                        <span className="text-[10px] text-slate-400">1 {food.servingUnit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-base font-extrabold text-emerald-700">{food.calories}</div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block -mt-1">
                      kcal
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CREATE CUSTOM FOOD MODAL */}
      {isCreatingCustom && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800">Tạo món ăn mới của bạn</h3>
              <button
                onClick={() => setIsCreatingCustom(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên món ăn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bún đậu mắm tôm, Cháo yến mạch..."
                  value={customForm.name}
                  onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục</label>
                  <select
                    value={customForm.category}
                    onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {CATEGORIES.filter((c) => c !== 'Tất cả' && c !== 'Tự tạo').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Đơn vị khẩu phần</label>
                  <input
                    type="text"
                    placeholder="bát, dĩa, cái, 100g..."
                    value={customForm.servingUnit}
                    onChange={(e) => setCustomForm({ ...customForm, servingUnit: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Calo (kcal) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="350"
                    value={customForm.calories}
                    onChange={(e) => setCustomForm({ ...customForm, calories: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-sky-700 mb-1">Đạm (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="20"
                    value={customForm.protein}
                    onChange={(e) => setCustomForm({ ...customForm, protein: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-sky-50/50 border border-sky-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-amber-700 mb-1">Carb (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="40"
                    value={customForm.carbs}
                    onChange={(e) => setCustomForm({ ...customForm, carbs: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-amber-50/50 border border-amber-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-rose-700 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="10"
                    value={customForm.fat}
                    onChange={(e) => setCustomForm({ ...customForm, fat: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-rose-50/50 border border-rose-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCustom(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  Lưu vào Thư viện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
