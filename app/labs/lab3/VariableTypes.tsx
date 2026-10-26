export default function VariableTypes() {
  let numberVariable = 123;
  let floatingPointNumber = 234.345;
  let stringVariable = "Hello World!";
  let booleanVariable = true;
  let favoriteNumber = 88;
  let myName = "Ying-Lou Lu";
  let isNumber = typeof numberVariable;
  let isString = typeof stringVariable;
  let isBoolean = typeof booleanVariable;
  let favoriteNumberType = typeof favoriteNumber;
  let isName = typeof myName; 
  let sampleCount = 42;
  let sampleLabel = "Lab 3";

  return (
    <div id="wd-variable-types">
      <h4>Variables Types</h4>
      numberVariable = {numberVariable}
      <br />
      floatingPointNumber = {floatingPointNumber}
      <br />
      stringVariable = {stringVariable}
      <br />
      booleanVariable = {booleanVariable + ""}
      <br />
      isNumber = {isNumber}
      <br />
      isString = {isString}
      <br />
      isBoolean = {isBoolean}
      <br />
      favoriteNumber = {favoriteNumber}
      <br />
      favoriteNumberType = {favoriteNumberType}
      <br />
      myName = {myName}
      <br />
      myNameType = {isName}
      <br />
      sampleCount = {sampleCount}
      <br />
      sampleCountType = {typeof sampleCount}
      <br />
      sampleLabel = {sampleLabel}
      <br />
      sampleLabelType = {typeof sampleLabel}
      <hr />
    </div>
  );
}
