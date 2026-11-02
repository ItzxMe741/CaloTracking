<div align="center">

# 🥗 CaloTrack VN
### Ứng Dụng Tính Calo & Thực Đơn Dinh Dưỡng Theo Vóc Dáng Chuẩn Việt

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)](LICENSE)

*Theo dõi calo, đa lượng (Protein - Carbs - Fat) và tự động lên thực đơn 7 ngày chuẩn món ăn Việt Nam theo từng chế độ tập luyện & vóc dáng.*

[Trải Nghiệm Trực Tuyến](#-triển-khai-lên-web-miễn-phí) • [Tính Năng Nổi Bật](#-tính-năng-nổi-bật) • [Cài Đặt & Chạy](#-hướng-dẫn-cài-đặt--chạy-dự-án) • [Chế Độ Vóc Dáng](#-7-chế-độ-vóc-dáng-chuyên-sâu)

</div>

---

## 📖 Giới Thiệu

Hầu hết các ứng dụng theo dõi calo hiện nay trên thế giới đều dựa trên dữ liệu món Tây (pizza, burger, bánh mì sandwich sốt bơ, pasta...), khiến việc ghi chép bữa ăn gia đình và hàng quán Việt Nam (*phở bò, cơm tấm sườn chả, bún bò Huế, bánh cuốn, canh chua...*) gặp nhiều khó khăn và sai lệch lớn.

**CaloTrack VN** được xây dựng nhằm giải quyết bài toán đó:
1. **Dữ liệu chuẩn Việt:** Cơ sở dữ liệu hàng trăm món ăn và thức uống quen thuộc tại Việt Nam với lượng calo và bộ ba đa lượng (Macro: Protein - Carbs - Fat) chuẩn xác.
2. **Cá nhân hóa theo Thể trạng:** Tính toán BMR & TDEE theo công thức **Mifflin-St Jeor** chuẩn y khoa dựa trên Chiều cao, Cân nặng, Tuổi và Giới tính. Đánh giá BMI chuẩn thể trạng người châu Á (WHO).
3. **Thực đơn thông minh 7 ngày:** Tự động co giãn khẩu phần món ăn *(ví dụ: 1.2 bát phở, 180g ức gà...)* để tổng năng lượng trong ngày khớp chính xác 100% với mục tiêu cơ thể bạn.
4. **Trợ lý AI Thông minh (Dual Engine):** Nhận diện và ước lượng calo từ mô tả tự do hoặc ảnh chụp món ăn qua Google Gemini Vision và bộ máy suy luận tiếng Việt tích hợp sẵn.

---

## ✨ Tính Năng Nổi Bật

### 1. 🍱 Thực Đơn 7 Ngày Thông Minh & Co Giãn Khẩu Phần Tự Động
- Lên sẵn thực đơn chuẩn 4 bữa *(Sáng, Trưa, Tối, Phụ)* từ Thứ 2 đến Chủ Nhật.
- Tự động điều chỉnh định lượng theo mức calo mục tiêu của từng cá nhân.
- **Đổi thực đơn 1 chạm (🎲):** Thay đổi linh hoạt các món ăn để không bị ngấy.
- **Áp dụng vào nhật ký (🚀):** Tự động điền thực đơn cả ngày vào bảng nhật ký theo dõi mà không cần gõ tay từng món.

### 2. 🏃‍♂️ 7 Chế Độ Vóc Dáng & Tập Luyện Chuyên Sâu
| Chế độ | Biểu tượng | Điều chỉnh Calo | Phân bổ Macro (Đạm / Carb / Béo) | Mục tiêu chính |
|---|:---:|:---:|:---:|---|
| **Cardio Tăng Cơ (Hybrid Athlete)** | 🏃‍♂️⚡ | +100 kcal | **35% P • 45% C • 20% F** | Vừa tăng sức bền tim mạch vừa xây dựng cơ nạc, đạm cực cao chống dị hóa cơ |
| **Cardio đẹp dáng & Săn chắc** | 🏃‍♀️ | -250 kcal | **30% P • 45% C • 25% F** | Siết eo thon gọn, nâng cơ vòng 3, năng lượng dẻo dai |
| **Giảm mỡ cấp tốc / Siết eo** | 🔥 | -500 kcal | **35% P • 35% C • 30% F** | Ép mỡ thừa vùng bụng & đùi, bảo tồn tối đa cơ bắp |
| **Tăng cơ nạc (Gym & Bulking)** | 💪 | +350 kcal | **30% P • 50% C • 20% F** | Thặng dư năng lượng thông minh, kích thích phì đại sợi cơ |
| **Eat Clean thuần Việt** | 🥗 | Chuẩn TDEE | **25% P • 50% C • 25% F** | Thực phẩm nguyên bản, giảm muối đường, thanh lọc cơ thể |
| **Low-Carb siết mỡ vòng 2** | 🥑 | -350 kcal | **30% P • 20% C • 50% F** | Cắt giảm tinh bột nhanh, giàu chất béo tốt (bơ, trứng, hạt) |
| **Ăn chay thực dưỡng** | 🌱 | -200 kcal | **22% P • 53% C • 25% F** | Đạm thực vật từ đậu hũ, nấm, hạt ngũ cốc, giàu chất xơ |

### 3. 🤖 Trợ Lý AI Ước Tính Calo & Dinh Dưỡng
- **Quét bằng mô tả tự do:** Nhập ngôn ngữ tự nhiên *(ví dụ: "1 bát bún chả nhiều thịt nướng, 1 đĩa bún nhỏ và 1 cốc nước mía")*.
- **Quét qua ảnh chụp:** Tải ảnh món ăn trực tiếp từ điện thoại hoặc máy tính.
- **Cơ chế Hybrid:** Hỗ trợ kết nối **Google Gemini 2.5 Flash**, đồng thời tích hợp sẵn **bộ máy suy luận từ khóa tiếng Việt offline** giúp trải nghiệm mượt mà ngay cả khi chưa có API Key!

### 4. 📊 Nhật Ký Dinh Dưỡng 4 Bữa & Thống Kê
- Vòng tròn tiến độ calo trực quan, cảnh báo thiếu/vượt chỉ tiêu.
- Thống kê tỷ lệ gam và phần trăm 3 nhóm đa lượng: **Protein**, **Carbs**, **Fat**.
- Biểu đồ cột theo dõi xu hướng 7 ngày gần nhất.
- Hiệu ứng pháo hoa chúc mừng khi đạt chuẩn mục tiêu dinh dưỡng.
- Tự động lưu trữ an toàn trong `localStorage` trên trình duyệt và hỗ trợ sao lưu dữ liệu dạng file JSON.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend Core:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animation & Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **AI Integration:** Google Gemini API (Vision & Text) + Smart Local Fallback Engine
- **Storage:** LocalStorage Web API with JSON Export/Import

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Hệ Thống
- [Node.js](https://nodejs.org/) (phiên bản 18+ hoặc mới hơn)
- npm / yarn / pnpm

### Các Bước Thực Hiện

1. **Clone repository:**
   ```bash
   git clone https://github.com/ItzxMe741/CaloTracking.git
   cd CaloTracking
   ```

2. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   # hoặc trên Windows PowerShell:
   npm.cmd install
   ```

3. **Khởi chạy môi trường phát triển (Dev Server):**
   ```bash
   npm run dev -- --host
   # hoặc trên Windows PowerShell:
   npm.cmd run dev -- --host
   ```
   Sau đó mở trình duyệt:
   - **Máy tính:** `http://localhost:5173`
   - **Điện thoại (cùng mạng Wi-Fi):** Xem địa chỉ IP hiển thị trên terminal (ví dụ: `http://192.168.x.x:5173`).

4. **Đóng gói mã nguồn (Production Build):**
   ```bash
   npm run build
   ```
   Thư mục tối ưu hóa sẵn sàng triển khai nằm trong thư mục `dist/`.

---

## 🌐 Triển Khai Lên Web Miễn Phí

### Cách 1: Triển khai qua Netlify Drop (30 giây - Không cần gõ lệnh)
1. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
2. Kéo thả cả thư mục `dist/` vào trang web Netlify.
3. Nhận ngay đường link web HTTPS vĩnh viễn miễn phí (ví dụ: `https://calotrack.netlify.app`).

### Cách 2: Triển khai qua Vercel
1. Chạy lệnh:
   ```bash
   npx vercel
   ```
2. Đăng nhập và làm theo hướng dẫn trên terminal. Dự án đã có sẵn cấu hình [`vercel.json`](./vercel.json) để xử lý Client-side routing.

---

## 📱 Mẹo: Cài Đặt Làm Ứng Dụng Màn Hình Chính (PWA / Web App)

Sau khi đưa ứng dụng lên web, bạn có thể biến nó thành ứng dụng trên điện thoại:
- **iPhone (Safari):** Bấm nút **Chia sẻ** (biểu tượng ô vuông mũi tên) $\rightarrow$ Chọn **"Thêm vào Màn hình chính" (Add to Home Screen)**.
- **Android (Chrome):** Bấm biểu tượng dấu **3 chấm** ở góc trên $\rightarrow$ Chọn **"Cài đặt ứng dụng"** hoặc **"Thêm vào màn hình chính"**.

---

## 📄 Bản Quyền & Giấy Phép (License)

Dự án được phát hành theo giấy phép [MIT License](LICENSE). Được phát triển với đam mê dinh dưỡng và sức khỏe cộng đồng.
