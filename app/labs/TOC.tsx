import Link from "next/link";

const pill = "block rounded-full bg-blue-600 px-3 py-1.5 text-center text-sm font-medium text-white no-underline hover:bg-blue-700";

export default function TOC() {
  return (
    <>
    <h4>Ying-Lou</h4>
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      <li>
        <Link className={pill} href="/labs" id="wd-home-link">
          Home
        </Link>
      </li>
      <li>
        <Link className={pill} href="/labs/lab1">Lab 1</Link>
      </li>
      <li>
        <Link className={pill} href="/labs/lab2">Lab 2</Link>
      </li>
      <li>
        <Link className={pill} href="/labs/lab3">Lab 3</Link>
      </li>
      <li>
        <Link className={pill} href="/labs/lab4">Lab 4</Link>
      </li>
      <li>
        <Link className={pill} href="/labs/lab5">Lab 5</Link>
      </li>
      <li>
        <a className={pill} href="https://kambaz.dev/book/ch1" id="wd-toc-book-link">
          Chapter 1
        </a>
      </li>
      <li>
        <Link className={pill} href="/" id="wd-kambaz-link">
          Kambaz
        </Link>
      </li>
    </ul>
    </>
  );
}