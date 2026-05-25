export type ProblemDifficulty = "easy" | "medium" | "hard";

export interface ProblemExample {
  input: string;
  output: string;
  explanation: string;
}

export interface ProblemStrategy {
  title: string;
  idea: string;
  steps: string[];
  complexity: {
    time: string;
    space: string;
  };
}

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
  examples: ProblemExample[];
  approach: string[];
  bruteForce: ProblemStrategy;
  optimized: ProblemStrategy;
  walkthrough: string[];
  pseudocode: string[];
  code: string;
  proof: string[];
  edgeCases: string[];
  variations: string[];
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
    summary: "Bài nhập môn kinh điển để hiểu cách đổi tìm kiếm O(n^2) thành O(n).",
    story: "Bạn có một danh sách giá tiền và cần chọn đúng hai món sao cho tổng tiền bằng ngân sách K.",
    input: "Một mảng số nguyên nums và một số target.",
    output: "Hai chỉ số i, j sao cho nums[i] + nums[j] = target.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "2 + 7 = 9 nên lấy hai vị trí 0 và 1." },
      { input: "nums = [3, 3], target = 6", output: "[0, 1]", explanation: "Hai phần tử trùng giá trị nhưng khác chỉ số." },
    ],
    approach: [
      "Duyệt từng số từ trái sang phải.",
      "Với mỗi số x, tính phần còn thiếu là target - x.",
      "Nếu phần còn thiếu đã xuất hiện trong bảng nhớ, ta tìm được đáp án.",
      "Nếu chưa, lưu x cùng vị trí hiện tại vào bảng nhớ.",
    ],
    bruteForce: {
      title: "Thử mọi cặp",
      idea: "Duyệt hai vòng lặp để kiểm tra mọi cặp chỉ số khác nhau.",
      steps: ["Chọn i từ 0 đến n-1.", "Chọn j từ i+1 đến n-1.", "Nếu nums[i] + nums[j] = target thì trả về [i, j]."],
      complexity: { time: "O(n^2)", space: "O(1)" },
    },
    optimized: {
      title: "Hash map lưu số đã gặp",
      idea: "Khi đang ở x, chỉ cần biết target - x có nằm bên trái hay chưa.",
      steps: ["Tạo map value -> index.", "Duyệt nums theo thứ tự.", "Tính need = target - nums[i].", "Nếu need có trong map, trả về chỉ số đã lưu và i.", "Nếu không, lưu nums[i] vào map."],
      complexity: { time: "O(n)", space: "O(n)" },
    },
    walkthrough: ["i=0, x=2, need=7, map rỗng nên lưu 2 -> 0.", "i=1, x=7, need=2, map có 2 tại index 0.", "Trả về [0, 1]."],
    pseudocode: ["map = {}", "for i from 0 to n-1:", "  need = target - nums[i]", "  if need in map: return [map[need], i]", "  map[nums[i]] = i"],
    code: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need)!, i];
    seen.set(nums[i], i);
  }

  return [];
}`,
    proof: ["Ở bước i, map chứa đúng các phần tử bên trái i.", "Nếu tồn tại cặp kết thúc tại i, phần còn thiếu chắc chắn đã nằm trong map.", "Thuật toán lưu sau khi kiểm tra nên không dùng cùng một phần tử hai lần."],
    edgeCases: ["Mảng có số âm.", "Hai số giống nhau như [3, 3].", "Target bằng 0.", "Không có đáp án nếu biến thể cho phép trả về rỗng."],
    variations: ["3Sum", "Two Sum II trên mảng đã sort", "Subarray Sum Equals K", "Pair with given difference"],
    pitfalls: ["Không được dùng cùng một phần tử hai lần.", "Cẩn thận khi có số trùng nhau."],
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
    story: "Một trình soạn thảo code cần kiểm tra nhanh chuỗi ngoặc người dùng nhập có cân bằng không.",
    input: "Một chuỗi chỉ gồm (, ), [, ], {, }.",
    output: "true nếu chuỗi ngoặc hợp lệ, ngược lại false.",
    examples: [
      { input: 's = "({[]})"', output: "true", explanation: "Mỗi ngoặc đóng đều khớp với ngoặc mở gần nhất." },
      { input: 's = "([)]"', output: "false", explanation: "Dấu ) đóng sai vì ngoặc mở gần nhất là [." },
    ],
    approach: ["Gặp ngoặc mở thì push vào stack.", "Gặp ngoặc đóng thì pop phần tử trên cùng ra so sánh.", "Nếu không khớp hoặc stack rỗng khi cần đóng, chuỗi sai.", "Cuối cùng stack phải rỗng."],
    bruteForce: {
      title: "Xóa cặp hợp lệ lặp lại",
      idea: "Liên tục xóa các cặp (), [], {} cho đến khi không xóa được nữa.",
      steps: ["Lặp khi chuỗi còn thay đổi.", "Thay (), [], {} bằng chuỗi rỗng.", "Nếu cuối cùng chuỗi rỗng thì hợp lệ."],
      complexity: { time: "O(n^2)", space: "O(n)" },
    },
    optimized: {
      title: "Stack",
      idea: "Ngoặc đóng phải khớp với ngoặc mở gần nhất chưa đóng.",
      steps: ["Tạo map ngoặc đóng -> ngoặc mở.", "Push ngoặc mở vào stack.", "Khi gặp ngoặc đóng, pop và so với map.", "Kết thúc stack rỗng là hợp lệ."],
      complexity: { time: "O(n)", space: "O(n)" },
    },
    walkthrough: ["Đọc (, push (.", "Đọc {, push {.", "Đọc [, push [.", "Đọc ], pop [ khớp.", "Đọc }, pop { khớp.", "Đọc ), pop ( khớp, stack rỗng."],
    pseudocode: ["stack = []", "for ch in s:", "  if ch is opening: push ch", "  else if stack empty or pop() != matching_open(ch): return false", "return stack is empty"],
    code: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }

  return stack.length === 0;
}`,
    proof: ["Stack luôn lưu các ngoặc mở chưa được đóng theo đúng thứ tự lồng nhau.", "Ngoặc đóng hợp lệ chỉ có thể khớp với phần tử trên cùng.", "Nếu toàn bộ ký tự qua được kiểm tra và stack rỗng, mọi ngoặc đã được ghép đúng."],
    edgeCases: ["Chuỗi rỗng.", "Chuỗi bắt đầu bằng ngoặc đóng.", "Số lượng ngoặc mở nhiều hơn ngoặc đóng.", "Cặp đúng số lượng nhưng sai thứ tự như ([)]."],
    variations: ["Minimum Remove to Make Valid Parentheses", "Longest Valid Parentheses", "Evaluate expression with stack"],
    pitfalls: ["Quên kiểm tra stack rỗng trước khi pop.", "Chỉ đếm số lượng ngoặc mà không kiểm tra thứ tự lồng nhau."],
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
    story: "Bạn cần tìm tốc độ tối thiểu để hoàn thành một lượng công việc trước hạn.",
    input: "Một khoảng giá trị có thể chứa đáp án và một hàm kiểm tra can(x).",
    output: "Giá trị nhỏ nhất x sao cho can(x) = true.",
    examples: [{ input: "hours = [3, 6, 7, 11], deadline = 8", output: "4", explanation: "Tốc độ 4 đủ hoàn thành trong 8 giờ, tốc độ nhỏ hơn thì không đủ." }],
    approach: ["Xác định khoảng [low, high].", "Viết hàm can(mid) có tính đơn điệu.", "Nếu can(mid) đúng, thử tìm nhỏ hơn ở bên trái.", "Nếu sai, bỏ nửa trái và tăng low."],
    bruteForce: {
      title: "Thử từng đáp án",
      idea: "Kiểm tra x từ nhỏ đến lớn cho đến khi can(x) đúng.",
      steps: ["Chọn x = low.", "Nếu can(x) đúng thì trả về x.", "Nếu sai thì tăng x."],
      complexity: { time: "O(n * R)", space: "O(1)" },
    },
    optimized: {
      title: "Binary search trên miền đáp án",
      idea: "Nếu can(x) đúng thì mọi giá trị lớn hơn x cũng đúng; đó là tính đơn điệu.",
      steps: ["Đặt low và high bao phủ đáp án.", "mid = floor((low + high) / 2).", "Nếu can(mid) đúng, high = mid.", "Nếu sai, low = mid + 1.", "Khi low = high, đó là đáp án nhỏ nhất."],
      complexity: { time: "O(n log R)", space: "O(1)" },
    },
    walkthrough: ["low=1, high=11.", "mid=6, can(6)=true nên high=6.", "mid=3, can(3)=false nên low=4.", "mid=5 true, high=5.", "mid=4 true, high=4, kết thúc tại 4."],
    pseudocode: ["low = minAnswer; high = maxAnswer", "while low < high:", "  mid = floor((low + high) / 2)", "  if can(mid): high = mid", "  else: low = mid + 1", "return low"],
    code: `function minFeasible(low: number, high: number, can: (x: number) => boolean): number {
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (can(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
}`,
    proof: ["Khoảng [low, high] luôn chứa đáp án nhỏ nhất.", "Nếu can(mid) đúng, đáp án không thể nằm bên phải mid bắt buộc, nên giữ [low, mid].", "Nếu can(mid) sai, mọi giá trị <= mid đều sai, nên giữ [mid+1, high]."],
    edgeCases: ["low/high chọn chưa bao phủ đáp án.", "Hàm can không đơn điệu.", "Tràn số khi tính mid ở ngôn ngữ số nguyên cố định.", "Vòng lặp vô hạn do cập nhật sai."],
    variations: ["Koko Eating Bananas", "Capacity To Ship Packages", "Split Array Largest Sum", "Aggressive Cows"],
    pitfalls: ["Hàm kiểm tra phải có dạng false...false true...true.", "Dễ sai điều kiện dừng và cập nhật mid."],
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
    story: "Bản đồ biển được biểu diễn bằng ô đất và ô nước. Cần đếm có bao nhiêu cụm đất tách biệt.",
    input: "Một ma trận gồm ký tự 1 là đất, 0 là nước.",
    output: "Số cụm đất liên thông theo 4 hướng.",
    examples: [{ input: "[[1,1,0],[0,1,0],[1,0,1]]", output: "3", explanation: "Có ba cụm đất riêng biệt nếu chỉ đi lên, xuống, trái, phải." }],
    approach: ["Duyệt từng ô trong ma trận.", "Khi gặp ô đất chưa thăm, tăng số đảo lên 1.", "Dùng DFS hoặc BFS để đánh dấu toàn bộ cụm đất đó.", "Tiếp tục duyệt đến hết ma trận."],
    bruteForce: {
      title: "Quét và gộp thủ công",
      idea: "Mỗi lần gặp đất thì kiểm tra lan rộng bằng nhiều vòng lặp lặp lại.",
      steps: ["Tìm ô đất chưa xử lý.", "Quét toàn ma trận nhiều lần để tìm ô kề cùng đảo.", "Đánh dấu đến khi không còn ô mới."],
      complexity: { time: "O((rows * cols)^2)", space: "O(rows * cols)" },
    },
    optimized: {
      title: "DFS/BFS flood fill",
      idea: "Mỗi ô đất chỉ cần được thăm một lần.",
      steps: ["Duyệt từng ô.", "Nếu là đất, tăng count.", "DFS/BFS từ ô đó và đổi các ô đất cùng đảo thành visited.", "Bỏ qua các ô đã visited trong những lần sau."],
      complexity: { time: "O(rows * cols)", space: "O(rows * cols)" },
    },
    walkthrough: ["Gặp (0,0)=1, count=1, DFS đánh dấu (0,0),(0,1),(1,1).", "Gặp (2,0)=1, count=2.", "Gặp (2,2)=1, count=3.", "Hết ma trận, trả về 3."],
    pseudocode: ["count = 0", "for each cell:", "  if grid[r][c] == '1':", "    count++", "    dfs(r, c)", "return count"],
    code: `function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let count = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (grid[r][c] === "1") {
        count += 1;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
    proof: ["Mỗi lần tăng count bắt đầu từ một ô đất chưa thuộc đảo nào đã đếm.", "DFS đánh dấu toàn bộ đảo chứa ô đó, nên đảo này không bị đếm lại.", "Mọi đảo đều có ít nhất một ô đầu tiên được duyệt, nên không bị bỏ sót."],
    edgeCases: ["Ma trận rỗng.", "Toàn nước.", "Toàn đất.", "Đảo nối chéo không được tính là nối nếu đề dùng 4 hướng."],
    variations: ["Max Area of Island", "Surrounded Regions", "Pacific Atlantic Water Flow", "Rotting Oranges"],
    pitfalls: ["Nhầm giữa liên thông 4 hướng và 8 hướng.", "Quên đánh dấu visited nên bị lặp vô hạn."],
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
    story: "Một dãy tăng trưởng được định nghĩa bằng tổng của hai giá trị trước đó.",
    input: "Một số n.",
    output: "Số Fibonacci thứ n.",
    examples: [{ input: "n = 6", output: "8", explanation: "Dãy là 0, 1, 1, 2, 3, 5, 8." }],
    approach: ["Nhận ra fib(n) phụ thuộc vào fib(n-1) và fib(n-2).", "Tránh tính lại bằng mảng dp hoặc hai biến.", "Xây từ fib(0), fib(1) lên đến fib(n)."],
    bruteForce: {
      title: "Đệ quy trực tiếp",
      idea: "Dịch đúng công thức fib(n)=fib(n-1)+fib(n-2).",
      steps: ["Nếu n <= 1 trả về n.", "Gọi fib(n-1) và fib(n-2).", "Cộng hai kết quả."],
      complexity: { time: "O(2^n)", space: "O(n)" },
    },
    optimized: {
      title: "Bottom-up với hai biến",
      idea: "Mỗi trạng thái chỉ cần hai trạng thái ngay trước nó.",
      steps: ["Giữ prev2=fib(0), prev1=fib(1).", "Lặp i từ 2 đến n.", "cur = prev1 + prev2.", "Dịch prev2=prev1, prev1=cur."],
      complexity: { time: "O(n)", space: "O(1)" },
    },
    walkthrough: ["fib(0)=0, fib(1)=1.", "i=2 cur=1.", "i=3 cur=2.", "i=4 cur=3.", "i=5 cur=5.", "i=6 cur=8."],
    pseudocode: ["if n <= 1: return n", "a = 0; b = 1", "for i from 2 to n:", "  c = a + b", "  a = b; b = c", "return b"],
    code: `function fib(n: number): number {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i += 1) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}`,
    proof: ["Sau vòng lặp i, b luôn bằng fib(i) và a bằng fib(i-1).", "Công thức cập nhật c=a+b tạo đúng fib(i).", "Bất biến này đúng từ i=2 đến n, nên kết quả cuối là fib(n)."],
    edgeCases: ["n = 0.", "n = 1.", "n lớn gây tràn số trong Number.", "Biến thể modulo."],
    variations: ["Climbing Stairs", "House Robber", "Tribonacci", "Decode Ways"],
    pitfalls: ["Dùng recursion thuần sẽ bị O(2^n).", "Dễ lệch định nghĩa fib(0) và fib(1)."],
    complexity: { time: "O(n)", space: "O(1)" },
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
    story: "Bạn có balo giới hạn cân nặng và nhiều món đồ có giá trị khác nhau. Cần tối đa hóa tổng giá trị.",
    input: "Danh sách weight, value và sức chứa capacity.",
    output: "Giá trị lớn nhất có thể mang theo.",
    examples: [{ input: "weights = [2, 3, 4], values = [4, 5, 6], capacity = 5", output: "9", explanation: "Chọn món 2kg và 3kg được giá trị 4 + 5 = 9." }],
    approach: ["Định nghĩa dp[i][w] là giá trị tốt nhất khi xét i món đầu và sức chứa w.", "Với mỗi món, có hai lựa chọn: bỏ qua hoặc lấy nếu đủ sức chứa.", "Lấy giá trị lớn hơn giữa hai lựa chọn."],
    bruteForce: {
      title: "Thử mọi tập con",
      idea: "Mỗi món có hai trạng thái: lấy hoặc không lấy.",
      steps: ["Sinh mọi tổ hợp món đồ.", "Tính tổng weight và value.", "Giữ value lớn nhất có weight <= capacity."],
      complexity: { time: "O(2^n)", space: "O(n)" },
    },
    optimized: {
      title: "Dynamic Programming",
      idea: "Trạng thái tốt nhất của i món đầu có thể xây từ i-1 món đầu.",
      steps: ["Tạo dp kích thước (n+1) x (capacity+1).", "Nếu không lấy món i: dp[i-1][w].", "Nếu lấy được: dp[i-1][w-weight] + value.", "Gán dp[i][w] bằng max hai lựa chọn."],
      complexity: { time: "O(n * capacity)", space: "O(n * capacity) hoặc O(capacity)" },
    },
    walkthrough: ["capacity=5.", "Xét món 2kg value 4, các w>=2 có thể đạt 4.", "Xét món 3kg value 5, tại w=5 lấy thêm sau trạng thái w=2 được 9.", "Món 4kg value 6 không vượt được 9 tại capacity 5."],
    pseudocode: ["dp = zeros(n+1, capacity+1)", "for i from 1 to n:", "  for w from 0 to capacity:", "    dp[i][w] = dp[i-1][w]", "    if weight[i] <= w:", "      dp[i][w] = max(dp[i][w], dp[i-1][w-weight[i]] + value[i])"],
    code: `function knapsack(weights: number[], values: number[], capacity: number): number {
  const dp = Array.from({ length: capacity + 1 }, () => 0);

  for (let i = 0; i < weights.length; i += 1) {
    for (let w = capacity; w >= weights[i]; w -= 1) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}`,
    proof: ["Mỗi trạng thái xét đầy đủ hai khả năng duy nhất của món hiện tại: lấy hoặc bỏ.", "Khi tối ưu 1D và duyệt w giảm, mỗi món chỉ được dùng một lần.", "Do đó dp sau khi xét hết n món là giá trị tối ưu toàn cục."],
    edgeCases: ["capacity = 0.", "Món nặng hơn capacity.", "Giá trị bằng 0.", "Tối ưu 1D nhưng duyệt w tăng sẽ biến thành unbounded knapsack."],
    variations: ["Unbounded Knapsack", "Partition Equal Subset Sum", "Target Sum", "Subset Sum"],
    pitfalls: ["0/1 Knapsack khác Unbounded Knapsack.", "Khi tối ưu xuống mảng 1 chiều, phải duyệt capacity giảm dần."],
    complexity: { time: "O(n * capacity)", space: "O(capacity)" },
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
    story: "Bạn cần đổi một số tiền bằng các mệnh giá có sẵn sao cho dùng ít đồng xu nhất.",
    input: "Danh sách coin và số tiền amount.",
    output: "Số đồng xu ít nhất, hoặc -1 nếu không đổi được.",
    examples: [{ input: "coins = [1, 3, 4], amount = 6", output: "2", explanation: "3 + 3 dùng 2 đồng, tốt hơn 4 + 1 + 1." }],
    approach: ["Định nghĩa dp[x] là số đồng ít nhất để tạo ra số tiền x.", "Khởi tạo dp[0] = 0, các giá trị còn lại là vô cực.", "Với mỗi x, thử từng coin và cập nhật dp[x] = min(dp[x], dp[x - coin] + 1)."],
    bruteForce: {
      title: "Đệ quy thử mọi cách",
      idea: "Với amount hiện tại, thử lấy từng loại coin.",
      steps: ["Nếu amount=0 trả về 0.", "Với mỗi coin <= amount, giải amount-coin.", "Lấy kết quả nhỏ nhất + 1."],
      complexity: { time: "Hàm mũ nếu không memo", space: "O(amount)" },
    },
    optimized: {
      title: "DP một chiều",
      idea: "Mỗi amount nhỏ hơn được giải trước và tái sử dụng.",
      steps: ["Tạo dp[0..amount], dp[0]=0.", "Duyệt x từ 1 đến amount.", "Thử từng coin.", "Nếu x-coin hợp lệ, cập nhật dp[x].", "Nếu dp[amount] vẫn vô cực thì trả -1."],
      complexity: { time: "O(amount * số loại coin)", space: "O(amount)" },
    },
    walkthrough: ["dp[0]=0.", "dp[1]=1 với coin 1.", "dp[3]=1 với coin 3.", "dp[4]=1 với coin 4.", "dp[6]=min(dp[5]+1, dp[3]+1, dp[2]+1)=2."],
    pseudocode: ["dp[0] = 0; others = INF", "for x from 1 to amount:", "  for coin in coins:", "    if x >= coin:", "      dp[x] = min(dp[x], dp[x-coin] + 1)", "return dp[amount] or -1"],
    code: `function coinChange(coins: number[], amount: number): number {
  const inf = amount + 1;
  const dp = Array(amount + 1).fill(inf);
  dp[0] = 0;

  for (let x = 1; x <= amount; x += 1) {
    for (const coin of coins) {
      if (x >= coin) dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }

  return dp[amount] === inf ? -1 : dp[amount];
}`,
    proof: ["Để tạo amount x, đồng cuối cùng chắc chắn là một coin nào đó.", "Trước đồng cuối, ta cần tạo x-coin theo cách tối ưu.", "DP thử mọi coin cuối cùng nên không bỏ sót lời giải tối ưu."],
    edgeCases: ["amount = 0.", "Không thể đổi được.", "Coin lớn hơn amount.", "Coin không chứa 1 nên greedy dễ sai."],
    variations: ["Coin Change II", "Minimum Path Sum", "Perfect Squares", "BFS shortest path trên amount"],
    pitfalls: ["Greedy không luôn đúng với mọi hệ mệnh giá.", "Cần xử lý trường hợp không thể tạo ra amount."],
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
    summary: "Một bài nổi tiếng có hai hướng giải: O(n^2) dễ hiểu và O(n log n) tối ưu.",
    story: "Từ một dãy số, chọn một số phần tử giữ nguyên thứ tự ban đầu sao cho chúng tăng dần và dài nhất.",
    input: "Một mảng số nguyên.",
    output: "Độ dài dãy con tăng dài nhất.",
    examples: [{ input: "[10, 9, 2, 5, 3, 7]", output: "3", explanation: "Một dãy tốt là [2, 3, 7]." }],
    approach: ["Bản dễ: dp[i] là độ dài LIS kết thúc tại i.", "Với mỗi i, nhìn các j < i và nums[j] < nums[i].", "Bản tối ưu dùng mảng tails và binary search để giữ đuôi nhỏ nhất."],
    bruteForce: {
      title: "Sinh mọi dãy con",
      idea: "Mỗi phần tử có thể chọn hoặc bỏ, rồi kiểm tra tăng.",
      steps: ["Sinh các subsequence.", "Kiểm tra subsequence có tăng nghiêm ngặt không.", "Giữ độ dài lớn nhất."],
      complexity: { time: "O(2^n * n)", space: "O(n)" },
    },
    optimized: {
      title: "Tails + binary search",
      idea: "tails[len] là đuôi nhỏ nhất có thể của một dãy tăng dài len+1.",
      steps: ["Duyệt từng x.", "Tìm vị trí đầu tiên trong tails >= x.", "Thay vị trí đó bằng x.", "Nếu không có vị trí, append x.", "Độ dài tails là đáp án."],
      complexity: { time: "O(n log n)", space: "O(n)" },
    },
    walkthrough: ["10 -> tails [10].", "9 thay 10 -> [9].", "2 thay 9 -> [2].", "5 append -> [2,5].", "3 thay 5 -> [2,3].", "7 append -> [2,3,7]."],
    pseudocode: ["tails = []", "for x in nums:", "  pos = lower_bound(tails, x)", "  if pos == len(tails): append x", "  else tails[pos] = x", "return len(tails)"],
    code: `function lengthOfLIS(nums: number[]): number {
  const tails: number[] = [];

  for (const x of nums) {
    let l = 0;
    let r = tails.length;
    while (l < r) {
      const m = Math.floor((l + r) / 2);
      if (tails[m] < x) l = m + 1;
      else r = m;
    }
    tails[l] = x;
  }

  return tails.length;
}`,
    proof: ["tails luôn tăng dần vì mỗi vị trí đại diện cho độ dài khác nhau.", "Thay đuôi bằng giá trị nhỏ hơn không làm mất độ dài, chỉ giúp dễ nối thêm về sau.", "Mỗi lần append chứng minh tồn tại dãy tăng dài hơn, nên độ dài tails là LIS."],
    edgeCases: ["Mảng rỗng.", "Toàn giảm.", "Có phần tử trùng nhau.", "Yêu cầu không giảm thì đổi lower_bound thành upper_bound."],
    variations: ["Russian Doll Envelopes", "Maximum Length Pair Chain", "Longest Bitonic Subsequence"],
    pitfalls: ["Dãy con không bắt buộc liên tiếp.", "Cần phân biệt tăng nghiêm ngặt và không giảm."],
    complexity: { time: "O(n log n)", space: "O(n)" },
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
    story: "Bạn cần tìm đường đi có tổng chi phí nhỏ nhất từ một thành phố đến các thành phố khác.",
    input: "Đồ thị có trọng số không âm và một đỉnh bắt đầu.",
    output: "Khoảng cách ngắn nhất từ đỉnh bắt đầu đến các đỉnh còn lại.",
    examples: [{ input: "A-B: 4, A-C: 1, C-B: 2", output: "dist(B) = 3", explanation: "Đi A -> C -> B tốt hơn đi thẳng A -> B." }],
    approach: ["Gán khoảng cách ban đầu là vô cực, riêng nguồn là 0.", "Luôn chọn đỉnh chưa xử lý có khoảng cách nhỏ nhất.", "Relax các cạnh đi ra từ đỉnh đó.", "Dùng priority queue để chọn nhanh đỉnh tốt nhất."],
    bruteForce: {
      title: "Dijkstra không heap",
      idea: "Mỗi vòng quét toàn bộ đỉnh để tìm đỉnh chưa xử lý gần nhất.",
      steps: ["Tìm đỉnh unvisited có dist nhỏ nhất.", "Đánh dấu visited.", "Relax các cạnh đi ra.", "Lặp V lần."],
      complexity: { time: "O(V^2 + E)", space: "O(V + E)" },
    },
    optimized: {
      title: "Dijkstra với priority queue",
      idea: "Heap giúp lấy đỉnh có dist nhỏ nhất nhanh hơn.",
      steps: ["Push nguồn với dist 0.", "Pop dist nhỏ nhất.", "Nếu bản ghi cũ thì bỏ qua.", "Relax hàng xóm và push dist mới vào heap."],
      complexity: { time: "O((V + E) log V)", space: "O(V + E)" },
    },
    walkthrough: ["dist(A)=0, dist(B)=inf, dist(C)=inf.", "Pop A, relax B=4, C=1.", "Pop C, relax B=min(4,1+2)=3.", "Pop B, kết quả dist(B)=3."],
    pseudocode: ["dist[source] = 0", "pq.push([0, source])", "while pq not empty:", "  d,u = pop min", "  if d != dist[u]: continue", "  for edge u->v weight w:", "    if d+w < dist[v]: update and push"],
    code: `function dijkstra(graph: Array<Array<[number, number]>>, source: number): number[] {
  const dist = Array(graph.length).fill(Infinity);
  const pq: Array<[number, number]> = [[0, source]];
  dist[source] = 0;

  while (pq.length > 0) {
    pq.sort((a, b) => b[0] - a[0]);
    const [d, u] = pq.pop()!;
    if (d !== dist[u]) continue;
    for (const [v, w] of graph[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }

  return dist;
}`,
    proof: ["Khi một đỉnh được pop với khoảng cách nhỏ nhất hiện tại, không có đường chưa xét nào có thể làm nó nhỏ hơn vì mọi cạnh không âm.", "Relax đảm bảo mọi đường đi qua đỉnh vừa chốt đều được thử.", "Lặp đến hết heap thì mọi khoảng cách tối ưu đã được chốt hoặc vẫn vô cực nếu không tới được."],
    edgeCases: ["Đỉnh không thể tới được.", "Cạnh trọng số 0.", "Có cạnh âm thì không dùng Dijkstra.", "Đồ thị vô hướng cần thêm cạnh hai chiều."],
    variations: ["Network Delay Time", "Cheapest Flights Within K Stops", "A* Search", "Bellman-Ford cho cạnh âm"],
    pitfalls: ["Dijkstra không dùng được khi có cạnh âm.", "Cần bỏ qua bản ghi cũ trong priority queue nếu khoảng cách đã được cải thiện."],
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
    story: "Cần đặt N quân hậu lên bàn cờ N x N sao cho không quân nào ăn được quân nào.",
    input: "Một số n.",
    output: "Tất cả cách đặt hoặc số cách đặt hợp lệ.",
    examples: [{ input: "n = 4", output: "2", explanation: "Bàn 4 x 4 có 2 cấu hình hợp lệ." }],
    approach: ["Đặt mỗi hàng đúng một quân hậu.", "Ở mỗi hàng, thử từng cột còn an toàn.", "Theo dõi cột, đường chéo chính và đường chéo phụ đã bị chiếm.", "Nếu đi hết N hàng, ghi nhận một nghiệm."],
    bruteForce: {
      title: "Thử mọi cách đặt",
      idea: "Chọn một cột cho mỗi hàng rồi kiểm tra toàn bộ bàn cờ.",
      steps: ["Sinh n^n cách chọn cột.", "Kiểm tra có hai hậu cùng cột hoặc đường chéo không.", "Đếm cấu hình hợp lệ."],
      complexity: { time: "O(n^n * n^2)", space: "O(n)" },
    },
    optimized: {
      title: "Backtracking với set cấm",
      idea: "Loại nhánh sai ngay khi vừa đặt quân hậu.",
      steps: ["Duyệt từng hàng.", "Thử các cột chưa bị chiếm.", "Kiểm tra col, row-col, row+col.", "Đặt hậu, đệ quy hàng tiếp theo, rồi gỡ ra.", "Khi row=n thì có một nghiệm."],
      complexity: { time: "O(N!) xấp xỉ", space: "O(N)" },
    },
    walkthrough: ["n=4, bắt đầu row 0.", "Thử từng cột và đánh dấu col/diag.", "Nếu row sau không còn cột an toàn, quay lui.", "Hai nhánh hoàn chỉnh tạo ra hai nghiệm."],
    pseudocode: ["backtrack(row):", "  if row == n: answer++", "  for col from 0 to n-1:", "    if col and diagonals are free:", "      place queen", "      backtrack(row + 1)", "      remove queen"],
    code: `function totalNQueens(n: number): number {
  const cols = new Set<number>();
  const diag1 = new Set<number>();
  const diag2 = new Set<number>();
  let count = 0;

  function backtrack(row: number) {
    if (row === n) {
      count += 1;
      return;
    }
    for (let col = 0; col < n; col += 1) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      backtrack(row + 1);
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }

  backtrack(0);
  return count;
}`,
    proof: ["Mỗi hàng được xử lý đúng một lần nên không có hai hậu cùng hàng.", "Các set cấm đảm bảo không có hai hậu cùng cột hoặc đường chéo.", "Backtracking thử mọi cột hợp lệ ở mỗi hàng, nên mọi nghiệm hợp lệ đều được sinh đúng một lần."],
    edgeCases: ["n = 1.", "n = 2 hoặc n = 3 không có nghiệm.", "Cần trả bảng nghiệm hay chỉ số lượng.", "Công thức diagonal row-col có thể âm."],
    variations: ["Sudoku Solver", "Permutations", "Combination Sum", "Word Search"],
    pitfalls: ["Kiểm tra đường chéo chậm nếu quét cả bàn cờ mỗi lần.", "Dễ sai công thức diagonal: row - col và row + col."],
    complexity: { time: "O(N!) xấp xỉ", space: "O(N)" },
    lessonSlugs: [],
  },
  // New classic concurrency problems
  {
    slug: "dining-philosophers",
    title: "Bài toán Triết gia ăn tối (Dining Philosophers)",
    originalName: "Dining Philosophers",
    difficulty: "hard",
    category: "Concurrency / Synchronization",
    relatedAlgorithms: ["Mutex", "Semaphore", "Deadlock"],
    summary: "Bài toán kinh điển về deadlock và đồng bộ trong đa luồng.",
    story: "N năm triết gia ngồi quanh một bàn ăn, mỗi người cần dùng nĩa và đũa để ăn, nhưng chỉ có năm bộ nĩa, dẫn đến nguy cơ deadlock.",
    input: "Số lượng triết gia và thời gian suy nghĩ/ăn.",
    output: "Trạng thái không deadlock, mọi triết gia ăn được.",
    examples: [
      { input: "philosophers = 5, think = 3, eat = 2", output: "All philosophers eat without deadlock", explanation: "Using resource hierarchy prevents deadlock." }
    ],
    approach: [
      "Sử dụng tài nguyên cấp độ (resource hierarchy).",
      "Hoặc sử dụng semaphore để giới hạn số lượng triết gia đồng thời ăn."
    ],
    bruteForce: {
      title: "Chờ vô hạn",
      idea: "Mỗi triết gia chờ nĩa và đũa một cách bất đồng bộ, dẫn tới deadlock.",
      steps: ["Mỗi triết gia lấy nĩa bên trái, rồi đũa bên phải.", "Nếu không có, chờ vô hạn."],
      complexity: { time: "O(1)", space: "O(1)" }
    },
    optimized: {
      title: "Giải pháp tài nguyên cấp độ",
      idea: "Thứ tự lấy nĩa, tránh vòng tuần hoàn.",
      steps: ["Triết gia lấy nĩa theo thứ tự tăng dần.", "Sau khi có cả hai, ăn rồi thả."],
      complexity: { time: "O(N)", space: "O(N)" }
    },
    walkthrough: [
      "Triết gia 0 lấy nĩa 0, sau đó đũa 0.",
      "Triết gia 1 chờ nĩa 1 vì nĩa 0 đang được dùng."
    ],
    pseudocode: [
      "for each philosopher i:",
      "  lock(min(i, (i+1)%N))",
      "  lock(max(i, (i+1)%N))",
      "  eat()",
      "  unlock(i)",
      "  unlock((i+1)%N)"
    ],
    code: `function diningPhilosophers(n: number): void { /* ... */ }`,
    proof: ["Sắp xếp thứ tự khóa ngăn vòng deadlock vì không có chu trình chờ."],
    edgeCases: ["N = 1", "N = 2", "Triết gia không ăn được nếu không có đủ nĩa."],
    variations: ["Dining Savages", "Chân dung nhà ăn chung"],
    pitfalls: ["Quên thứ tự khóa dẫn tới deadlock.", "Không giải phóng tài nguyên."],
    complexity: { time: "O(N)", space: "O(N)" },
    lessonSlugs: []
  },
  {
    slug: "producer-consumer",
    title: "Bài toán Người sản xuất - Người tiêu dùng (Producer Consumer)",
    originalName: "Producer Consumer",
    difficulty: "medium",
    category: "Concurrency / Buffer",
    relatedAlgorithms: ["Queue", "Blocking Queue", "Condition Variable"],
    summary: "Quản lý bộ đệm chia sẻ giữa tiến trình sản xuất và tiêu thụ dữ liệu.",
    story: "Các nhà sản xuất tạo dữ liệu và đưa vào bộ đệm, trong khi người tiêu dùng lấy ra để xử lý.",
    input: "Kích thước bộ đệm và các luồng sản xuất/tiêu thụ.",
    output: "Dữ liệu được tiêu thụ đúng thứ tự, không mất mát.",
    examples: [
      { input: "bufferSize = 3, producers = 2, consumers = 2", output: "All items produced and consumed", explanation: "Using blocking queue avoids overflow/underflow." }
    ],
    approach: [
      "Sử dụng queue có kích thước cố định.",
      "Producer chờ khi queue đầy, consumer chờ khi queue rỗng."
    ],
    bruteForce: {
      title: "Không đồng bộ",
      idea: "Producer và consumer truy cập queue mà không có lock.",
      steps: ["Producer push()", "Consumer pop()"],
      complexity: { time: "O(1)", space: "O(1)" }
    },
    optimized: {
      title: "Sử dụng mutex + condition",
      idea: "Đồng bộ bằng lock và condition variable.",
      steps: ["Lock mutex", "while queue full wait", "push item", "cond.notify()", "unlock", "Consumer similar."],
      complexity: { time: "O(1)", space: "O(bufferSize)" }
    },
    walkthrough: [
      "Producer tries to push, sees full, waits.",
      "Consumer pops, signals producer."
    ],
    pseudocode: [
      "mutex lock",
      "while buffer.full: cond.wait()",
      "buffer.push(item)",
      "cond.notify()",
      "unlock"
    ],
    code: `function producerConsumer(bufferSize: number): void { /* ... */ }`,
    proof: ["Mutex ensures exclusive access, condition prevents over/underflow."],
    edgeCases: ["Buffer size 0", "Producer faster than consumer."],
    variations: ["Multiple producers/consumers", "Bounded buffer with priorities"],
    pitfalls: ["Spurious wakeup cần while loop.", "Không unlock gây deadlock."],
    complexity: { time: "O(1) per operation", space: "O(bufferSize)" },
    lessonSlugs: []
  },
  {
    slug: "readers-writers",
    title: "Bài toán Độc giả - Nhà văn (Readers Writers)",
    originalName: "Readers Writers",
    difficulty: "medium",
    category: "Concurrency / Synchronization",
    relatedAlgorithms: ["Read-Write Lock", "RWMutex"],
    summary: "Quản lý quyền truy cập vào tài nguyên chung cho nhiều đọc và ít ghi.",
    story: "Nhiều độc giả muốn đọc tài liệu cùng lúc, trong khi nhà văn cần viết độc quyền.",
    input: "Số lượng reader và writer, thời gian đọc/viết.",
    output: "Tất cả các thao tác được thực hiện đúng thứ tự, không xung đột.",
    examples: [
      { input: "readers=5, writers=2", output: "All reads and writes complete", explanation: "Using RWLock ensures writers get exclusive access." }
    ],
    approach: [
      "Sử dụng read‑write lock cho phép nhiều reader đồng thời, writer độc quyền."
    ],
    bruteForce: {
      title: "Khóa toàn bộ",
      idea: "Lock một mutex cho mọi thao tác.",
      steps: ["Lock mutex", "read or write", "unlock"],
      complexity: { time: "O(1)", space: "O(1)" }
    },
    optimized: {
      title: "Read‑Write Lock",
      idea: "Giữ đếm reader, cho phép đồng thời khi không writer.",
      steps: ["If writer waiting, block new readers.", "When last reader leaves, allow writer.", "Writer locks exclusively."],
      complexity: { time: "O(1)", space: "O(1)" }
    },
    walkthrough: [
      "Reader A acquires read lock.",
      "Reader B acquires read lock.",
      "Writer waits until readers release."
    ],
    pseudocode: [
      "readLock():",
      "  mutex.lock()",
      "  readers++",
      "  if readers == 1: resource.lock()",
      "  mutex.unlock()",
      "readUnlock():",
      "  mutex.lock()",
      "  readers--",
      "  if readers == 0: resource.unlock()",
      "  mutex.unlock()",
      "writeLock(): resource.lock()",
      "writeUnlock(): resource.unlock()"
    ],
    code: `function readersWriters(): void { /* ... */ }`,
    proof: ["Readers only block when a writer holds lock; writers wait for all readers to finish."],
    edgeCases: ["Writer starvation", "Reader starvation when many writers."],
    variations: ["Priority readers", "Priority writers", "Fair RW lock"],
    pitfalls: ["Không cập nhật đếm reader đúng.", "Giải phóng lock sai thứ tự."],
    complexity: { time: "O(1) per operation", space: "O(1)" },
    lessonSlugs: []
  },
    {
      slug: "traveling-salesman",
      title: "Bài toán Người bán hàng (Traveling Salesman Problem)",
      originalName: "Traveling Salesman Problem",
      difficulty: "hard",
      category: "Graph / Optimization",
      relatedAlgorithms: ["Dynamic Programming", "Branch and Bound", "Heuristic"],
      summary: "Tìm chu trình Hamilton ngắn nhất đi qua tất cả các thành phố một lần duy nhất và trở lại thành phố xuất phát.",
      story: "Bạn là người bán hàng muốn tối ưu hành trình giao hàng tối ngắn, tránh lãng phí thời gian và chi phí.",
      input: "Số lượng thành phố N và ma trận khoảng cách giữa các cặp thành phố.",
      output: "Chi phí tối thiểu của một chu trình Hamilton.",
      examples: [{ input: "N = 4, distances = [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]", output: "80", explanation: "Chu trình 0→1→3→2→0 có tổng 80." }],
      approach: ["Dùng DP bitmask: dp[mask][i] là chi phí nhỏ nhất để đi qua các thành phố trong mask và kết thúc tại i.", "Chuyển trạng thái bằng cách thêm một thành phố mới vào mask.", "Kết quả là min_{i} dp[(1<<N)-1][i] + dist[i][0]."],
      bruteForce: { title: "Thử mọi hoán vị", idea: "Sinh tất cả các hoán vị của các thành phố và tính chi phí, chọn tối thiểu.", steps: ["Sinh mọi hoán vị N-1 thành phố (giữ thành phố 0 làm xuất phát).", "Tính tổng khoảng cách quanh vòng cho mỗi hoán vị.", "Chọn chi phí nhỏ nhất."], complexity: { time: "O(N! * N)", space: "O(N)" } },
      optimized: { title: "DP Bitmask", idea: "Lưu trữ trạng thái đã thăm và vị trí hiện tại, giảm phức tạp thành O(N^2 * 2^N).", steps: ["Khởi tạo dp[1<<0][0] = 0.", "Cập nhật dp[mask|1<<j][j] = min(dp[mask][i] + dist[i][j]) cho mọi i trong mask.", "Kết thúc bằng việc thêm chi phí quay về thành phố 0."], complexity: { time: "O(N^2 * 2^N)", space: "O(N * 2^N)" } },
      walkthrough: ["Bắt đầu dp[1][0] = 0.", "Thêm thành phố 1: dp[3][1] = dist[0][1].", "Tiếp tục mở rộng mask...", "Kết quả là 80 cho ví dụ trên."],
      pseudocode: ["dp = array[2^N][N] = INF", "dp[1][0] = 0", "for mask from 1 to (1<<N)-1:", "  for i where mask has i:", "    for j where mask not has j:", "      dp[mask|1<<j][j] = min(dp[mask|1<<j][j], dp[mask][i] + dist[i][j])", "answer = min_i dp[(1<<N)-1][i] + dist[i][0]"],
      code: `function tsp(dist: number[][]): number {\n  const N = dist.length;\n  const INF = Number.MAX_SAFE_INTEGER;\n  const size = 1 << N;\n  const dp = Array.from({ length: size }, () => Array(N).fill(INF));\n  dp[1][0] = 0;\n  for (let mask = 1; mask < size; mask++) {\n    for (let i = 0; i < N; i++) {\n      if (!(mask & (1 << i))) continue;\n      for (let j = 0; j < N; j++) {\n        if (mask & (1 << j)) continue;\n        const nextMask = mask | (1 << j);\n        dp[nextMask][j] = Math.min(dp[nextMask][j], dp[mask][i] + dist[i][j]);\n      }\n    }\n  }\n  let ans = INF;\n  const full = size - 1;\n  for (let i = 1; i < N; i++) {\n    ans = Math.min(ans, dp[full][i] + dist[i][0]);\n  }\n  return ans;\n}`,
      proof: ["DP đảm bảo mỗi trạng thái (mask,i) lưu chi phí tối ưu cho tập mask và kết thúc tại i.", "Các chuyển đổi mở rộng mask duy trì tối ưu.", "Kết quả cuối cùng lấy chi phí quay về đầu."] ,
      edgeCases: ["N = 1 (chi phí 0).", "Các cạnh có trọng số 0.", "Ma trận không đối xứng (đồ thị có hướng)."],
      variations: ["TSP với thời gian thực (Time Windows).", "TSP với ràng buộc năng lượng.", "TSP đa mục tiêu."] ,
      pitfalls: ["Quên cộng chi phí quay trở lại thành phố xuất phát.", "Không giới hạn bộ nhớ cho N lớn (2^N)."],
      complexity: { time: "O(N^2 * 2^N)", space: "O(N * 2^N)" },
      lessonSlugs: []
    },
    {
      slug: "tower-of-hanoi",
      title: "Bài toán Tháp Hà Nội (Tower of Hanoi)",
      originalName: "Tower of Hanoi",
      difficulty: "medium",
      category: "Recursion / Divide and Conquer",
      relatedAlgorithms: ["Recursion", "Bit Manipulation"],
      summary: "Di chuyển N đĩa từ cột A sang cột C sử dụng cột B sao cho không có đĩa lớn hơn nằm trên đĩa nhỏ hơn.",
      story: "Bạn cần chuyển toàn bộ đĩa sang cột đích mà vẫn giữ nguyên thứ tự kích thước.",
      input: "Số đĩa N.",
      output: "Danh sách các bước di chuyển (from, to).",
      examples: [{ input: "N = 3", output: "[(A,B),(A,C),(B,C),(A,B),(C,A),(C,B),(A,B)]", explanation: "7 bước tối ưu cho 3 đĩa." }],
      approach: ["Sử dụng quy hoạch chia để trị: chuyển N-1 đĩa sang cột trung gian, di chuyển đĩa lớn nhất, rồi di chuyển N-1 đĩa còn lại sang cột đích.", "Áp dụng đệ quy."],
      bruteForce: { title: "Thử mọi thứ tự", idea: "Sinh tất cả các chuỗi di chuyển và kiểm tra tính hợp lệ, rất không khả thi.", steps: ["Sinh mọi chuỗi các lần di chuyển có độ dài lớn.", "Kiểm tra quy tắc.", "Chọn chuỗi ngắn nhất hợp lệ."], complexity: { time: "O(k^m) (không thực tế)", space: "O(m)" } },
      optimized: { title: "Đệ quy chuẩn", idea: "Giải quyết bằng công thức 2^N - 1 bước.", steps: ["Nếu N == 1: di chuyển A->C.", "Else: gọi Hanoi(N-1, A, C, B), di chuyển A->C, gọi Hanoi(N-1, B, A, C)."], complexity: { time: "O(2^N)", space: "O(N)" } },
      walkthrough: ["N=3: gọi Hanoi(2, A, B, C)", "  -> Hanoi(1, A, C, B): di chuyển A->B", "  -> di chuyển A->C", "  -> Hanoi(1, B, A, C): di chuyển B->C", "Di chuyển đĩa lớn nhất A->C", "Tiếp tục di chuyển 2 đĩa còn lại từ B sang C."] ,
      pseudocode: ["function hanoi(n, from, to, aux):", "  if n == 1: move from -> to", "  else:", "    hanoi(n-1, from, aux, to)", "    move from -> to", "    hanoi(n-1, aux, to, from)"],
      code: `function hanoi(n: number, from: string = "A", to: string = "C", aux: string = "B"): Array<[string, string]> {\n  const moves: Array<[string, string]> = [];\n  function solve(k: number, f: string, t: string, a: string) {\n    if (k === 1) {\n      moves.push([f, t]);\n    } else {\n      solve(k - 1, f, a, t);\n      moves.push([f, t]);\n      solve(k - 1, a, t, f);\n    }\n  }\n  solve(n, from, to, aux);\n  return moves;\n}`,
      proof: ["Bằng quy nạp: Với N=1 di chuyển đúng.", "Giả sử đúng với N-1, thì 3 bước trên thực hiện chuyển N đĩa đúng."] ,
      edgeCases: ["N = 0 (không có di chuyển).", "N rất lớn gây tràn ngăn xếp, cần chuyển đổi sang iterative."] ,
      variations: ["Tower of Hanoi với 4 cột (Reve's puzzle).", "Giới hạn số di chuyển."] ,
      pitfalls: ["Quên thay đổi tham số aux khi gọi đệ quy.", "Gọi hàm sai thứ tự gây lỗi."] ,
      complexity: { time: "O(2^N)", space: "O(N)" },
      lessonSlugs: []
    },
        {
      slug: "eight-queens",
      title: "Bài toán Tám quân hậu (Eight Queens Puzzle)",
      originalName: "Eight Queens Puzzle",
      difficulty: "hard",
      category: "Backtracking",
      relatedAlgorithms: ["Backtracking", "Pruning"],
      summary: "Đặt N quân hậu trên bàn cờ N×N sao cho không có hai quân hậu ăn nhau.",
      story: "Bạn muốn tìm mọi cách đặt N quân hậu không xung đột trên bàn cờ.",
      input: "Một số n (kích thước bàn).",
      output: "Số cách đặt hợp lệ hoặc danh sách các vị trí.",
      examples: [{ input: "n = 4", output: "2", explanation: "Có 2 cách đặt hợp lệ cho 4×4." }],
      approach: ["Dùng backtracking, đặt từng hàng một, kiểm tra cột và đường chéo.", "Cắt tỉa khi phát hiện xung đột.", "Tiếp tục đệ quy đến khi đã đặt hết hàng."],
      bruteForce: { title: "Kiểm tra mọi tổ hợp", idea: "Sinh mọi cách sắp xếp N quân hậu và kiểm tra.", steps: ["Sinh N^N cách sắp xếp.", "Kiểm tra mỗi cách có xung đột không.", "Đếm các cách hợp lệ."], complexity: { time: "O(N^N * N)", space: "O(N)" } },
      optimized: { title: "Backtracking tối ưu", idea: "Duyệt từng hàng, bỏ các cột/đường chéo đã có quân hậu.", steps: ["Sử dụng các tập hợp để theo dõi cột, chéo chính, chéo phụ.", "Khi đặt được N quân, ghi nhận một nghiệm.", "Quay lui khi không còn vị trí."] , complexity: { time: "O(N!)", space: "O(N)" } },
      walkthrough: ["n=4: đặt hàng 0 vào cột 1, tiếp tục...", "Khi gặp xung đột quay lui, thử cột khác.", "Kết quả 2 nghiệm."] ,
      pseudocode: ["function solve(row):", "  if row == N: record solution", "  for col in 0..N-1: if safe(row, col):", "    place queen", "    solve(row+1)", "    remove queen"],
      code: `function solveNQueens(n: number): string[][] {\n  const solutions: string[][] = [];\n  const cols = new Set<number>();\n  const diag1 = new Set<number>();\n  const diag2 = new Set<number>();\n  const board: number[] = Array(n).fill(-1);\n  function backtrack(r: number) {\n    if (r === n) {\n      const sol = board.map(c => ".".repeat(c) + "Q" + ".".repeat(n - c - 1));\n      solutions.push(sol);\n      return;\n    }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || diag1.has(r - c) || diag2.has(r + c)) continue;\n      cols.add(c); diag1.add(r - c); diag2.add(r + c); board[r] = c;\n      backtrack(r + 1);\n      cols.delete(c); diag1.delete(r - c); diag2.delete(r + c);\n    }\n  }\n  backtrack(0);\n  return solutions;\n}`,
      proof: ["Mỗi lần đặt một quân hậu, các tập hợp đảm bảo không có xung đột.", "Quá trình quay lui bảo hiểm khám phá mọi cấu hình hợp lệ."] ,
      edgeCases: ["n = 0 (không có bàn), n = 1 (1 cách)."] ,
      variations: ["N-Queens tổng quát, N-Queens với cản trở."] ,
      pitfalls: ["Quên cập nhật một trong ba tập hợp khi đặt/quay lui."] ,
      complexity: { time: "O(N!)", space: "O(N)" },
      lessonSlugs: []
    },
    {
      slug: "merge-sort",
      title: "Sắp xếp Merge Sort",
      originalName: "Merge Sort",
      difficulty: "medium",
      category: "Sorting / Divide and Conquer",
      relatedAlgorithms: ["Divide and Conquer", "Recursion"],
      summary: "Thuật toán sắp xếp chia-đóng và hợp nhất các mảng con hợp lý.",
      story: "Bạn cần sắp xếp một danh sách lớn một cách ổn định và hiệu quả.",
      input: "Mảng các số.",
      output: "Mảng đã được sắp xếp tăng dần.",
      examples: [{ input: "[5,2,4,6,1,3]", output: "[1,2,3,4,5,6]", explanation: "Kết quả sau quá trình merge." }],
      approach: ["Chia mảng thành hai nửa đệ quy đến khi mỗi phần chỉ còn một phần tử.", "Sau đó hợp nhất hai mảng con đã sắp xếp thành mảng lớn hơn.", "Quá trình hợp nhất duy trì tính ổn định."],
      bruteForce: { title: "Insertion Sort", idea: "Chèn từng phần tử vào vị trí đúng.", steps: ["Duyệt từng phần tử, di chuyển các phần tử lớn hơn sang phải.", "Chèn phần tử hiện tại vào vị trí thích hợp."] , complexity: { time: "O(n^2)", space: "O(1)" } },
      optimized: { title: "Merge Sort", idea: "Chia và hợp nhất, thời gian O(n log n).", steps: ["Chia mảng, sắp xếp các nửa, sau đó merge."] , complexity: { time: "O(n log n)", space: "O(n)" } },
      walkthrough: ["[5,2,4,6,1,3] → chia thành [5,2,4] và [6,1,3]…", "Merge [2,5] và [4] → [2,4,5]…", "Cuối cùng merge thành dãy đã sắp xếp."] ,
      pseudocode: ["function mergeSort(arr):", "  if length <= 1 return arr", "  mid = len/2", "  left = mergeSort(arr[:mid])", "  right = mergeSort(arr[mid:])", "  return merge(left, right)"],
      code: `function mergeSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const merged: number[] = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) merged.push(left[i++]);\n    else merged.push(right[j++]);\n  }\n  return merged.concat(left.slice(i)).concat(right.slice(j));\n}`,
      proof: ["Mỗi bước merge kết hợp hai dãy đã sắp xếp thành dãy lớn hơn cũng được sắp xếp.", "Đệ quy đảm bảo mọi sub‑array được sắp xếp trước khi merge."] ,
      edgeCases: ["Mảng rỗng, mảng có một phần tử."] ,
      variations: ["Merge sort cho linked list, external merge sort."] ,
      pitfalls: ["Quên tạo mảng tạm khi merge gây lỗi."] ,
      complexity: { time: "O(n log n)", space: "O(n)" },
      lessonSlugs: []
    },
    {
      slug: "quick-sort",
      title: "Sắp xếp Quick Sort",
      originalName: "Quick Sort",
      difficulty: "medium",
      category: "Sorting / Divide and Conquer",
      relatedAlgorithms: ["Partition", "Recursion"],
      summary: "Thuật toán sắp xếp bằng phân hoạch, trung bình O(n log n).",
      story: "Bạn cần một thuật toán nhanh, thường dùng trong thực tế.",
      input: "Mảng các số.",
      output: "Mảng đã sắp xếp tăng dần.",
      examples: [{ input: "[3,6,8,10,1,2,1]", output: "[1,1,2,3,6,8,10]", explanation: "Kết quả sau quick sort." }],
      approach: ["Chọn pivot, phân vùng thành <pivot và ≥pivot.", "Đệ quy sắp xếp các phần trái và phải.", "Kết hợp kết quả."] ,
      bruteForce: { title: "Bubble Sort", idea: "Hoán đổi cặp liên tiếp nếu sai thứ tự.", steps: ["Duyệt mảng nhiều lần, hoán đổi các cặp sai."] , complexity: { time: "O(n^2)", space: "O(1)" } },
      optimized: { title: "Quick Sort", idea: "Phân vùng trung bình cân bằng, O(n log n).", steps: ["Chọn pivot (giá trị cuối, median-of-three, …).", "Partition mảng", "Đệ quy hai phần."], complexity: { time: "O(n log n) avg, O(n^2) worst", space: "O(log n) recursion" } },
      walkthrough: ["Chọn pivot 1, partition → [1,1,2] và [3,6,8,10].", "Đệ quy mỗi phần."] ,
      pseudocode: ["function quickSort(arr, l, r):", "  if l < r:", "    p = partition(arr, l, r)", "    quickSort(arr, l, p-1)", "    quickSort(arr, p+1, r)"],
      code: `function quickSort(arr: number[], left = 0, right = arr.length - 1): void {\n  if (left >= right) return;\n  const pivot = arr[right];\n  let i = left;\n  for (let j = left; j < right; j++) {\n    if (arr[j] < pivot) {\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n      i++;\n    }\n  }\n  [arr[i], arr[right]] = [arr[right], arr[i]];\n  quickSort(arr, left, i - 1);\n  quickSort(arr, i + 1, right);\n}`,
      proof: ["Partition đảm bảo mọi phần tử phía trái < pivot và phía phải ≥ pivot.", "Đệ quy giữ tính chất này cho các sub‑array."] ,
      edgeCases: ["Mảng rỗng, mảng đã sắp xếp, mảng có phần tử trùng."] ,
      variations: ["Randomized quick sort, dual‑pivot quick sort."] ,
      pitfalls: ["Chọn pivot kém gây độ sâu recursion lớn."] ,
      complexity: { time: "O(n log n) avg, O(n^2) worst", space: "O(log n)" },
      lessonSlugs: []
    },
    {
      slug: "lru-cache",
      title: "LRU Cache (Least Recently Used)",
      originalName: "LRU Cache",
      difficulty: "medium",
      category: "Data Structure / Cache",
      relatedAlgorithms: ["Hash Map", "Doubly Linked List"],
      summary: "Cấu trúc lưu trữ N mục, loại bỏ mục không được truy cập gần đây nhất khi đầy.",
      story: "Bạn cần một bộ nhớ đệm nhanh cho các truy vấn thường xuyên.",
      input: "Số lượng tối đa (capacity) và chuỗi các thao tác get/put.",
      output: "Kết quả của các thao tác get và trạng thái cache.",
      examples: [{ input: "capacity=2, ops=[put(1,1), put(2,2), get(1), put(3,3), get(2), get(3)]", output: "[1,-1,3]", explanation: "Sau put(3,3) cache chứa (1,1) và (3,3) vì 2 đã bị loại bỏ." }],
      approach: ["Sử dụng hashmap để truy cập O(1), danh sách liên kết kép để giữ thứ tự truy cập.", "Khi get/put, di chuyển node tới đầu danh sách.", "Khi vượt capacity, xóa node cuối (least recent)."] ,
      bruteForce: { title: "Array Cache", idea: "Lưu trong mảng, tìm kiếm tuần tự.", steps: ["Duyệt mảng để tìm key, nếu không có, xóa phần tử cũ nhất."] , complexity: { time: "O(capacity) per op", space: "O(capacity)" } },
      optimized: { title: "HashMap + DoublyLinkedList", idea: "Map key → node, list duy trì thứ tự.", steps: ["get: nếu tồn tại, di chuyển node lên đầu, trả về value.", "put: nếu key tồn tại, cập nhật value và di chuyển lên đầu; nếu không, thêm node đầu, nếu vượt capacity xóa node cuối."] , complexity: { time: "O(1)", space: "O(capacity)" } },
      walkthrough: ["put(1,1) → cache: [1]", "put(2,2) → [2,1]", "get(1) → di chuyển 1 lên đầu → [1,2]", "put(3,3) → capacity full, xóa 2 → [3,1]", "get(2) → -1", "get(3) → 3"] ,
      pseudocode: ["class LRUCache {", "  map = new Map();", "  head, tail = dummy nodes;", "  get(key): if !map.has(key) return -1; move node to head; return node.val;", "  put(key,val): if map.has(key) update val, move to head; else add new node at head; if size>cap remove tail;", "}"],
      code: `class LRUCache {\n  private capacity: number;\n  private map: Map<number, {key: number; value: number; prev: any; next: any}>;\n  private head: any;\n  private tail: any;\n  constructor(capacity: number) {\n    this.capacity = capacity;\n    this.map = new Map();\n    this.head = {prev: null, next: null};\n    this.tail = {prev: this.head, next: null};\n    this.head.next = this.tail;\n  }\n  private remove(node: any) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n  private insertAfterHead(node: any) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next.prev = node;\n    this.head.next = node;\n  }\n  get(key: number): number {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key)!;\n    this.remove(node);\n    this.insertAfterHead(node);\n    return node.value;\n  }\n  put(key: number, value: number): void {\n    if (this.map.has(key)) {\n      const node = this.map.get(key)!;\n      node.value = value;\n      this.remove(node);\n      this.insertAfterHead(node);\n    } else {\n      if (this.map.size >= this.capacity) {\n        const lru = this.tail.prev;\n        this.remove(lru);\n        this.map.delete(lru.key);\n      }\n      const node = {key, value, prev: null, next: null};\n      this.map.set(key, node);\n      this.insertAfterHead(node);\n    }\n  }\n}`,
      proof: ["Map cung cấp truy cập O(1).", "Danh sách kép duy trì thứ tự LRU.", "Các thao tác get/put đều O(1)."] ,
      edgeCases: ["capacity = 0 (không lưu).", "Cập nhật key đã tồn tại."] ,
      variations: ["LFU Cache, TTL Cache."] ,
      pitfalls: ["Quên cập nhật cả prev và next khi di chuyển node."] ,
      complexity: { time: "O(1)", space: "O(capacity)" },
      lessonSlugs: []
    },
    {
      slug: "kruskal-mst",
      title: "Thuật toán Kruskal (Minimum Spanning Tree)",
      originalName: "Kruskal's Algorithm",
      difficulty: "medium",
      category: "Graph / Minimum Spanning Tree",
      relatedAlgorithms: ["Disjoint Set Union", "Sorting"],
      summary: "Tìm cây khung tối thiểu có tổng trọng số nhỏ nhất trong đồ thị vô hướng.",
      story: "Bạn muốn kết nối các thành phố với chi phí tối thiểu mà không tạo vòng.",
      input: "Danh sách các cạnh (u, v, w).",
      output: "Tổng trọng số của cây khung tối thiểu và tập các cạnh thuộc MST.",
      examples: [{ input: "edges = [[0,1,1],[0,2,2],[1,2,3]]", output: "2", explanation: "Chọn các cạnh (0,1) và (0,2)." }],
      approach: ["Sắp xếp các cạnh theo trọng số tăng dần.", "Duyệt các cạnh, nếu hai đỉnh chưa kết nối, thêm vào MST và hợp nhất chúng bằng DSU.", "Dừng khi đã có (V-1) cạnh."] ,
      bruteForce: { title: "Enumerate all subsets of edges", idea: "Kiểm tra mọi tập con để tìm tập hợp kết nối và trọng số nhỏ nhất.", steps: ["Sinh mọi tập con.", "Kiểm tra có vòng và kết nối.", "Tính tổng trọng số, giữ tối thiểu."] , complexity: { time: "O(2^E)", space: "O(E)" } },
      optimized: { title: "Kruskal", idea: "Greedy + DSU, O(E log E).", steps: ["Sort edges.", "Initialize DSU.", "Iterate edges, union nếu không tạo chu trình."] , complexity: { time: "O(E log E)", space: "O(V)" } },
      walkthrough: ["edges sorted: (0,1,1),(0,2,2),(1,2,3).", "Add (0,1) → union(0,1).", "Add (0,2) → union(0,2).", "MST có 2 cạnh, tổng 3."] ,
      pseudocode: ["edges.sort(by weight)", "dsu = new DSU(V)", "mst = []", "for e in edges:", "  if dsu.find(e.u) != dsu.find(e.v):", "    mst.push(e)", "    dsu.union(e.u, e.v)", "    if mst.length == V-1: break"],
      code: `function kruskal(edges: Array<[number, number, number]>, V: number): {totalWeight: number, mst: Array<[number, number, number]>} {\n  edges.sort((a, b) => a[2] - b[2]);\n  const parent = Array.from({length: V}, (_, i) => i);\n  const rank = Array(V).fill(0);\n  const find = (x: number): number => {\n    if (parent[x] !== x) parent[x] = find(parent[x]);\n    return parent[x];\n  };\n  const union = (x: number, y: number) => {\n    const xr = find(x), yr = find(y);\n    if (xr === yr) return;\n    if (rank[xr] < rank[yr]) parent[xr] = yr;\n    else if (rank[xr] > rank[yr]) parent[yr] = xr;\n    else { parent[yr] = xr; rank[xr]++; }\n  };\n  let totalWeight = 0;\n  const mst: Array<[number, number, number]> = [];\n  for (const [u, v, w] of edges) {\n    if (find(u) !== find(v)) {\n      union(u, v);\n      mst.push([u, v, w]);\n      totalWeight += w;\n      if (mst.length === V - 1) break;\n    }\n  }\n  return { totalWeight, mst };\n}`,
      proof: ["Greedy chọn cạnh nhẹ nhất không tạo chu trình luôn dẫn đến MST (định lý Kruskal).", "DSU đảm bảo kiểm tra vòng nhanh."] ,
      edgeCases: ["Đồ thị không liên thông → không tạo MST đầy đủ.", "Nhiều cạnh cùng trọng số."] ,
      variations: ["Kruskal cho đồ thị trọng số âm, MST đa dạng."] ,
      pitfalls: ["Quên nén path trong DSU gây độ phức tạp cao."] ,
      complexity: { time: "O(E log E)", space: "O(V)" },
      lessonSlugs: []
    }
  ];

// Helper to group classic problems by category
function groupByCategory(problems: ClassicProblem[]): Record<string, ClassicProblem[]> {
  return problems.reduce((acc, problem) => {
    const key = problem.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(problem);
    return acc;
  }, {} as Record<string, ClassicProblem[]>);
}

export const classicProblemGroups = groupByCategory(classicProblems);



export function getClassicProblem(slug: string): ClassicProblem | undefined {
  return classicProblems.find((problem) => problem.slug === slug);
}

export function getProblemsByDifficulty(difficulty: ProblemDifficulty): ClassicProblem[] {
  return classicProblems.filter((problem) => problem.difficulty === difficulty);
}
