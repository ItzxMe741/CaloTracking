/**
 * Cơ sở dữ liệu Thực đơn mẫu chuẩn ẩm thực Việt Nam theo 6 Chế độ vóc dáng & 7 ngày trong tuần
 */

export const WEEK_DAYS = [
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
  'Chủ Nhật',
];

// Mẫu thực đơn cơ bản theo từng chế độ (base target chuẩn ~ 1800 - 1900 kcal)
export const BASE_MEAL_PLANS = {
  // 0. CARDIO TĂNG CƠ & THỂ LỰC (HYBRID ATHLETE / RECOMPOSITION)
  cardio_recomp: [
    {
      day: 'Thứ 2',
      title: 'Tập tạ thân trên + Chạy bộ biến tốc (HIIT) & Nạp đạm cao',
      breakfast: [
        { name: 'Phở bò tái nạc gấp đôi thịt bò', portion: '1 tô lớn (150g bò)', cal: 520, p: 42, c: 62, f: 11, emoji: '🍜' },
        { name: 'Nước dừa tươi nguyên trái', portion: '1 trái', cal: 60, p: 1.5, c: 13, f: 0.5, emoji: '🥥' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt huyết rồng', portion: '1.5 chén (200g)', cal: 260, p: 6, c: 55, f: 1.5, emoji: '🍚' },
        { name: 'Ức gà nướng thảo mộc mật ong', portion: '180g', cal: 280, p: 46, c: 4, f: 8, emoji: '🍗' },
        { name: 'Canh rau ngót nấu tôm thịt băm', portion: '1 tô lớn', cal: 110, p: 14, c: 7, f: 3, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Khoai lang mật nướng', portion: '1 củ to (180g)', cal: 160, p: 2.5, c: 38, f: 0.2, emoji: '🍠' },
        { name: 'Thịt bò nạc xào măng tây tỏi', portion: '160g', cal: 310, p: 38, c: 5, f: 14, emoji: '🥩' },
        { name: 'Salad xà lách cà chua bi sốt mè rang', portion: '1 đĩa', cal: 85, p: 2, c: 8, f: 5, emoji: '🥗' },
      ],
      snacks: [
        { name: 'Sữa chua Hy Lạp + 1 quả chuối + hạt chia', portion: '1 hũ to + 1 quả', cal: 220, p: 14, c: 34, f: 3.5, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Tập chân (Leg Day) & Chạy bền cự ly dài (Zone 2 Cardio)',
      breakfast: [
        { name: 'Yến mạch nấu sữa tươi + 2 trứng gà luộc', portion: '1 tô + 2 quả', cal: 420, p: 25, c: 50, f: 14, emoji: '🥣' },
        { name: '1 quả chuối tiêu nạp glycogen', portion: '1 quả', cal: 95, p: 1.2, c: 23, f: 0.3, emoji: '🍌' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '1.5 chén', cal: 300, p: 6, c: 66, f: 0.8, emoji: '🍚' },
        { name: 'Cá hồi áp chảo sốt bơ chanh', portion: '170g', cal: 340, p: 34, c: 2, f: 21, emoji: '🐟' },
        { name: 'Bông cải xanh luộc chấm kho quẹt nhẹ', portion: '1 đĩa lớn', cal: 75, p: 5, c: 11, f: 1, emoji: '🥦' },
      ],
      dinner: [
        { name: 'Bún tươi ức gà xé nạc lá chanh', portion: '1 tô', cal: 410, p: 38, c: 52, f: 6, emoji: '🍜' },
        { name: 'Rau thơm, giá đỗ, xà lách ăn kèm', portion: '1 đĩa', cal: 35, p: 2, c: 6, f: 0, emoji: '🥬' },
      ],
      snacks: [
        { name: '1 lát bánh mì đen + bơ đậu phộng mộc', portion: '1 lát + 15g bơ', cal: 170, p: 7, c: 18, f: 8, emoji: '🥪' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Nhảy dây tốc độ / Chèo thuyền & Phục hồi cơ',
      breakfast: [
        { name: 'Bánh mì 2 trứng ốp la + 100g chả lụa nạc', portion: '1 ổ đầy đặn', cal: 460, p: 28, c: 45, f: 18, emoji: '🥖' },
        { name: 'Cà phê đen đá không đường', portion: '1 ly', cal: 5, p: 0, c: 1, f: 0, emoji: '☕' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt', portion: '1.5 chén', cal: 260, p: 6, c: 55, f: 1.5, emoji: '🍚' },
        { name: 'Thịt heo thăn nạc rim tiêu tỏi', portion: '170g', cal: 290, p: 44, c: 3, f: 11, emoji: '🥩' },
        { name: 'Canh chua cá lóc rau muống giá đỗ', portion: '1 tô', cal: 140, p: 16, c: 12, f: 3.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Gỏi gà xé phay hoa chuối đậu phộng', portion: '1 đĩa lớn (160g gà)', cal: 360, p: 42, c: 18, f: 13, emoji: '🥗' },
        { name: '1 bắp ngô ngọt luộc', portion: '1 bắp', cal: 140, p: 4, c: 29, f: 1.5, emoji: '🌽' },
      ],
      snacks: [
        { name: 'Trứng gà luộc + 1 hộp sữa đậu nành không đường', portion: '1 quả + 200ml', cal: 160, p: 13, c: 9, f: 8, emoji: '🥛' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Tập kháng lực toàn thân (Full Body) & Đạp xe nước rút',
      breakfast: [
        { name: 'Hủ tiếu Nam Vang sườn nạc tôm tươi', portion: '1 tô đặc biệt', cal: 490, p: 34, c: 62, f: 12, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm tấm sườn nướng cốt lết nạc chả trứng', portion: '1 dĩa', cal: 620, p: 42, c: 75, f: 18, emoji: '🍽️' },
        { name: 'Canh bắp cải cuộn thịt băm', portion: '1 tô', cal: 110, p: 11, c: 6, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Cá basa nướng giấy bạc gừng sả', portion: '180g', cal: 270, p: 35, c: 1, f: 14, emoji: '🐟' },
        { name: 'Rau muống xào tỏi ít dầu', portion: '1 đĩa', cal: 90, p: 3, c: 7, f: 6, emoji: '🥬' },
      ],
      snacks: [
        { name: '1 quả táo tây + 12 hạt hạnh nhân', portion: '1 phần', cal: 160, p: 4, c: 24, f: 7, emoji: '🍎' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Chạy biến tốc dốc & Siêu bù đắp cơ bắp',
      breakfast: [
        { name: 'Bún chả Hà Nội nướng than (nhiều chả miếng nạc)', portion: '1 suất', cal: 520, p: 36, c: 62, f: 14, emoji: '🥗' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '1.5 chén', cal: 300, p: 6, c: 66, f: 0.8, emoji: '🍚' },
        { name: 'Ức gà xào nấm đùi gà ớt chuông', portion: '180g gà', cal: 310, p: 48, c: 6, f: 10, emoji: '🍗' },
        { name: 'Canh cải xoong nấu thịt nạc băm', portion: '1 tô', cal: 80, p: 9, c: 4, f: 3, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bò bít tết nạc sốt tiêu đen khoai tây nướng', portion: '1 phần (150g bò)', cal: 420, p: 38, c: 32, f: 14, emoji: '🥩' },
        { name: 'Salad rocket dưa leo giấm nho', portion: '1 đĩa', cal: 50, p: 1.5, c: 5, f: 2.5, emoji: '🥗' },
      ],
      snacks: [
        { name: 'Sinh tố chuối yến mạch sữa tươi không đường', portion: '1 ly lớn', cal: 230, p: 9, c: 42, f: 3.5, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Tập sức mạnh tối đa & Chạy bền cự ly 5-10km',
      breakfast: [
        { name: 'Bánh mì bò xào cần tây ốp la', portion: '1 ổ đầy ắp', cal: 480, p: 32, c: 52, f: 16, emoji: '🥖' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt hạt sen', portion: '1.5 chén', cal: 280, p: 6, c: 60, f: 1.5, emoji: '🍚' },
        { name: 'Tôm mực xào rau thập cẩm', portion: '200g hải sản', cal: 280, p: 42, c: 12, f: 6, emoji: '🦐' },
        { name: 'Canh mồng tơi cua đồng gạch béo', portion: '1 tô', cal: 110, p: 11, c: 6, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Lẩu gà lá é / lá giang (ăn kèm bún tươi)', portion: '1 suất ăn vừa', cal: 490, p: 42, c: 55, f: 11, emoji: '🍲' },
      ],
      snacks: [
        { name: 'Sữa chua không đường dầm quả bơ', portion: '1 ly', cal: 180, p: 5, c: 16, f: 11, emoji: '🥑' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Phục hồi chủ động (Active Recovery) & Dưỡng cơ',
      breakfast: [
        { name: 'Cháo sườn yến mạch nạc dăm nấm đông cô', portion: '1 tô to', cal: 380, p: 26, c: 48, f: 8, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Cơm gà luộc xé phay bóp muối tiêu chanh', portion: '1 dĩa (gà đùi bỏ da)', cal: 520, p: 44, c: 62, f: 10, emoji: '🍗' },
        { name: 'Canh bí đao nấu sườn non', portion: '1 tô', cal: 140, p: 14, c: 6, f: 6, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bánh tráng cuốn thịt heo luộc nạc cuộn rau rừng', portion: '5 cuốn to', cal: 420, p: 35, c: 45, f: 10, emoji: '🌯' },
      ],
      snacks: [
        { name: 'Đu đủ chín + 10g hạt điều rang', portion: '1 đĩa nhỏ', cal: 140, p: 3, c: 22, f: 5, emoji: '🥭' },
      ],
    },
  ],

  // 1. CARDIO ĐẸP DÁNG & SĂN CHẮC
  cardio_toning: [
    {
      day: 'Thứ 2',
      title: 'Khởi động năng lượng & Siết cơ đùi, eo',
      breakfast: [
        { name: 'Phở gà ức xé (bỏ da, ít bánh)', portion: '1 bát vừa', cal: 380, p: 28, c: 50, f: 6, emoji: '🍜' },
        { name: 'Nước dừa tươi', portion: '1 quả', cal: 60, p: 1, c: 14, f: 0, emoji: '🥥' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt muối mè', portion: '1 chén vừa', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Ức gà áp chảo sốt tiêu đen', portion: '150g', cal: 240, p: 38, c: 2, f: 8, emoji: '🍗' },
        { name: 'Canh bí xanh nấu tôm tươi', portion: '1 bát tô', cal: 90, p: 10, c: 8, f: 2, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Khoai lang luộc', portion: '1 củ vừa', cal: 130, p: 2, c: 30, f: 0, emoji: '🍠' },
        { name: 'Cá hồi / Cá basa hấp thì là', portion: '150g', cal: 260, p: 28, c: 0, f: 15, emoji: '🐟' },
        { name: 'Bông cải xanh & cà rốt luộc', portion: '1 đĩa lớn', cal: 70, p: 4, c: 12, f: 1, emoji: '🥦' },
      ],
      snacks: [
        { name: 'Sữa chua Hy Lạp / không đường + chuối', portion: '1 hũ + 1 quả', cal: 170, p: 10, c: 28, f: 2, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Bền bỉ nhịp tim & Đốt mỡ thừa',
      breakfast: [
        { name: 'Bánh mì ngũ cốc 2 trứng ốp la', portion: '1 phần', cal: 350, p: 18, c: 35, f: 14, emoji: '🍳' },
        { name: 'Cà phê đen không đường', portion: '1 ly', cal: 5, p: 0, c: 1, f: 0, emoji: '☕' },
      ],
      lunch: [
        { name: 'Bún tươi cá nướng thì là', portion: '1 tô', cal: 430, p: 32, c: 55, f: 8, emoji: '🥗' },
        { name: 'Rau xà lách, rau thơm các loại', portion: '1 đĩa đầy', cal: 40, p: 2, c: 6, f: 0, emoji: '🥬' },
      ],
      dinner: [
        { name: 'Cơm trắng', portion: '1/2 chén', cal: 100, p: 2, c: 22, f: 0, emoji: '🍚' },
        { name: 'Thịt bò nạc xào cần tỏi', portion: '140g', cal: 250, p: 30, c: 4, f: 12, emoji: '🥩' },
        { name: 'Canh mồng tơi cua đồng', portion: '1 tô', cal: 95, p: 9, c: 8, f: 3, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Táo tây giòn + vài hạt hạnh nhân', portion: '1 quả + 6 hạt', cal: 130, p: 3, c: 22, f: 4, emoji: '🍎' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Săn chắc cơ lõi & Thon gọn vòng eo',
      breakfast: [
        { name: 'Yến mạch ngâm sữa chua & chuối chín', portion: '1 bát', cal: 310, p: 13, c: 52, f: 5, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Cơm tấm sườn cốt lết áp chảo (ít mỡ)', portion: '1 dĩa vừa', cal: 520, p: 34, c: 62, f: 14, emoji: '🍽️' },
        { name: 'Dưa leo, cà chua ăn kèm', portion: '1 đĩa nhỏ', cal: 30, p: 1, c: 6, f: 0, emoji: '🥒' },
      ],
      dinner: [
        { name: 'Gỏi gà xé phay bắp cải hoa chuối', portion: '1 đĩa to', cal: 340, p: 35, c: 18, f: 12, emoji: '🥗' },
        { name: '1 bắp ngô ngọt luộc', portion: '1 bắp', cal: 140, p: 4, c: 29, f: 1.5, emoji: '🌽' },
      ],
      snacks: [
        { name: 'Trứng gà luộc + trà xanh ấm', portion: '1 quả + 1 tách', cal: 80, p: 6.5, c: 1, f: 5, emoji: '🥚' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Dẻo dai năng lượng cardio',
      breakfast: [
        { name: 'Bánh cuốn chả quế nạc', portion: '1 đĩa vừa', cal: 370, p: 16, c: 55, f: 9, emoji: '🥟' },
      ],
      lunch: [
        { name: 'Bún chả Hà Nội (thịt nướng nạc)', portion: '1 suất', cal: 490, p: 32, c: 58, f: 13, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Tôm rim tiêu ít đường', portion: '120g', cal: 170, p: 28, c: 3, f: 4, emoji: '🦐' },
        { name: 'Canh rau cải xanh nấu gừng', portion: '1 tô', cal: 50, p: 2, c: 6, f: 1, emoji: '🥬' },
      ],
      snacks: [
        { name: '1 quả ổi giòn + muối tôm ít', portion: '1 quả to', cal: 90, p: 2.5, c: 18, f: 0.5, emoji: '🍈' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Tăng tốc đốt calo cuối tuần',
      breakfast: [
        { name: 'Hủ tiếu gà xé nạc', portion: '1 tô vừa', cal: 390, p: 26, c: 54, f: 7, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '1 chén', cal: 200, p: 4, c: 44, f: 0.5, emoji: '🍚' },
        { name: 'Thịt bò xào ớt chuông hành tây', portion: '130g', cal: 260, p: 29, c: 8, f: 12, emoji: '🥩' },
        { name: 'Canh chua cá lóc', portion: '1 tô', cal: 130, p: 14, c: 10, f: 3, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Salad ức gà áp chảo sốt sữa chua', portion: '1 tô lớn', cal: 320, p: 36, c: 12, f: 12, emoji: '🥗' },
        { name: '1/2 củ khoai lang nướng', portion: '80g', cal: 70, p: 1, c: 16, f: 0, emoji: '🍠' },
      ],
      snacks: [
        { name: '1 ly sữa tươi không đường tách béo', portion: '200ml', cal: 90, p: 7, c: 10, f: 2, emoji: '🥛' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Tập cường độ cao (HIIT/Chạy bộ) & Hồi phục',
      breakfast: [
        { name: 'Bánh mì bò kho nạc (1 ổ)', portion: '1 phần', cal: 440, p: 26, c: 55, f: 12, emoji: '🥖' },
      ],
      lunch: [
        { name: 'Cơm gà luộc xé lá chanh', portion: '1 dĩa', cal: 480, p: 35, c: 60, f: 9, emoji: '🍗' },
        { name: 'Canh bắp cải cuộn thịt nạc băm', portion: '1 tô', cal: 110, p: 11, c: 6, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bún riêu cua đậu phụ chần (ít mỡ)', portion: '1 tô vừa', cal: 390, p: 22, c: 52, f: 10, emoji: '🍲' },
      ],
      snacks: [
        { name: '1 quả chuối chín + 10g hạt điều', portion: '1 phần', cal: 160, p: 3, c: 27, f: 5, emoji: '🍌' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Thư giãn, nạp dưỡng chất phục hồi cơ',
      breakfast: [
        { name: 'Bún bò tái nạm gân (nước trong)', portion: '1 tô', cal: 460, p: 31, c: 56, f: 11, emoji: '🍲' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt hạt sen', portion: '1 chén', cal: 210, p: 5, c: 44, f: 2, emoji: '🍚' },
        { name: 'Cá hồi áp chảo sốt chanh leo', portion: '140g', cal: 290, p: 27, c: 6, f: 16, emoji: '🐟' },
        { name: 'Rau mầm trộn dầu giấm tỏi', portion: '1 đĩa', cal: 60, p: 2, c: 5, f: 3, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Cháo sườn yến mạch thịt bằm nấm rơm', portion: '1 tô ấm', cal: 330, p: 24, c: 45, f: 6, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 miếng đu đủ chín thanh mát', portion: '150g', cal: 65, p: 1, c: 16, f: 0, emoji: '🥭' },
      ],
    },
  ],

  // 2. GIẢM MỠ CẤP TỐC / SIẾT EO (High Protein, Low-to-Moderate Carb)
  lose_fat: [
    {
      day: 'Thứ 2',
      title: 'Kích hoạt cỗ máy đốt mỡ thừa',
      breakfast: [
        { name: '2 trứng gà luộc + 1/2 bắp ngô luộc', portion: '1 phần', cal: 230, p: 15, c: 20, f: 10, emoji: '🥚' },
        { name: 'Trà xanh nóng không đường', portion: '1 tách', cal: 2, p: 0, c: 0.5, f: 0, emoji: '🍵' },
      ],
      lunch: [
        { name: 'Ức gà xé áp chảo ớt chuông', portion: '180g', cal: 260, p: 44, c: 5, f: 6, emoji: '🍗' },
        { name: '1/2 chén cơm gạo lứt', portion: '90g', cal: 100, p: 2, c: 22, f: 0.5, emoji: '🍚' },
        { name: 'Canh rau ngót nấu thịt nạc băm', portion: '1 tô lớn', cal: 90, p: 11, c: 6, f: 2, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Phi lê cá basa áp chảo tiêu gừng', portion: '160g', cal: 220, p: 32, c: 1, f: 9, emoji: '🐟' },
        { name: 'Bông cải xanh luộc chấm kho quẹt nhẹ', portion: '1 đĩa lớn', cal: 80, p: 5, c: 12, f: 1, emoji: '🥦' },
      ],
      snacks: [
        { name: '1 quả dưa leo giòn + 1 hũ sữa chua Hy Lạp', portion: '1 phần', cal: 110, p: 11, c: 8, f: 1.5, emoji: '🥒' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Tập trung siết eo và mỡ bụng dưới',
      breakfast: [
        { name: 'Trứng cuộn rau củ nấm rơm (2 quả)', portion: '1 đĩa', cal: 210, p: 16, c: 4, f: 14, emoji: '🍳' },
        { name: '1 ly nước ấm vắt chanh tươi gừng', portion: '250ml', cal: 10, p: 0, c: 2, f: 0, emoji: '🍋' },
      ],
      lunch: [
        { name: 'Bò nạc xào măng tây tỏi', portion: '160g', cal: 290, p: 38, c: 6, f: 12, emoji: '🥩' },
        { name: 'Khoai lang hấp', portion: '100g', cal: 90, p: 1.5, c: 21, f: 0, emoji: '🍠' },
        { name: 'Canh bí đao tôm khô', portion: '1 tô', cal: 60, p: 8, c: 5, f: 1, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Gỏi tôm thịt luộc rau muống giòn', portion: '1 đĩa to', cal: 260, p: 32, c: 12, f: 7, emoji: '🥗' },
      ],
      snacks: [
        { name: '1 quả táo xanh giòn', portion: '1 quả', cal: 75, p: 0.5, c: 19, f: 0.2, emoji: '🍏' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Thâm hụt calo chuẩn khoa học',
      breakfast: [
        { name: 'Cháo yến mạch ức gà xé nấm hương', portion: '1 tô', cal: 280, p: 26, c: 35, f: 4, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Tôm hấp sả bia chấm muối tiêu chanh', portion: '180g', cal: 190, p: 38, c: 2, f: 2, emoji: '🦐' },
        { name: 'Cơm gạo lứt', portion: '1/2 chén', cal: 100, p: 2, c: 22, f: 0.5, emoji: '🍚' },
        { name: 'Rau cải ngồng luộc chấm xì dầu', portion: '1 đĩa', cal: 45, p: 3, c: 7, f: 0.5, emoji: '🥬' },
      ],
      dinner: [
        { name: 'Đậu phụ sốt cà chua ít dầu + nạc dăm băm', portion: '1 đĩa', cal: 280, p: 24, c: 8, f: 16, emoji: '🍲' },
        { name: 'Canh xà lách xoong thịt bằm', portion: '1 tô', cal: 70, p: 8, c: 3, f: 2.5, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Trứng gà luộc lòng đào', portion: '1 quả', cal: 78, p: 6.3, c: 0.6, f: 5.3, emoji: '🥚' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Giữ cơ bắp & Ép mỡ thừa',
      breakfast: [
        { name: '1 lát bánh mì đen ngũ cốc + 1 trứng ốp la', portion: '1 phần', cal: 190, p: 10, c: 18, f: 8, emoji: '🥪' },
        { name: '1 ly cà phê đen đá không đường', portion: '1 ly', cal: 5, p: 0, c: 1, f: 0, emoji: '☕' },
      ],
      lunch: [
        { name: 'Ức gà nướng thảo mộc', portion: '180g', cal: 270, p: 45, c: 1, f: 8, emoji: '🍗' },
        { name: 'Salad dưa leo cà chua dầu oliu giấm', portion: '1 đĩa', cal: 80, p: 2, c: 7, f: 5, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Canh sườn hầm rau củ thanh đạm (vớt báng mỡ)', portion: '1 tô', cal: 260, p: 26, c: 15, f: 10, emoji: '🥣' },
        { name: '1 củ khoai lang nhỏ', portion: '80g', cal: 70, p: 1, c: 16, f: 0, emoji: '🍠' },
      ],
      snacks: [
        { name: 'Hạt hạnh nhân rang mộc', portion: '10 hạt (~12g)', cal: 75, p: 3, c: 2.5, f: 6.5, emoji: '🥜' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Phá vỡ chững cân (Plateau Breaking)',
      breakfast: [
        { name: 'Sinh tố bơ ức gà / Whey protein bơ sữa chua', portion: '1 ly', cal: 260, p: 28, c: 12, f: 10, emoji: '🥑' },
      ],
      lunch: [
        { name: 'Mực ống hấp gừng sả', portion: '170g', cal: 160, p: 30, c: 4, f: 2, emoji: '🦑' },
        { name: 'Cơm gạo lứt', portion: '1/2 chén', cal: 100, p: 2, c: 22, f: 0.5, emoji: '🍚' },
        { name: 'Rau muống luộc dầm sấu/chanh', portion: '1 đĩa', cal: 40, p: 3, c: 6, f: 0, emoji: '🥬' },
      ],
      dinner: [
        { name: 'Thịt heo nạc thăn rim nước mắm tỏi', portion: '140g', cal: 230, p: 35, c: 2, f: 8, emoji: '🥩' },
        { name: 'Canh cải cúc (tần ô) nấu thịt', portion: '1 tô', cal: 65, p: 7, c: 4, f: 2, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Cà chua bi tươi', portion: '10 quả (~150g)', cal: 30, p: 1.5, c: 6, f: 0.2, emoji: '🍅' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Siết cân cuối tuần săn chắc',
      breakfast: [
        { name: 'Phở bò tái nạc (nói chủ quán không lấy mỡ gầu)', portion: '1 tô vừa', cal: 380, p: 29, c: 48, f: 7, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cá rô phi / cá diêu hồng nướng giấy bạc', portion: '180g', cal: 210, p: 36, c: 0, f: 6, emoji: '🐟' },
        { name: 'Rau sống cuộn bánh tráng (chấm nước mắm tỏi)', portion: '4 cuốn', cal: 120, p: 3, c: 24, f: 1, emoji: '🌯' },
      ],
      dinner: [
        { name: 'Thịt bò băm hấp trứng cách thủy', portion: '1 chén to', cal: 240, p: 30, c: 3, f: 11, emoji: '🍲' },
        { name: 'Canh khổ qua (mướp đắng) thanh lọc', portion: '1 tô', cal: 60, p: 5, c: 7, f: 1, emoji: '🥣' },
      ],
      snacks: [
        { name: '1/2 quả bưởi da xanh mọng nước', portion: '4 múi to', cal: 80, p: 1.5, c: 19, f: 0, emoji: '🍊' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Tự thưởng bữa ăn thanh đạm (Refeed nhẹ)',
      breakfast: [
        { name: 'Bún gà măng tươi (ức gà)', portion: '1 tô', cal: 390, p: 28, c: 54, f: 6, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Bò bít tết nạc sốt tiêu đen', portion: '150g', cal: 280, p: 35, c: 3, f: 13, emoji: '🥩' },
        { name: 'Khoai tây hấp tán nhuyễn', portion: '1 củ vừa', cal: 110, p: 2.5, c: 25, f: 0.2, emoji: '🥔' },
        { name: 'Salad rocket xà lách dầu giấm', portion: '1 đĩa', cal: 50, p: 1.5, c: 5, f: 2.5, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Cháo nghêu hành hoa tiêu sọ', portion: '1 tô ấm', cal: 240, p: 22, c: 32, f: 2, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 hũ sữa chua không đường', portion: '100g', cal: 65, p: 4, c: 6, f: 2, emoji: '🥛' },
      ],
    },
  ],

  // 3. TĂNG CƠ NẠC / GYM & BULKING (High Protein, High Carb, Moderate Fat)
  lean_muscle: [
    {
      day: 'Thứ 2',
      title: 'Nạp protein khủng & Năng lượng đẩy tạ',
      breakfast: [
        { name: 'Phở bò tái nạm gầu giòn', portion: '1 tô lớn', cal: 520, p: 35, c: 68, f: 14, emoji: '🍜' },
        { name: '1 quả trứng chần bổ sung', portion: '1 quả', cal: 78, p: 6.5, c: 0.5, f: 5.5, emoji: '🥚' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '2 chén', cal: 400, p: 8, c: 88, f: 1, emoji: '🍚' },
        { name: 'Ức gà xào sả ớt', portion: '200g', cal: 320, p: 52, c: 3, f: 10, emoji: '🍗' },
        { name: 'Canh cải ngọt nấu tôm', portion: '1 tô', cal: 90, p: 10, c: 7, f: 2, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cơm trắng', portion: '1.5 chén', cal: 300, p: 6, c: 66, f: 0.8, emoji: '🍚' },
        { name: 'Thịt bò nạc xào hành tây ớt chuông', portion: '180g', cal: 340, p: 42, c: 8, f: 15, emoji: '🥩' },
        { name: 'Rau muống xào tỏi', portion: '1 đĩa', cal: 120, p: 3.5, c: 8, f: 8.5, emoji: '🥬' },
      ],
      snacks: [
        { name: 'Bánh mì bơ đậu phộng + chuối tiêu', portion: '1 lát + 1 quả', cal: 250, p: 9, c: 38, f: 8, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Tập nhóm cơ lớn (Chân / Lưng xô)',
      breakfast: [
        { name: 'Bánh mì 3 trứng ốp la chả lụa', portion: '1 ổ đầy đủ', cal: 510, p: 26, c: 48, f: 22, emoji: '🥖' },
        { name: '1 ly sữa tươi nguyên kem', portion: '220ml', cal: 140, p: 7.5, c: 11, f: 7.5, emoji: '🥛' },
      ],
      lunch: [
        { name: 'Cơm tấm 2 sườn nướng mỡ hành', portion: '1 dĩa lớn', cal: 760, p: 46, c: 88, f: 24, emoji: '🍽️' },
        { name: 'Canh rong biển đậu hũ non', portion: '1 tô', cal: 80, p: 6, c: 6, f: 3, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Khoai lang luộc / nướng', portion: '2 củ (250g)', cal: 220, p: 3.5, c: 50, f: 0.5, emoji: '🍠' },
        { name: 'Cá hồi áp chảo bơ tỏi', portion: '180g', cal: 360, p: 36, c: 1, f: 22, emoji: '🐟' },
        { name: 'Măng tây xào tỏi dầu hào', portion: '1 đĩa', cal: 85, p: 4, c: 8, f: 4, emoji: '🥦' },
      ],
      snacks: [
        { name: 'Yến mạch nấu sữa tươi + hạnh nhân', portion: '1 tô', cal: 280, p: 12, c: 42, f: 7, emoji: '🥣' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Kích thích tổng hợp cơ bắp tối đa',
      breakfast: [
        { name: 'Xôi xéo gà xé giò lụa', portion: '1 gói đầy đủ', cal: 580, p: 24, c: 85, f: 16, emoji: '🍚' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '2 chén', cal: 400, p: 8, c: 88, f: 1, emoji: '🍚' },
        { name: 'Thịt heo kho trứng cút', portion: '1 đĩa (150g)', cal: 380, p: 28, c: 6, f: 27, emoji: '🥩' },
        { name: 'Canh bí đỏ nấu sườn non', portion: '1 tô', cal: 170, p: 14, c: 14, f: 6, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bún chả Hà Nội (gấp đôi chả miếng nướng)', portion: '1 phần to', cal: 680, p: 44, c: 75, f: 24, emoji: '🥗' },
      ],
      snacks: [
        { name: '2 quả trứng gà luộc + 1 quả chuối', portion: '1 phần', cal: 250, p: 14, c: 24, f: 11, emoji: '🥚' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Phục hồi sợi cơ & Tăng thể tích',
      breakfast: [
        { name: 'Hủ tiếu Nam Vang thập cẩm thịt băm tôm gan', portion: '1 tô to', cal: 560, p: 34, c: 70, f: 15, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm gà xối mỡ đùi góc tư', portion: '1 dĩa', cal: 720, p: 42, c: 80, f: 26, emoji: '🍗' },
        { name: 'Canh cải thảo thịt băm', portion: '1 tô', cal: 85, p: 8, c: 5, f: 3, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cơm trắng', portion: '1.5 chén', cal: 300, p: 6, c: 66, f: 0.8, emoji: '🍚' },
        { name: 'Bò xào đậu que nấm đùi gà', portion: '180g', cal: 310, p: 38, c: 9, f: 12, emoji: '🥩' },
        { name: 'Canh chua cá bông lau', portion: '1 tô', cal: 150, p: 18, c: 11, f: 4, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Sữa chua dầm hoa quả ngũ cốc hạt', portion: '1 ly to', cal: 240, p: 9, c: 42, f: 4, emoji: '🍧' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Bùng nổ sức mạnh bài tập Deadlift/Squat',
      breakfast: [
        { name: 'Bún bò giò nạc gân tái chả', portion: '1 tô đặc biệt', cal: 620, p: 38, c: 72, f: 19, emoji: '🍲' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt', portion: '2 chén', cal: 380, p: 8, c: 80, f: 2, emoji: '🍚' },
        { name: 'Ức gà cuộn phô mai nướng', portion: '200g', cal: 380, p: 54, c: 4, f: 16, emoji: '🧀' },
        { name: 'Canh mồng tơi nấu ngao', portion: '1 tô', cal: 95, p: 12, c: 8, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Mì Ý sốt bò băm phô mai Parmesan', portion: '1 đĩa to', cal: 620, p: 36, c: 78, f: 18, emoji: '🍝' },
      ],
      snacks: [
        { name: 'Trứng ốp la 2 quả kèm bánh mì nướng', portion: '1 phần', cal: 260, p: 14, c: 24, f: 12, emoji: '🍳' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Đẩy tạ hạng nặng & Siêu phục hồi',
      breakfast: [
        { name: 'Bánh mì chảo xíu mại trứng pate xúc xích', portion: '1 chảo + bánh mì', cal: 640, p: 32, c: 58, f: 29, emoji: '🍳' },
      ],
      lunch: [
        { name: 'Cơm trắng', portion: '2 chén', cal: 400, p: 8, c: 88, f: 1, emoji: '🍚' },
        { name: 'Sườn cừu / sườn heo nướng mật ong', portion: '200g', cal: 420, p: 38, c: 10, f: 25, emoji: '🥩' },
        { name: 'Canh bắp cải cuộn thịt', portion: '1 tô', cal: 110, p: 11, c: 6, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Lẩu bò nhúng dấm nạc gân (ăn kèm bún)', portion: '1 suất ăn', cal: 590, p: 48, c: 65, f: 14, emoji: '🍲' },
      ],
      snacks: [
        { name: 'Sinh tố bơ chuối sữa chua hạt chia', portion: '1 ly lớn', cal: 290, p: 8, c: 44, f: 10, emoji: '🥑' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Tăng cường glycogen & Dưỡng chất xây cơ',
      breakfast: [
        { name: 'Bánh canh cua chả cá giò heo', portion: '1 tô to', cal: 580, p: 36, c: 68, f: 17, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm tấm sườn bì chả trứng ốp la', portion: '1 dĩa trọn gói', cal: 820, p: 48, c: 95, f: 29, emoji: '🍽️' },
      ],
      dinner: [
        { name: 'Cơm gạo lứt', portion: '1.5 chén', cal: 280, p: 6, c: 60, f: 1.5, emoji: '🍚' },
        { name: 'Tôm mực xào rau thập cẩm', portion: '1 đĩa to', cal: 290, p: 38, c: 14, f: 8, emoji: '🦑' },
        { name: 'Canh chua cá hú', portion: '1 tô', cal: 160, p: 19, c: 10, f: 5, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 nắm hạt tổng hợp (óc chó, hạnh nhân, hạt điều)', portion: '35g', cal: 210, p: 7, c: 8, f: 18, emoji: '🌰' },
      ],
    },
  ],

  // 4. EAT CLEAN THUẦN VIỆT / THANH LỌC
  eat_clean: [
    {
      day: 'Thứ 2',
      title: 'Thanh lọc đầu tuần với rau củ và thịt trắng',
      breakfast: [
        { name: 'Khoai lang luộc + 2 trứng gà ta luộc', portion: '1 củ + 2 quả', cal: 290, p: 15, c: 32, f: 10, emoji: '🍠' },
        { name: 'Nước ép cần tây dưa chuột', portion: '1 ly', cal: 40, p: 1.5, c: 8, f: 0, emoji: '🥒' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt hạt chia', portion: '1 chén', cal: 190, p: 4.5, c: 40, f: 1.5, emoji: '🍚' },
        { name: 'Ức gà hấp lá chanh', portion: '160g', cal: 230, p: 42, c: 0, f: 5, emoji: '🍗' },
        { name: 'Rau củ luộc ngũ sắc (cà rốt, bí đỏ, đậu que)', portion: '1 đĩa to', cal: 90, p: 3, c: 18, f: 0.5, emoji: '🥕' },
      ],
      dinner: [
        { name: 'Cá chẽm / Cá lóc hấp hành gừng', portion: '170g', cal: 220, p: 34, c: 2, f: 7, emoji: '🐟' },
        { name: 'Canh bí xanh nấu tôm nõn giã nhuyễn', portion: '1 tô', cal: 90, p: 10, c: 8, f: 2, emoji: '🥣' },
        { name: '1/2 bắp ngô nếp luộc', portion: '70g', cal: 90, p: 2.5, c: 19, f: 1, emoji: '🌽' },
      ],
      snacks: [
        { name: 'Táo Envy + vài hạt óc chó', portion: '1 quả + 3 hạt', cal: 140, p: 2.5, c: 24, f: 5, emoji: '🍎' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Giảm muối, nhẹ nhàng đường tiêu hóa',
      breakfast: [
        { name: 'Yến mạch ngâm hạt chia sữa hạt hạnh nhân', portion: '1 bát', cal: 280, p: 10, c: 46, f: 6, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Gỏi cuốn tôm thịt nạc chấm sốt đậu phộng nhẹ', portion: '4 cuốn to', cal: 360, p: 26, c: 44, f: 8, emoji: '🌯' },
        { name: 'Canh cải xanh nấu nấm rơm gừng tươi', portion: '1 tô', cal: 60, p: 4, c: 8, f: 1, emoji: '🥬' },
      ],
      dinner: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Bò nạc áp chảo hương thảo dầu oliu', portion: '140g', cal: 260, p: 34, c: 1, f: 13, emoji: '🥩' },
        { name: 'Salad dưa leo cà chua xà lách dầu giấm', portion: '1 đĩa lớn', cal: 70, p: 2, c: 8, f: 3.5, emoji: '🥗' },
      ],
      snacks: [
        { name: '1 quả chuối sứ chín tự nhiên', portion: '1 quả', cal: 85, p: 1, c: 21, f: 0.2, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Giàu chất chống oxy hóa & Da sáng rạng rỡ',
      breakfast: [
        { name: 'Bánh mì nguyên cám kẹp trứng ốp la bơ', portion: '1 phần', cal: 320, p: 14, c: 28, f: 16, emoji: '🥑' },
      ],
      lunch: [
        { name: 'Bún lứt trộn ức gà xé hạt điều', portion: '1 tô', cal: 420, p: 35, c: 50, f: 9, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Khoai lang hấp gừng', portion: '1 củ', cal: 130, p: 2, c: 30, f: 0, emoji: '🍠' },
        { name: 'Tôm hấp sả chấm muối tiêu chanh', portion: '160g', cal: 170, p: 34, c: 2, f: 2, emoji: '🦐' },
        { name: 'Canh mồng tơi cua đồng thanh mát', portion: '1 tô', cal: 95, p: 9, c: 8, f: 3, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 miếng đu đủ chín', portion: '160g', cal: 70, p: 1, c: 17, f: 0.1, emoji: '🥭' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Cân bằng đạm và chất xơ vi sinh',
      breakfast: [
        { name: 'Cháo gạo lứt thịt băm nấm đông cô', portion: '1 tô', cal: 310, p: 20, c: 45, f: 5, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Cá hồi nướng tiêu chanh', portion: '150g', cal: 280, p: 30, c: 0, f: 17, emoji: '🐟' },
        { name: 'Măng tây & cà rốt xào tỏi dầu oliu', portion: '1 đĩa', cal: 80, p: 3, c: 9, f: 3.5, emoji: '🥕' },
      ],
      dinner: [
        { name: 'Salad ức gà sốt mè rang dầu dừa', portion: '1 tô', cal: 310, p: 35, c: 14, f: 12, emoji: '🥗' },
        { name: 'Canh chua chay nấm đậu hũ', portion: '1 tô', cal: 110, p: 8, c: 12, f: 3, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 quả ổi lê tươi giòn', portion: '1 quả to', cal: 85, p: 2.5, c: 17, f: 0.5, emoji: '🍈' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Tăng cường chất béo tốt Omega-3',
      breakfast: [
        { name: 'Sinh tố bơ cải kale chuối sữa chua không đường', portion: '1 ly', cal: 280, p: 8, c: 38, f: 11, emoji: '🥑' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Thịt bò xào bông cải xanh', portion: '150g', cal: 280, p: 34, c: 7, f: 12, emoji: '🥩' },
        { name: 'Canh rau dền nấu tôm khô', portion: '1 tô', cal: 70, p: 8, c: 6, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bánh tráng cuốn cá nướng rau rừng', portion: '4 cuốn', cal: 340, p: 30, c: 38, f: 7, emoji: '🌯' },
      ],
      snacks: [
        { name: 'Hạt bí xanh tách vỏ', portion: '20g', cal: 110, p: 6, c: 3, f: 9, emoji: '🎃' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Bữa ăn lành mạnh cuối tuần sum họp',
      breakfast: [
        { name: 'Phở gà ức nước trong (không mỡ váng)', portion: '1 tô', cal: 390, p: 27, c: 54, f: 7, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt chiên rau củ ức gà ít dầu', portion: '1 đĩa', cal: 440, p: 32, c: 58, f: 9, emoji: '🍛' },
        { name: 'Canh khổ qua nhồi thịt nạc băm', portion: '1 tô', cal: 130, p: 15, c: 8, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Ngao hấp sả gừng lá quế', portion: '1 tô', cal: 160, p: 24, c: 6, f: 2, emoji: '🍲' },
        { name: '1 bắp ngô ngọt luộc', portion: '1 bắp', cal: 140, p: 4, c: 29, f: 1.5, emoji: '🌽' },
        { name: 'Đậu bắp luộc chấm sốt tương gừng', portion: '1 đĩa', cal: 50, p: 2.5, c: 8, f: 0.5, emoji: '🥢' },
      ],
      snacks: [
        { name: '1 ly nước dừa tươi nguyên trái', portion: '1 trái', cal: 60, p: 1.5, c: 13, f: 0.5, emoji: '🥥' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Tái tạo năng lượng và thanh sạch tế bào',
      breakfast: [
        { name: 'Yến mạch nấu tôm nõn băm nhỏ hành hoa', portion: '1 tô', cal: 290, p: 22, c: 38, f: 4, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Lẩu nấm gà thả vườn thanh đạm', portion: '1 suất ăn vừa', cal: 480, p: 38, c: 52, f: 12, emoji: '🍄' },
      ],
      dinner: [
        { name: 'Cháo sườn gạo lứt hạt sen', portion: '1 tô', cal: 320, p: 22, c: 45, f: 5, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 quả thanh long ruột đỏ', portion: '1/2 quả (150g)', cal: 80, p: 1.5, c: 18, f: 0.5, emoji: '🐉' },
      ],
    },
  ],

  // 5. LOW-CARB / KETO SIẾT MỠ VÒNG 2
  low_carb: [
    {
      day: 'Thứ 2',
      title: 'Khởi động hạn chế đường và tinh bột',
      breakfast: [
        { name: '3 trứng gà ốp la xúc xích nướng', portion: '1 đĩa', cal: 380, p: 24, c: 3, f: 30, emoji: '🍳' },
        { name: 'Cà phê đen không đường', portion: '1 ly', cal: 5, p: 0, c: 1, f: 0, emoji: '☕' },
      ],
      lunch: [
        { name: 'Thịt ba chỉ nướng giòn da', portion: '160g', cal: 420, p: 28, c: 1, f: 34, emoji: '🥓' },
        { name: 'Rau xà lách, lá mơ, rau thơm cuốn thịt', portion: '1 đĩa lớn', cal: 40, p: 2, c: 6, f: 0.5, emoji: '🥬' },
        { name: 'Canh rau dền nấu tôm nõn', portion: '1 tô', cal: 70, p: 8, c: 5, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cá hồi áp chảo bơ tỏi sốt phô mai', portion: '180g', cal: 410, p: 35, c: 2, f: 29, emoji: '🐟' },
        { name: 'Bông cải xanh xào nấm dầu oliu', portion: '1 đĩa', cal: 95, p: 4, c: 7, f: 6, emoji: '🥦' },
      ],
      snacks: [
        { name: '1/2 quả bơ sáp rắc muối tiêu', portion: '100g', cal: 160, p: 2, c: 8.5, f: 14.7, emoji: '🥑' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Đốt mỡ tự nhiên (Ketosis State)',
      breakfast: [
        { name: 'Bún nưa (Shirataki) thịt bò tái nạm gầu', portion: '1 tô nưa ít carb', cal: 360, p: 32, c: 4, f: 24, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Đùi gà nướng tiêu thảo mộc cả da', portion: '200g', cal: 430, p: 40, c: 2, f: 28, emoji: '🍗' },
        { name: 'Salad sốt mè béo bơ đậu phộng', portion: '1 đĩa', cal: 140, p: 4, c: 6, f: 12, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Thịt bò xào măng tây bơ tỏi', portion: '170g', cal: 360, p: 38, c: 5, f: 21, emoji: '🥩' },
        { name: 'Canh bí đao sườn non', portion: '1 tô', cal: 150, p: 14, c: 5, f: 8, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Hạt hạnh nhân hoặc hạt macca', portion: '25g', cal: 160, p: 4, c: 4, f: 15, emoji: '🥜' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Siết gọn mỡ bụng dưới',
      breakfast: [
        { name: 'Trứng bác kem tươi phô mai (Scrambled Eggs)', portion: '2 quả + phô mai', cal: 280, p: 16, c: 2, f: 23, emoji: '🍳' },
      ],
      lunch: [
        { name: 'Chả lụa heo kho tiêu sọ', portion: '150g', cal: 340, p: 26, c: 4, f: 24, emoji: '🥩' },
        { name: 'Canh mồng tơi cua đồng gạch béo', portion: '1 tô', cal: 120, p: 11, c: 6, f: 5, emoji: '🥣' },
        { name: 'Dưa chuột thái lát', portion: '1 quả to', cal: 25, p: 1, c: 5, f: 0, emoji: '🥒' },
      ],
      dinner: [
        { name: 'Mực xào ớt chuông cần tỏi dầu oliu', portion: '180g', cal: 240, p: 32, c: 6, f: 9, emoji: '🦑' },
        { name: 'Rau muống xào tỏi tóp mỡ giòn', portion: '1 đĩa', cal: 180, p: 4, c: 8, f: 15, emoji: '🥬' },
      ],
      snacks: [
        { name: 'Phô mai miếng Laughing Cow (Con bò cười)', portion: '2 miếng', cal: 110, p: 5, c: 2, f: 9, emoji: '🧀' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Tăng cường chất béo thực vật lành mạnh',
      breakfast: [
        { name: 'Sinh tố bơ nước cốt dừa không đường', portion: '1 ly đặc', cal: 290, p: 4, c: 9, f: 28, emoji: '🥑' },
      ],
      lunch: [
        { name: 'Sườn heo nướng mọi', portion: '180g', cal: 420, p: 34, c: 2, f: 31, emoji: '🥩' },
        { name: 'Canh cải cúc nấu thịt nạc băm', portion: '1 tô', cal: 90, p: 9, c: 4, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cá hú / Cá lăng nướng muối ớt cuốn rau cải', portion: '170g', cal: 330, p: 32, c: 3, f: 21, emoji: '🐟' },
      ],
      snacks: [
        { name: 'Trứng gà luộc dầm tương', portion: '1 quả', cal: 85, p: 7, c: 1, f: 5.5, emoji: '🥚' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Đốt mỡ liên tục không gián đoạn',
      breakfast: [
        { name: 'Trứng cuộn thịt băm mộc nhĩ', portion: '2 quả', cal: 270, p: 19, c: 3, f: 20, emoji: '🍳' },
      ],
      lunch: [
        { name: 'Bò bít tết bơ tỏi sốt nấm', portion: '170g', cal: 420, p: 38, c: 3, f: 28, emoji: '🥩' },
        { name: 'Salad cà chua dưa leo dầu dừa', portion: '1 đĩa', cal: 90, p: 1.5, c: 6, f: 7, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Tôm rim ba rọi cốt dừa', portion: '150g', cal: 360, p: 29, c: 4, f: 25, emoji: '🦐' },
        { name: 'Canh mướp đắng nhồi thịt', portion: '1 tô', cal: 140, p: 14, c: 6, f: 6, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Hạt óc chó béo ngậy', portion: '20g', cal: 130, p: 3, c: 3, f: 13, emoji: '🌰' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Cơ thể nhẹ nhõm, eo thon thấy rõ',
      breakfast: [
        { name: 'Bánh mì Keto hạnh nhân kẹp pate trứng', portion: '1 phần', cal: 360, p: 20, c: 5, f: 28, emoji: '🥪' },
      ],
      lunch: [
        { name: 'Lẩu bò nấm riêu (không ăn bún/mì)', portion: '1 phần thịt đầy đặn', cal: 480, p: 46, c: 8, f: 29, emoji: '🍲' },
      ],
      dinner: [
        { name: 'Cánh gà chiên nước mắm không tẩm bột', portion: '3 cánh nhỏ', cal: 390, p: 34, c: 4, f: 26, emoji: '🍗' },
        { name: 'Canh bắp cải nấu gừng', portion: '1 tô', cal: 50, p: 2, c: 6, f: 1, emoji: '🥣' },
      ],
      snacks: [
        { name: '1 nắm hạt điều rang muối', portion: '20g', cal: 115, p: 4, c: 6, f: 9, emoji: '🥜' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Cân bằng vi khoáng & Thư giãn',
      breakfast: [
        { name: 'Thịt ba rọi xông khói áp chảo + 2 trứng lòng đào', portion: '1 đĩa', cal: 370, p: 22, c: 1, f: 31, emoji: '🥓' },
      ],
      lunch: [
        { name: 'Cá basa nướng mỡ hành đậu phộng', portion: '180g', cal: 410, p: 32, c: 4, f: 30, emoji: '🐟' },
        { name: 'Rau lang luộc dầm chanh', portion: '1 đĩa', cal: 45, p: 3, c: 7, f: 0.5, emoji: '🥬' },
      ],
      dinner: [
        { name: 'Gà kho gừng sả nước dừa đậm đà', portion: '160g', cal: 340, p: 36, c: 4, f: 20, emoji: '🍗' },
        { name: 'Canh su hào tôm nõn', portion: '1 tô', cal: 75, p: 8, c: 7, f: 1.5, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Sữa chua dừa béo ngậy không đường', portion: '1 hũ', cal: 130, p: 3, c: 4, f: 11, emoji: '🥥' },
      ],
    },
  ],

  // 6. ĂN CHAY THỰC DƯỠNG / GIỮ DÁNG (Plant-Based Healthy)
  vegetarian: [
    {
      day: 'Thứ 2',
      title: 'Nguồn đạm thực vật thanh tịnh & Tươi mát',
      breakfast: [
        { name: 'Bún riêu chay đậu hũ nấm rơm', portion: '1 tô', cal: 360, p: 16, c: 58, f: 8, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt muối mè', portion: '1 chén', cal: 190, p: 4.5, c: 40, f: 1.5, emoji: '🍚' },
        { name: 'Đậu hũ non sốt nấm đông cô dầu hào chay', portion: '1 đĩa', cal: 220, p: 18, c: 9, f: 12, emoji: '🍄' },
        { name: 'Canh chua chay bắp chuối đậu bắp', portion: '1 tô', cal: 85, p: 4, c: 14, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Chả giò chay cuộn nấm khoai môn', portion: '3 cuốn', cal: 210, p: 5, c: 26, f: 10, emoji: '🌯' },
        { name: 'Canh bí đỏ hầm hạt sen đậu phộng', portion: '1 tô', cal: 190, p: 7, c: 28, f: 6, emoji: '🥣' },
        { name: 'Rau bí xào tỏi chay', portion: '1 đĩa', cal: 90, p: 3, c: 8, f: 5, emoji: '🥬' },
      ],
      snacks: [
        { name: '1 ly sữa đậu nành tươi nguyên chất ít đường', portion: '250ml', cal: 110, p: 8, c: 10, f: 4, emoji: '🥛' },
      ],
    },
    {
      day: 'Thứ 3',
      title: 'Giàu chất xơ và cân bằng khoáng chất',
      breakfast: [
        { name: 'Bánh mì kẹp chả lụa chay pate nấm', portion: '1 ổ', cal: 340, p: 14, c: 52, f: 9, emoji: '🥖' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt hạt sen', portion: '1 chén', cal: 210, p: 5, c: 44, f: 2, emoji: '🍚' },
        { name: 'Nấm đùi gà kho tiêu sả', portion: '1 đĩa', cal: 160, p: 8, c: 14, f: 8, emoji: '🍄' },
        { name: 'Canh rong biển đậu phụ non hạt chia', portion: '1 tô', cal: 90, p: 7, c: 6, f: 4, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Khoai lang luộc', portion: '1 củ', cal: 130, p: 2, c: 30, f: 0, emoji: '🍠' },
        { name: 'Đậu phụ nướng giấy bạc sốt tương tamari', portion: '1 miếng lớn (150g)', cal: 180, p: 17, c: 4, f: 11, emoji: '🍢' },
        { name: 'Canh cải xanh nấu gừng tươi', portion: '1 tô', cal: 45, p: 2, c: 6, f: 1, emoji: '🥬' },
      ],
      snacks: [
        { name: 'Chuối chín rắc mè đen rang', portion: '1 quả', cal: 110, p: 2, c: 24, f: 1.5, emoji: '🍌' },
      ],
    },
    {
      day: 'Thứ 4',
      title: 'Nuôi dưỡng vi sinh đường ruột',
      breakfast: [
        { name: 'Cháo nấm rơm yến mạch hạt sen', portion: '1 tô', cal: 310, p: 12, c: 54, f: 5, emoji: '🥣' },
      ],
      lunch: [
        { name: 'Bún trộn chay chả nấm đậu phộng rau sống', portion: '1 tô to', cal: 430, p: 17, c: 68, f: 11, emoji: '🥗' },
      ],
      dinner: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Cà ri chay khoai tây đậu gà cà rốt', portion: '1 tô vừa', cal: 270, p: 11, c: 38, f: 9, emoji: '🍛' },
      ],
      snacks: [
        { name: '1 nắm hạt hạnh nhân + quả nho khô', portion: '25g', cal: 120, p: 3.5, c: 14, f: 6, emoji: '🍇' },
      ],
    },
    {
      day: 'Thứ 5',
      title: 'Thực dưỡng giải tỏa căng thẳng',
      breakfast: [
        { name: 'Bánh bao chay nhân nấm mộc nhĩ', portion: '1 cái to', cal: 260, p: 8, c: 48, f: 4, emoji: '🥟' },
        { name: 'Trà hoa cúc mật ong ấm', portion: '1 tách', cal: 35, p: 0, c: 9, f: 0, emoji: '🍵' },
      ],
      lunch: [
        { name: 'Cơm tấm sườn nấm rim nước tương', portion: '1 dĩa', cal: 480, p: 18, c: 76, f: 12, emoji: '🍽️' },
        { name: 'Canh mướp hương nấu nấm kim châm', portion: '1 tô', cal: 65, p: 3, c: 10, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Gỏi ngó sen tôm chay đậu hũ bóp thấu', portion: '1 đĩa to', cal: 260, p: 14, c: 32, f: 9, emoji: '🥗' },
        { name: 'Bắp ngô nếp luộc', portion: '1 bắp', cal: 140, p: 4, c: 29, f: 1.5, emoji: '🌽' },
      ],
      snacks: [
        { name: '1 quả táo tây giòn ngọt', portion: '1 quả', cal: 80, p: 0.5, c: 21, f: 0.3, emoji: '🍎' },
      ],
    },
    {
      day: 'Thứ 6',
      title: 'Tăng cường chất đạm thực vật từ các loại hạt',
      breakfast: [
        { name: 'Hủ tiếu chay sườn non nấm hương', portion: '1 tô', cal: 370, p: 15, c: 62, f: 7, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt hạt diêm mạch (Quinoa)', portion: '1 chén', cal: 200, p: 6, c: 40, f: 2, emoji: '🍚' },
        { name: 'Đậu hũ nhồi nấm mộc nhĩ sốt cà chua', portion: '1 đĩa', cal: 240, p: 19, c: 12, f: 13, emoji: '🍲' },
        { name: 'Canh rau ngót nấu bắp ngọt', portion: '1 tô', cal: 75, p: 5, c: 12, f: 1, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Bánh xèo chay nấm giá đỗ cuốn rau rừng', portion: '2 cái', cal: 360, p: 12, c: 54, f: 11, emoji: '🥬' },
      ],
      snacks: [
        { name: '1 hũ sữa chua nếp cẩm hạt sen', portion: '1 hũ', cal: 140, p: 4, c: 26, f: 2.5, emoji: '🍧' },
      ],
    },
    {
      day: 'Thứ 7',
      title: 'Thưởng thức ẩm thực chay phong phú',
      breakfast: [
        { name: 'Phở chay nấm đùi gà thanh ngọt', portion: '1 tô', cal: 380, p: 14, c: 64, f: 8, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm chiên trái thơm (dứa) hạt điều', portion: '1 đĩa', cal: 460, p: 13, c: 72, f: 14, emoji: '🍍' },
        { name: 'Canh tần ô (cải cúc) nấu nấm rơm', portion: '1 tô', cal: 60, p: 4, c: 8, f: 1, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Lẩu nấm dưỡng sinh thảo mộc (ăn cùng bún lứt)', portion: '1 suất vừa', cal: 420, p: 18, c: 66, f: 10, emoji: '🍄' },
      ],
      snacks: [
        { name: 'Trái bơ dầm sữa chua không đường', portion: '1 ly', cal: 180, p: 5, c: 16, f: 11, emoji: '🥑' },
      ],
    },
    {
      day: 'Chủ Nhật',
      title: 'Tâm an thân nhẹ, nạp đầy sức sống',
      breakfast: [
        { name: 'Mì Quảng chay sợi vàng đậu phụ sả ớt', portion: '1 tô', cal: 410, p: 17, c: 65, f: 9, emoji: '🍜' },
      ],
      lunch: [
        { name: 'Cơm gạo lứt', portion: '1 chén', cal: 180, p: 4, c: 40, f: 1, emoji: '🍚' },
        { name: 'Nấm bào ngư chiên giòn rắc mè', portion: '1 đĩa', cal: 210, p: 7, c: 18, f: 12, emoji: '🍄' },
        { name: 'Canh chua dọc mùng đậu bắp', portion: '1 tô', cal: 80, p: 3, c: 13, f: 1.5, emoji: '🥣' },
      ],
      dinner: [
        { name: 'Cháo gạo lứt đậu đỏ hạt sen an thần', portion: '1 tô ấm', cal: 280, p: 11, c: 52, f: 3, emoji: '🥣' },
      ],
      snacks: [
        { name: 'Nước ép dưa hấu tươi mát', portion: '1 ly', cal: 70, p: 1, c: 16, f: 0.2, emoji: '🍉' },
      ],
    },
  ],
};

/**
 * Hàm tạo Thực đơn theo Ngày và tự động cân chỉnh khẩu phần để đạt CHÍNH XÁC lượng calo mục tiêu của người dùng!
 */
export function generateDailyMealPlan(modeId, targetCalories = 1800, dayIndex = 0) {
  const plansForMode = BASE_MEAL_PLANS[modeId] || BASE_MEAL_PLANS.cardio_toning;
  const safeDayIndex = ((dayIndex % plansForMode.length) + plansForMode.length) % plansForMode.length;
  const baseDayPlan = plansForMode[safeDayIndex];

  // Tính tổng calo gốc của ngày mẫu
  const calculatePlanCalories = (plan) => {
    let sum = 0;
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach((mealKey) => {
      (plan[mealKey] || []).forEach((item) => {
        sum += item.cal;
      });
    });
    return sum;
  };

  const baseTotalCal = calculatePlanCalories(baseDayPlan);
  // Hệ số co giãn khẩu phần
  const scaleRatio = targetCalories / (baseTotalCal || 1800);

  // Điều chỉnh từng món ăn theo tỷ lệ
  const scaledMeals = {};
  ['breakfast', 'lunch', 'dinner', 'snacks'].forEach((mealKey) => {
    scaledMeals[mealKey] = (baseDayPlan[mealKey] || []).map((item, idx) => {
      const scaledCal = Math.round(item.cal * scaleRatio);
      const scaledP = Math.round(item.p * scaleRatio * 10) / 10;
      const scaledC = Math.round(item.c * scaleRatio * 10) / 10;
      const scaledF = Math.round(item.f * scaleRatio * 10) / 10;

      // Làm tròn khẩu phần hiển thị
      let portionText = item.portion;
      if (Math.abs(scaleRatio - 1) > 0.15) {
        if (scaleRatio > 1.25) {
          portionText += ` (+${Math.round((scaleRatio - 1) * 100)}% lượng)`;
        } else if (scaleRatio < 0.85) {
          portionText += ` (-${Math.round((1 - scaleRatio) * 100)}% lượng)`;
        }
      }

      return {
        id: `plan-item-${safeDayIndex}-${mealKey}-${idx}-${Date.now()}`,
        foodId: `custom-plan-${idx}`,
        name: item.name,
        portion: portionText,
        servingUnit: portionText,
        quantity: 1,
        calories: scaledCal,
        protein: scaledP,
        carbs: scaledC,
        fat: scaledF,
        emoji: item.emoji || '🍲',
      };
    });
  });

  // Tính tổng sau khi scale
  const totalCal = Object.values(scaledMeals).flat().reduce((s, it) => s + it.calories, 0);
  const totalP = Object.values(scaledMeals).flat().reduce((s, it) => s + it.protein, 0);
  const totalC = Object.values(scaledMeals).flat().reduce((s, it) => s + it.carbs, 0);
  const totalF = Object.values(scaledMeals).flat().reduce((s, it) => s + it.fat, 0);

  return {
    day: baseDayPlan.day,
    dayIndex: safeDayIndex,
    title: baseDayPlan.title,
    meals: scaledMeals,
    totals: {
      calories: totalCal,
      protein: Math.round(totalP),
      carbs: Math.round(totalC),
      fat: Math.round(totalF),
    },
  };
}
