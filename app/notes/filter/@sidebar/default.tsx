import Link from "next/link";
import styles from "./SidebarNotes.module.css";

export default function SidebarDefault() {
  const tags = ["all", "Work", "Personal", "Todo", "Meeting", "Shopping"];

  return (
    <ul className={styles.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={styles.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={styles.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}