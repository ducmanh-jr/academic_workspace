# JRFN Algorithm

Nền tảng học thuật toán đơn giản, dễ hiểu, đầy đủ và có hệ thống cho người mới.

## Nguyên Tắc Sản Phẩm

1. Mỗi bài học bắt đầu từ bài toán đời thường, không bắt đầu bằng code.
2. Ví dụ phải nhỏ, có thể trace bằng tay trong vài phút.
3. Giải thích từng bước trước, code sau.
4. Mỗi thuật toán cần có lý thuyết, ví dụ, trace, pseudocode, code, Big-O, lỗi thường gặp và bài tập.
5. Curriculum phải đủ rộng để phủ từ nền tảng đến nâng cao.

## Kiến Trúc Nội Dung

- `lib/curriculum.ts`: bản đồ đầy đủ các nhóm thuật toán/cấu trúc dữ liệu cần học.
- `lib/lessons.ts`: nội dung chi tiết cho những bài đã mở.
- `/`: roadmap tổng quan, tách rõ bài học có thể học ngay và chủ đề sắp mở.
- `/lessons/[slug]`: layout bài học dùng chung cho mọi thuật toán.

Mục tiêu dài hạn là phủ toàn bộ curriculum: nền tảng tư duy thuật toán, mảng, tìm kiếm, sắp xếp, pattern giải bài, cấu trúc dữ liệu, cây, graph, dynamic programming, chuỗi, số học và các cấu trúc nâng cao.

## Chạy Local

Cách nhanh trên Windows:

```bat
start.bat
```

Cách thủ công:

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.
