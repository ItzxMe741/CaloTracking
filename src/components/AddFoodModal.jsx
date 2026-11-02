import React, { useState, useMemo } from 'react';
import { X, Search, PlusCircle, Check, Utensils } from 'lucide-react';
import { CATEGORIES } from '../data/defaultFoods';

export default function AddFoodModal({
  isOpen,
  onClose,
  mealKey,
  allFoods,
  onAddFoodToMeal,
  onSaveCustomFood,
}) {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'custom'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Selected food in library
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Form for custom food
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

  const mealLabels = {
    breakfast: 'Bữa Sáng',
    lunch: 'Bữa Trưa',
    dinner: 'Bữa Tối',
    snacks: 'Bữa Phụ',
  };

  // Filtered foods
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

  if (!isOpen) return null;

  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const handleAddSelected = () => {
    if (!selectedFood) return;
    const qty = Math.max(0.1, Number(quantity) || 1);
    const itemToAdd = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
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
    onAddFoodToMeal(mealKey, itemToAdd);
    onClose();
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

    onSaveCustomFood(newFood);

    // Thêm luôn vào bữa hiện tại
    const itemToAdd = {
      id: `item-${Date.now()}`,
      foodId: newFood.id,
      name: newFood.name,
      quantity: 1,
      servingUnit: newFood.servingUnit,
      calories: newFood.calories,
      protein: newFood.protein,
      carbs: newFood.carbs,
      fat: newFood.fat,
      emoji: newFood.emoji,
    };
    onAddFoodToMeal(mealKey, itemToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Thêm món vào {mealLabels[mealKey] || 'Bữa ăn'}
            </h2>
            <p className="text-xs text-slate-400">Chọn món trong thư viện hoặc tự tạo món mới</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50/70 p-1 gap-1">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'library'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Thư viện món ăn ({allFoods.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
              activeTab === 'custom'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            + Tự tạo món mới
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'library' ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Search & Categories */}
            <div className="p-3 border-b border-slate-100 space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm món ăn: phở bò, cơm tấm, bánh mì, ức gà, trà sữa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Foods List */}
            <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 min-h-[220px]">
              {filteredFoods.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Không tìm thấy món ăn phù hợp với từ khóa "{searchTerm}".
                </div>
              ) : (
                filteredFoods.map((food) => {
                  const isSelected = selectedFood?.id === food.id;
                  return (
                    <div
                      key={food.id}
                      onClick={() => handleSelectFood(food)}
                      className={`p-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50/80 border border-emerald-300'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{food.emoji || '🍽️'}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                            <span className="truncate">{food.name}</span>
                            {food.isCustom && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-normal shrink-0">
                                Tự tạo
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>1 {food.servingUnit}</span>
                            <span>•</span>
                            <span className="text-sky-600">P: {food.protein}g</span>
                            <span className="text-amber-600">C: {food.carbs}g</span>
                            <span className="text-rose-600">F: {food.fat}g</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-800">{food.calories}</span>
                          <span className="text-[10px] text-slate-400 block -mt-1">kcal</span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-300 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Portion & Add bar */}
            {selectedFood && (
              <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-xs font-semibold text-slate-600 shrink-0">Khẩu phần:</span>
                  <div className="flex items-center gap-1">
                    {[0.5, 1, 1.5, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setQuantity(num)}
                        className={`px-2 py-1 text-xs rounded-lg font-bold transition-colors ${
                          quantity === num
                            ? 'bg-emerald-600 text-white'
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-16 px-2 py-1 text-xs text-center bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-500 truncate max-w-[80px]">
                    {selectedFood.servingUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-700">
                      {Math.round(selectedFood.calories * (Number(quantity) || 1))} kcal
                    </span>
                  </div>

                  <button
                    onClick={handleAddSelected}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all"
                  >
                    Thêm vào bữa
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Tab Custom Food Form */
          <form onSubmit={handleCreateCustom} className="p-5 overflow-y-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tên món ăn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Bún đậu mắm tôm, Sinh tố bơ..."
                value={customForm.name}
                onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục</label>
                <select
                  value={customForm.category}
                  onChange={(e) => setCustomForm({ ...customForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
                  placeholder="bát, dĩa, cái, 100g, ly..."
                  value={customForm.servingUnit}
                  onChange={(e) => setCustomForm({ ...customForm, servingUnit: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Calo (kcal) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="350"
                  value={customForm.calories}
                  onChange={(e) => setCustomForm({ ...customForm, calories: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-700 mb-1">Đạm - Protein (g)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="15"
                  value={customForm.protein}
                  onChange={(e) => setCustomForm({ ...customForm, protein: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-sky-50/50 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-700 mb-1">Tinh bột - Carb (g)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="40"
                  value={customForm.carbs}
                  onChange={(e) => setCustomForm({ ...customForm, carbs: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-rose-700 mb-1">Chất béo - Fat (g)</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="10"
                  value={customForm.fat}
                  onChange={(e) => setCustomForm({ ...customForm, fat: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Biểu tượng Emoji</label>
              <div className="flex gap-2 text-xl">
                {['🍲', '🍜', '🍚', '🥖', '🥗', '🥩', '🍗', '🥚', '🧋', '☕', '🍎'].map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setCustomForm({ ...customForm, emoji })}
                    className={`p-2 rounded-xl transition-all ${
                      customForm.emoji === emoji ? 'bg-emerald-100 ring-2 ring-emerald-500' : 'hover:bg-slate-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                Lưu & Thêm ngay
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
