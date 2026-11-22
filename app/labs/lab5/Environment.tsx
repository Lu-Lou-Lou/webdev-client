export default function Environment() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

  return (
    <div id="wd-lab5-environment">
      <h4>Environment</h4>
      <p>
        NEXT_PUBLIC_HTTP_SERVER = {HTTP_SERVER}
      </p>
      <a
        id="wd-welcome-link"
        href={`${HTTP_SERVER}/lab5/welcome`}
      >
        Welcome
      </a>
    </div>
  );
}