const seedProjects = [
  {
    title: "Mikhbar — منصة أخبار تقنية ذكية",
    description: "واجهة نشر حديثة تدعم التحديثات السريعة وتجهيز المحتوى بصورة منظمة.",
    tags: ["Web", "Automation", "AI"],
    time: "الآن"
  },
  {
    title: "SINAX — صندوق أدوات ويندوز",
    description: "مجموعة أدوات لإدارة الملفات والوسائط والنظام ضمن واجهة سطح مكتب موحدة.",
    tags: ["Desktop", "Python", "Utilities"],
    time: "قبل 8 دقائق"
  },
  {
    title: "EcoPulse — محطة بيئية افتراضية",
    description: "لوحة بيانات تفاعلية لمراقبة مؤشرات بيئية وعرضها بشكل مباشر وواضح.",
    tags: ["IoT", "Dashboard", "Data"],
    time: "قبل 21 دقيقة"
  },
  {
    title: "Smart File Manager",
    description: "مدير ملفات ذكي للبحث عن المكررات وتنظيم وإعادة تسمية الملفات جماعيًا.",
    tags: ["Windows", "C#", "Productivity"],
    time: "قبل 39 دقيقة"
  }
];

const demoQueue = [
  {
    title: "Vision Gate — نظام رؤية حاسوبية",
    description: "نموذج لمراقبة الفيديو واكتشاف العناصر المهمة في المشهد بشكل لحظي.",
    tags: ["Computer Vision", "OpenCV", "AI"]
  },
  {
    title: "RDWAN Tech — مجلة تقنية آلية",
    description: "نظام محتوى تقني يجهز المواد ويعرض أحدث ما تم نشره في واجهة موحدة.",
    tags: ["Publishing", "Cloud", "SEO"]
  },
  {
    title: "Arabic UI Kit",
    description: "مكتبة مكونات عربية متجاوبة مهيأة للواجهات الحديثة واتجاه RTL.",
    tags: ["UI/UX", "RTL", "Frontend"]
  },
  {
    title: "Image Enhancer",
    description: "أداة لمعالجة الصور وتحسينها وتجهيزها للاستخدام في الويب والمحتوى.",
    tags: ["Python", "Images", "Tool"]
  }
];

const feed = document.getElementById("projectFeed");
const count = document.getElementById("projectCount");
const lastUpdate = document.getElementById("lastUpdate");
const addButton = document.getElementById("addProjectBtn");
const autoToggle = document.getElementById("autoToggle");

let projects = [...seedProjects];
let queueIndex = 0;
let autoMode = true;
let autoTimer = null;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function cardTemplate(project, index, isNew = false) {
  const serial = String(projects.length - index).padStart(2, "0");
  return `
    <article class="project-card${isNew ? " is-new" : ""}">
      <div class="project-index">${serial}</div>
      <div class="project-main">
        <div class="project-topline">
          <h3>${escapeHtml(project.title)}</h3>
          ${isNew ? '<span class="status-badge">جديد الآن</span>' : ''}
        </div>
        <p class="project-description">${escapeHtml(project.description)}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <time class="project-time">${escapeHtml(project.time || "الآن")}</time>
    </article>
  `;
}

function render(initial = false) {
  feed.innerHTML = projects.map((project, index) => cardTemplate(project, index, !initial && index === 0)).join("");
  count.textContent = projects.length;
  if (!initial) {
    lastUpdate.textContent = "الآن";
    setTimeout(() => {
      const badge = feed.querySelector(".status-badge");
      const card = feed.querySelector(".project-card.is-new");
      if (badge) badge.remove();
      if (card) card.classList.remove("is-new");
    }, 3600);
  }
}

function addDemoProject() {
  const source = demoQueue[queueIndex % demoQueue.length];
  queueIndex += 1;
  projects = [
    {
      ...source,
      title: queueIndex > demoQueue.length ? `${source.title} — تحديث ${Math.ceil(queueIndex / demoQueue.length)}` : source.title,
      time: "الآن"
    },
    ...projects.map((project, index) => ({
      ...project,
      time: index === 0 && project.time === "الآن" ? "قبل لحظات" : project.time
    }))
  ];
  render(false);
}

function restartAuto() {
  clearInterval(autoTimer);
  if (autoMode) {
    autoTimer = setInterval(addDemoProject, 9000);
  }
}

addButton.addEventListener("click", () => {
  addDemoProject();
  restartAuto();
});

autoToggle.addEventListener("click", () => {
  autoMode = !autoMode;
  autoToggle.classList.toggle("is-on", autoMode);
  autoToggle.setAttribute("aria-pressed", String(autoMode));
  restartAuto();
});

render(true);
restartAuto();
