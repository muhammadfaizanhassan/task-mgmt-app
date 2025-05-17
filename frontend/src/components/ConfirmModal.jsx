import { useEffect } from 'react';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && show) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-desc"
      tabIndex={-1}
      onClick={onClose} // close when clicking outside modal content
    >
      <div
        className="bg-black  p-6 rounded-2xl shadow-2xl w-full max-w-md text-gray-900 dark:text-gray-100 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
        tabIndex={0}
      >
        <h2 id="confirm-modal-title" className="text-xl font-bold mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Confirm Deletion
        </h2>
        <p id="confirm-modal-desc" className="text-sm mb-6 text-gray-700 dark:text-gray-400">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200 flex items-center gap-2"
          >
            Delete
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7L5 21M5 7l14 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
