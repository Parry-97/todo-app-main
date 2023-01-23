import Note from "./Note";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface NoteType {
  content: string;
  id: string;
  status: "active" | "completed";
}

function NoteList({ currentNotes }: { currentNotes: Array<NoteType> }) {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className=" dark:text-white rounded-sm py-1 shadow-2xl  bg-white gap-5 dark:bg-very-dark-desaturated-blue w-4/5 lg:w-1/3 mx-auto mt-10">
      <ul
        ref={animationParent}
        className="divide-y dark:divide-very-dark-grayish-blue "
      >
        {currentNotes.map((note) => (
          <Note key={note.id} text={note.content}></Note>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
