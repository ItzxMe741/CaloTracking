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
} from 'lucide-react';
import { CATEGORIES } from '../data/defaultFoods';
import { analyzeFoodWithAI } from '../services/aiService';

const SAMPLE_PROMPTS = [
  '1 bát phở bò tái chín, 2 quẩy giòn và 1 quả trứng chần',
  '1 dĩa cơm sườn nướng mỡ hành, 1 trứng ốp la và canh rong biển',
  '1 ổ bánh mì kẹp thịt xá xíu patê, 1 ly cà phê sữa đá ít đường',
  '1 đĩa salad ức gà sốt mè rang, 1 củ khoai lang luộc',
  '1 ly trà sữa trân châu đường đen 50% đường',
  '1 tô bún bò Huế đầy đủ giò chả nạm bò',
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

  // Selected food for portion calculation & quick add
  const [selectedFood, setSelectedFood] = useState(null);
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

  // Filtered food list
  const filteredFoods = useMemo(() => {
    return allFoods.filter((item) => {
      const matchName =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat =
        selectedCategory === 'Tất cả' ||
        (selectedCategory === 'Tự tạo' ? item.isCustom : item.category === selectedCategory);
      return matchName && matchCat;
    });
  }, [allFoods, searchTerm, selectedCategory]);

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
      {/* SECTION 1: AI CALORIE SCANNER (QUÉT CALO BẰNG AI) */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white rounded-2xl p-4 sm:p-6 border border-amber-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Trợ Lý AI Quét & Ước Tính Calo Món Ăn
              </h2>
              <p className="text-xs text-slate-500">
                Nhập tên/mô tả món ăn tự do hoặc chụp ảnh món ăn để AI phân tích ngay
              </p>
            </div>
          </div>
        </div>

        {/* AI Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text input & prompts */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              1. Mô tả món ăn bạn ăn:
            </label>
            <textarea
              rows={3}
              placeholder="Ví dụ: 1 tô phở bò nhiều thịt tái, 2 quẩy và 1 quả trứng chần..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none shadow-2xs"
            />

            {/* Quick Sample Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 self-center">Gợi ý thử:</span>
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
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              2. Hoặc tải ảnh món ăn (Tùy chọn):
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white h-[92px] sm:h-[105px] flex items-center justify-center">
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
              <label className="border-2 border-dashed border-amber-300/80 hover:border-amber-500 rounded-xl p-3 h-[92px] sm:h-[105px] flex flex-col items-center justify-center cursor-pointer bg-white/70 hover:bg-amber-50/40 transition-all text-center">
                <Camera className="w-6 h-6 text-amber-500 mb-1" />
                <span className="text-xs font-bold text-slate-700">Chụp ảnh hoặc Tải ảnh món ăn</span>
                <span className="text-[10px] text-slate-400">Nhận diện bằng thị giác AI</span>
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

        {/* AI Action Button & Error */}
        <div className="mt-3 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleStartAiAnalysis}
            disabled={isAiLoading || (!aiPrompt.trim() && !imageBase64)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAiLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích khẩu phần & tính calo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bấm Quét & Ước Tính Calo Ngay</span>
              </>
            )}
          </button>

          {/* Gemini API Key Toggle */}
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

        {/* Key Configuration Box */}
        {showKeyConfig && (
          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Nếu nhập API Key của Google Gemini, ứng dụng sẽ gọi mô hình Gemini Vision trực tiếp. Nếu để trống, ứng dụng sẽ tự động dùng <strong>bộ suy luận tiếng Việt thông minh tích hợp sẵn</strong> (không cần key vẫn dùng tốt).
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Nhập API Key: AIzaSy..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg font-semibold hover:bg-black transition-colors"
              >
                Lưu Key
              </button>
            </div>
            {keySaved && (
              <span className="text-[11px] text-emerald-600 font-bold block">
                ✓ Đã lưu API Key an toàn!
              </span>
            )}
          </div>
        )}

        {aiError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {/* AI Result Card */}
        {aiResult && (
          <div className="mt-4 bg-white border border-amber-300 rounded-xl p-4 space-y-3 shadow-sm animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {aiResult.isAiLive ? 'Kết Quả Gemini AI' : 'Bộ Máy Suy Luận Dinh Dưỡng'}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mt-1">{aiResult.dishName}</h3>
                <p className="text-xs text-slate-500">{aiResult.estimatedServing}</p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-amber-600">{aiResult.calories}</div>
                <span className="text-[10px] text-slate-400 font-bold block -mt-1">KCAL</span>
              </div>
            </div>

            {/* Macro breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-2">
                <span className="text-[10px] font-bold text-sky-800 block">Đạm (Protein)</span>
                <span className="text-base font-extrabold text-sky-900">{aiResult.protein}g</span>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                <span className="text-[10px] font-bold text-amber-800 block">Tinh bột (Carb)</span>
                <span className="text-base font-extrabold text-amber-900">{aiResult.carbs}g</span>
              </div>
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-2">
                <span className="text-[10px] font-bold text-rose-800 block">Chất béo (Fat)</span>
                <span className="text-base font-extrabold text-rose-900">{aiResult.fat}g</span>
              </div>
            </div>

            {aiResult.advice && (
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong>💡 Lời khuyên:</strong> {aiResult.advice}
              </div>
            )}

            {/* Add to Diary Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-100">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-500 font-medium">Lưu vào bữa:</span>
                <select
                  value={targetMealForAi}
                  onChange={(e) => setTargetMealForAi(e.target.value)}
                  className="px-2 py-1 text-xs bg-slate-100 border border-slate-200 rounded-lg font-semibold"
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
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                {aiAddedToast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Đã thêm vào thực đơn Tab 2!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Thêm món này vào Nhật ký thực đơn</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: FOOD CALORIE SEARCH & LOOKUP LIBRARY */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-600" />
              <span>Tra Cứu Calo Món Ăn Việt Nam</span>
            </h2>
            <p className="text-xs text-slate-500">
              Tìm kiếm để xem ngay 1 phần chứa bao nhiêu calo, đạm, tinh bột, chất béo
            </p>
          </div>

          <button
            onClick={() => setIsCreatingCustom(true)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Tạo món của bạn</span>
          </button>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Gõ tên món: phở bò, cơm tấm, bánh mì, ức gà, trà sữa, chuối..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Catalog List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
          {filteredFoods.length === 0 ? (
            <div className="col-span-2 py-10 text-center text-slate-400 text-xs">
              Không tìm thấy món ăn nào với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredFoods.map((food) => {
              const isSelected = selectedFood?.id === food.id;
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
                      : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
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
                      <div className="text-[11px] text-slate-400 mt-0.5 space-x-1.5">
                        <span>1 {food.servingUnit}</span>
                        <span>•</span>
                        <span className="text-sky-600 font-medium">P: {food.protein}g</span>
                        <span className="text-amber-600 font-medium">C: {food.carbs}g</span>
                        <span className="text-rose-600 font-medium">F: {food.fat}g</span>
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

        {/* Selected Food Detail Card & Portion Calculator */}
        {selectedFood && (
          <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50/60 rounded-xl border border-emerald-300 space-y-3 animate-in slide-in-from-bottom-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{selectedFood.emoji || '🍽️'}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{selectedFood.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedFood.description || `Định lượng chuẩn: 1 ${selectedFood.servingUnit}`}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Tổng calo khẩu phần:</span>
                <div className="text-2xl font-black text-emerald-700">
                  {Math.round(selectedFood.calories * (Number(portionMultiplier) || 1))}{' '}
                  <span className="text-xs font-normal text-slate-500">kcal</span>
                </div>
              </div>
            </div>

            {/* Portion Adjuster */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Điều chỉnh khẩu phần:</span>
                <div className="flex items-center gap-1">
                  {[0.5, 1, 1.5, 2].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPortionMultiplier(num)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                        portionMultiplier === num
                          ? 'bg-emerald-600 text-white shadow-2xs'
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
                  className="w-16 px-2 py-1 text-xs text-center bg-white border border-slate-200 rounded-lg font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600 font-medium">{selectedFood.servingUnit}</span>
              </div>

              {/* Dynamic Macro recalculation */}
              <div className="flex items-center gap-3 text-xs">
                <span className="text-sky-700 font-semibold">
                  P: {Math.round(selectedFood.protein * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
                <span className="text-amber-700 font-semibold">
                  C: {Math.round(selectedFood.carbs * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
                <span className="text-rose-700 font-semibold">
                  F: {Math.round(selectedFood.fat * (Number(portionMultiplier) || 1) * 10) / 10}g
                </span>
              </div>
            </div>

            {/* Quick Add to Meal Diary (Tab 2) */}
            <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 font-medium">Thêm vào thực đơn Tab 2:</span>
                <select
                  value={targetMealForFood}
                  onChange={(e) => setTargetMealForFood(e.target.value)}
                  className="px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-semibold"
                >
                  <option value="breakfast">Bữa Sáng</option>
                  <option value="lunch">Bữa Trưa</option>
                  <option value="dinner">Bữa Tối</option>
                  <option value="snacks">Bữa Phụ</option>
                </select>
              </div>

              <button
                onClick={handleAddSelectedFoodToDiary}
                disabled={foodAddedToast}
                className="w-full sm:w-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                {foodAddedToast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Đã thêm vào thực đơn!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Thêm món này vào Nhật ký</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
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
