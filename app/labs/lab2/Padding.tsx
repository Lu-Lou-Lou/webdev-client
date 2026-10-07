export default function Padding() {
  return (
    <div id="wd-css-paddings">
      <h2>Padding</h2>
      <div className="wd-padded-top-left wd-border-fat wd-border-red wd-border-solid wd-bg-color-yellow">
        Padded top left
      </div>
      <div className="wd-padded-bottom-right wd-border-fat wd-border-blue wd-border-solid wd-bg-color-yellow">
        Padded bottom right
      </div>
      <div className="wd-padding-fat wd-border-fat wd-border-yellow wd-border-solid wd-bg-color-blue wd-fg-color-white">
        Padded all around
      </div>
      <div id="wd-ai-padded" className="wd-ai-padded wd-border-fat wd-border-red wd-border-solid wd-bg-color-yellow">
        AI padded top only
      </div>
      <div className="wd-padded-left-only wd-border-fat wd-border-red wd-border-solid wd-bg-color-gray wd-fg-color-green">
        Padded left only---------
      </div>
    </div>
  );
}