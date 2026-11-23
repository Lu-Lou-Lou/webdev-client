import Link from "next/link";

export default function Labs() {
  const httpServer = process.env.NEXT_PUBLIC_HTTP_SERVER;
  return (
    <div id="wd-labs">
      <h2>Ying-Lou Lu</h2>
      <a
        id="wd-github"
        href="https://github.com/Lu-Lou-Lou/webdev-client"
        target="_blank"
        rel="noreferrer"
        className="me-3 text-blue-600 underline"
      >
        Client GitHub Repository
      </a>
      <a id="wd-server-github" href="https://github.com/Lu-Lou-Lou/webdev-server/tree/a5"
        target="_blank" rel="noreferrer" className="me-3 text-blue-600 underline">
        Server GitHub Repository
      </a>
      {httpServer && <a id="wd-server-deployment" href={httpServer}
        target="_blank" rel="noreferrer" className="text-blue-600 underline">
        Express Server
      </a>}
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/labs/lab1">Lab 1: HTML Examples</Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3">Lab 3: JavaScript Fundamentals</Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">Lab 4</Link>
        </li>
        <li>
          <Link href="/labs/lab5" id="wd-lab5-link">Lab 5</Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">Kambaz</Link>
        </li>
      </ul>
    </div>
  );
}