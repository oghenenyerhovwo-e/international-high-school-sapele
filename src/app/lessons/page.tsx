"use client"

// modules
import { useState, useMemo } from "react";

// components
import LessonCard, { Lesson } from "@/components/LessonCard";
import {
    ThemeToggle,
} from "@/components"

// objects and functions
import { 
    ihsTeachers, 
    ijsTeachers, 
    craftTeachers,
} from "@/utils";


// css
import styles from "./lessons.module.css";

const allLists: Record<SectionKey, Lesson[]> = {
    ihs: ihsTeachers,
    ijs: ijsTeachers,
    craft: craftTeachers,
};

const sections = [
  { key: "ihs", label: "High School (IHS)" },
  { key: "ijs", label: "Junior School (IJS)" },
  { key: "craft", label: "Craft" },
] as const;

type SectionKey = typeof sections[number]["key"];

export default function LessonsPage() {
  const [selected, setSelected] = useState<SectionKey>("ihs");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const terms = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (terms.length === 0) return allLists[selected];

    return allLists[selected].filter((lesson) =>
      terms.every((t) =>
        // search teacher names
        lesson.teacherNames.some((name) => name.toLowerCase().includes(t)) ||
        // search subjects
        lesson.subjects.some((s) => s.toLowerCase().includes(t)) ||
        // search classes
        lesson.classes.some((c) => c.toLowerCase().includes(t))
      )
    );
  }, [search, selected]);

  return (
    <div>
        <div className={styles.page}>
            <header className={styles.header}>
                <ThemeToggle />
            </header>
            <div className={styles.controls}>
                <input
                type="search"
                placeholder="Search by teacher, subject or class…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.search}
                />

                <div className={styles.toggle}>
                {sections.map((sec) => (
                    <button
                    key={sec.key}
                    className={
                        selected === sec.key
                        ? styles.toggleBtnActive
                        : styles.toggleBtn
                    }
                    onClick={() => {
                        setSelected(sec.key);
                        setSearch("");
                    }}
                    >
                    {sec.label}
                    </button>
                ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filtered.length > 0 ? (
                filtered.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} />
                ))
                ) : (
                <p className={styles.empty}>No lessons found.</p>
                )}
            </div>
        </div>
    </div>
  );
}
