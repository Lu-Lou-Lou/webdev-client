export default function JsonStringify() {
  const squares = [1, 4, 16, 25, 36];
  const student = { name: "Ying-Lou Lu", lab: 3 };
  return (
    <div id="wd-json-stringify">
      <h3>JSON Stringify</h3>
      squares = {JSON.stringify(squares)}
      <br />
      sampleCourse = {JSON.stringify({ course: "RS102", modules: 3 })}
      <br />
      student = {JSON.stringify(student)}
      <hr />
    </div>
  );
}
