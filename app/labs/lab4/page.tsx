
"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import CounterBroken from "./CounterBroken";
import Counter from "./Counter";

import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ProfileForm from "./profile/ProfileForm";

import ParentStateComponent from "./ParentStateComponent";
import PropDrilling from "./PropDrilling";
import UrlEncoding from "./UrlEncoding";

import ContextExamples from "./context/ContextExamples";
import ContextProfileForm from "./context/ContextProfileForm";

import ZustandExamples from "./zustand/ZustandExamples";
import ZustandProfileForm from "./zustand/ZustandProfileForm";

import ReduxExamples from "./redux/ReduxExamples";

import Effect from "./Effect";
import Link from "next/link";

export default function Lab4() {
  const sayHello = (message: string) => {
    alert(message);
  };

  const greetByName = () => {
    alert("Hello Ying-Lou!");
  };

  const sampleFunction = () => {
    alert("Sample from parent");
  };

  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>

      <ClickEvent />
      <PassingDataOnEvent />

      <PassingFunctions
        message="Hello from Lab 4"
        theFunction={sayHello}
        greetByName={greetByName}
        theOtherFunction={sampleFunction}
      />
      <CounterBroken />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ProfileForm />
      <ParentStateComponent />
      <PropDrilling />
      <UrlEncoding />
      <ContextExamples />
      <ContextProfileForm />
      <ZustandExamples />
      <ZustandProfileForm />
      <ReduxExamples />
      <Effect />
      <Link href="/labs/lab4/hooks" className="text-blue-600 underline">
        Writing Your Own Hooks
      </Link>
    </div>
  );
}
