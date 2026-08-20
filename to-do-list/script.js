const STORAGE_KEY = "todo-tasks-v1";
const LANG_KEY = "todo-lang-v1";
const RING_CIRCUMFERENCE = 2 * Math.PI * 52; 

let tasks = loadTasks();
let currentFilter = "all";
let currentLang = localStorage.getItem(LANG_KEY) || "ar";

const translations = {
  ar: {
    pageTitle: "مهامي — قائمة المهام اليومية",
    eyebrow: "لوحة المهام",
    title: "مهامي اليوم",
    ringDone: "مكتمل",
    inputPlaceholder: "اكتب مهمة جديدة… مثال: مراجعة تقرير المشروع",
    inputAria: "مهمة جديدة",
    priorityAria: "أولوية المهمة",
    low: "منخفضة",
    medium: "متوسطة",
    high: "عالية",
    addBtn: "إضافة",
    statsMiddle: "مهمة متبقية من",
    filterAll: "الكل",
    filterActive: "النشطة",
    filterCompleted: "المكتملة",
    clearCompleted: "مسح المهام المكتملة",
    emptyNone: "لا توجد مهام بعد — أضف أول مهمة لتبدأ يومك",
    emptyActive: "لا توجد مهام نشطة — كل شيء مكتمل!",
    emptyCompleted: "لا توجد مهام مكتملة بعد",
    editAria: "تعديل المهمة",
    deleteAria: "حذف المهمة",
    checkboxAria: "تعليم كمكتملة",
    locale: "ar-EG",
  },
  en: {
    pageTitle: "My Tasks — Daily To-Do List",
    eyebrow: "Task Board",
    title: "Today's Tasks",
    ringDone: "done",
    inputPlaceholder: "Add a new task… e.g. Review project report",
    inputAria: "New task",
    priorityAria: "Task priority",
    low: "Low",
    medium: "Medium",
    high: "High",
    addBtn: "Add",
    statsMiddle: "tasks left out of",
    filterAll: "All",
    filterActive: "Active",
    filterCompleted: "Completed",
    clearCompleted: "Clear completed",
    emptyNone: "No tasks yet — add your first task to start the day",
    emptyActive: "No active tasks — all done!",
    emptyCompleted: "No completed tasks yet",
    editAria: "Edit task",
    deleteAria: "Delete task",
    checkboxAria: "Mark as complete",
    locale: "en-US",
  },
};

function t(key) {
  return translations[currentLang][key] || key;
}

const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priorityInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const emptyText = document.getElementById("emptyText");
const remainingCount = document.getElementById("remainingCount");
const totalCount = document.getElementById("totalCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");
const ringFill = document.getElementById("ringFill");
const ringPercent = document.getElementById("ringPercent");
const dateLine = document.getElementById("dateLine");
const langArBtn = document.getElementById("langArBtn");
const langEnBtn = document.getElementById("langEnBtn");

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("تعذر تحميل المهام:", e);
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function priorityLabel(p) {
  return t(p) || t("medium");
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString(t("locale"), {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function setDateLine() {
  const now = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  dateLine.textContent = now.toLocaleDateString(t("locale"), options);
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.unshift({
    id: uid(),
    text,
    completed: false,
    priority: priorityInput.value,
    createdAt: new Date().toISOString(),
  });

  taskInput.value = "";
  taskInput.focus();
  saveTasks();
  render();
});

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.completed);
  if (currentFilter === "completed") return tasks.filter((t) => t.completed);
  return tasks;
}

function render() {
  const filtered = getFilteredTasks();
  taskList.innerHTML = "";

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="task-checkbox ${task.completed ? "checked" : ""}" aria-label="${t("checkboxAria")}">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="task-body">
        <div class="task-text" contenteditable="false" spellcheck="false">${escapeHtml(task.text)}</div>
        <div class="task-meta">
          <span class="priority-tag ${task.priority}">${priorityLabel(task.priority)}</span>
          <span class="task-time">${formatTime(task.createdAt)}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="icon-btn edit" aria-label="${t("editAria")}" title="${t("editAria")}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="icon-btn delete" aria-label="${t("deleteAria")}" title="${t("deleteAria")}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateStats();
  updateEmptyState(filtered.length);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  remainingCount.textContent = remaining;
  totalCount.textContent = total;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  ringPercent.textContent = percent + "%";
  const offset = RING_CIRCUMFERENCE - (percent / 100) * RING_CIRCUMFERENCE;
  ringFill.style.strokeDashoffset = offset;
}

function updateEmptyState(filteredCount) {
  if (filteredCount > 0) {
    emptyState.classList.remove("visible");
    return;
  }
  emptyState.classList.add("visible");
  if (tasks.length === 0) {
    emptyText.textContent = t("emptyNone");
  } else if (currentFilter === "active") {
    emptyText.textContent = t("emptyActive");
  } else {
    emptyText.textContent = t("emptyCompleted");
  }
}

taskList.addEventListener("click", (e) => {
  const li = e.target.closest(".task-item");
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.closest(".task-checkbox")) {
    toggleTask(id);
  } else if (e.target.closest(".delete")) {
    deleteTask(id);
  } else if (e.target.closest(".edit")) {
    startEdit(li);
  }
});

taskList.addEventListener("dblclick", (e) => {
  const li = e.target.closest(".task-item");
  if (li && e.target.classList.contains("task-text")) {
    startEdit(li);
  }
});

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  render();
}

function deleteTask(id) {
  const li = taskList.querySelector(`[data-id="${id}"]`);
  if (li) {
    li.style.transition = "opacity 0.2s, transform 0.2s";
    li.style.opacity = "0";
    li.style.transform = "translateX(10px)";
  }
  setTimeout(() => {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    render();
  }, 150);
}

function startEdit(li) {
  const textEl = li.querySelector(".task-text");
  textEl.contentEditable = "true";
  textEl.focus();

  const range = document.createRange();
  range.selectNodeContents(textEl);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  function finishEdit() {
    textEl.contentEditable = "false";
    const id = li.dataset.id;
    const task = tasks.find((t) => t.id === id);
    const newText = textEl.textContent.trim();

    if (task) {
      task.text = newText || task.text; 
    }
    saveTasks();
    render();
    textEl.removeEventListener("blur", finishEdit);
    textEl.removeEventListener("keydown", onKeydown);
  }

  function onKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      textEl.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      render(); 
    }
  }

  textEl.addEventListener("blur", finishEdit);
  textEl.addEventListener("keydown", onKeydown);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  const hasCompleted = tasks.some((t) => t.completed);
  if (!hasCompleted) return;
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  render();
});

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  const isAr = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  langArBtn.classList.toggle("active", isAr);
  langEnBtn.classList.toggle("active", !isAr);

  setDateLine();
  render(); 
}

langArBtn.addEventListener("click", () => applyLanguage("ar"));
langEnBtn.addEventListener("click", () => applyLanguage("en"));

applyLanguage(currentLang);