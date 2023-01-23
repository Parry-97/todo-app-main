import { FormEvent, useState } from "react";
import { useQuery } from "react-query";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import NoteList from "./components/NoteList";
import ThemeSelector from "./components/ThemeSelector";
import { login } from "./services/auth";
import { fetchNotes, setToken, token } from "./services/notes";

function App() {
  //TODO: Use dark class strategy to conditionally apply dark or light theme style
  //      Can use an app level state variable to keep track of it.
  const [themeDark, setThemeDark] = useState<boolean>(false);
  // console.log("username", import.meta.env.VITE_USERNAME);
  // console.log("password", import.meta.env.VITE_PWD);
  const [notes, setNotes] = useState([]);
  const {
    data: userData,
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
      console.log("token", token);
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
    staleTime: 5000,
    enabled: isUserSuccess,
    onSuccess(data) {
      //WARN: Had to assign to a state variable to have it work properly as a dependent query
      setNotes(data);
    },
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error occured</div>;
  }

  // if (isSuccess) {
  //   console.log("notes", notes);
  // }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    console.log("target", evt.target);
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
        <div className="w-4/5 lg:w-1/3 mx-auto mt-10 flex justify-between items-center">
          <h1 className="text-white uppercase text-5xl font-bold">T o d o</h1>
          <ThemeSelector
            isDark={themeDark}
            onToggle={() => setThemeDark(!themeDark)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 flex items-center bg-white gap-5 dark:bg-very-dark-desaturated-blue w-4/5 lg:w-1/3 mx-auto mt-10">
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
              />
            </div>
          </div>
        </form>
      </div>
      <NoteList currentNotes={notes} />
    </div>
  );
}

export default App;
