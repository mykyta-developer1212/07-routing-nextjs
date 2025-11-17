import Link from "next/link";

export default function SidebarDefault() {
  return (
    <ul>
      <li><Link href="/notes/filter/all">All notes</Link></li>
      <li><Link href="/notes/filter/Work">Work</Link></li>
      <li><Link href="/notes/filter/Personal">Personal</Link></li>
      <li><Link href="/notes/filter/Todo">Todo</Link></li>
      <li><Link href="/notes/filter/Meeting">Meeting</Link></li>
      <li><Link href="/notes/filter/Shopping">Shopping</Link></li>
    </ul>
  );
}
