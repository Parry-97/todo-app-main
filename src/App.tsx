import { FormEvent, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import ThemeSelector from "./components/ThemeSelector";

function App() {
  //TODO: Use dark class strategy to conditionally apply dark or light theme style
  //      Can use an app level state variable to keep track of it.
  const [themeDark, setThemeDark] = useState(false);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    console.log("target", evt.target);
  };

  return (
    <div
      className={`transition-colors duration-300 ease-out h-full ${
        themeDark ? "bg-gray-900 dark" : ""
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
          <div className="px-5 flex items-center bg-white gap-5 dark:bg-gray-900 w-4/5 lg:w-1/3 mx-auto mt-10">
            <div className="rounded-full border py-1.5 px-[5px] dark:border-gray-600  border-gray-300">
              <img
                className="invisible"
                src="../images/icon-check.svg"
                alt="check mark icon"
              />
            </div>
            <div>
              <input
                className="w-full h-12 dark:bg-gray-900 dark:text-white outline-none"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
