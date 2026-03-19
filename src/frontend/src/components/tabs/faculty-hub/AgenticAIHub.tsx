import {
  Bot,
  Cpu,
  GitCompare,
  RotateCcw,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AgentId = "claude" | "gemini" | "gpt4";
type QuickTask = "lesson" | "quiz" | "feedback";

interface Message {
  id: string;
  role: "user" | "agent";
  text: string;
  timestamp: string;
}

const AGENTS: Record<
  AgentId,
  {
    name: string;
    company: string;
    emoji: string;
    tagline: string;
    personality: string;
    gradient: string;
    border: string;
    tags: string[];
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  claude: {
    name: "Claude",
    company: "Anthropic",
    emoji: "🤖",
    tagline: "Thoughtful · Safe · Analytical",
    personality:
      "Claude excels at nuanced reasoning, ethical analysis, and creating structured educational content with deep pedagogical insight.",
    gradient: "linear-gradient(135deg, #f97316, #ea580c, #c2410c)",
    border: "#f97316",
    tags: ["Analytical", "Safe AI", "Lesson Planning", "Long-form"],
    icon: Bot,
  },
  gemini: {
    name: "Gemini",
    company: "Google DeepMind",
    emoji: "✨",
    tagline: "Visual · Creative · Multimodal",
    personality:
      "Gemini brings multimodal creativity, leveraging visual thinking, interactive tools, and Google's ecosystem for modern classroom experiences.",
    gradient: "linear-gradient(135deg, #4285f4, #0f9d58, #f4b400, #db4437)",
    border: "#4285f4",
    tags: ["Multimodal", "Visual", "Creative", "Adaptive"],
    icon: Sparkles,
  },
  gpt4: {
    name: "GPT-4",
    company: "OpenAI",
    emoji: "⚡",
    tagline: "Precise · Structured · Powerful",
    personality:
      "GPT-4 delivers highly structured, accurate, and comprehensive educational content with strong domain expertise across all subjects.",
    gradient: "linear-gradient(135deg, #10a37f, #0d8a6a, #065f46)",
    border: "#10a37f",
    tags: ["Precise", "Structured", "Question Banks", "STEM"],
    icon: Zap,
  },
};

const QUICK_TASK_LABELS: Record<QuickTask, string> = {
  lesson: "Generate Lesson Plan",
  quiz: "Create Quiz",
  feedback: "Student Feedback",
};

const MOCK_RESPONSES: Record<AgentId, Record<QuickTask | "default", string>> = {
  claude: {
    lesson: `**Lesson Plan: Data Structures & Algorithms (45 min)**

**Learning Objectives:**
• Understand time complexity analysis (Big-O notation)
• Implement binary search trees from scratch
• Apply recursion to solve tree traversal problems

**Phase 1 — Hook (5 min)**
Start with a relatable analogy: "How does Google autocomplete work?" This connects tree data structures to real-world applications students already use.

**Phase 2 — Conceptual Foundation (10 min)**
Present the BST insertion and deletion rules using a visual diagram on the board. Emphasize the invariant property: left < root < right.

**Phase 3 — Live Coding (20 min)**
Live-code a BST implementation in Python alongside students. Pause at each method to ask: "What should happen when node is None?"

**Phase 4 — Collaborative Practice (8 min)**
Pair students to implement inorder traversal. Circulate and ask questions to uncover misconceptions.

**Phase 5 — Synthesis & Preview (2 min)**
Exit ticket: "Name one real application where a BST would outperform a linked list."

**Assessment:** Collect exit tickets; identify students who need additional support before the next session.`,
    quiz: `**Quiz: Linked Lists & Arrays (20 Marks)**

**Section A — MCQ (5 × 1 = 5 Marks)**
1. Which operation is O(1) for arrays but O(n) for linked lists? *(a) Insert at tail (b) Random access (c) Delete head (d) Count elements*
2. A doubly linked list node contains: *(a) data only (b) data + next (c) data + prev + next (d) data + index)*

**Section B — Short Answer (3 × 3 = 9 Marks)**
3. Write the time complexity for insert/delete/search in a sorted array vs. sorted linked list. Justify your answer.
4. Explain why arrays have better cache performance than linked lists.
5. Describe a real-world scenario where a circular linked list is the ideal data structure.

**Section C — Program Writing (1 × 6 = 6 Marks)**
6. Write a function to reverse a singly linked list in O(n) time and O(1) space. Include edge case handling for empty list and single-node list.

**Grading Notes:** Award partial marks in Section C for correct logic even if syntax has minor errors. Check for boundary condition handling.`,
    feedback: `**Student Feedback Analysis — Claude's Assessment**

**Pattern Recognition from 34 Anonymous Responses:**

🟢 **Strengths Observed:**
• 82% of students appreciate the structured pace and clear examples
• Concept explanations rated 4.2/5 on average
• Lab sessions praised as "hands-on and engaging"

🟡 **Areas Requiring Attention:**
• 44% indicate difficulty connecting theory to implementation
• Students report feeling "lost" during recursion topics
• Request for more worked examples before assignments

🔴 **Immediate Action Items:**
1. Dedicate one extra session to recursion with visual tracing
2. Provide a "bridge sheet" connecting each concept to its real-world use
3. Introduce concept-check quizzes before major assignments

**Recommended Action Plan:**
- Week 1: Additional recursion reinforcement session
- Week 2: Implement peer-learning pairs for problem-solving
- Week 3: Offer optional drop-in hour before assignments

*This analysis is based on sentiment patterns. Individual responses remain anonymous.*`,
    default: `Hello! I'm Claude, your thoughtful AI teaching assistant. I'm here to help you design exceptional educational experiences.

I can help you with:
• **Lesson planning** — structured, evidence-based lesson designs
• **Assessment creation** — quizzes, rubrics, and evaluation frameworks
• **Student feedback analysis** — identifying patterns and action items
• **Differentiation strategies** — adapting content for diverse learners

Try one of the Quick Tasks on the left, or simply describe what you need. I'll provide thorough, pedagogically sound guidance. 📚`,
  },
  gemini: {
    lesson: `**✨ Lesson Blueprint: Data Structures (Interactive Edition)**

**Vision:** Transform abstract concepts into visual, memorable experiences

**🎯 Learning Goals:**
- Visualize tree structures through interactive tools
- Build intuition before introducing formal notation
- Connect learning to Google Maps, YouTube recommendations

**🚀 Opening Hook — 5 min**
Show a live Google Maps route calculation. Ask: "How does Google consider millions of paths in milliseconds?" Introduce trees as the secret behind it.

**📺 Visual Exploration — 12 min**
Use Visualgo.net to animate BST operations live. Students predict "What happens next?" before each insertion.

**🤝 Collaborative Build — 15 min**
Using Jamboard or Google Slides, teams construct their own BST from a set of numbers. Each team presents their tree and explains one decision.

**💻 Coding Sprint — 10 min**
Google Colab notebook (shareable link) with fill-in-the-blank BST code. Students complete methods with embedded hints.

**🎮 Kahoot Exit Quiz — 3 min**
5-question rapid-fire quiz on BST properties. Instant feedback visible to all.

**🛠️ Tools Used:** Visualgo, Google Colab, Jamboard, Kahoot
**📱 Mobile Friendly:** All tools accessible on student phones`,
    quiz: `**🌟 Adaptive Quiz: Linked Lists (Multimodal Format)**

**Level 1 — Visual Recognition (4 × 1 = 4 Marks)**
*[Diagram shown: A → B → C → None]*
1. Identify the head node in the diagram above.
2. What does the arrow represent? *(a) Value (b) Pointer/Reference (c) Index (d) Memory size)*

**Level 2 — Application (3 × 3 = 9 Marks)**
3. Draw the linked list state after inserting value 15 between nodes 10 and 20. Show pointer updates.
4. A playlist app uses a doubly linked list for songs. Explain why this is better than an array for skip-forward and skip-back operations.
5. Trace through this pseudocode and write the output:
\`\`\`
node = head
while node.next != None:
    print(node.data)
    node = node.next
\`\`\`

**Level 3 — Creative Challenge (1 × 7 = 7 Marks)**
6. Design a browser "Back/Forward" history system using a linked list variant. Draw the data structure and explain 3 operations.

**🎯 Adaptive Note:** Students scoring < 60% on Level 1-2 will receive supplementary visual materials before Level 3 is graded.`,
    feedback: `**✨ Gemini Feedback Intelligence Report**

**Multimodal Analysis — 34 Student Responses**

📊 **Sentiment Spectrum:**
- Positive: 67% | Neutral: 21% | Needs Attention: 12%

🎨 **Learning Style Insights:**
Visual learners (estimated 58% of class) report highest satisfaction with diagram-based explanations. Auditory learners prefer recorded lectures for review.

🌐 **Engagement Heat Map:**
- **High engagement:** Lab sessions, peer coding, visual demos
- **Medium engagement:** Lectures, assignments
- **Low engagement:** Theoretical proofs without context

🚀 **3 Quick Wins:**
1. Add a 2-minute YouTube clip to open each class (hooks visual learners)
2. Create a shared Google Doc for live Q&A during lectures
3. Use Google Forms for mid-lecture pulse checks

🛤️ **Career Path Alignment:**
Based on expressed interests, 40% are targeting product roles, 35% software engineering, 25% research. Tailor examples accordingly.

**Recommended Tools:** Mentimeter (live polls), Loom (recorded explanations), Google Classroom Stream (announcements)`,
    default: `✨ Hi! I'm Gemini, your creative and multimodal AI teaching partner!

I specialize in making learning **visual, interactive, and memorable**. Here's what I can create for you:

• **🎨 Visual Lesson Blueprints** — with Kahoot, Visualgo, Jamboard integrations
• **📊 Adaptive Quizzes** — multi-level with diagram-based questions
• **🌐 Engagement Analysis** — learning style insights and tool recommendations
• **🛠️ EdTech Tool Suggestions** — curated for each topic

I'm especially great when you want to break away from traditional lecture formats and create experiences students actually remember. What would you like to create today? 🚀`,
  },
  gpt4: {
    lesson: `**Lesson Plan: Data Structures — Binary Search Trees**
*Subject: CS301 | Duration: 45 minutes | Semester: IV*

---

**Prerequisites:** Arrays, Pointers, Recursion basics

**Materials Required:**
- Whiteboard + markers
- Laptops/Lab access
- Printed reference sheet (BST operations)

---

**Introduction (8 minutes)**
Begin with the problem: "Given 1 million sorted numbers, how do you find one efficiently?" Walk through the limitations of linear search, then introduce binary search. Explain that BSTs encode binary search logic into a dynamic data structure.

**Core Concept Delivery (15 minutes)**
Formally define BST. Write the invariant on the board:
> For every node N: all values in left subtree < N.value < all values in right subtree

Demonstrate insertion of [50, 30, 70, 20, 40] step-by-step. Students copy the tree into notebooks.

**Complexity Analysis (7 minutes)**
Analyze average-case O(log n) vs worst-case O(n) with a skewed tree example. Introduce the concept of balanced trees (AVL, Red-Black) as a preview.

**Hands-on Implementation (12 minutes)**
Students implement:
1. Node class/struct
2. insert() method
3. search() method

Provide starter code with clear TODO comments.

**Review & Assessment (3 minutes)**
Verbal Q&A: "What is the time complexity of deleting a leaf node?"

**Homework:** Implement inorder, preorder, postorder traversal. Submit via GitHub Classroom by Friday 11:59 PM.`,
    quiz: `**Question Bank: Linked Lists & Arrays**
*CS201 — Unit 2 Assessment | Total: 20 Marks*

---

**Part I: Objective Questions (5 × 1 = 5 Marks)**

Q1. The time complexity of accessing the k-th element in a singly linked list is:
(a) O(1)  (b) O(log k)  (c) O(k)  (d) O(n)
*Answer: (c) O(k)*

Q2. Which of the following is NOT an advantage of linked lists over arrays?
(a) Dynamic size  (b) Efficient insertion at head  (c) Cache locality  (d) No memory wastage
*Answer: (c) Cache locality*

---

**Part II: Short Answer (3 × 3 = 9 Marks)**

Q3. A singly linked list has n nodes. Write the time and space complexity for: (i) Insert at beginning, (ii) Insert at end, (iii) Delete by value. Justify each answer.

Q4. Differentiate between shallow copy and deep copy in the context of linked list cloning. When does it matter?

Q5. An e-commerce app maintains a cart using a linked list. Users frequently add to cart and view the last 5 items. Suggest the most efficient linked list variant and justify.

---

**Part III: Programming (1 × 6 = 6 Marks)**

Q6. Implement a function mergeSortedLists(l1, l2) that merges two sorted linked lists into one sorted linked list. Your solution must be O(m+n) time and O(1) extra space (in-place).

*Grading Rubric: Correct logic (3), Edge cases handled (1.5), Time/Space efficiency (1.5)*`,
    feedback: `**GPT-4 Student Performance Feedback Report**
*Teacher: Faculty Portal | Class: CS301-A | Responses: 34/40*

---

**Executive Summary:**
Overall satisfaction: 3.8/5.0 | Improvement from last unit: +0.3

---

**Quantitative Breakdown:**

| Metric | Score | Benchmark |
|--------|-------|----------|
| Explanation Clarity | 4.1/5 | 3.9 avg |
| Pace of Teaching | 3.5/5 | 3.8 avg |
| Assignment Relevance | 4.0/5 | 3.7 avg |
| Doubt Resolution | 3.6/5 | 3.5 avg |

**Behavioral Patterns Detected:**
- 12 students (35%) show signs of passive learning — present but not engaging with questions
- 8 students (24%) consistently submit assignments 24+ hours late
- 5 students (15%) have not accessed study materials since Week 3

**Intervention Recommendations:**

1. **Pace Adjustment** — Introduce a mid-lecture "checkpoint" where students rate their understanding (1-5) via paper slips. Adjust accordingly.

2. **Late Submission Pattern** — Meet with the 8 chronic late submitters individually. Identify if it's time management, difficulty, or external factors.

3. **Passive Learners** — Implement cold-calling with a structured format: "[Student], can you add one more idea to what [previous student] said?" This reduces anxiety while increasing engagement.

**Follow-up Recommended:** Reassess after 2 weeks using the same feedback form.`,
    default: `⚡ GPT-4 is ready to assist. I'm your precision-focused AI teaching partner.

I specialize in **structured, rigorous, and comprehensive** educational content:

• **Detailed Lesson Plans** — with timing, complexity analysis, and homework
• **Question Banks** — MCQs, theory, numericals with marking schemes
• **Performance Reports** — quantitative feedback with behavioral pattern analysis
• **Curriculum Alignment** — mapped to university syllabus and learning outcomes

I'm especially effective for STEM subjects, technical courses, and situations where accuracy and structure matter most.

What can I build for you today?`,
  },
};

const COMPARISON_DATA = [
  {
    prompt: "Explain Recursion to beginners",
    claude:
      "Recursion is a function calling itself with a smaller problem until it reaches a base case. Think of it as Russian nesting dolls — each doll contains a smaller version until you hit the tiniest one.",
    gemini:
      "🪆 Imagine mirrors facing each other — each reflection is smaller, until you can barely see it. That's recursion! I'd show this with an animation in class using Visualgo.",
    gpt4: "Recursion: a function f(n) that calls f(n-1) until n == base_case. Key elements: (1) Base case (2) Recursive case (3) Progress toward base case. Without #3, you get infinite recursion → stack overflow.",
  },
  {
    prompt: "Create a quiz question on Trees",
    claude:
      "*Long answer (6 marks):* Construct a BST by inserting: 15, 9, 20, 6, 12, 17, 25. Show each step, then determine the height of the resulting tree and justify.",
    gemini:
      "🌳 *Visual question:* Here's a tree diagram [shown]. Is this a valid BST? If not, identify which nodes violate the BST property and how you would fix it.",
    gpt4: "*MCQ:* The maximum number of nodes in a binary tree of height h is: (a) 2^h (b) 2^(h+1) - 1 (c) h^2 (d) 2h+1. Answer: (b). Explain why.",
  },
];

export default function AgenticAIHub() {
  const [selectedAgent, setSelectedAgent] = useState<AgentId>("claude");
  const [messages, setMessages] = useState<Record<AgentId, Message[]>>({
    claude: [
      {
        id: "init-claude",
        role: "agent",
        text: MOCK_RESPONSES.claude.default,
        timestamp: "Now",
      },
    ],
    gemini: [
      {
        id: "init-gemini",
        role: "agent",
        text: MOCK_RESPONSES.gemini.default,
        timestamp: "Now",
      },
    ],
    gpt4: [
      {
        id: "init-gpt4",
        role: "agent",
        text: MOCK_RESPONSES.gpt4.default,
        timestamp: "Now",
      },
    ],
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  function getResponse(agent: AgentId, text: string): string {
    const lower = text.toLowerCase();
    if (lower.includes("lesson") || lower.includes("plan"))
      return MOCK_RESPONSES[agent].lesson;
    if (
      lower.includes("quiz") ||
      lower.includes("question") ||
      lower.includes("test")
    )
      return MOCK_RESPONSES[agent].quiz;
    if (
      lower.includes("feedback") ||
      lower.includes("student") ||
      lower.includes("performance")
    )
      return MOCK_RESPONSES[agent].feedback;
    return MOCK_RESPONSES[agent].default;
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => ({
      ...prev,
      [selectedAgent]: [...prev[selectedAgent], userMsg],
    }));
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = getResponse(selectedAgent, text);
      const agentMsg: Message = {
        id: `msg-${Date.now()}-agent`,
        role: "agent",
        text: response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => ({
        ...prev,
        [selectedAgent]: [...prev[selectedAgent], agentMsg],
      }));
      setIsTyping(false);
    }, 1200);
  }

  function handleQuickTask(task: QuickTask) {
    sendMessage(QUICK_TASK_LABELS[task]);
  }

  function clearChat() {
    setMessages((prev) => ({
      ...prev,
      [selectedAgent]: [
        {
          role: "agent",
          text: MOCK_RESPONSES[selectedAgent].default,
          timestamp: "Now",
        },
      ],
    }));
  }

  const agent = AGENTS[selectedAgent];

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4285f4 0%, transparent 40%), radial-gradient(circle at 60% 80%, #10a37f 0%, transparent 40%)",
          }}
        />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              🤖
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Agentic AI Hub</h2>
              <p className="text-white/70 text-sm">
                Powered by world's leading AI systems
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: "rgba(74,222,128,0.2)",
                color: "#4ade80",
                border: "1px solid #4ade80",
              }}
            >
              ● 3 AI AGENTS ONLINE
            </span>
            <button
              type="button"
              onClick={() => setCompareMode((v) => !v)}
              data-ocid="ai.compare.toggle"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: compareMode
                  ? "linear-gradient(135deg, #f97316, #7c3aed)"
                  : "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <GitCompare className="w-4 h-4" />
              {compareMode ? "Exit Compare" : "Compare All Agents"}
            </button>
          </div>
        </div>
      </div>

      {compareMode ? (
        // Comparison Mode
        <div className="space-y-4">
          {COMPARISON_DATA.map((item) => (
            <div
              key={item.prompt}
              className="rounded-xl overflow-hidden border border-indigo-200"
              style={{
                background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
              }}
            >
              <div
                className="px-4 py-3"
                style={{
                  background: "linear-gradient(135deg, #312e81, #4338ca)",
                }}
              >
                <p className="text-white font-bold text-sm">
                  Prompt: "{item.prompt}"
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {(["claude", "gemini", "gpt4"] as AgentId[]).map((aid) => {
                  const a = AGENTS[aid];
                  const val = item[aid];
                  return (
                    <div
                      key={aid}
                      className="rounded-xl p-4 border-2"
                      style={{ borderColor: a.border, background: "white" }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{a.emoji}</span>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {a.name}
                          </p>
                          <p className="text-xs text-gray-500">{a.company}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {val}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Main Chat Mode
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left: Agent Selection + Quick Tasks */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
              Select AI Agent
            </p>
            {(Object.keys(AGENTS) as AgentId[]).map((aid) => {
              const a = AGENTS[aid];
              const isActive = selectedAgent === aid;
              return (
                <button
                  type="button"
                  key={aid}
                  onClick={() => setSelectedAgent(aid)}
                  data-ocid={`ai.${aid}.button`}
                  className="w-full rounded-xl p-4 text-left transition-all duration-200"
                  style={{
                    background: isActive ? "white" : "rgba(255,255,255,0.7)",
                    border: isActive
                      ? `2px solid ${a.border}`
                      : "2px solid transparent",
                    boxShadow: isActive
                      ? `0 4px 20px ${a.border}40`
                      : "0 2px 8px rgba(0,0,0,0.08)",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <div
                    className="h-1.5 rounded-full mb-3"
                    style={{ background: a.gradient }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{a.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {a.name}
                      </p>
                      <p className="text-xs text-gray-500">{a.company}</p>
                    </div>
                  </div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: a.border }}
                  >
                    {a.tagline}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {a.personality}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {a.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: `${a.border}20`, color: a.border }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}

            {/* Quick Tasks */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "linear-gradient(135deg, #1e1b4b, #312e81)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p className="text-white font-bold text-sm mb-3">
                ⚡ Quick Tasks
              </p>
              {(["lesson", "quiz", "feedback"] as QuickTask[]).map((task) => (
                <button
                  type="button"
                  key={task}
                  onClick={() => handleQuickTask(task)}
                  data-ocid={`ai.${task}.button`}
                  className="w-full mb-2 px-3 py-2 rounded-lg text-sm font-semibold text-left transition-all hover:scale-105"
                  style={{ background: agent.gradient, color: "white" }}
                >
                  {QUICK_TASK_LABELS[task]}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Chat Interface */}
          <div
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl"
            style={{ border: `2px solid ${agent.border}40` }}
          >
            {/* Chat Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: agent.gradient }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: "rgba(255,255,255,0.25)" }}
                >
                  {agent.emoji}
                </div>
                <div>
                  <p className="font-bold text-white">
                    {agent.name} — {agent.company}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    <p className="text-white/80 text-xs">
                      Online · Agentic Mode Active
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={clearChat}
                data-ocid="ai.clear.button"
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title="Clear Chat"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="h-96 overflow-y-auto p-4 space-y-3"
              style={{ background: "#f8fafc" }}
            >
              {messages[selectedAgent].map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      background:
                        msg.role === "agent"
                          ? agent.gradient
                          : "linear-gradient(135deg, #4338ca, #6366f1)",
                      color: "white",
                      borderBottomRightRadius: msg.role === "user" ? 4 : 16,
                      borderBottomLeftRadius: msg.role === "agent" ? 4 : 16,
                    }}
                  >
                    {msg.text}
                    <p className="text-white/50 text-[10px] mt-1 text-right">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3 flex items-center gap-1"
                    style={{ background: agent.gradient }}
                  >
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-white animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div
              className="p-4 border-t border-gray-200"
              style={{ background: "white" }}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  data-ocid="ai.chat.input"
                  placeholder={`Ask ${agent.name} anything about teaching...`}
                  className="flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-all"
                  style={{
                    borderColor: `${agent.border}40`,
                    background: "#f8fafc",
                    color: "#111827",
                  }}
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  data-ocid="ai.chat.submit_button"
                  disabled={!input.trim() || isTyping}
                  className="px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                  style={{ background: agent.gradient, color: "white" }}
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.keys(AGENTS) as AgentId[]).map((aid) => {
          const a = AGENTS[aid];
          const AIcon = a.icon;
          return (
            <div
              key={aid}
              className="rounded-xl p-5"
              style={{
                background: "white",
                border: `1px solid ${a.border}30`,
                boxShadow: `0 4px 15px ${a.border}15`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: a.gradient }}
                >
                  <AIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{a.name}</p>
                  <p className="text-xs text-gray-500">{a.company}</p>
                </div>
              </div>
              <p className="text-xs font-bold mb-2" style={{ color: a.border }}>
                {a.tagline}
              </p>
              <div className="space-y-1">
                {[
                  QUICK_TASK_LABELS.lesson,
                  QUICK_TASK_LABELS.quiz,
                  QUICK_TASK_LABELS.feedback,
                ].map((cap) => (
                  <div key={cap} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: a.border }}
                    />
                    <p className="text-xs text-gray-700">{cap}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
