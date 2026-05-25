import { lessons } from "./lessons";

export type CurriculumLevel = "foundation" | "beginner" | "intermediate" | "advanced";

export interface CurriculumTopic {
  title: string;
  slug?: string;
  level: CurriculumLevel;
  outcome: string;
}

export interface CurriculumTrack {
  id: string;
  title: string;
  description: string;
  topics: CurriculumTopic[];
}

const availableLessonSlugs = new Set(lessons.map((lesson) => lesson.slug));

export const curriculum: CurriculumTrack[] = [
  {
    id: "foundations",
    title: "Nền tảng tư duy thuật toán",
    description:
      "Giúp người mới hiểu thuật toán là gì, input/output, điều kiện, vòng lặp, trace và Big-O.",
    topics: [
      {
        title: "Thuật toán là gì?",
        slug: "thuat-toan-la-gi",
        level: "foundation",
        outcome: "Nhìn thuật toán như một chuỗi bước đời thường.",
      },
      {
        title: "Input, output và biến",
        level: "foundation",
        outcome: "Biết mô tả bài toán trước khi code.",
      },
      {
        title: "Điều kiện if/else",
        level: "foundation",
        outcome: "Hiểu cách máy tính rẽ nhánh theo điều kiện.",
      },
      {
        title: "Vòng lặp",
        level: "foundation",
        outcome: "Biết lặp qua danh sách và đếm số bước.",
      },
      {
        title: "Big-O thật đơn giản",
        slug: "big-o-don-gian",
        level: "foundation",
        outcome: "Ước lượng tốc độ tăng của thuật toán.",
      },
    ],
  },
  {
    id: "arrays-searching-sorting",
    title: "Mảng, tìm kiếm và sắp xếp",
    description:
      "Nhóm bài đầu tiên để luyện tư duy duyệt mảng, so sánh, đổi chỗ và tìm kiếm.",
    topics: [
      {
        title: "Array",
        level: "beginner",
        outcome: "Hiểu chỉ số, truy cập phần tử và duyệt mảng.",
      },
      {
        title: "Linear Search",
        slug: "linear-search",
        level: "beginner",
        outcome: "Tìm bằng cách kiểm tra từng phần tử.",
      },
      {
        title: "Binary Search",
        slug: "binary-search",
        level: "beginner",
        outcome: "Tìm nhanh trong dữ liệu đã sắp xếp.",
      },
      {
        title: "Bubble Sort",
        slug: "bubble-sort",
        level: "beginner",
        outcome: "Hiểu so sánh và đổi chỗ qua từng cặp.",
      },
      {
        title: "Selection Sort",
        slug: "selection-sort",
        level: "beginner",
        outcome: "Tìm phần tử nhỏ nhất và đặt vào đúng vị trí.",
      },
      {
        title: "Insertion Sort",
        slug: "insertion-sort",
        level: "beginner",
        outcome: "Sắp xếp giống cách chèn bài trên tay.",
      },
      {
        title: "Merge Sort",
        slug: "merge-sort",
        level: "intermediate",
        outcome: "Hiểu chia để trị và merge hai mảng đã sắp xếp.",
      },
      {
        title: "Quick Sort",
        slug: "quick-sort",
        level: "intermediate",
        outcome: "Hiểu pivot, partition và trade-off.",
      },
      {
        title: "Counting Sort",
        slug: "counting-sort",
        level: "intermediate",
        outcome: "Đếm tần suất để sắp xếp số nguyên trong khoảng nhỏ.",
      },
      {
        title: "Radix Sort",
        slug: "radix-sort",
        level: "intermediate",
        outcome: "Sắp xếp số nguyên theo từng chữ số bằng stable sort.",
      },
    ],
  },
  {
    id: "patterns",
    title: "Pattern giải bài phổ biến",
    description:
      "Các kỹ thuật xuất hiện liên tục trong bài tập phỏng vấn và lập trình thi đấu.",
    topics: [
      {
        title: "Two Pointers",
        level: "beginner",
        outcome: "Dùng hai con trỏ để thu hẹp hoặc quét mảng.",
      },
      {
        title: "Sliding Window",
        level: "intermediate",
        outcome: "Xử lý đoạn con liên tiếp hiệu quả.",
      },
      {
        title: "Prefix Sum",
        level: "beginner",
        outcome: "Tính tổng đoạn nhanh sau khi tiền xử lý.",
      },
      {
        title: "Difference Array",
        level: "intermediate",
        outcome: "Cập nhật nhiều đoạn nhanh.",
      },
      {
        title: "Recursion",
        level: "beginner",
        outcome: "Hiểu hàm gọi lại chính nó qua bài toán nhỏ hơn.",
      },
      {
        title: "Backtracking",
        level: "intermediate",
        outcome: "Thử lựa chọn, quay lui khi sai.",
      },
      {
        title: "Greedy",
        level: "intermediate",
        outcome: "Chọn quyết định tốt nhất tại từng bước và kiểm chứng.",
      },
    ],
  },
  {
    id: "data-structures",
    title: "Cấu trúc dữ liệu cốt lõi",
    description:
      "Dựa trên roadmap cấu trúc dữ liệu rộng: từ array, linked list đến heap, hash table và DSU.",
    topics: [
      {
        title: "Linked List",
        level: "beginner",
        outcome: "Hiểu node, con trỏ next và thao tác chèn/xóa.",
      },
      {
        title: "Dynamic Array",
        level: "beginner",
        outcome: "Hiểu cách vector/list tự mở rộng bộ nhớ.",
      },
      {
        title: "Stack",
        level: "beginner",
        outcome: "Dùng LIFO để xử lý ngoặc, undo, DFS.",
      },
      {
        title: "Queue",
        level: "beginner",
        outcome: "Dùng FIFO để xử lý hàng đợi và BFS.",
      },
      {
        title: "Deque",
        level: "intermediate",
        outcome: "Thao tác hai đầu và tối ưu sliding window.",
      },
      {
        title: "Set và Multiset",
        level: "beginner",
        outcome: "Lưu phần tử duy nhất hoặc có đếm số lần xuất hiện.",
      },
      {
        title: "Hash Table",
        level: "beginner",
        outcome: "Tra cứu nhanh bằng key.",
      },
      {
        title: "Priority Queue",
        level: "intermediate",
        outcome: "Luôn lấy phần tử ưu tiên nhất.",
      },
      {
        title: "Heap",
        level: "intermediate",
        outcome: "Hiểu cấu trúc phía sau priority queue.",
      },
      {
        title: "Disjoint Set Union",
        level: "intermediate",
        outcome: "Quản lý các nhóm rời nhau bằng union/find.",
      },
    ],
  },
  {
    id: "trees-advanced-structures",
    title: "Cây và cấu trúc dữ liệu nâng cao",
    description:
      "Nhóm chủ đề dùng nhiều trong bài toán truy vấn đoạn, cây, dữ liệu lớn và competitive programming.",
    topics: [
      {
        title: "Binary Tree",
        level: "intermediate",
        outcome: "Duyệt cây theo preorder, inorder, postorder.",
      },
      {
        title: "Binary Search Tree",
        level: "intermediate",
        outcome: "Tìm, chèn, xóa dựa trên thứ tự.",
      },
      {
        title: "Segment Tree",
        level: "advanced",
        outcome: "Trả lời truy vấn đoạn và cập nhật nhanh.",
      },
      {
        title: "Fenwick Tree",
        level: "advanced",
        outcome: "Tối ưu prefix sum động.",
      },
      {
        title: "Sqrt Decomposition",
        level: "advanced",
        outcome: "Chia căn để cân bằng truy vấn và cập nhật.",
      },
      {
        title: "Lowest Common Ancestor",
        level: "advanced",
        outcome: "Tìm tổ tiên chung thấp nhất trên cây.",
      },
      {
        title: "Binary Lifting",
        level: "advanced",
        outcome: "Nhảy nhanh theo lũy thừa hai trên cây.",
      },
      {
        title: "Heavy Light Decomposition",
        level: "advanced",
        outcome: "Biến truy vấn trên cây thành truy vấn trên đoạn.",
      },
      {
        title: "Persistent Data Structures",
        level: "advanced",
        outcome: "Lưu nhiều phiên bản dữ liệu sau cập nhật.",
      },
    ],
  },
  {
    id: "graphs",
    title: "Graph",
    description:
      "Từ duyệt đồ thị cơ bản đến đường đi ngắn nhất, cây khung nhỏ nhất và thành phần liên thông.",
    topics: [
      {
        title: "Graph là gì?",
        level: "beginner",
        outcome: "Hiểu đỉnh, cạnh, có hướng và vô hướng.",
      },
      {
        title: "BFS",
        level: "beginner",
        outcome: "Duyệt theo lớp, tìm đường đi ít cạnh nhất.",
      },
      {
        title: "DFS",
        level: "beginner",
        outcome: "Duyệt sâu, dùng cho component và backtracking.",
      },
      {
        title: "Topological Sort",
        level: "intermediate",
        outcome: "Sắp xếp thứ tự công việc có phụ thuộc.",
      },
      {
        title: "Dijkstra",
        level: "intermediate",
        outcome: "Tìm đường đi ngắn nhất với trọng số không âm.",
      },
      {
        title: "Bellman-Ford",
        level: "advanced",
        outcome: "Xử lý cạnh âm và phát hiện chu trình âm.",
      },
      {
        title: "Floyd-Warshall",
        level: "advanced",
        outcome: "Tìm đường đi ngắn nhất giữa mọi cặp đỉnh.",
      },
      {
        title: "Minimum Spanning Tree",
        level: "intermediate",
        outcome: "Nối tất cả đỉnh với tổng chi phí nhỏ nhất.",
      },
      {
        title: "Strongly Connected Components",
        level: "advanced",
        outcome: "Tìm nhóm đỉnh đi tới nhau được trong đồ thị có hướng.",
      },
      {
        title: "Max Flow",
        level: "advanced",
        outcome: "Tối ưu luồng qua mạng.",
      },
    ],
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description:
      "Học cách chia bài toán thành trạng thái, chuyển trạng thái và tránh tính lại.",
    topics: [
      {
        title: "DP là gì?",
        level: "intermediate",
        outcome: "Nhận ra bài toán có bài toán con lặp lại.",
      },
      {
        title: "Memoization",
        level: "intermediate",
        outcome: "Dùng cache cho recursion.",
      },
      {
        title: "Tabulation",
        level: "intermediate",
        outcome: "Xây bảng từ trạng thái nhỏ đến lớn.",
      },
      {
        title: "Knapsack",
        level: "intermediate",
        outcome: "Chọn đồ tối ưu với giới hạn trọng lượng.",
      },
      {
        title: "Longest Increasing Subsequence",
        level: "intermediate",
        outcome: "Tìm dãy con tăng dài nhất.",
      },
      {
        title: "Longest Common Subsequence",
        level: "intermediate",
        outcome: "So sánh hai chuỗi bằng DP hai chiều.",
      },
      {
        title: "Tree DP",
        level: "advanced",
        outcome: "Làm DP trên cấu trúc cây.",
      },
      {
        title: "Bitmask DP",
        level: "advanced",
        outcome: "Biểu diễn tập hợp bằng bit.",
      },
    ],
  },
  {
    id: "strings-number-theory",
    title: "Chuỗi và số học",
    description:
      "Các thuật toán xử lý chuỗi, tìm mẫu, tiền tố, số nguyên tố và modular arithmetic.",
    topics: [
      {
        title: "String basics",
        level: "beginner",
        outcome: "Duyệt chuỗi, so sánh ký tự, đếm tần suất.",
      },
      {
        title: "Trie",
        level: "intermediate",
        outcome: "Lưu tập từ và tìm prefix nhanh.",
      },
      {
        title: "KMP",
        level: "advanced",
        outcome: "Tìm mẫu trong chuỗi bằng prefix function.",
      },
      {
        title: "Z Algorithm",
        level: "advanced",
        outcome: "Tính đoạn trùng prefix nhanh.",
      },
      {
        title: "Suffix Array",
        level: "advanced",
        outcome: "Sắp xếp suffix để xử lý truy vấn chuỗi.",
      },
      {
        title: "GCD và LCM",
        level: "beginner",
        outcome: "Dùng Euclid để tính ước chung lớn nhất.",
      },
      {
        title: "Prime Sieve",
        level: "intermediate",
        outcome: "Sàng số nguyên tố hiệu quả.",
      },
      {
        title: "Modular Arithmetic",
        level: "intermediate",
        outcome: "Xử lý số lớn bằng modulo.",
      },
    ],
  },
];

export function isTopicAvailable(topic: CurriculumTopic): boolean {
  return Boolean(topic.slug && availableLessonSlugs.has(topic.slug));
}

export function countAvailableTopics(track: CurriculumTrack): number {
  return track.topics.filter(isTopicAvailable).length;
}

export function countAllTopics(): number {
  return curriculum.reduce((total, track) => total + track.topics.length, 0);
}

export function countAvailableLessons(): number {
  return curriculum.reduce((total, track) => total + countAvailableTopics(track), 0);
}
