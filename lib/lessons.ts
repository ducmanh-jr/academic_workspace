export type LessonDifficulty = "foundation" | "beginner" | "intermediate";

export interface LessonStep {
  title: string;
  body: string;
}

export interface TraceRow {
  cells: string[];
}

export interface PracticeItem {
  question: string;
  answer: string;
  hint: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface Lesson {
  slug: string;
  title: string;
  topic: string;
  difficulty: LessonDifficulty;
  estimatedMinutes: number;
  summary: string;
  learningObjectives?: string[];
  why: string;
  coreIdea: string;
  analogy: string;
  exampleTitle: string;
  exampleInput: string;
  visualItems: string[];
  targetItems?: string[];
  traceHeaders: string[];
  traceRows: TraceRow[];
  steps: LessonStep[];
  detailedExplanation?: LessonStep[];
  pseudocode: string[];
  code: string;
  complexity: {
    time: string;
    space: string;
    why: string;
  };
  whenToUse: string;
  whenNotToUse: string;
  commonMistakes?: string[];
  practice: PracticeItem[];
  extraPractice?: PracticeItem[];
  quiz: QuizItem[];
  nextLesson?: string;
}

export const lessons: Lesson[] = [
  {
    slug: "thuat-toan-la-gi",
    title: "Thuật toán là gì?",
    topic: "Foundations",
    difficulty: "foundation",
    estimatedMinutes: 12,
    summary: "Hiểu thuật toán như một chuỗi bước rõ ràng để giải quyết một việc.",
    why:
      "Trước khi học code, bạn cần thấy thuật toán không xa lạ. Nó giống như công thức nấu ăn, đường đi về nhà, hay cách sắp xếp sách trên kệ.",
    coreIdea:
      "Thuật toán là một chuỗi bước có đầu vào, có xử lý, và có kết quả đầu ra.",
    analogy:
      "Nấu mì gói là một thuật toán đời thường: đun nước, cho mì, đợi 3 phút, thêm gia vị, rồi ăn.",
    exampleTitle: "Ví dụ: Pha một ly trà chanh",
    exampleInput: "Input: nước, trà, chanh, đường",
    visualItems: ["Nước", "Trà", "Chanh", "Đường", "Ly trà chanh"],
    targetItems: ["Ly trà chanh"],
    traceHeaders: ["Bước", "Hành động", "Kết quả"],
    traceRows: [
      { cells: ["1", "Đun nước", "Có nước nóng"] },
      { cells: ["2", "Cho trà vào", "Có nước trà"] },
      { cells: ["3", "Thêm chanh và đường", "Có ly trà chanh"] },
    ],
    steps: [
      {
        title: "1. Xác định input",
        body: "Máy tính cần biết dữ liệu bạn đưa vào là gì.",
      },
      {
        title: "2. Chia thành bước nhỏ",
        body: "Mỗi bước nên rõ ràng đến mức có thể làm theo mà không đoán.",
      },
      {
        title: "3. Trả về output",
        body: "Sau khi làm xong, thuật toán phải cho ra một kết quả.",
      },
    ],
    pseudocode: [
      "Nhận vào các nguyên liệu",
      "Làm từng bước theo đúng thứ tự",
      "Trả về thành phẩm",
    ],
    code: `def make_tea():
    ingredients = ["water", "tea", "lemon", "sugar"]
    result = "lemon tea"
    return result`,
    complexity: {
      time: "O(1)",
      space: "O(1)",
      why: "Số bước cố định, không phụ thuộc vào kích thước input.",
    },
    whenToUse: "Dùng cách nghĩ này khi bắt đầu mọi bài toán: input, bước xử lý, output.",
    whenNotToUse: "Không nên nhảy vào code ngay khi chưa hiểu mình cần tạo kết quả gì.",
    practice: [
      {
        question: "Hãy mô tả thuật toán đánh răng bằng 4 bước.",
        answer: "Lấy bàn chải, cho kem, chải răng, súc miệng.",
        hint: "Nghĩ xem đầu vào là gì và kết quả cuối cùng là gì.",
      },
    ],
    quiz: [
      {
        question: "Đâu là thành phần bắt buộc của một thuật toán để học dễ hiểu?",
        options: ["Input và output", "Giao diện đẹp", "Mảng lớn", "AI"],
        correct: "Input và output",
        explanation: "Nếu không biết đầu vào và đầu ra, ta chưa biết bài toán cần giải.",
      },
    ],
    nextLesson: "big-o-don-gian",
  },
  {
    slug: "big-o-don-gian",
    title: "Big-O thật đơn giản",
    topic: "Foundations",
    difficulty: "foundation",
    estimatedMinutes: 15,
    summary: "Hiểu Big-O là cách đo tốc độ tăng của số bước khi input lớn hơn.",
    why:
      "Khi mảng có 10 phần tử, cách nào cũng có vẻ nhanh. Khi mảng có 1 triệu phần tử, cách làm mới bắt đầu khác nhau rất nhiều.",
    coreIdea:
      "Big-O trả lời câu hỏi: nếu input lớn hơn, số bước tăng chậm hay nhanh?",
    analogy:
      "Tìm tên trong danh sách lớp: đọc từng tên là O(n), hỏi lớp trưởng đã biết vị trí là O(1).",
    exampleTitle: "Ví dụ: Đếm số lần nhìn vào mảng",
    exampleInput: "Mảng: [4, 8, 2, 9, 1]",
    visualItems: ["4", "8", "2", "9", "1"],
    traceHeaders: ["Cách làm", "Số phần tử", "Số bước"],
    traceRows: [
      { cells: ["Lấy phần tử đầu", "5", "1"] },
      { cells: ["Duyệt cả mảng", "5", "5"] },
      { cells: ["Hai vòng lặp", "5", "25"] },
    ],
    steps: [
      {
        title: "1. O(1)",
        body: "Số bước gần như không đổi khi input lớn hơn.",
      },
      {
        title: "2. O(n)",
        body: "Số bước tăng theo số phần tử.",
      },
      {
        title: "3. O(n^2)",
        body: "Mỗi phần tử lại đi so với nhiều phần tử khác.",
      },
    ],
    pseudocode: ["Đếm số vòng lặp", "Bỏ qua hằng số", "Giữ phần tăng nhanh nhất"],
    code: `def find_max(arr):
    best = arr[0]
    for value in arr:
        if value > best:
            best = value
    return best`,
    complexity: {
      time: "O(n)",
      space: "O(1)",
      why: "Hàm nhìn qua từng phần tử một lần và chỉ lưu một biến best.",
    },
    whenToUse: "Dùng Big-O để so sánh hai cách giải khi input có thể lớn.",
    whenNotToUse: "Không cần quá ám ảnh Big-O khi bài toán rất nhỏ hoặc code chưa đúng.",
    practice: [
      {
        question: "Một vòng lặp qua n phần tử thường là O gì?",
        answer: "O(n).",
        hint: "Số bước tăng cùng chiều với số phần tử.",
      },
    ],
    quiz: [
      {
        question: "Hai vòng lặp lồng nhau qua n phần tử thường là gì?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
        correct: "O(n^2)",
        explanation: "Mỗi phần tử của vòng ngoài lại chạy n lần ở vòng trong.",
      },
    ],
    nextLesson: "linear-search",
  },
  {
    slug: "linear-search",
    title: "Linear Search",
    topic: "Searching",
    difficulty: "beginner",
    estimatedMinutes: 15,
    summary: "Tìm một giá trị bằng cách kiểm tra từng phần tử từ trái sang phải.",
    why:
      "Đây là cách tìm kiếm tự nhiên nhất khi dữ liệu chưa sắp xếp. Nó chậm hơn Binary Search, nhưng đơn giản và dùng trong nhiều tình huống.",
    coreIdea: "Xem từng phần tử. Gặp target thì dừng lại.",
    analogy:
      "Tìm một quyển sách trên bàn lớn: nếu sách không sắp xếp, bạn phải nhìn từng quyển.",
    exampleTitle: "Ví dụ: Tìm số 7",
    exampleInput: "Mảng: [4, 2, 7, 1, 9]",
    visualItems: ["4", "2", "7", "1", "9"],
    targetItems: ["7"],
    traceHeaders: ["Vị trí", "Giá trị", "Hành động"],
    traceRows: [
      { cells: ["0", "4", "Chưa phải 7"] },
      { cells: ["1", "2", "Chưa phải 7"] },
      { cells: ["2", "7", "Tìm thấy"] },
    ],
    steps: [
      {
        title: "1. Bắt đầu từ đầu mảng",
        body: "Đặt chỉ số i = 0.",
      },
      {
        title: "2. So sánh",
        body: "Nếu arr[i] bằng target, trả về i.",
      },
      {
        title: "3. Đi tiếp",
        body: "Nếu chưa đúng, tăng i và lặp lại.",
      },
    ],
    pseudocode: ["Đi qua từng phần tử", "Nếu gặp target thì trả về vị trí", "Hết mảng thì trả về -1"],
    code: `def linear_search(arr, target):
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1`,
    complexity: {
      time: "O(n)",
      space: "O(1)",
      why: "Trường hợp xấu nhất phải xem hết n phần tử, chỉ dùng thêm vài biến.",
    },
    whenToUse: "Dùng khi mảng chưa sắp xếp hoặc dữ liệu nhỏ.",
    whenNotToUse: "Nếu mảng đã sắp xếp và cần tìm nhiều lần, Binary Search tốt hơn.",
    practice: [
      {
        question: "Với [3, 5, 8, 10], tìm 10 thì cần so sánh mấy lần?",
        answer: "4 lần.",
        hint: "Linear Search đi từ trái sang phải đến khi gặp 10.",
      },
    ],
    quiz: [
      {
        question: "Linear Search có time complexity xấu nhất là gì?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: "O(n)",
        explanation: "Vì target có thể nằm cuối mảng hoặc không tồn tại.",
      },
    ],
    nextLesson: "binary-search",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    topic: "Searching",
    difficulty: "beginner",
    estimatedMinutes: 18,
    summary: "Tìm nhanh trong mảng đã sắp xếp bằng cách chia đôi phạm vi tìm kiếm.",
    why:
      "Khi dữ liệu đã sắp xếp, ta không cần xem từng phần tử. Mỗi lần nhìn ở giữa, ta loại bỏ được một nửa.",
    coreIdea:
      "Nhìn vào phần tử giữa. Nếu target nhỏ hơn thì tìm bên trái, lớn hơn thì tìm bên phải.",
    analogy:
      "Đoán số từ 1 đến 100: thay vì đoán 1, 2, 3..., bạn đoán 50 trước để loại nửa khoảng.",
    exampleTitle: "Ví dụ: Tìm số 7",
    exampleInput: "Mảng: [1, 3, 5, 7, 9, 11]",
    visualItems: ["1", "3", "5", "7", "9", "11"],
    targetItems: ["7"],
    traceHeaders: ["Phạm vi", "Giữa", "Giá trị", "Hành động"],
    traceRows: [
      { cells: ["0..5", "2", "5", "7 lớn hơn 5, tìm nửa phải"] },
      { cells: ["3..5", "4", "9", "7 nhỏ hơn 9, tìm nửa trái"] },
      { cells: ["3..3", "3", "7", "Tìm thấy tại vị trí 3"] },
    ],
    steps: [
      {
        title: "1. Giữ phạm vi",
        body: "Dùng left và right để biết mình đang tìm trong đoạn nào.",
      },
      {
        title: "2. Kiểm tra giữa",
        body: "Tính mid và so sánh arr[mid] với target.",
      },
      {
        title: "3. Loại nửa sai",
        body: "Cập nhật left hoặc right để bỏ phần chắc chắn không cần tìm.",
      },
    ],
    pseudocode: [
      "Đặt left ở đầu, right ở cuối",
      "Trong khi left <= right, tính mid",
      "Nếu arr[mid] bằng target thì trả về mid",
      "Nếu arr[mid] nhỏ hơn target, đổi left",
      "Ngược lại đổi right",
    ],
    code: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      why: "Mỗi lần lặp loại bỏ một nửa phạm vi tìm kiếm.",
    },
    whenToUse: "Dùng khi mảng đã sắp xếp và cần tìm nhanh.",
    whenNotToUse: "Không dùng trực tiếp nếu mảng chưa sắp xếp.",
    practice: [
      {
        question: "Với [2, 4, 6, 8, 10] và target 4, lần đầu nhìn vào vị trí nào?",
        answer: "Vị trí 2, giá trị 6.",
        hint: "mid = (left + right) // 2 voi left = 0, right = 4.",
      },
    ],
    quiz: [
      {
        question: "Điều kiện quan trọng để dùng Binary Search là gì?",
        options: ["Mảng đã sắp xếp", "Mảng có số âm", "Mảng có độ dài chẵn", "Mảng không có duplicate"],
        correct: "Mảng đã sắp xếp",
        explanation: "Nếu mảng không sắp xếp, việc loại bỏ nửa trái/nửa phải không còn đúng.",
      },
    ],
    nextLesson: "bubble-sort",
  },
  {
    slug: "bubble-sort",
    title: "Bubble Sort",
    topic: "Sorting",
    difficulty: "beginner",
    estimatedMinutes: 18,
    summary: "Sắp xếp bằng cách đổi chỗ hai phần tử kề nhau nếu chúng sai thứ tự.",
    why:
      "Bubble Sort không phải thuật toán nhanh, nhưng rất tốt để người mới hiểu ý tưởng so sánh và đổi chỗ.",
    coreIdea:
      "Đi từ trái sang phải, cặp nào sai thứ tự thì đổi chỗ. Sau mỗi lượt, phần tử lớn nhất trôi về cuối.",
    analogy:
      "Xếp hàng theo chiều cao: hai người đứng cạnh nhau sai thứ tự thì đổi chỗ.",
    exampleTitle: "Ví dụ: Sắp xếp tăng dần",
    exampleInput: "Mảng: [5, 1, 4, 2]",
    visualItems: ["5", "1", "4", "2"],
    targetItems: ["5"],
    traceHeaders: ["So sánh", "Hành động", "Mảng sau bước"],
    traceRows: [
      { cells: ["5 và 1", "Đổi chỗ", "[1, 5, 4, 2]"] },
      { cells: ["5 và 4", "Đổi chỗ", "[1, 4, 5, 2]"] },
      { cells: ["5 và 2", "Đổi chỗ", "[1, 4, 2, 5]"] },
    ],
    steps: [
      {
        title: "1. So sánh cặp kề nhau",
        body: "Nhìn arr[i] và arr[i + 1].",
      },
      {
        title: "2. Đổi chỗ nếu sai",
        body: "Nếu phần tử trái lớn hơn phần tử phải, đổi chúng.",
      },
      {
        title: "3. Lặp nhiều lượt",
        body: "Mỗi lượt đưa thêm một phần tử lớn về đúng cuối mảng.",
      },
    ],
    pseudocode: [
      "Lặp qua từng lượt",
      "Trong mỗi lượt, so sánh các cặp kề nhau",
      "Nếu sai thứ tự thì đổi chỗ",
      "Dừng khi không còn đổi chỗ nào",
    ],
    code: `def bubble_sort(arr):
    n = len(arr)

    for end in range(n - 1, 0, -1):
        swapped = False
        for i in range(end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        if not swapped:
            break

    return arr`,
    complexity: {
      time: "O(n^2)",
      space: "O(1)",
      why: "Có hai vòng lặp lồng nhau, đổi chỗ trực tiếp trên mảng.",
    },
    whenToUse: "Dùng để học ý tưởng sorting và swap với mảng nhỏ.",
    whenNotToUse: "Không dùng cho dữ liệu lớn trong sản phẩm thật.",
    practice: [
      {
        question: "Sau lượt đầu với [3, 1, 2], mảng thành gì?",
        answer: "[1, 2, 3].",
        hint: "So sánh 3-1 rồi 3-2.",
      },
    ],
    quiz: [
      {
        question: "Bubble Sort đưa phần tử nào về cuối sau mỗi lượt?",
        options: ["Nhỏ nhất", "Lớn nhất", "Ở giữa", "Ngẫu nhiên"],
        correct: "Lớn nhất",
        explanation: "Các phần tử lớn bị đổi dần sang phải qua từng cặp so sánh.",
      },
    ],
    nextLesson: "selection-sort",
  },
  createSortingLesson({
    slug: "selection-sort",
    title: "Selection Sort",
    summary: "Sắp xếp bằng cách chọn phần tử nhỏ nhất trong vùng chưa sắp xếp và đưa về đầu.",
    coreIdea: "Mỗi lượt chọn phần tử nhỏ nhất còn lại rồi đổi nó về vị trí đúng tiếp theo.",
    analogy: "Giống như chọn người thấp nhất trong hàng còn lại và đưa lên đầu hàng.",
    time: "O(n^2)",
    space: "O(1)",
    steps: [
      "Chia mảng thành vùng đã sắp xếp và chưa sắp xếp.",
      "Tìm phần tử nhỏ nhất trong vùng chưa sắp xếp.",
      "Đổi phần tử nhỏ nhất đó với phần tử đầu vùng chưa sắp xếp.",
    ],
    code: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
    nextLesson: "insertion-sort",
  }),
  createSortingLesson({
    slug: "insertion-sort",
    title: "Insertion Sort",
    summary: "Sắp xếp bằng cách lấy từng phần tử và chèn vào đúng vị trí trong vùng đã sắp xếp.",
    coreIdea: "Giữ bên trái đã sắp xếp, lấy phần tử mới và dịch các phần tử lớn hơn sang phải để chèn nó vào.",
    analogy: "Giống cách xếp bài trên tay: rút một lá và chèn vào vị trí đúng.",
    time: "O(n^2)",
    space: "O(1)",
    steps: [
      "Xem phần tử đầu tiên là vùng đã sắp xếp.",
      "Lấy phần tử kế tiếp làm key.",
      "Dịch các phần tử lớn hơn key sang phải và chèn key vào chỗ trống.",
    ],
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    nextLesson: "quick-sort",
  }),
  createSortingLesson({
    slug: "quick-sort",
    title: "Quick Sort",
    summary: "Sắp xếp nhanh bằng cách chọn pivot, partition mảng rồi đệ quy hai phía.",
    coreIdea: "Đưa các phần tử nhỏ hơn pivot sang trái, lớn hơn pivot sang phải, rồi xử lý tiếp hai nửa.",
    analogy: "Giống chia nhóm người thấp hơn và cao hơn một người mốc, rồi tiếp tục chia từng nhóm.",
    time: "O(n log n) trung bình, O(n^2) xấu nhất",
    space: "O(log n)",
    steps: [
      "Chọn một pivot.",
      "Partition để pivot đứng giữa hai nhóm nhỏ hơn và lớn hơn.",
      "Đệ quy Quick Sort cho hai nửa còn lại.",
    ],
    code: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
    nextLesson: "merge-sort",
  }),
  createSortingLesson({
    slug: "merge-sort",
    title: "Merge Sort",
    summary: "Sắp xếp bằng chia để trị: chia mảng thành nửa nhỏ rồi merge lại theo thứ tự.",
    coreIdea: "Hai mảng đã sắp xếp có thể được trộn thành một mảng lớn đã sắp xếp.",
    analogy: "Giống trộn hai chồng bài đã được sắp sẵn thành một chồng bài hoàn chỉnh.",
    time: "O(n log n)",
    space: "O(n)",
    steps: [
      "Chia mảng thành hai nửa.",
      "Sắp xếp từng nửa bằng Merge Sort.",
      "Merge hai nửa đã sắp xếp thành kết quả.",
    ],
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
    nextLesson: "counting-sort",
  }),
  createSortingLesson({
    slug: "counting-sort",
    title: "Counting Sort",
    summary: "Sắp xếp số nguyên trong khoảng nhỏ bằng cách đếm số lần xuất hiện của từng giá trị.",
    coreIdea: "Không so sánh từng cặp; thay vào đó đếm tần suất rồi ghi lại output theo thứ tự giá trị.",
    analogy: "Giống phân loại phiếu theo số điểm: đếm mỗi điểm xuất hiện bao nhiêu lần rồi viết lại từ thấp đến cao.",
    time: "O(n + k)",
    space: "O(k)",
    steps: [
      "Tạo mảng count cho các giá trị có thể xuất hiện.",
      "Duyệt input và tăng count[value].",
      "Dựa vào count để ghi lại các giá trị theo thứ tự.",
    ],
    code: `def counting_sort(arr):
    if not arr:
        return arr

    max_value = max(arr)
    count = [0] * (max_value + 1)

    for value in arr:
        count[value] += 1

    result = []
    for value, freq in enumerate(count):
        result.extend([value] * freq)
    return result`,
    nextLesson: "radix-sort",
  }),
  createSortingLesson({
    slug: "radix-sort",
    title: "Radix Sort",
    summary: "Sắp xếp số nguyên bằng cách xử lý từng chữ số từ hàng đơn vị đến hàng cao hơn.",
    coreIdea: "Dùng một thuật toán stable sort cho từng chữ số, từ chữ số ít quan trọng nhất đến quan trọng nhất.",
    analogy: "Giống sắp xếp mã số sinh viên theo hàng đơn vị, rồi hàng chục, rồi hàng trăm nhưng vẫn giữ thứ tự trước đó.",
    time: "O(d × (n + k))",
    space: "O(n + k)",
    steps: [
      "Tìm số có nhiều chữ số nhất.",
      "Stable sort theo hàng đơn vị, hàng chục, hàng trăm...",
      "Sau chữ số cuối cùng, mảng đã được sắp xếp.",
    ],
    code: `def radix_sort(arr):
    if not arr:
        return arr

    exp = 1
    max_value = max(arr)

    while max_value // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    output = [0] * len(arr)
    count = [0] * 10

    for value in arr:
        digit = (value // exp) % 10
        count[digit] += 1

    for i in range(1, 10):
        count[i] += count[i - 1]

    for value in reversed(arr):
        digit = (value // exp) % 10
        output[count[digit] - 1] = value
        count[digit] -= 1

    return output`,
  }),
];

function createSortingLesson({
  slug,
  title,
  summary,
  coreIdea,
  analogy,
  time,
  space,
  steps,
  code,
  nextLesson,
}: {
  slug: string;
  title: string;
  summary: string;
  coreIdea: string;
  analogy: string;
  time: string;
  space: string;
  steps: string[];
  code: string;
  nextLesson?: string;
}): Lesson {
  return {
    slug,
    title,
    topic: "Sorting",
    difficulty: title.includes("Quick") || title.includes("Merge") || title.includes("Counting") || title.includes("Radix")
      ? "intermediate"
      : "beginner",
    estimatedMinutes: 22,
    summary,
    learningObjectives: [
      `Hiểu ${title} giải quyết bài toán sắp xếp như thế nào.`,
      "Trace được thuật toán bằng ví dụ nhỏ.",
      "Đọc và tự viết lại được code Python.",
      "Phân tích được Time complexity và Space complexity.",
    ],
    why:
      "Sắp xếp là nhóm thuật toán nền tảng vì rất nhiều bài toán trở nên dễ hơn sau khi dữ liệu có thứ tự.",
    coreIdea,
    analogy,
    exampleTitle: "Ví dụ: Sắp xếp tăng dần",
    exampleInput: "Mảng: [7, 12, 9, 11, 3]",
    visualItems: ["7", "12", "9", "11", "3"],
    targetItems: ["3"],
    traceHeaders: ["Giai đoạn", "Hành động", "Ý nghĩa"],
    traceRows: steps.map((step, index) => ({
      cells: [`${index + 1}`, step, "Thu hẹp dần phần chưa sắp xếp."],
    })),
    steps: steps.map((step, index) => ({
      title: `${index + 1}. ${step.split(".")[0]}`,
      body: step,
    })),
    detailedExplanation: [
      {
        title: "Bản chất",
        body: coreIdea,
      },
      {
        title: "Điểm cần quan sát khi trace",
        body: "Hãy theo dõi phần tử đang được so sánh, phần đã chắc chắn đúng vị trí, và trạng thái mảng sau mỗi bước quan trọng.",
      },
      {
        title: "Độ phức tạp",
        body: `Time complexity: ${time}. Space complexity: ${space}.`,
      },
      {
        title: "Khi học thuật toán này",
        body: "Đừng học thuộc code trước. Hãy chạy mô phỏng, tự trace 1 mảng nhỏ, rồi mới đọc code Python.",
      },
    ],
    pseudocode: steps,
    code,
    complexity: {
      time,
      space,
      why: `Với ${title}, số bước phụ thuộc vào cách thuật toán chia, quét hoặc đếm dữ liệu. Trường hợp chính của bài này là ${time}.`,
    },
    whenToUse: "Dùng khi cần biến dữ liệu lộn xộn thành có thứ tự để tìm kiếm, so sánh hoặc xử lý tiếp.",
    whenNotToUse: "Không nên dùng nếu bài toán không cần thứ tự hoặc có thuật toán chuyên biệt nhanh hơn cho ràng buộc cụ thể.",
    commonMistakes: [
      "Chỉ học thuộc code mà không trace từng bước.",
      "Nhầm phần đã sắp xếp với phần chưa sắp xếp.",
      "Quên edge cases như mảng rỗng, một phần tử, phần tử trùng nhau.",
    ],
    practice: [
      {
        question: `Trace ${title} với mảng [4, 1, 3]. Sau bước quan trọng đầu tiên mảng thay đổi thế nào?`,
        answer: "Hãy chạy mô phỏng phía trên và ghi lại trạng thái mảng sau bước đầu.",
        hint: "Tập trung vào phần tử đang được chọn/so sánh/chèn/chia.",
      },
    ],
    extraPractice: [
      {
        question: "Thuật toán này có giữ nguyên thứ tự tương đối của phần tử bằng nhau không?",
        answer: "Tùy thuật toán và cách cài đặt. Đây là câu hỏi về tính stable.",
        hint: "Hãy thử mảng có hai giá trị bằng nhau nhưng gắn nhãn khác nhau.",
      },
      {
        question: "Nếu mảng đã gần sắp xếp, thuật toán này có lợi thế gì không?",
        answer: "Một số thuật toán như Insertion Sort có lợi thế rõ; một số như Selection Sort gần như không.",
        hint: "So sánh số lần quét và số lần đổi chỗ.",
      },
    ],
    quiz: [
      {
        question: `${title} thuộc nhóm thuật toán nào?`,
        options: ["Sorting", "Searching", "Graph", "Hashing"],
        correct: "Sorting",
        explanation: `${title} dùng để sắp xếp dữ liệu theo thứ tự.`,
      },
    ],
    nextLesson,
  };
}

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNextLesson(current: Lesson): Lesson | undefined {
  return current.nextLesson ? getLesson(current.nextLesson) : undefined;
}
