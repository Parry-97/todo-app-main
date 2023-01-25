import Note from "./Note";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoteStatusToggle from "./NoteStatusToggle";
import { useState } from "react";
import { NoteType } from "../services/notes";

//INFO: Try using dnd kit (behavior built-in to it) as well for the drag n drop feature. Could work well with auto-animate.
//useGesture is another alternative in case dnd kit does not work but behaviour will need to be defined for better performance

function NoteList({ currentNotes }: { currentNotes: Array<NoteType> }) {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();
  const [noteStatus, setNoteStatus] = useState("all");

  return (
    <div className=" dark:text-white rounded-sm py-1 shadow-2xl  bg-white gap-5 dark:bg-very-dark-desaturated-blue w-4/5 lg:w-1/3 mx-auto mt-10">
      <ul
        ref={animationParent}
        className="divide-y dark:divide-very-dark-grayish-blue "
      >
        {currentNotes.map((note) => (
          <Note key={note.id} text={note.content}></Note>
        ))}
        <div className="my-0.5 mx-10 py-5 text-dark-grayish-blue dark:text-dark-grayish-blue flex justify-between">
          <p>{currentNotes.length} items left</p>
          <NoteStatusToggle status={noteStatus} onToggle={setNoteStatus} />
          <span className="cursor-pointer">Clear completed</span>
        </div>
      </ul>
    </div>
  );
}

export default NoteList;
