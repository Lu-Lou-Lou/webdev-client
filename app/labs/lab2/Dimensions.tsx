export default function Dimensions() {
  return (
    <div id="wd-css-dimensions">
      <h2>Dimension</h2>
      <div>
        <div className="wd-dimension-portrait wd-bg-color-yellow">Portrait</div>
        <div className="wd-dimension-landscape wd-bg-color-blue wd-fg-color-white">
          Landscape
        </div>
        <div className="wd-dimension-square wd-bg-color-red">Square</div>
        <div id="wd-ai-dimension" className="wd-ai-dimension">
          This long sentence demonstrates how text flows inside a box with a declared width of one hundred twenty pixels and a height of sixty pixels.
        </div>
        <div className="wd-dimension-my-box wd-bg-color-yellow">This is a really really long sentence.</div>
      </div>
    </div>
  );
}