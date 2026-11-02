import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Camera,
  Upload,
  Key,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { analyzeFoodWithAI } from '../services/aiService';

const SAMPLE_PROMPTS = [
  '1 bát phở bò tái chín, 2 quẩy giòn và 1 quả trứng chần',
  '1 dĩa cơm sườn nướng mỡ hành, 1 trứng ốp la và canh rong biển',
  '1 ổ bánh mì kẹp thịt xá xíu patê, 1 ly cà phê sữa đá ít đường',
  '1 bát bún chả Hà Nội nhiều thịt và 1 cốc trà đá',
  '1 đĩa salad ức gà sốt mè rang, 1 củ khoai lang luộc',
  '1 ly trà sữa trân châu hoàng kim 50% đá 70% đường',
];

export default function AiScannerModal({
  isOpen,
  onClose,
  initialMealKey = 'lunch',
  apiKey,
  onSaveApiKey,
  onAddFoodToMeal,
}) {
  const [selectedMeal, setSelectedMeal] = useState(initialMealKey);
  const [promptText, setPromptText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState('image/jpeg');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  // API Key accordion
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey || '');
  const [savedKeySuccess, setSavedKeySuccess] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn file hình ảnh (JPG, PNG, WebP...)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setImageBase64(event.target.result);
      setImageMime(file.type);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageBase64(null);
  };

  const handleSaveKey = () => {
    onSaveApiKey(tempApiKey.trim());
    setSavedKeySuccess(true);
    setTimeout(() => setSavedKeySuccess(false), 2500);
  };

  const handleStartAnalysis = async () => {
    if (!promptText.trim() && !imageBase64) {
      setErrorMsg('Vui lòng nhập mô tả món ăn hoặc tải lên ảnh chụp món ăn');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setAnalysisResult(null);

    try {
      const res = await analyzeFoodWithAI({
        promptText,
        imageBase64,
        mimeType: imageMime,
        apiKey,
      });
      setAnalysisResult(res);
    } catch (err) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi phân tích món ăn');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddResultToDiary = () => {
    if (!analysisResult) return;

    const itemToAdd = {
      id: `ai-${Date.now()}`,
      foodId: `custom-ai-${Date.now()}`,
      name: analysisResult.dishName,
      quantity: 1,
      servingUnit: analysisResult.estimatedServing || 'phần',
      calories: analysisResult.calories,
      protein: analysisResult.protein,
      carbs: analysisResult.carbs,
      fat: analysisResult.fat,
      emoji: '✨',
    };

    onAddFoodToMeal(selectedMeal, itemToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800">
                Trợ lý AI Ước tính Calo & Dinh dưỡng
              </h2>
              <p className="text-xs text-slate-500">Phân tích bằng ảnh chụp hoặc mô tả tự do</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Target Meal Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 shrink-0">Thêm vào:</span>
            <div className="grid grid-cols-4 gap-1.5 flex-1">
              {[
                { id: 'breakfast', label: 'Bữa Sáng' },
                { id: 'lunch', label: 'Bữa Trưa' },
                { id: 'dinner', label: 'Bữa Tối' },
                { id: 'snacks', label: 'Ăn Vặt' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMeal(m.id)}
                  className={`py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedMeal === m.id
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Description Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mô tả bữa ăn của bạn:
            </label>
            <textarea
              rows={3}
              placeholder="Ví dụ: 1 tô hủ tiếu Nam Vang nhiều tôm thịt, ăn kèm 1 quẩy và 1 ly sữa đậu nành không đường..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
            />

            {/* Quick sample chips */}
            <div className="mt-1.5 flex flex-wrap gap-1">
              <span className="text-[11px] text-slate-400 mr-1 self-center">Gợi ý nhanh:</span>
              {SAMPLE_PROMPTS.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptText(prompt)}
                  className="text-[11px] bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                >
                  {prompt.split(',')[0]}...
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload Section */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Hoặc tải lên ảnh món ăn (Tùy chọn):
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 flex items-center justify-center">
                <img
                  src={imagePreview}
                  alt="Ảnh món ăn đã chọn"
                  className="max-h-48 object-contain w-full"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md"
                  title="Xóa ảnh"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-amber-50/20 transition-all text-center">
                <Camera className="w-7 h-7 text-amber-500 mb-1" />
                <span className="text-xs font-bold text-slate-700">Chụp ảnh hoặc Chọn từ thư viện</span>
                <span className="text-[11px] text-slate-400 mt-0.5">Hỗ trợ JPG, PNG, WEBP</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartAnalysis}
            disabled={isLoading || (!promptText.trim() && !imageBase64)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI đang phân tích khẩu phần & dinh dưỡng...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Bắt đầu phân tích Calo ngay</span>
              </>
            )}
          </button>

          {/* Error display */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Analysis Results Card */}
          {analysisResult && (
            <div className="bg-gradient-to-b from-amber-50/60 to-white border border-amber-200 rounded-xl p-4 space-y-3 animate-in zoom-in-95">
              <div className="flex items-start justify-between gap-2 border-b border-amber-100 pb-2.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                    {analysisResult.isAiLive ? 'Gemini AI Vision Live' : 'Bộ suy luận Thông Minh'}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-1">
                    {analysisResult.dishName}
                  </h3>
                  <p className="text-xs text-slate-500">{analysisResult.estimatedServing}</p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-amber-600">
                    {analysisResult.calories}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block -mt-1">KCAL</span>
                </div>
              </div>

              {/* Macro stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-sky-50 border border-sky-100 rounded-lg p-2">
                  <span className="text-[10px] font-bold text-sky-800 block">Đạm (Protein)</span>
                  <span className="text-sm font-extrabold text-sky-900">{analysisResult.protein}g</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-2">
                  <span className="text-[10px] font-bold text-amber-800 block">Tinh bột (Carb)</span>
                  <span className="text-sm font-extrabold text-amber-900">{analysisResult.carbs}g</span>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-2">
                  <span className="text-[10px] font-bold text-rose-800 block">Chất béo (Fat)</span>
                  <span className="text-sm font-extrabold text-rose-900">{analysisResult.fat}g</span>
                </div>
              </div>

              {/* Nutrition Advice */}
              {analysisResult.advice && (
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700">💡 Lời khuyên:</span> {analysisResult.advice}
                </div>
              )}

              {/* Add Button */}
              <button
                onClick={handleAddResultToDiary}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Thêm món này vào nhật ký ({analysisResult.calories} kcal)</span>
              </button>
            </div>
          )}

          {/* Gemini API Key Setting Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
            <button
              type="button"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="w-full p-2.5 flex items-center justify-between text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-semibold">Cài đặt Gemini API Key (Không bắt buộc)</span>
                {apiKey && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                    Đã kết nối
                  </span>
                )}
              </div>
              {showKeyConfig ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showKeyConfig && (
              <div className="p-3 bg-white border-t border-slate-100 space-y-2">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Nếu bạn có Google Gemini API Key riêng, hãy nhập vào đây để ứng dụng kích hoạt mô hình AI nhận diện ảnh và thị giác trực tuyến. Nếu để trống, ứng dụng sẽ dùng bộ máy suy luận tiếng Việt thông minh có sẵn.
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleSaveKey}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Lưu Key
                  </button>
                </div>
                {savedKeySuccess && (
                  <span className="text-[11px] text-emerald-600 font-bold block">
                    ✓ Đã lưu API Key an toàn trong trình duyệt!
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
