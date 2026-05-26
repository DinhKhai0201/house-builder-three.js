# Thiết Kế Japandi Cho Nhà Cấp 4 Nở Hậu (2.5m - 3.0m)

Dự án mô phỏng và hiển thị phương án thiết kế kiến trúc tối giản theo phong cách **Japandi** cho một ngôi nhà cấp 4 có hình dáng đặc thù: mặt tiền hẹp **2.5m** và nở hậu dần đến **3.0m** ở cuối nhà, với tổng chiều dài công năng mô phỏng là **26.7m** (trên khu đất dự kiến **32m**).

Mục tiêu cốt lõi của dự án là giữ đúng tỷ lệ kích thước thực tế của ngôi nhà để tránh cảm giác rộng giả, giúp chủ nhà và thợ thi công có cái nhìn thực tế và chính xác nhất.

---

## 🛠️ Công Nghệ Sử Dụng

Dự án được xây dựng dựa trên các công nghệ hiện đại phục vụ cho việc dựng hình và tương tác 3D trên môi trường Web:

*   **Framework chính:** React 19 + Vite (đảm bảo tốc độ phản hồi cực nhanh).
*   **Đồ họa 3D:** Three.js phối hợp cùng `@react-three/fiber` (R3F) và `@react-three/drei`.
*   **Giao diện & Styling:** Vanilla CSS tối giản, hiện đại, hỗ trợ Responsive đầy đủ.

---

## 📐 Cấu Trúc Phân Chia Không Gian (Segments)

Ngôi nhà được chia làm 8 khu vực chức năng nối tiếp nhau từ trước ra sau:

1.  **Sân trước (0.8m):** Khoảng đệm tiếp cận.
2.  **Phòng khách + Bàn thờ (5.0m):** Không gian sinh hoạt chung, bàn thờ được bố trí khéo léo ở vách ngăn chuyển tiếp.
3.  **Bếp + Phòng ăn (5.7m):** Không gian mở kết nối liền mạch từ phòng khách.
4.  **Phòng ngủ 1 (2.7m):** Phòng ngủ nhỏ dọc hành lang (rộng 0.8m bên phải).
5.  **Phòng ngủ 2 (2.7m):** Phòng ngủ nhỏ thứ hai dọc hành lang.
6.  **WC + Tắm (1.8m):** Khu vệ sinh chung cuối hành lang.
7.  **Phòng ngủ Master (6.0m):** Phòng ngủ chính rộng rãi nằm ở cuối nhà, có cửa kính lớn nhìn ra sân sau.
8.  **Sân sau (2.0m):** Lấy sáng, thông gió tự nhiên cho phòng Master.

---

## 🏗️ Cấu Trúc Thư Mục Dự Án

```text
├── public/                 # Các tài nguyên tĩnh
├── src/
│   ├── data/
│   │   └── housePlan.js    # Định nghĩa dữ liệu kích thước, màu sắc và ghi chú
│   ├── three/
│   │   ├── modules/        # Các module nội thất 3D (Living, Kitchen, Bedroom, WC, Master, Yard)
│   │   │   ├── BathModule.jsx
│   │   │   ├── BedroomModule.jsx
│   │   │   ├── KitchenModule.jsx
│   │   │   ├── LivingModule.jsx
│   │   │   ├── MasterModule.jsx
│   │   │   └── YardModule.jsx
│   │   ├── DoorLeaf.jsx    # Component cửa mở/đóng 3D
│   │   ├── HouseLabels.jsx # Nhãn thông tin khu vực
│   │   ├── HouseModel.jsx  # Tổng hợp dựng hình ngôi nhà 3D
│   │   ├── RoofSystem.jsx  # Hệ thống mái nhà (mái tôn & mê đổ WC/Master)
│   │   ├── RoomBlock.jsx   # Khối phòng cơ bản
│   │   ├── roomStyles.js   # Style màu sắc chất liệu 3D
│   │   └── roomUtils.js    # Tiện ích tính toán tọa độ nở hậu
│   ├── App.jsx             # Giao diện chính của ứng dụng
│   ├── DetailedFloorPlan.jsx # Bản vẽ mặt bằng 2D tương tác
│   ├── HouseScene.jsx      # Canvas Three.js và điều khiển camera (OrbitControls)
│   ├── SceneErrorBoundary.jsx # Xử lý lỗi render 3D
│   ├── main.jsx            # Entrypoint của React
│   └── styles.css          # CSS Styling cho toàn bộ ứng dụng
├── index.html              # Template HTML chính
├── package.json
└── vite.config.js
```

---

## ⚡ Hướng Dẫn Chạy Dự Án

### Yêu cầu cài đặt
*   Đã cài đặt **Node.js** (Khuyến nghị phiên bản LTS mới nhất).

### Các bước khởi chạy:

1.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

2.  **Chạy môi trường phát triển (Development server):**
    ```bash
    npm run dev
    ```
    Mở trình duyệt truy cập địa chỉ được hiển thị trên terminal (thông thường là `http://localhost:5173`).

3.  **Build sản phẩm (Production build):**
    ```bash
    npm run build
    ```

---

## 💡 Các Nguyên Tắc Thiết Kế Thực Tế Cần Giữ

*   **Không gian Japandi:** Tông màu sáng ấm (beige, gỗ nhạt, trắng kem), tận dụng tối đa ánh sáng tự nhiên.
*   **Trục nhìn xuyên suốt:** Giữ tầm nhìn thông suốt từ cửa chính qua phòng khách đến bếp ăn để tạo cảm giác rộng rãi.
*   **Hành lang thông minh:** Hành lang rộng 0.8m chỉ bắt đầu xuất hiện từ khu vực phòng ngủ 1 để nhường diện tích tối đa cho phòng khách và bếp.
*   **Đúng tỷ lệ thực:** Không kéo giãn hay bóp méo kích thước trong mô phỏng 3D để đảm bảo tính thực tiễn khi thi công thực tế ngoài đời.
