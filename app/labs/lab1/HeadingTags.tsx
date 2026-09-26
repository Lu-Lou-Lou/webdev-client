export default function HeadingTags() {
  return (
    <>
    <div id="wd-h-tag">
      <h4>Heading Tags</h4>
      Text documents are often broken up into several sections and subsections.
      Each section is usually prefaced with a short title or heading that
      attempts to summarize the topic of the section it precedes. For instance
      this paragraph is preceded by the heading Heading Tags. The font of the
      section headings are usually larger and bolder than their subsection
      headings. This document uses headings to introduce topics such as HTML
      Documents, HTML Tags, Heading Tags, etc. HTML heading tags can be used
      to format plain text so that it renders in a browser as large headings.
      There are 6 heading tags for different sizes: h1, h2, h3, h4, h5, and
      h6. Tag h1 is the largest heading and h6 is the smallest heading. A{" "}
      <span id="wd-inline-span">span</span> sits in this sentence without
      starting a new line.

      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
      <h6>h6</h6>

      <div id="wd-ai-headings">
        <h4>Lab notes</h4>
        <p>Placeholder summary for the project progress and key ideas.</p>

        <h5>What I built</h5>
        <p>Placeholder description of the feature or prototype created for this lab.</p>

        <h6>Next step</h6>
        <p>Placeholder note describing the next task to complete.</p>
      </div>
    </div>

    <div id="wd-your-heading">
        <h4>Ying-Lou Lu</h4>
        <p>
            I am a graduate student studying in computer science align program. <span id="wd-your-span">This is a sentence with span.</span>
        </p>
    </div>
    </>
  );
}