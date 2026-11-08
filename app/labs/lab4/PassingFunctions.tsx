
export default function PassingFunctions({
  message,
  theFunction,
  greetByName,
  theOtherFunction,
}: {
  message: string;
  theFunction: (message: string) => void;
  greetByName: () => void;
  theOtherFunction: () => void;
}) {
  return (
    <div id="wd-passing-functions">
      <h2>Passing Functions</h2>

      <button
        type="button"
        onClick={() => theFunction(`From parent: ${message}`)}
        id="wd-pass-functions-click"
        className="me-2 rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Invoke the Function
      </button>

      <button
        type="button"
        onClick={greetByName}
        id="wd-pass-functions-name-click"
        className="me-2 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Greet by Name
      </button>

      <button
        type="button"
        onClick={theOtherFunction}
        id="wd-pass-functions-other-click"
        className="rounded bg-purple-600 px-3 py-1.5 text-sm font-medium text-white"
      >
        Other Function
      </button>

      <hr />
    </div>
  );
}
