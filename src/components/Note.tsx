import { useSortable } from "@dnd-kit/sortable";
import crossIcon from "../../images/icon-cross.svg";
import checkIcon from "../../images/icon-check.svg";
import { MouseEvent, MouseEventHandler } from "react";

function Note({
  selected,
  onSelect,
  text,
  noteid,
  onDelete,
}: {
  selected: boolean;
  text: string;
  noteid: string;
  onSelect: MouseEventHandler;
  onDelete: () => void;
}) {
  // const [selected, setSelected] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: noteid,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  function deleteOnSelected(evt: MouseEvent) {
    evt.stopPropagation();
    if (selected) {
      onDelete();
    }
  }

  return (
    <div
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      onClick={onSelect}
      className="group m-0.5 flex items-center bg-white gap-5 dark:bg-very-dark-desaturated-blue py-5"
    >
      <div
        className={`${
          selected ? "bg-gradient-to-b" : ""
        } group-hover:bg-gradient-to-b from-[#57ddff] to-[#c058f3] group-hover:border-white dark:group-hover:border-very-dark-desaturated-blue ml-10 rounded-full border py-[1px] px-[1px]  dark:border-gray-600 border-gray-300`}
      >
        {selected ? (
          <img
            className={`
             py-1.5 px-[5px] rounded-full`}
            src={checkIcon}
            alt="check mark icon"
          />
        ) : (
          <div className="group-hover:bg-white dark:group-hover:bg-very-dark-desaturated-blue rounded-full">
            <img
              className={`invisible
             py-1.5 px-[5px] rounded-full`}
              src={checkIcon}
              alt="check mark icon"
            />
          </div>
        )}
      </div>
      <div
        className={`${
          selected
            ? "decoration-1 line-through text-dark-grayish-blue dark:text-dark-grayish-blue"
            : "text-very-dark-blue dark:text-light-grayish-blue"
        } grow transition-all ease-out duration-500`}
      >
        {text}
      </div>
      <div onClick={deleteOnSelected}>
        <img
          className={`${
            selected ? "visibile" : "invisible"
          } mr-10 cursor-pointer`}
          src={crossIcon}
          alt="cross icon"
        />
      </div>
    </div>
  );
}
//WARN: The :hover pseudo-class is problematic on touchscreens. Depending on the
//      browser, the :hover pseudo-class might never match, match only for a moment
//      after touching an element, or continue to match even after the user has
//      stopped touching and until the user touches another element.
export default Note;
