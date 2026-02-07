const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ============================================================
// 설정
// ============================================================
const README_PATH = "README.md";
const START_MARKER = "<!-- ALGORITHM-STATS:START -->";
const END_MARKER = "<!-- ALGORITHM-STATS:END -->";

// 프로그래머스 레벨 설정
const PROGRAMMERS_LEVEL_CONFIG = {
  0: { label: "Lv.0", emoji: "⬜", color: "b8b8b8" },
  1: { label: "Lv.1", emoji: "🟩", color: "67c23a" },
  2: { label: "Lv.2", emoji: "🟦", color: "409eff" },
  3: { label: "Lv.3", emoji: "🟧", color: "e6a23c" },
  4: { label: "Lv.4", emoji: "🟥", color: "f56c6c" },
  5: { label: "Lv.5", emoji: "🟪", color: "7b2d8e" },
};

// 백준 티어 설정
const BOJ_TIER_CONFIG = {
  Bronze: { label: "Bronze", emoji: "🥉", color: "ad5600", order: 0 },
  Silver: { label: "Silver", emoji: "🥈", color: "435f7a", order: 1 },
  Gold: { label: "Gold", emoji: "🥇", color: "ec9a00", order: 2 },
  Platinum: { label: "Platinum", emoji: "💎", color: "27e2a4", order: 3 },
  Diamond: { label: "Diamond", emoji: "💠", color: "00b4fc", order: 4 },
  Ruby: { label: "Ruby", emoji: "❤️‍🔥", color: "e0004c", order: 5 },
  Unrated: { label: "Unrated", emoji: "⬜", color: "b8b8b8", order: 6 },
};

// ============================================================
// 공통 유틸
// ============================================================
function detectLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const map = {
    ".js": "JavaScript",
  };
  return map[ext] || null;
}

function getLastCommitDate(dirPath) {
  try {
    const log = execSync(`git log -1 --format="%ci" -- "${dirPath}"`, {
      encoding: "utf-8",
    }).trim();
    return log ? log.split(" ")[0] : null;
  } catch {
    return null;
  }
}

function getFilesLanguages(dirPath) {
  const files = fs.readdirSync(dirPath);
  const langs = files.map((f) => detectLanguage(f)).filter(Boolean);
  return [...new Set(langs)];
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function progressBar(count, max, len = 20, filled = "█", empty = "░") {
  const bar = Math.round((count / max) * len);
  return filled.repeat(bar) + empty.repeat(len - bar);
}

// ============================================================
// 프로그래머스 수집
// ============================================================
function collectProgrammers() {
  const baseDir = path.resolve("프로그래머스");
  if (!fs.existsSync(baseDir)) return [];

  const problems = [];
  const levelDirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d+$/.test(d.name));

  for (const levelDir of levelDirs) {
    const level = parseInt(levelDir.name, 10);
    const levelPath = path.join(baseDir, levelDir.name);
    const problemDirs = fs
      .readdirSync(levelPath, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const pDir of problemDirs) {
      const pPath = path.join(levelPath, pDir.name);
      problems.push({
        name: pDir.name,
        tier: level,
        languages: getFilesLanguages(pPath),
        solvedDate: getLastCommitDate(pPath),
      });
    }
  }
  return problems;
}

// ============================================================
// 백준 수집
// ============================================================
function collectBaekjoon() {
  const baseDir = path.resolve("백준");
  if (!fs.existsSync(baseDir)) return [];

  const problems = [];
  const tierDirs = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const tierDir of tierDirs) {
    // 티어 이름 매칭 (Bronze, Silver, Gold 등)
    const tierName = Object.keys(BOJ_TIER_CONFIG).find(
      (t) => t.toLowerCase() === tierDir.name.toLowerCase()
    );
    const tier = tierName || "Unrated";
    const tierPath = path.join(baseDir, tierDir.name);

    const problemDirs = fs
      .readdirSync(tierPath, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const pDir of problemDirs) {
      const pPath = path.join(tierPath, pDir.name);
      problems.push({
        name: pDir.name,
        tier,
        languages: getFilesLanguages(pPath),
        solvedDate: getLastCommitDate(pPath),
      });
    }
  }
  return problems;
}

// ============================================================
// 통계 계산 (공통)
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
function generateProgrammersSection(stats) {
  if (stats.total === 0) return "";
  const lines = [];
  lines.push("### 🟢 프로그래머스");
  lines.push("");

  // 뱃지
  const badges = [
    `![Total](https://img.shields.io/badge/Total-${stats.total}%20solved-brightgreen?style=flat-square)`,
  ];
  for (const [lv, count] of Object.entries(stats.byTier).sort(
    (a, b) => a[0] - b[0]
  )) {
    const cfg = PROGRAMMERS_LEVEL_CONFIG[lv] || PROGRAMMERS_LEVEL_CONFIG[1];
    badges.push(
      `![${cfg.label}](https://img.shields.io/badge/${cfg.label}-${count}-${cfg.color}?style=flat-square)`
    );
  }
  lines.push(badges.join(" "));
  lines.push("");

  // 프로그레스 바
  const max = Math.max(...Object.values(stats.byTier), 1);
  for (let lv = 0; lv <= 5; lv++) {
    const count = stats.byTier[lv] || 0;
    if (count === 0) continue;
    const cfg = PROGRAMMERS_LEVEL_CONFIG[lv];
    lines.push(
      `${cfg.emoji} **${cfg.label}** \`${progressBar(count, max)}\` **${count}문제**`
    );
    lines.push("");
  }

  // 최근 풀이
  if (stats.recent.length > 0) {
    lines.push("| 날짜 | 레벨 | 문제 |");
    lines.push("|------|------|------|");
    for (const p of stats.recent) {
      const cfg = PROGRAMMERS_LEVEL_CONFIG[p.tier] || PROGRAMMERS_LEVEL_CONFIG[1];
      lines.push(`| ${p.solvedDate} | ${cfg.emoji} ${cfg.label} | ${p.name} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function generateBaekjoonSection(stats) {
  if (stats.total === 0) return "";
  const lines = [];
  lines.push("### 🔵 백준");
  lines.push("");

  // 뱃지
  const badges = [
    `![Total](https://img.shields.io/badge/Total-${stats.total}%20solved-blue?style=flat-square)`,
  ];
  const sorted = Object.entries(stats.byTier).sort(
    (a, b) =>
      (BOJ_TIER_CONFIG[a[0]]?.order ?? 99) -
      (BOJ_TIER_CONFIG[b[0]]?.order ?? 99)
  );
  for (const [tier, count] of sorted) {
    const cfg = BOJ_TIER_CONFIG[tier] || BOJ_TIER_CONFIG["Unrated"];
    badges.push(
      `![${cfg.label}](https://img.shields.io/badge/${cfg.label}-${count}-${cfg.color}?style=flat-square)`
    );
  }
  lines.push(badges.join(" "));
  lines.push("");

  // 프로그레스 바
  const max = Math.max(...Object.values(stats.byTier), 1);
  for (const [tier, count] of sorted) {
    const cfg = BOJ_TIER_CONFIG[tier] || BOJ_TIER_CONFIG["Unrated"];
    lines.push(
      `${cfg.emoji} **${cfg.label}** \`${progressBar(count, max)}\` **${count}문제**`
    );
    lines.push("");
  }

  // 최근 풀이
  if (stats.recent.length > 0) {
    lines.push("| 날짜 | 티어 | 문제 |");
    lines.push("|------|------|------|");
    for (const p of stats.recent) {
      const cfg = BOJ_TIER_CONFIG[p.tier] || BOJ_TIER_CONFIG["Unrated"];
      lines.push(`| ${p.solvedDate} | ${cfg.emoji} ${cfg.label} | ${p.name} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function generateLanguageSection(pgStats, bojStats) {
  const merged = {};
  for (const [l, c] of Object.entries(pgStats.byLang)) merged[l] = (merged[l] || 0) + c;
  for (const [l, c] of Object.entries(bojStats.byLang)) merged[l] = (merged[l] || 0) + c;
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
// README 업데이트
// ============================================================
function updateReadme(content) {
  let readme = fs.existsSync(README_PATH)
    ? fs.readFileSync(README_PATH, "utf-8")
    : "";

  const block = `${START_MARKER}\n${content}\n${END_MARKER}`;

  if (readme.includes(START_MARKER) && readme.includes(END_MARKER)) {
    const re = new RegExp(
      `${escapeRegex(START_MARKER)}[\\s\\S]*?${escapeRegex(END_MARKER)}`
    );
    readme = readme.replace(re, block);
  } else {
    readme = readme.trimEnd() + "\n\n" + block + "\n";
  }

  fs.writeFileSync(README_PATH, readme, "utf-8");
  console.log("✅ README.md 업데이트 완료!");
}

// ============================================================
// 메인
// ============================================================
function main() {
  console.log("🔍 데이터 수집 중...");

  const pgProblems = collectProgrammers();
  const bojProblems = collectBaekjoon();
  console.log(`📦 프로그래머스: ${pgProblems.length}문제 | 백준: ${bojProblems.length}문제`);

  if (pgProblems.length === 0 && bojProblems.length === 0) {
    console.log("ℹ️  풀이한 문제가 없습니다.");
    return;
  }

  const pgStats = calcStats(pgProblems);
  const bojStats = calcStats(bojProblems);
  const grandTotal = pgStats.total + bojStats.total;

  const sections = [];
  sections.push("## 📊 알고리즘 풀이 통계");
  sections.push("");
  sections.push(`> 🕐 마지막 업데이트: ${new Date().toISOString().split("T")[0]} | 총 **${grandTotal}문제** 풀이`);
  sections.push("");
  sections.push(generateProgrammersSection(pgStats));
  sections.push(generateBaekjoonSection(bojStats));
  sections.push(generateLanguageSection(pgStats, bojStats));

  updateReadme(sections.filter(Boolean).join("\n"));
}

main();