// components/FilterBar.jsx

const FilterBar = ({ search, setSearch, status, setStatus }) => {
    const statusOptions = ['All', 'To Do', 'In Progress', 'Done'];
  
    return (
      <div className="card p-3">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="btn-group" role="group">
          {statusOptions.map((option) => (
            <button
              key={option}
              className={`btn ${status === option ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setStatus(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
export default FilterBar;
  