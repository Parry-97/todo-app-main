import { useState } from "react";

function Note({ text }: { text: string }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      onClick={() => setSelected(!selected)}
      className="group m-0.5 flex items-center bg-white gap-5 dark:bg-very-dark-desaturated-blue py-5"
    >
      <div
        className={`${
          selected ? "bg-gradient-to-r" : ""
        } group-hover:bg-gradient-to-r from-[#57ddff] to-[#c058f3] ml-10 rounded-full border py-1.5 px-[5px]  dark:border-gray-600 border-gray-300`}
      >
        <img
          className={`${
            !selected ? "invisible" : "visible"
          } group-hover:visible`}
          src="../images/icon-check.svg"
          alt="check mark icon"
        />
      </div>
      <div className="grow">{text}</div>
    </div>
  );
}
//WARN: The :hover pseudo-class is problematic on touchscreens. Depending on the
//      browser, the :hover pseudo-class might never match, match only for a moment
//      after touching an element, or continue to match even after the user has
//      stopped touching and until the user touches another element.
export default Note;
