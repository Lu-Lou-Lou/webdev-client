import Buttons from "./Buttons";
import Checkboxes from "./Checkboxes";
import Dropdowns from "./Dropdowns";
import OtherFieldTypes from "./OtherFieldTypes";
import RadioButtons from "./RadioButtons";
import Textarea from "./Textarea";
import TextFields from "./TextFields";
import YourForm from "./YourForm";

export default function Forms() {
  return (
    <div id="wd-forms">
      <h4>Form Elements</h4>
      <form id="wd-text-fields">
        <TextFields />
        <Textarea/>
        <RadioButtons/>
        <Checkboxes/>
        <Dropdowns/>
        <OtherFieldTypes/>
        <Buttons/>
        {/* add the next form components here */}
      </form>
      <YourForm />
    </div>
  );
}