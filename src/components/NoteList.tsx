import Note from "./Note";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoteStatusToggle from "./NoteStatusToggle";
import { MouseEvent, useState } from "react";
import { NoteType } from "../services/notes";
import { Updater } from "use-immer";
import { useDroppable } from "@dnd-kit/core";

//TODO: Try using dnd kit (behavior built-in to it) as well for the drag n drop feature. Could work well with auto-animate.
//useGesture is another alternative in case dnd kit does not work but behaviour will need to be defined for better performance

function NoteList({
  currentNotes,
  onChangeNotes,
}: {
  currentNotes: Array<NoteType>;
  onChangeNotes: Updater<Array<NoteType>>;
}) {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();
  const [noteStatus, setNoteStatus] = useState("all");

  const clearCompleted = (evt: MouseEvent) => {
    evt.stopPropagation();
    onChangeNotes(currentNotes.filter((note) => note.noteStatus == "active"));
  };

  const onSelectNote = (id: string) => {
    onChangeNotes((draft) => {
      const toBeChanged = draft.find((changed) => changed.id == id);

      if (toBeChanged == undefined) {
        return;
      }

      toBeChanged.noteStatus =
        toBeChanged?.noteStatus == "active" ? "completed" : "active";
    });
  };

  return (
    <div className=" dark:text-white rounded-sm py-1 shadow-2xl  bg-white gap-5 dark:bg-very-dark-desaturated-blue w-11/12 max-w-xl mx-auto mt-10">
      <ul
        ref={animationParent}
        className="divide-y dark:divide-very-dark-grayish-blue "
      >
        {currentNotes.map((note) => (
          <Note
            onDelete={() =>
              onChangeNotes(
                currentNotes.filter((deleted) => deleted.id != note.id)
              )
            }
            key={note.id}
            onSelect={() => onSelectNote(note.id)}
            noteid={note.id}
            text={note.content}
            selected={note.noteStatus != "active"}
          ></Note>
        ))}
        <div className="my-0.5 mx-10 py-5 text-dark-grayish-blue dark:text-dark-grayish-blue flex gap-5 justify-between">
          <p>{currentNotes.length} items left</p>
          <NoteStatusToggle status={noteStatus} onToggle={setNoteStatus} />
          <span onClick={clearCompleted} className="cursor-pointer">
            Clear completed
          </span>
        </div>
      </ul>
    </div>
  );
}

export default NoteList;
