import { useState, useEffect, useCallback } from 'react';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import ConfirmModal from '../components/ConfirmModal';
import api from '../utils/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = showForm ? 'hidden' : 'auto';
  }, [showForm]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (search) params.search = search;
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch {
      alert('Failed to load tasks');
    }
    setLoading(false);
  }, [search, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const groupedTasks = {
    'To Do': [],
    'In Progress': [],
    'Done': [],
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) groupedTasks[task.status].push(task);
  });

  Object.keys(groupedTasks).forEach((status) => {
    groupedTasks[status].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  });

  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const saveTask = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData);
      } else {
        await api.post('/tasks', taskData);
      }
      await fetchTasks();
      closeForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save task');
    }
  };

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      await fetchTasks();
      setShowConfirm(false);
      setTaskToDelete(null);
    } catch {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-primary-emphasis">Task Manager</h1>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={openCreateForm}>
            + New Task
          </button>
        </div>
      </header>
  
      <FilterBar
        search={search}
        setSearch={setSearch}
        status={statusFilter}
        setStatus={setStatusFilter}
      />
  
      {loading ? (
        <div className="text-center mt-5 text-body-secondary">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-body-secondary mt-4">No matching tasks found.</div>
      ) : (
        <div className="row mt-4">
          {['To Do', 'In Progress', 'Done'].map((status) => {
            const bgMap = {
              'To Do': 'bg-info-subtle border-info',
              'In Progress': 'bg-warning-subtle border-warning',
              'Done': 'bg-success-subtle border-success',
            };
            const headerText = {
              'To Do': 'text-info',
              'In Progress': 'text-warning',
              'Done': 'text-success',
            };
  
            return (
              <div className="col-md-4 mb-4" key={status}>
                <div className={`card h-100 border ${bgMap[status]}`}>
                  <div className="card-body">
                    <h5 className={`card-title fw-bold ${headerText[status]}`}>{status}</h5>
                    {groupedTasks[status].length === 0 ? (
                      <p className="text-body-secondary fst-italic">No tasks</p>
                    ) : (
                      groupedTasks[status].map((task) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onEdit={() => openEditForm(task)}
                          onDelete={() => confirmDelete(task)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
  
      {showForm && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <TaskForm initialData={editingTask} onSave={saveTask} onCancel={closeForm} />
            </div>
          </div>
        </div>
      )}
  
      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={deleteTask}
      />
    </div>
  );
};

export default Home;