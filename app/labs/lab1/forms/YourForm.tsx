export default function YourForm() {
  return (
    <form id="wd-your-form">
      <h4>Sample Personal Form</h4>

      <label htmlFor="wd-your-name">Name:</label>
      <input
        type="text"
        id="wd-your-name"
        placeholder="Ying-Lou"
        defaultValue="Ying-Lou"
      />
      <br />

      <label htmlFor="wd-your-password">Password:</label>
      <input
        type="password"
        id="wd-your-password"
        placeholder="Sample password"
      />
      <br />

      <label htmlFor="wd-your-bio">Bio:</label>
      <br />
      <textarea
        id="wd-your-bio"
        placeholder="I am a second-year graduate student from computer science align program."
        rows={4}
        cols={40}
      />
      <br />

      <fieldset>
        <legend>Class standing</legend>
        <input type="radio" name="class-standing" id="wd-your-freshman" />
        <label htmlFor="wd-your-freshman">Freshman</label>
        <br />
        <input type="radio" name="class-standing" id="wd-your-sophomore" />
        <label htmlFor="wd-your-sophomore">Sophomore</label>
        <br />
        <input type="radio" name="class-standing" id="wd-your-junior" />
        <label htmlFor="wd-your-junior">Junior</label>
        <br />
        <input type="radio" name="class-standing" id="wd-your-senior" />
        <label htmlFor="wd-your-senior">Senior</label>
        <br />
        <input type="radio" name="class-standing" id="wd-your-graduate"
        defaultChecked 
        />
        <label htmlFor="wd-your-graduate">Graduate</label>
      </fieldset>

      <fieldset>
        <legend>Enrollment status</legend>
        <input type="radio" name="enrollment-status" id="wd-your-full-time"
        defaultChecked
         />
        <label htmlFor="wd-your-full-time">Full-time</label>
        <br />
        <input type="radio" name="enrollment-status" id="wd-your-part-time" />
        <label htmlFor="wd-your-part-time">Part-time</label>
      </fieldset>

      <fieldset>
        <legend>Interests</legend>
        <input type="checkbox" id="wd-your-interest-html"
        defaultChecked
         />
        <label htmlFor="wd-your-interest-html">HTML</label>
        <br />
        <input type="checkbox" id="wd-your-interest-css"
        defaultChecked
         />
        <label htmlFor="wd-your-interest-css">CSS</label>
        <br />
        <input type="checkbox" id="wd-your-interest-javascript"
        defaultChecked
         />
        <label htmlFor="wd-your-interest-javascript">JavaScript</label>
      </fieldset>

      <label htmlFor="wd-your-program">Program:</label>
      <select id="wd-your-program" defaultValue="computer-science">
        <option value="web-development">Web Development</option>
        <option value="computer-science">Computer Science</option>
        <option value="information-systems">Information Systems</option>
        <option value="data-science">Data Science</option>
      </select>
      <br />

      <label htmlFor="wd-your-topics">Favorite topics:</label>
      <select id="wd-your-topics" multiple defaultValue={["html", "javascript"]}>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="accessibility">Accessibility</option>
      </select>
      <br />

      <label htmlFor="wd-your-email">Email:</label>
      <input
        type="email"
        id="wd-your-email"
        placeholder="lu.yinglo@university.edu"
        defaultValue="lu.yinglo@university.edu"
      />
      <br />

      <label htmlFor="wd-your-graduation-year">Graduation year:</label>
      <input
        type="number"
        id="wd-your-graduation-year"
        min={2020}
        max={2035}
        defaultValue={2027}
      />
      <br />

      <label htmlFor="wd-your-date">Preferred start date:</label>
      <input type="date" id="wd-your-date" defaultValue="2026-09-01"/>
      <br />

      <label htmlFor="wd-your-range">Confidence level:</label>
      <input type="range" id="wd-your-range" min={0} max={10} defaultValue={5} />
      <br />

      <button type="submit" id="wd-your-save">Save</button>
      <button type="button" id="wd-your-cancel">Cancel</button>
    </form>
  );
}
