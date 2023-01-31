import {
  DndContext,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import NoteList from "./components/NoteList";
import ThemeSelector from "./components/ThemeSelector";
import { login } from "./services/auth";
import {
  addNote,
  fetchNotes,
  NoteType,
  setToken,
  token,
} from "./services/notes";

function App() {
  //TODO: Use dark class strategy to conditionally apply dark or light theme style
  //      Can use an app level state variable to keep track of it.
  const [themeDark, setThemeDark] = useState<boolean>(false);
  const [newNote, setNewNote] = useState("");
  const queryClient = useQueryClient();

  const [notes, setNotes] = useImmer<NoteType[]>([]);
  const {
    // data: userData,
    // isLoading: isUserLoading,
    // isError: isLoginError,
    isSuccess: isUserSuccess,
  } = useQuery({
    queryKey: ["login", token],
    queryFn: () =>
      login({
        password: import.meta.env.VITE_PWD,
        username: import.meta.env.VITE_USERNAME,
      }),
    staleTime: 3600000,
    onSuccess: (response) => {
      setToken(response.data.token);
      // console.log("token", token);
    },
  });

  const {
    // data,
    isLoading,
    isError,
    // isSuccess,
  } = useQuery({
    queryKey: ["notes", token],
    queryFn: fetchNotes,
    staleTime: 100000,
    enabled: isUserSuccess,
    onSuccess(data) {
      //WARN: Had to assign to a state variable to have it work properly as a dependent query
      console.log("notes", data);
      data.forEach((element: NoteType) => {
        element.noteStatus = "active";
      });
      setNotes(data);

      // setNotes(data.map((note: NoteType) => (note.noteStatus = "active")));
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 10,
      },
    })
  );

  const addNoteMutation = useMutation({
    mutationKey: ["new note"],
    mutationFn: (noteObj: NoteType) => addNote(noteObj),
    onSuccess: (data) => {
      //WARN: Invalidating the whole list is the "safer" approach.
      queryClient.setQueryData(["notes"], [...notes, data]);
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  function handleDragEnd(event: DragOverEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNotes((notes) => {
        const oldIndex = notes.findIndex((note) => note.id == active.id);
        const newIndex = notes.findIndex((note) => over?.id == note.id);

        return arrayMove(notes, oldIndex, newIndex);
      });
    }
  }

  // if (isSuccess) {
  //   console.log("notes", notes);
  // }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    // console.log("target", evt.target);
    const noteObj: NoteType = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
      id: (notes.length + 1).toString(),
      noteStatus: "active",
    };

    // ISSUE: Fly app is returning 502 during late hours
    // addNoteMutation.mutate(noteObj);
    // Below update is just temporary
    setNotes([...notes, noteObj]);
    setNewNote("");
  };

  return (
    <div
      className={`transition-colors duration-300 ease-out h-full ${
        themeDark ? "bg-very-dark-blue dark" : ""
      }`}
    >
      <div
        className={`transition-all duration-300 ease-out bg-cover m-0 p-5 h-2/5 dark:bg-[url('../images/bg-desktop-dark.jpg')] bg-[url('../images/bg-desktop-light.jpg')]`}
      >
        <div className="w-11/12 max-w-2xl mx-auto mt-10 flex justify-between items-center">
          <h1 className="text-white uppercase text-5xl font-bold">T o d o</h1>
          <ThemeSelector
            isDark={themeDark}
            onToggle={() => setThemeDark(!themeDark)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 flex items-center bg-white gap-5 dark:bg-very-dark-desaturated-blue w-11/12 max-w-2xl mx-auto mt-10">
            <div className="rounded-full border py-1.5 px-[5px] dark:border-gray-600  border-gray-300">
              <img
                className="invisible"
                src="../images/icon-check.svg"
                alt="check mark icon"
              />
            </div>
            <div className="grow">
              <input
                className="w-full h-12 dark:bg-very-dark-desaturated-blue dark:text-white outline-none"
                placeholder="Create a new note"
                type="text"
                value={newNote}
                required
                onChange={(evt) => setNewNote(evt.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={notes}>
          <NoteList currentNotes={notes} onChangeNotes={setNotes}></NoteList>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default App;
