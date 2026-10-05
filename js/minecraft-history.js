"use strict";

/* EDIT YOUR ARCHIVE HERE.
 * Put the ZIP files in the minecraftbackups folder at your website root.
 * Add a filename below whenever you upload another backup. Order does not matter.
 * The page sorts and groups the list automatically. No extra data file is needed.
 * Optional: { file: "2026-10-05_19-07-29.zip", note: "Your description here" }
 * Files on the server are NOT discovered automatically by a static page.
 */
const BACKUP_FOLDER = "/minecraftbackups/";
const BACKUPS = [
  { file: "2026-08-10_19-32-48.zip" },
  { file: "2026-08-11_13-59-42.zip" },
  { file: "2026-08-21_13-02-37.zip" },
  { file: "2026-08-21_13-29-31.zip" },
  { file: "2026-08-21_21-47-55.zip" },
  { file: "2026-08-21_22-21-59.zip" },
  { file: "2026-08-22_11-59-28.zip" },
  { file: "2026-08-31_12-51-31.zip" },
  { file: "2026-09-07_21-47-26.zip" },
  { file: "2026-09-11_23-55-58.zip" },
  { file: "2026-09-16_19-14-32.zip" },
  { file: "2026-09-16_19-28-05.zip" },
  { file: "2026-09-16_19-43-02.zip" },
  { file: "2026-09-25_17-04-38.zip" },
  { file: "2026-09-29_23-36-09.zip" },
  { file: "2026-10-04_14-35-14.zip" },
  { file: "2026-10-05_19-07-29.zip" },
];

(() => {
  const timeline = document.getElementById("timeline");
  const jump = document.getElementById("month-jump");
  const monthLinks = document.getElementById("month-links");
  // UTC is used only to format the filename's calendar date without shifting it.
  // No timezone is assumed for the actual backup creation time.
  const fullDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const monthDate = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const dayDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  const seen = new Set();

  const backups = BACKUPS.flatMap((entry) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})\.zip$/.exec(
      entry.file,
    );
    if (!match || seen.has(entry.file)) return [];
    const [, year, month, day, hour, minute, second] = match;
    const dateKey = `${year}-${month}-${day}`;
    const date = new Date(`${dateKey}T00:00:00Z`);
    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dateKey ||
      +hour > 23 ||
      +minute > 59 ||
      +second > 59
    )
      return [];
    seen.add(entry.file);
    return [
      {
        ...entry,
        date,
        dateKey,
        monthKey: `${year}-${month}`,
        time: `${hour}:${minute}:${second}`,
        url: `${BACKUP_FOLDER.replace(/\/?$/, "/")}${encodeURIComponent(entry.file)}`,
      },
    ];
  }).sort((a, b) => b.file.localeCompare(a.file));

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function setDownload(link, backup) {
    link.href = backup.url;
    link.download = backup.file;
    link.setAttribute(
      "aria-label",
      `Download backup from ${fullDate.format(backup.date)} at ${backup.time}, ZIP file`,
    );
  }

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("archive-count").textContent =
    `${backups.length} backup${backups.length === 1 ? "" : "s"} in the archive`;
  if (!backups.length) {
    timeline.append(
      element(
        "p",
        "mh-time-note",
        "No backups have been added yet. Check back for the first saved world.",
      ),
    );
    jump.disabled = true;
    return;
  }

  const latest = backups[0];
  document.querySelector(".mh-latest").hidden = false;
  document.getElementById("latest-date").textContent = fullDate.format(
    latest.date,
  );
  document.getElementById("latest-time").textContent =
    `${latest.time} · ZIP backup`;
  setDownload(document.getElementById("latest-download"), latest);
  document.getElementById("archive-end").hidden = false;

  const months = new Map();
  for (const backup of backups) {
    if (!months.has(backup.monthKey)) months.set(backup.monthKey, []);
    months.get(backup.monthKey).push(backup);
  }

  for (const [monthKey, saves] of months) {
    const id = `month-${monthKey}`;
    const label = monthDate.format(saves[0].date);
    const option = element("option", "", label);
    option.value = id;
    jump.append(option);
    const navLink = element("a", "", label);
    navLink.href = `#${id}`;
    const count = element("small", "", saves.length);
    count.setAttribute("aria-label", `${saves.length} backups`);
    navLink.append(count);
    monthLinks.append(navLink);

    const section = element("section", "mh-month");
    section.id = id;
    section.tabIndex = -1;
    section.setAttribute("aria-labelledby", `${id}-title`);
    const heading = element("h3", "", label);
    heading.id = `${id}-title`;
    section.append(heading);
    const days = element("div", "mh-days");
    let currentDay = "";
    let daySection;

    for (const backup of saves) {
      if (backup.dateKey !== currentDay) {
        currentDay = backup.dateKey;
        daySection = element("div", "mh-day");
        const dayHeading = element("h4");
        const dateLabel = element("time", "", dayDate.format(backup.date));
        dateLabel.dateTime = backup.dateKey;
        dayHeading.append(dateLabel);
        if (backup === latest)
          dayHeading.append(element("span", "mh-badge", "LATEST"));
        daySection.append(dayHeading);
        days.append(daySection);
      }
      const card = element(
        "article",
        `mh-save${backup === latest ? " mh-newest" : ""}`,
      );
      card.setAttribute(
        "aria-label",
        `Backup ${backup.dateKey} at ${backup.time}`,
      );
      const info = element("div");
      const time = element("time", "mh-save-time", backup.time);
      time.dateTime = `${backup.dateKey}T${backup.time}`;
      info.append(time, element("code", "mh-filename", backup.file));
      if (backup.note) info.append(element("p", "mh-save-note", backup.note));
      const download = element("a", "mh-button", "Download ZIP");
      setDownload(download, backup);
      card.append(info, download);
      daySection.append(card);
    }
    section.append(days);
    timeline.append(section);
  }

  function jumpToMonth(id, updateHash = true) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains("mh-month")) return;
    jump.value = id;
    for (const link of monthLinks.children) {
      if (link.getAttribute("href") === `#${id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
    if (updateHash) {
      // Hash assignment also works when previewing this HTML directly from disk.
      if (window.location.hash !== `#${id}`) window.location.hash = id;
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  jump.addEventListener("change", () => {
    if (jump.value) jumpToMonth(jump.value);
  });
  monthLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (
      !link ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    jumpToMonth(link.hash.slice(1));
  });
  window.addEventListener("hashchange", () =>
    jumpToMonth(window.location.hash.slice(1), false),
  );
  if (window.location.hash) jumpToMonth(window.location.hash.slice(1), false);
})();
