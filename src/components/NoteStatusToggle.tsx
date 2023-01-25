import React, { SetStateAction } from "react";

const NoteStatusToggle = ({
  status,
  onToggle,
}: {
  onToggle: React.Dispatch<SetStateAction<string>>;
  status: string;
}) => {
  return (
    <div className="flex gap-5 justify-between">
      <span
        className={`${
          status == "all" && " font-bold text-bright-blue"
        } transition-colors ease-in duration-200 `}
        onClick={() => onToggle("all")}
      >
        All
      </span>
      <span
        className={`${
          status == "active" && "font-bold  text-bright-blue"
        } transition-colors ease-in duration-200 `}
        onClick={() => onToggle("active")}
      >
        Active
      </span>
      <span
        className={`${
          status == "completed" && "font-bold text-bright-blue"
        } transition-colors ease-in duration-200 `}
        onClick={() => onToggle("completed")}
      >
        Completed
      </span>
    </div>
  );
};

export default NoteStatusToggle;
