import type { CodeLine } from "@/components/chatkode/CodePanel";

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Developers", href: "#developers" },
  { label: "About", href: "#about" },
];

export const capabilities = ["Code", "Math", "Algorithms", "Reasoning", "Engineering"];

export const pipeline = [
  {
    step: "01",
    label: "Question",
    body: "A problem stated in plain language, with its constraints and edge cases surfaced first.",
  },
  {
    step: "02",
    label: "Analysis",
    body: "Inputs, invariants and failure modes are separated from the noise before anything is written.",
  },
  {
    step: "03",
    label: "Mathematical model",
    body: "The problem is expressed formally — sets, recurrences, bounds — so the shape of the solution is visible.",
  },
  {
    step: "04",
    label: "Algorithm",
    body: "A concrete procedure with a stated complexity, chosen against the constraints, not against a template.",
  },
  {
    step: "05",
    label: "Implementation",
    body: "Readable code that matches the reasoning above it, in the language you actually ship.",
  },
];

export const comparison = [
  { generic: "General conversation", focused: "Technical problem solving" },
  { generic: "Basic answers", focused: "Structured reasoning" },
  { generic: "Code generation", focused: "Algorithmic thinking" },
  { generic: "Restates the prompt", focused: "States constraints and complexity" },
  { generic: "One shape for every task", focused: "Model first, then implement" },
];

export const heroCode: CodeLine[] = [
  [{ t: "# problem: schedule jobs to minimise total lateness", c: "com" }],
  [
    { t: "from", c: "key" },
    { t: " heapq " },
    { t: "import", c: "key" },
    { t: " heappush, heappop" },
  ],
  [{ t: "" }],
  [{ t: "# model: jobs (p_i, d_i) — greedy by due date is optimal (EDD)", c: "com" }],
  [
    { t: "def", c: "key" },
    { t: " " },
    { t: "min_total_lateness", c: "fn" },
    { t: "(jobs):" },
  ],
  [
    { t: "    jobs = " },
    { t: "sorted", c: "fn" },
    { t: "(jobs, key=" },
    { t: "lambda", c: "key" },
    { t: " j: j[" },
    { t: "1", c: "num" },
    { t: "])   " },
    { t: "# O(n log n)", c: "com" },
  ],
  [
    { t: "    t = lateness = " },
    { t: "0", c: "num" },
  ],
  [
    { t: "    " },
    { t: "for", c: "key" },
    { t: " p, d " },
    { t: "in", c: "key" },
    { t: " jobs:" },
  ],
  [{ t: "        t += p" }],
  [
    { t: "        lateness += " },
    { t: "max", c: "fn" },
    { t: "(" },
    { t: "0", c: "num" },
    { t: ", t - d)" },
  ],
  [
    { t: "    " },
    { t: "return", c: "key" },
    { t: " lateness" },
  ],
];

export const codeTabs = ["Python", "C++", "JavaScript", "TypeScript", "Rust"] as const;
export type CodeTab = (typeof codeTabs)[number];

export const implementations: Record<CodeTab, CodeLine[]> = {
  Python: [
    [{ t: "# binary search on the answer — O(n log S)", c: "com" }],
    [
      { t: "def", c: "key" },
      { t: " " },
      { t: "min_capacity", c: "fn" },
      { t: "(weights, days):" },
    ],
    [
      { t: "    lo, hi = " },
      { t: "max", c: "fn" },
      { t: "(weights), " },
      { t: "sum", c: "fn" },
      { t: "(weights)" },
    ],
    [
      { t: "    " },
      { t: "while", c: "key" },
      { t: " lo < hi:" },
    ],
    [
      { t: "        mid = (lo + hi) // " },
      { t: "2", c: "num" },
    ],
    [
      { t: "        " },
      { t: "if", c: "key" },
      { t: " " },
      { t: "feasible", c: "fn" },
      { t: "(weights, days, mid): hi = mid" },
    ],
    [
      { t: "        " },
      { t: "else", c: "key" },
      { t: ": lo = mid + " },
      { t: "1", c: "num" },
    ],
    [
      { t: "    " },
      { t: "return", c: "key" },
      { t: " lo" },
    ],
  ],
  "C++": [
    [{ t: "// binary search on the answer — O(n log S)", c: "com" }],
    [
      { t: "int", c: "key" },
      { t: " " },
      { t: "minCapacity", c: "fn" },
      { t: "(vector<" },
      { t: "int", c: "key" },
      { t: ">& w, " },
      { t: "int", c: "key" },
      { t: " days) {" },
    ],
    [
      { t: "  " },
      { t: "int", c: "key" },
      { t: " lo = *max_element(w.begin(), w.end());" },
    ],
    [
      { t: "  " },
      { t: "int", c: "key" },
      { t: " hi = accumulate(w.begin(), w.end(), " },
      { t: "0", c: "num" },
      { t: ");" },
    ],
    [
      { t: "  " },
      { t: "while", c: "key" },
      { t: " (lo < hi) {" },
    ],
    [
      { t: "    " },
      { t: "int", c: "key" },
      { t: " mid = lo + (hi - lo) / " },
      { t: "2", c: "num" },
      { t: ";" },
    ],
    [
      { t: "    feasible(w, days, mid) ? hi = mid : lo = mid + " },
      { t: "1", c: "num" },
      { t: ";" },
    ],
    [{ t: "  }" }],
    [
      { t: "  " },
      { t: "return", c: "key" },
      { t: " lo;" },
    ],
    [{ t: "}" }],
  ],
  JavaScript: [
    [{ t: "// binary search on the answer — O(n log S)", c: "com" }],
    [
      { t: "function", c: "key" },
      { t: " " },
      { t: "minCapacity", c: "fn" },
      { t: "(weights, days) {" },
    ],
    [
      { t: "  " },
      { t: "let", c: "key" },
      { t: " lo = Math." },
      { t: "max", c: "fn" },
      { t: "(...weights);" },
    ],
    [
      { t: "  " },
      { t: "let", c: "key" },
      { t: " hi = weights." },
      { t: "reduce", c: "fn" },
      { t: "((a, b) => a + b, " },
      { t: "0", c: "num" },
      { t: ");" },
    ],
    [
      { t: "  " },
      { t: "while", c: "key" },
      { t: " (lo < hi) {" },
    ],
    [
      { t: "    " },
      { t: "const", c: "key" },
      { t: " mid = (lo + hi) >> " },
      { t: "1", c: "num" },
      { t: ";" },
    ],
    [
      { t: "    " },
      { t: "if", c: "key" },
      { t: " (" },
      { t: "feasible", c: "fn" },
      { t: "(weights, days, mid)) hi = mid;" },
    ],
    [
      { t: "    " },
      { t: "else", c: "key" },
      { t: " lo = mid + " },
      { t: "1", c: "num" },
      { t: ";" },
    ],
    [{ t: "  }" }],
    [
      { t: "  " },
      { t: "return", c: "key" },
      { t: " lo;" },
    ],
    [{ t: "}" }],
  ],
  TypeScript: [
    [{ t: "// binary search on the answer — O(n log S)", c: "com" }],
    [
      { t: "export function", c: "key" },
      { t: " " },
      { t: "minCapacity", c: "fn" },
      { t: "(weights: " },
      { t: "number", c: "key" },
      { t: "[], days: " },
      { t: "number", c: "key" },
      { t: "): " },
      { t: "number", c: "key" },
      { t: " {" },
    ],
    [
      { t: "  " },
      { t: "let", c: "key" },
      { t: " lo = Math." },
      { t: "max", c: "fn" },
      { t: "(...weights);" },
    ],
    [
      { t: "  " },
      { t: "let", c: "key" },
      { t: " hi = weights." },
      { t: "reduce", c: "fn" },
      { t: "((a, b) => a + b, " },
      { t: "0", c: "num" },
      { t: ");" },
    ],
    [
      { t: "  " },
      { t: "while", c: "key" },
      { t: " (lo < hi) {" },
    ],
    [
      { t: "    " },
      { t: "const", c: "key" },
      { t: " mid = (lo + hi) >> " },
      { t: "1", c: "num" },
      { t: ";" },
    ],
    [
      { t: "    " },
      { t: "if", c: "key" },
      { t: " (" },
      { t: "feasible", c: "fn" },
      { t: "(weights, days, mid)) hi = mid;" },
    ],
    [
      { t: "    " },
      { t: "else", c: "key" },
      { t: " lo = mid + " },
      { t: "1", c: "num" },
      { t: ";" },
    ],
    [{ t: "  }" }],
    [
      { t: "  " },
      { t: "return", c: "key" },
      { t: " lo;" },
    ],
    [{ t: "}" }],
  ],
  Rust: [
    [{ t: "// binary search on the answer — O(n log S)", c: "com" }],
    [
      { t: "pub fn", c: "key" },
      { t: " " },
      { t: "min_capacity", c: "fn" },
      { t: "(w: &[" },
      { t: "u32", c: "key" },
      { t: "], days: " },
      { t: "u32", c: "key" },
      { t: ") -> " },
      { t: "u32", c: "key" },
      { t: " {" },
    ],
    [
      { t: "    " },
      { t: "let", c: "key" },
      { t: " (" },
      { t: "mut", c: "key" },
      { t: " lo, " },
      { t: "mut", c: "key" },
      { t: " hi) = (*w." },
      { t: "iter", c: "fn" },
      { t: "()." },
      { t: "max", c: "fn" },
      { t: "()." },
      { t: "unwrap", c: "fn" },
      { t: "(), w." },
      { t: "iter", c: "fn" },
      { t: "()." },
      { t: "sum", c: "fn" },
      { t: "());" },
    ],
    [
      { t: "    " },
      { t: "while", c: "key" },
      { t: " lo < hi {" },
    ],
    [
      { t: "        " },
      { t: "let", c: "key" },
      { t: " mid = lo + (hi - lo) / " },
      { t: "2", c: "num" },
      { t: ";" },
    ],
    [
      { t: "        " },
      { t: "if", c: "key" },
      { t: " " },
      { t: "feasible", c: "fn" },
      { t: "(w, days, mid) { hi = mid } " },
      { t: "else", c: "key" },
      { t: " { lo = mid + " },
      { t: "1", c: "num" },
      { t: " }" },
    ],
    [{ t: "    }" }],
    [{ t: "    lo" }],
    [{ t: "}" }],
  ],
};

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "#product" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Mathematics", href: "#mathematics" },
      { label: "Coding", href: "#coding" },
      { label: "Algorithms", href: "#algorithms" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developer experience", href: "#developers" },
      { label: "Approach", href: "#approach" },
      { label: "Try ChatKode", href: "#try" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Kode Developers", href: "#about" },
      { label: "Contact", href: "#about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Acceptable use", href: "#" },
    ],
  },
];
