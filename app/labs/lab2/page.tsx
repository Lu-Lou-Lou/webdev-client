import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Display from "./Display";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import MediaQueriesDemo from "./MediaQueriesDemo";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel right on the
        element. Although it&apos;s very convenient it is considered bad
        practice and you should avoid using the style attribute
      </p>

      <div id="wd-css-id-selectors">
      <h3>ID selectors</h3>
      <p id="wd-id-selector-1">
        Instead of changing the look and feel of all the
        elements of the same name, e.g., P, we can refer to a
        specific element by its ID
      </p>
      <p id="wd-id-selector-2">
        Here&apos;s another paragraph using a different ID and a
        different look and feel
      </p>
      <p id="wd-ai-id-selector">
        This is a sample paragraph for the AI ID selector styling
      </p>
      <p id="wd-id-selector-3">
        Here&apos;s another paragraph using a different ID and a
        different look and feel
      </p>
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding/>
      <Margins/>
      <BoxModel/>
      <Corners/>
      <Display/>
      <Dimensions/>
      <Positions/>
      <Zindex/>
      <Float/>
      <GridLayout/>
      <Flex/>
      <MediaQueriesDemo/>
    </div>
    <div id="wd-css-class-selectors">
    <h3>Class selectors</h3>
    <p className="wd-class-selector">
      Instead of using IDs to refer to elements, you can use an
      element&apos;s CLASS attribute
    </p>
    <h4 className="wd-class-selector">
      This heading has same style as paragraph above
    </h4>
    <p className="wd-ai-class-selector">
      This paragraph uses the AI class selector
    </p>
    <h4 className="wd-ai-class-selector">
      This heading uses the same AI class selector
    </h4>
  </div>
  <div id="wd-css-your-class">
    <h3>Class selectors</h3>
    <p className="wd-your-class">
      Instead of using IDs to refer to elements, you can use an
      element&apos;s CLASS attribute
    </p>
    <h4 className="wd-your-class">
      This heading has same style as paragraph above
    </h4>
  </div>
  <div id="wd-css-document-structure">
  <div className="wd-selector-1">
    <h3>Document structure selectors</h3>
    <div className="wd-selector-2">
      Selectors can be combined to refer elements in particular
      places in the document
      <p className="wd-selector-3">
        This paragraph&apos;s red background is referenced as
        <br />
        .selector-2 .selector3
        <br />
        meaning the descendant of some ancestor.
        <br />
        <span className="wd-selector-4">
          Whereas this span is a direct child of its parent
          <em className="wd-selector-5"> and I am nested one more level</em>
        </span>
        <br />
        <span className="wd-ai-selector-5">
          This span uses the AI descendant selector
        </span>
        <br />
        You can combine these relationships to create specific
        styles depending on the document structure
      </p>
    </div>
   </div>
  </div>
  <p id="wd-cascade-test" className="wd-cascade-test">
  Which color wins?
  </p>
  <p id="wd-ai-cascade" className="wd-ai-cascade">
  Which selector wins for this sample?
  </p>
  </div>
  );
}
