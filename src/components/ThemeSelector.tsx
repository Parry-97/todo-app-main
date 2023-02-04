import { Transition } from "@headlessui/react";
import sunIcon from "../../images/icon-sun.svg";
import moonIcon from "../../images/icon-moon.svg";
//INFO: Check out https://www.skies.dev/headless-ui-transitions if needs other beatiful transition
export const transitionClasses = {
  enter: "transform transition duration-[400ms] ease-linear",
  enterFrom: "opacity-0 rotate-[-120deg] scale-0",
  enterTo: "opacity-100 rotate-0 scale-100",
  leave: "transform duration-[10ms] transition ease-in-out",
  leaveFrom: "opacity-0 rotate-0 scale-100",
  //INFO: finally setting opacity-0 for the leaveFrom solved the x translation for the first icon, makes it less noticeable to the naked eye
  leaveTo: "opacity-0 scale-0",
};

export default function ThemeSelector({
  onToggle,
  isDark,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    //NOTE: setting the container as a flex row makes sure we don't have y-translation for the first icon transition
    <div
      className="flex justify-start items-center cursor-pointer"
      onClick={onToggle}
    >
      <Transition show={!isDark} {...transitionClasses}>
        <img src={sunIcon} alt="sun icon" />
      </Transition>
      <Transition show={isDark} {...transitionClasses}>
        <img src={moonIcon} alt="moon icon" />
      </Transition>
    </div>
  );
}
