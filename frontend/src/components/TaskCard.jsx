import { FiEdit2, FiTrash, FiClock, FiFileText } from "react-icons/fi";
import moment from "moment";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isOverdue = task.deadline && new Date(task.deadline) < new Date();
  const daysLeft = task.deadline
    ? moment(task.deadline).diff(moment(), "days")
    : null;

  const statusStyles = {
    "To Do":
      "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700",
    "In Progress":
      "bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
    Done: "bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
  };

  const deadlineColor = isOverdue
    ? "text-red-600 dark:text-red-400"
    : daysLeft !== null && daysLeft <= 1
    ? "text-amber-600 dark:text-amber-400"
    : "text-gray-700 dark:text-gray-400";

  return (
    <article
      className="
        relative group
        bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900
        backdrop-blur-md
        rounded-2xl
        border border-gray-200 dark:border-gray-700
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        p-6
        w-full max-w-[360px]
        flex flex-col
        focus-within:ring-2 focus-within:ring-blue-500/70 dark:focus-within:ring-blue-500/30
        outline-none
        hover:-translate-y-1
      "
      tabIndex={-1}
      aria-label={`Task: ${task.title}, status: ${task.status}`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h3
          className="
    text-m font-semibold tracking-tight
    text-black
    truncate max-w-[70%]
    transition-colors duration-300
  "
          title={task.title}
        >
          {task.title}
        </h3>

        <span
          className={`
            text-xs font-semibold px-4 py-1 rounded-full 
            ${statusStyles[task.status]}
            text-white shadow-inner
            transition-transform duration-200 hover:scale-105
            cursor-default
            select-none whitespace-nowrap
          `}
          aria-label={`Status: ${task.status}`}
          style={{ letterSpacing: "0.05em" }}
        >
          {task.status}
        </span>
      </header>

      {/* Description */}
      <section className="flex items-start text-gray-700 dark:text-gray-300 mb-6 min-h-[4.5rem]">
        <div className="mr-3 mt-1 p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
          <FiFileText
            className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
        </div>
        <p
          className="line-clamp-4 text-sm leading-relaxed tracking-normal 
                     text-gray-600 dark:text-gray-400 transition-colors duration-300"
          aria-label={task.description ? "Task description" : "No description"}
        >
          {task.description || (
            <em className="text-gray-400/80 dark:text-gray-500/80 italic">
              No description provided
            </em>
          )}
        </p>
      </section>

      {/* Deadline */}
      {task.deadline && (
        <section
          className={`flex items-center text-sm mb-6 font-medium ${deadlineColor}
                      transition-colors duration-300`}
          aria-label={`Deadline: ${moment(task.deadline).format(
            "DD MMM YYYY"
          )}`}
        >
          <FiClock className="mr-2 w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <time dateTime={task.deadline} className="font-mono">
            {moment(task.deadline).format("DD MMM YYYY")}
          </time>
          {isOverdue && (
            <span
              className="ml-3 font-semibold flex items-center animate-pulse"
              aria-live="assertive"
              aria-atomic="true"
            >
              <span className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full mr-1" />
              Overdue
            </span>
          )}
        </section>
      )}

      {/* Action Buttons */}
      <footer className="flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
        <button
          onClick={onEdit}
          className="
            flex items-center gap-1.5 
            text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100
            bg-blue-100/70 dark:bg-blue-900/30 hover:bg-blue-200/60 dark:hover:bg-blue-900/40
            px-3 py-1.5 rounded-lg font-semibold
            shadow-sm hover:shadow-md
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02]
            ring-blue-500/30 focus:outline-none focus:ring-2
          "
          aria-label={`Edit task: ${task.title}`}
          title="Edit Task"
          type="button"
        >
          <FiEdit2 className="w-4 h-4" />
          <span className="text-sm">Edit</span>
        </button>
        <button
          onClick={onDelete}
          className="
            flex items-center gap-1.5 
            text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100
            bg-red-100/70 dark:bg-red-900/30 hover:bg-red-200/60 dark:hover:bg-red-900/40
            px-3 py-1.5 rounded-lg font-semibold
            shadow-sm hover:shadow-md
            transition-all duration-300 ease-in-out
            transform hover:scale-[1.02]
            ring-red-500/30 focus:outline-none focus:ring-2
          "
          aria-label={`Delete task: ${task.title}`}
          title="Delete Task"
          type="button"
        >
          <FiTrash className="w-4 h-4" />
          <span className="text-sm">Delete</span>
        </button>
      </footer>
    </article>
  );
};

export default TaskCard;
