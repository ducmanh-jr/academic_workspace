export type ProblemDifficulty = "easy" | "medium" | "hard";

export interface ClassicProblem {
  slug: string;
  title: string;
  originalName: string;
  difficulty: ProblemDifficulty;
  category: string;
  relatedAlgorithms: string[];
  summary: string;
  story: string;
  input: string;
  output: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  approach: string[];
  pitfalls: string[];
  complexity: {
    time: string;
    space: string;
  };
  lessonSlugs: string[];
}

export const classicProblems: ClassicProblem[] = [
  {
    slug: "two-sum",
    title: "Tìm hai số có tổng bằng K",
    originalName: "Two Sum",
    difficulty: "easy",
    category: "Array / Hash Table",
    relatedAlgorithms: ["Hash Table", "Linear Scan"],
    summary: "Bài nhập môn kinh điển để hiểu cách đổi tìm kiếm O(n²) thành O(n).",
    story:
      "Bạn có một danh sách giá tiền và cần chọn đúng hai món sao cho tổng tiền bằng ngân sách K.",
    input: "Một mảng số nguyên nums và một số target.",
    output: "Hai chỉ số i, j sao cho nums[i] + nums[j] = target.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "2 + 7 = 9 nên lấy hai vị trí 0 và 1.",
      },
    ],
    approach: [
      "Duyệt từng số từ trái sang phải.",
      "Với mỗi số x, tính phần còn thiếu là target - x.",
      "Nếu phần còn thiếu đã xuất hiện trong bảng nhớ, ta tìm được đáp án.",
      "Nếu chưa, lưu x cùng vị trí hiện tại vào bảng nhớ.",
    ],
    pitfalls: [
      "Không được dùng cùng một phần tử hai lần.",
      "Cẩn thận khi có số trùng nhau, ví dụ [3, 3] với target = 6.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    lessonSlugs: ["linear-search"],
  },
  {
    slug: "valid-parentheses",
    title: "Kiểm tra ngoặc hợp lệ",
    originalName: "Valid Parentheses",
    difficulty: "easy",
    category: "Stack",
    relatedAlgorithms: ["Stack"],
    summary: "Bài kinh điển để hiểu cấu trúc LIFO: cái mở sau phải đóng trước.",
    story:
      "Một trình soạn thảo code cần kiểm tra nhanh chuỗi ngoặc người dùng nhập có cân bằng không.",
    input: "Một chuỗi chỉ gồm (, ), [, ], {, }.",
    output: "true nếu chuỗi ngoặc hợp lệ, ngược lại false.",
    examples: [
      {
        input: "s = \"({[]})\"",
        output: "true",
        explanation: "Mỗi ngoặc đóng đều khớp với ngoặc mở gần nhất.",
      },
      {
        input: "s = \"([)]\"",
        output: "false",
        explanation: "Dấu ) đóng sai vì ngoặc mở gần nhất là [.",
      },
    ],
    approach: [
      "Khi gặp ngoặc mở, đưa nó vào stack.",
      "Khi gặp ngoặc đóng, lấy phần tử trên cùng của stack ra so sánh.",
      "Nếu không khớp hoặc stack rỗng khi cần đóng, chuỗi sai.",
      "Cuối cùng stack phải rỗng thì chuỗi mới hợp lệ.",
    ],
    pitfalls: [
      "Quên kiểm tra stack rỗng trước khi pop.",
      "Chỉ đếm số lượng ngoặc mà không kiểm tra thứ tự lồng nhau.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    lessonSlugs: [],
  },
  {
    slug: "binary-search-answer",
    title: "Tìm đáp án nhỏ nhất thỏa điều kiện",
    originalName: "Binary Search on Answer",
    difficulty: "medium",
    category: "Binary Search",
    relatedAlgorithms: ["Binary Search", "Greedy Check"],
    summary: "Mẫu bài rất hay gặp: không tìm vị trí trong mảng, mà tìm giá trị đáp án.",
    story:
      "Bạn cần tìm tốc độ tối thiểu để hoàn thành một lượng công việc trước hạn.",
    input: "Một khoảng giá trị có thể chứa đáp án và một hàm kiểm tra can(x).",
    output: "Giá trị nhỏ nhất x sao cho can(x) = true.",
    examples: [
      {
        input: "hours = [3, 6, 7, 11], deadline = 8",
        output: "4",
        explanation: "Tốc độ 4 đủ hoàn thành trong 8 giờ, tốc độ nhỏ hơn thì không đủ.",
      },
    ],
    approach: [
      "Xác định đáp án nằm trong khoảng [low, high].",
      "Viết hàm kiểm tra: nếu chọn mid thì có hoàn thành được không?",
      "Nếu mid làm được, thử giảm high để tìm đáp án nhỏ hơn.",
      "Nếu mid chưa làm được, tăng low.",
    ],
    pitfalls: [
      "Hàm kiểm tra phải có tính đơn điệu: false false false true true.",
      "Dễ sai điều kiện dừng low < high và cập nhật mid.",
    ],
    complexity: { time: "O(n log R)", space: "O(1)" },
    lessonSlugs: ["binary-search"],
  },
  {
    slug: "number-of-islands",
    title: "Đếm số hòn đảo",
    originalName: "Number of Islands",
    difficulty: "medium",
    category: "Graph / Grid",
    relatedAlgorithms: ["DFS", "BFS", "Flood Fill"],
    summary: "Bài nền tảng để nhìn ma trận như một đồ thị.",
    story:
      "Bản đồ biển được biểu diễn bằng ô đất và ô nước. Cần đếm có bao nhiêu cụm đất tách biệt.",
    input: "Một ma trận gồm ký tự 1 là đất, 0 là nước.",
    output: "Số cụm đất liên thông theo 4 hướng.",
    examples: [
      {
        input: "[[1,1,0],[0,1,0],[1,0,1]]",
        output: "3",
        explanation: "Có ba cụm đất riêng biệt nếu chỉ đi lên, xuống, trái, phải.",
      },
    ],
    approach: [
      "Duyệt từng ô trong ma trận.",
      "Khi gặp ô đất chưa thăm, tăng số đảo lên 1.",
      "Dùng DFS hoặc BFS để đánh dấu toàn bộ cụm đất đó.",
      "Tiếp tục duyệt đến hết ma trận.",
    ],
    pitfalls: [
      "Nhầm giữa liên thông 4 hướng và 8 hướng.",
      "Quên đánh dấu visited nên bị lặp vô hạn.",
    ],
    complexity: { time: "O(rows * cols)", space: "O(rows * cols)" },
    lessonSlugs: [],
  },
  {
    slug: "fibonacci-dp",
    title: "Fibonacci tối ưu bằng DP",
    originalName: "Fibonacci Number",
    difficulty: "easy",
    category: "Dynamic Programming",
    relatedAlgorithms: ["Memoization", "Tabulation"],
    summary: "Ví dụ đơn giản nhất để thấy vì sao cần nhớ kết quả đã tính.",
    story:
      "Một dãy tăng trưởng được định nghĩa bằng tổng của hai giá trị trước đó.",
    input: "Một số n.",
    output: "Số Fibonacci thứ n.",
    examples: [
      {
        input: "n = 6",
        output: "8",
        explanation: "Dãy là 0, 1, 1, 2, 3, 5, 8.",
      },
    ],
    approach: [
      "Nhận ra fib(n) phụ thuộc vào fib(n - 1) và fib(n - 2).",
      "Tránh tính lại bằng mảng dp hoặc hai biến.",
      "Xây từ fib(0), fib(1) lên đến fib(n).",
    ],
    pitfalls: [
      "Dùng recursion thuần sẽ bị O(2^n).",
      "Dễ lệch định nghĩa fib(0) và fib(1).",
    ],
    complexity: { time: "O(n)", space: "O(1) nếu dùng hai biến" },
    lessonSlugs: [],
  },
  {
    slug: "knapsack-01",
    title: "Chọn đồ vào balo",
    originalName: "0/1 Knapsack",
    difficulty: "medium",
    category: "Dynamic Programming",
    relatedAlgorithms: ["DP 2D", "State Transition"],
    summary: "Bài DP kinh điển về chọn hoặc không chọn từng món đồ.",
    story:
      "Bạn có balo giới hạn cân nặng và nhiều món đồ có giá trị khác nhau. Cần tối đa hóa tổng giá trị.",
    input: "Danh sách weight, value và sức chứa capacity.",
    output: "Giá trị lớn nhất có thể mang theo.",
    examples: [
      {
        input: "weights = [2, 3, 4], values = [4, 5, 6], capacity = 5",
        output: "9",
        explanation: "Chọn món 2kg và 3kg được giá trị 4 + 5 = 9.",
      },
    ],
    approach: [
      "Định nghĩa dp[i][w] là giá trị tốt nhất khi xét i món đầu và sức chứa w.",
      "Với mỗi món, có hai lựa chọn: bỏ qua hoặc lấy nếu còn đủ sức chứa.",
      "Lấy giá trị lớn hơn giữa hai lựa chọn.",
    ],
    pitfalls: [
      "0/1 Knapsack khác Unbounded Knapsack: mỗi món chỉ dùng một lần.",
      "Khi tối ưu xuống mảng 1 chiều, phải duyệt capacity giảm dần.",
    ],
    complexity: { time: "O(n * capacity)", space: "O(n * capacity) hoặc O(capacity)" },
    lessonSlugs: [],
  },
  {
    slug: "coin-change",
    title: "Đổi tiền ít đồng nhất",
    originalName: "Coin Change",
    difficulty: "medium",
    category: "Dynamic Programming",
    relatedAlgorithms: ["DP", "Shortest Path Thinking"],
    summary: "Bài kinh điển để phân biệt greedy và DP.",
    story:
      "Bạn cần đổi một số tiền bằng các mệnh giá có sẵn sao cho dùng ít đồng xu nhất.",
    input: "Danh sách coin và số tiền amount.",
    output: "Số đồng xu ít nhất, hoặc -1 nếu không đổi được.",
    examples: [
      {
        input: "coins = [1, 3, 4], amount = 6",
        output: "2",
        explanation: "3 + 3 dùng 2 đồng, tốt hơn 4 + 1 + 1.",
      },
    ],
    approach: [
      "Định nghĩa dp[x] là số đồng ít nhất để tạo ra số tiền x.",
      "Khởi tạo dp[0] = 0, các giá trị còn lại là vô cực.",
      "Với mỗi x, thử từng coin và cập nhật dp[x] = min(dp[x], dp[x - coin] + 1).",
    ],
    pitfalls: [
      "Greedy không luôn đúng với mọi hệ mệnh giá.",
      "Cần xử lý trường hợp không thể tạo ra amount.",
    ],
    complexity: { time: "O(amount * số loại coin)", space: "O(amount)" },
    lessonSlugs: [],
  },
  {
    slug: "longest-increasing-subsequence",
    title: "Dãy con tăng dài nhất",
    originalName: "Longest Increasing Subsequence",
    difficulty: "medium",
    category: "Dynamic Programming / Binary Search",
    relatedAlgorithms: ["DP", "Binary Search"],
    summary: "Một bài nổi tiếng có hai hướng giải: O(n²) dễ hiểu và O(n log n) tối ưu.",
    story:
      "Từ một dãy số, chọn một số phần tử giữ nguyên thứ tự ban đầu sao cho chúng tăng dần và dài nhất.",
    input: "Một mảng số nguyên.",
    output: "Độ dài dãy con tăng dài nhất.",
    examples: [
      {
        input: "[10, 9, 2, 5, 3, 7]",
        output: "3",
        explanation: "Một dãy tốt là [2, 3, 7].",
      },
    ],
    approach: [
      "Bản dễ: dp[i] là độ dài LIS kết thúc tại i.",
      "Với mỗi i, nhìn các j < i và nums[j] < nums[i].",
      "Bản tối ưu dùng mảng tails và binary search để giữ đuôi nhỏ nhất.",
    ],
    pitfalls: [
      "Dãy con không bắt buộc liên tiếp.",
      "Cần phân biệt tăng nghiêm ngặt và không giảm.",
    ],
    complexity: { time: "O(n²) hoặc O(n log n)", space: "O(n)" },
    lessonSlugs: ["binary-search"],
  },
  {
    slug: "shortest-path-dijkstra",
    title: "Đường đi ngắn nhất",
    originalName: "Dijkstra Shortest Path",
    difficulty: "medium",
    category: "Graph",
    relatedAlgorithms: ["Dijkstra", "Priority Queue"],
    summary: "Bài nền tảng cho bản đồ, định tuyến, network và game pathfinding.",
    story:
      "Bạn cần tìm đường đi có tổng chi phí nhỏ nhất từ một thành phố đến các thành phố khác.",
    input: "Đồ thị có trọng số không âm và một đỉnh bắt đầu.",
    output: "Khoảng cách ngắn nhất từ đỉnh bắt đầu đến các đỉnh còn lại.",
    examples: [
      {
        input: "A-B: 4, A-C: 1, C-B: 2",
        output: "dist(B) = 3",
        explanation: "Đi A -> C -> B tốt hơn đi thẳng A -> B.",
      },
    ],
    approach: [
      "Gán khoảng cách ban đầu là vô cực, riêng đỉnh nguồn là 0.",
      "Luôn chọn đỉnh chưa xử lý có khoảng cách nhỏ nhất.",
      "Relax các cạnh đi ra từ đỉnh đó.",
      "Dùng priority queue để chọn nhanh đỉnh tốt nhất.",
    ],
    pitfalls: [
      "Dijkstra không dùng được khi có cạnh âm.",
      "Cần bỏ qua bản ghi cũ trong priority queue nếu khoảng cách đã được cải thiện.",
    ],
    complexity: { time: "O((V + E) log V)", space: "O(V + E)" },
    lessonSlugs: [],
  },
  {
    slug: "n-queens",
    title: "Xếp N quân hậu",
    originalName: "N-Queens",
    difficulty: "hard",
    category: "Backtracking",
    relatedAlgorithms: ["Backtracking", "Pruning"],
    summary: "Bài kinh điển để học thử lựa chọn, kiểm tra hợp lệ và quay lui.",
    story:
      "Cần đặt N quân hậu lên bàn cờ N x N sao cho không quân nào ăn được quân nào.",
    input: "Một số n.",
    output: "Tất cả cách đặt hoặc số cách đặt hợp lệ.",
    examples: [
      {
        input: "n = 4",
        output: "2",
        explanation: "Bàn 4 x 4 có 2 cấu hình hợp lệ.",
      },
    ],
    approach: [
      "Đặt mỗi hàng đúng một quân hậu.",
      "Ở mỗi hàng, thử từng cột còn an toàn.",
      "Theo dõi cột, đường chéo chính và đường chéo phụ đã bị chiếm.",
      "Nếu đi hết N hàng, ghi nhận một nghiệm.",
    ],
    pitfalls: [
      "Kiểm tra đường chéo chậm nếu quét cả bàn cờ mỗi lần.",
      "Dễ sai công thức diagonal: row - col và row + col.",
    ],
    complexity: { time: "O(N!) xấp xỉ", space: "O(N)" },
    lessonSlugs: [],
  },
];

export function getClassicProblem(slug: string): ClassicProblem | undefined {
  return classicProblems.find((problem) => problem.slug === slug);
}

export function getProblemsByDifficulty(difficulty: ProblemDifficulty): ClassicProblem[] {
  return classicProblems.filter((problem) => problem.difficulty === difficulty);
}
