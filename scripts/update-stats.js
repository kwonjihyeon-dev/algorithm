const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const README_PATH = "README.md";

// ============================================================
// 플랫폼 설정
// 디렉터리 구조: <dir>/<tierDir>/<문제 디렉터리>/<풀이 파일>
// 새 플랫폼은 PLATFORMS 에 항목만 추가하면 수집·출력에 모두 반영된다.
// ============================================================
const PLATFORMS = [
  {
    key: "programmers",
    dir: "프로그래머스",
    title: "🟢 프로그래머스",
    tierHeader: "레벨",
    badgeColor: "brightgreen",
    tiers: {
      0: { label: "Lv.0", emoji: "⬜", color: "b8b8b8", order: 0 },
      1: { label: "Lv.1", emoji: "🟩", color: "67c23a", order: 1 },
      2: { label: "Lv.2", emoji: "🟦", color: "409eff", order: 2 },
      3: { label: "Lv.3", emoji: "🟧", color: "e6a23c", order: 3 },
      4: { label: "Lv.4", emoji: "🟥", color: "f56c6c", order: 4 },
      5: { label: "Lv.5", emoji: "🟪", color: "7b2d8e", order: 5 },
    },
    // 레벨 디렉터리는 숫자 이름만 인정한다
    resolveTier: (dirName) => (/^\d+$/.test(dirName) ? dirName : null),
  },
  {
    key: "baekjoon",
    dir: "백준",
    title: "🔵 백준",
    tierHeader: "티어",
    badgeColor: "blue",
    tiers: {
      Bronze: { label: "Bronze", emoji: "🥉", color: "ad5600", order: 0 },
      Silver: { label: "Silver", emoji: "🥈", color: "435f7a", order: 1 },
      Gold: { label: "Gold", emoji: "🥇", color: "ec9a00", order: 2 },
      Platinum: { label: "Platinum", emoji: "💎", color: "27e2a4", order: 3 },
      Diamond: { label: "Diamond", emoji: "💠", color: "00b4fc", order: 4 },
      Ruby: { label: "Ruby", emoji: "❤️‍🔥", color: "e0004c", order: 5 },
      Unrated: { label: "Unrated", emoji: "⬜", color: "b8b8b8", order: 6 },
    },
    resolveTier: (dirName, tiers) => matchKeyIgnoreCase(dirName, tiers) ?? "Unrated",
  },
  {
    key: "hackerrank",
    dir: "hackerrank",
    title: "🟩 HackerRank",
    tierHeader: "난이도",
    badgeColor: "green",
    tiers: {
      easy: { label: "Easy", emoji: "🟢", color: "5cb85c", order: 0 },
      medium: { label: "Medium", emoji: "🟡", color: "f0ad4e", order: 1 },
      hard: { label: "Hard", emoji: "🔴", color: "d9534f", order: 2 },
      advanced: { label: "Advanced", emoji: "🟣", color: "7b2d8e", order: 3 },
      expert: { label: "Expert", emoji: "⚫", color: "333333", order: 4 },
      unknown: { label: "Unknown", emoji: "⬜", color: "b8b8b8", order: 5 },
    },
    resolveTier: (dirName, tiers) => matchKeyIgnoreCase(dirName, tiers) ?? "unknown",
    // 디렉터리명은 슬러그(balanced-brackets)라서 README 의 H1 을 문제명으로 쓴다
    resolveName: (dirName, problemPath) => readReadmeTitle(problemPath) ?? dirName,
    // 풀이는 hackerrank 브랜치에 먼저 커밋되고 master 에는 워크플로우가 복사한다.
    // master 히스토리의 날짜는 복사 시점이라 원래 브랜치에서 읽는다. 브랜치가 없으면 HEAD 로 대체한다.
    ref: "origin/hackerrank",
  },
];

function matchKeyIgnoreCase(dirName, tiers) {
  return (
    Object.keys(tiers).find(
      (key) => key.toLowerCase() === dirName.toLowerCase()
    ) ?? null
  );
}

// ============================================================
// 공통 유틸
// ============================================================
function detectLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".js": "JavaScript",
    ".ts": "TypeScript",
    ".py": "Python",
    ".java": "Java",
    ".kt": "Kotlin",
    ".cpp": "C++",
    ".c": "C",
    ".go": "Go",
    ".rs": "Rust",
    ".swift": "Swift",
  };
  return map[ext] || null;
}

function getLastCommitDate(dirPath, ref) {
  const refs = ref ? [ref, "HEAD"] : ["HEAD"];
  for (const r of refs) {
    try {
      const log = execSync(`git log -1 --format="%ci" ${r} -- "${dirPath}"`, {
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim();
      if (log) return log.split(" ")[0];
    } catch {
      // ref 가 없으면 다음 후보로 넘어간다
    }
  }
  return null;
}

function getFilesLanguages(dirPath) {
  const files = fs.readdirSync(dirPath);
  const langs = files.map((f) => detectLanguage(f)).filter(Boolean);
  return [...new Set(langs)];
}

function progressBar(count, max, len = 20, filled = "█", empty = "░") {
  const bar = Math.round((count / max) * len);
  return filled.repeat(bar) + empty.repeat(len - bar);
}

function readReadmeTitle(dirPath) {
  const readmePath = path.join(dirPath, "README.md");
  if (!fs.existsSync(readmePath)) return null;
  const firstLine = fs.readFileSync(readmePath, "utf-8").split("\n")[0];
  const match = firstLine.match(/^#\s+(.+)$/);
  return match ? match[1].trim() : null;
}

function listDirs(dirPath) {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

// ============================================================
// 수집
// ============================================================
function collectProblems(platform) {
  const baseDir = path.resolve(platform.dir);
  if (!fs.existsSync(baseDir)) return [];

  const problems = [];
  for (const tierDirName of listDirs(baseDir)) {
    const tier = platform.resolveTier(tierDirName, platform.tiers);
    if (tier === null) continue;

    const tierPath = path.join(baseDir, tierDirName);
    for (const problemDirName of listDirs(tierPath)) {
      const problemPath = path.join(tierPath, problemDirName);
      problems.push({
        name: platform.resolveName
          ? platform.resolveName(problemDirName, problemPath)
          : problemDirName,
        tier,
        languages: getFilesLanguages(problemPath),
        solvedDate: getLastCommitDate(problemPath, platform.ref),
      });
    }
  }
  return problems;
}

// ============================================================
// 통계 계산
// ============================================================
function calcStats(problems) {
  const byTier = {};
  const byLang = {};
  for (const p of problems) {
    byTier[p.tier] = (byTier[p.tier] || 0) + 1;
    for (const l of p.languages) {
      byLang[l] = (byLang[l] || 0) + 1;
    }
  }

  const recent = [...problems]
    .filter((p) => p.solvedDate)
    .sort((a, b) => b.solvedDate.localeCompare(a.solvedDate))
    .slice(0, 5);

  return { total: problems.length, byTier, byLang, recent };
}

// ============================================================
// 마크다운 생성
// ============================================================
function generatePlatformSection(platform, stats) {
  if (stats.total === 0) return "";

  const tierCfg = (tier) =>
    platform.tiers[tier] ?? { label: String(tier), emoji: "⬜", color: "b8b8b8", order: 99 };
  const sortedTiers = Object.entries(stats.byTier).sort(
    (a, b) => tierCfg(a[0]).order - tierCfg(b[0]).order
  );

  const lines = [];
  lines.push(`### ${platform.title}`);
  lines.push("");

  const badges = [
    `![Total](https://img.shields.io/badge/Total-${stats.total}%20solved-${platform.badgeColor}?style=flat-square)`,
  ];
  for (const [tier, count] of sortedTiers) {
    const cfg = tierCfg(tier);
    badges.push(
      `![${cfg.label}](https://img.shields.io/badge/${cfg.label}-${count}-${cfg.color}?style=flat-square)`
    );
  }
  lines.push(badges.join(" "));
  lines.push("");

  const max = Math.max(...Object.values(stats.byTier), 1);
  for (const [tier, count] of sortedTiers) {
    const cfg = tierCfg(tier);
    lines.push(
      `${cfg.emoji} **${cfg.label}** \`${progressBar(count, max)}\` **${count}문제**`
    );
    lines.push("");
  }

  if (stats.recent.length > 0) {
    lines.push(`| 날짜 | ${platform.tierHeader} | 문제 |`);
    lines.push("|------|------|------|");
    for (const p of stats.recent) {
      const cfg = tierCfg(p.tier);
      lines.push(`| ${p.solvedDate} | ${cfg.emoji} ${cfg.label} | ${p.name} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function generateLanguageSection(statsList) {
  const merged = {};
  for (const stats of statsList) {
    for (const [l, c] of Object.entries(stats.byLang)) {
      merged[l] = (merged[l] || 0) + c;
    }
  }
  if (Object.keys(merged).length === 0) return "";

  const lines = [];
  lines.push("### 💻 사용 언어");
  lines.push("");
  const sorted = Object.entries(merged).sort((a, b) => b[1] - a[1]);
  lines.push(
    sorted
      .map(
        ([lang, count]) =>
          `![${lang}](https://img.shields.io/badge/${encodeURIComponent(lang)}-${count}-informational?style=flat-square)`
      )
      .join(" ")
  );
  lines.push("");
  return lines.join("\n");
}

// ============================================================
// 메인
// README 는 이 스크립트가 전체를 생성한다.
// 외부 동기화 툴(PushMyCode 등)이 README 를 덮어써도 다음 실행에서 원래대로 돌아온다.
// ============================================================
function main() {
  console.log("🔍 데이터 수집 중...");

  const collected = PLATFORMS.map((platform) => ({
    platform,
    stats: calcStats(collectProblems(platform)),
  }));

  console.log(
    collected.map(({ platform, stats }) => `${platform.dir}: ${stats.total}문제`).join(" | ")
  );

  const grandTotal = collected.reduce((sum, { stats }) => sum + stats.total, 0);
  if (grandTotal === 0) {
    console.log("ℹ️  풀이한 문제가 없습니다.");
    return;
  }

  const header = [
    "# 🧠 알고리즘 풀이",
    "",
    "## 📊 알고리즘 풀이 통계",
    "",
    `> 🕐 마지막 업데이트: ${new Date().toISOString().split("T")[0]} | 총 **${grandTotal}문제** 풀이`,
    "",
  ].join("\n");

  const sections = [
    header,
    ...collected.map(({ platform, stats }) => generatePlatformSection(platform, stats)),
    generateLanguageSection(collected.map(({ stats }) => stats)),
  ];

  // 각 섹션은 빈 줄로 끝나므로 "\n" 으로 이으면 섹션 사이에 빈 줄이 하나 생긴다
  fs.writeFileSync(README_PATH, sections.filter(Boolean).join("\n"), "utf-8");
  console.log("✅ README.md 업데이트 완료!");
}

main();
