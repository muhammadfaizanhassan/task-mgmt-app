import { useState, useEffect } from 'react';

const defaultForm = {
  title: '',
  description: '',
  deadline: '',
  status: 'To Do',
};

const TaskForm = ({ onSave, onCancel, initialData }) => {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...defaultForm, ...initialData });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (form.title.length > 100) errs.title = 'Max 100 characters allowed';
    if (form.description.length > 500) errs.description = 'Max 500 characters allowed';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave(form);
    setForm(defaultForm);
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-sm space-y-6 border border-gray-200 dark:border-gray-700 transition duration-300"
    >
      {/* Title Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Description Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Deadline & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Deadline
          </label>
          <input
            type="date"
            value={form.deadline ? form.deadline.split('T')[0] : ''}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
