import Note from "./Note";

interface NoteType {
  content: string;
  id: string;
  status: "active" | "completed";
}

function NoteList({ currentNotes }: { currentNotes: Array<NoteType> }) {
  return (
    <div className=" dark:text-white rounded-sm py-1 shadow-2xl  bg-white gap-5 dark:bg-very-dark-desaturated-blue w-4/5 lg:w-1/3 mx-auto mt-10">
      <ul className="divide-y dark:divide-very-dark-grayish-blue ">
        {currentNotes.map((note, i: number) => (
          <Note key={i} text={note.content}></Note>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
