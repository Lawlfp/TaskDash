import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [isAddTaskOpen,setAddTaskOpen] = useState(false);

  function AddTask(){
    setAddTaskOpen(true);
  }
  function CancelTask(){
    setAddTaskOpen(false);
    setPending();
  }
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState("pending");

  function createTask() {
    const newTask = {
      title: newTitle,
      description: newDescription,
      status: newStatus,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    };

    fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        setTasks(prev => [data, ...prev]);
      });


    setNewTitle("");
    setNewDescription("");
    setNewStatus("pending");
    setAddTaskOpen(false);
    setPendingStatus("pending pendingactive");
    setCompletedStatus("completed");
  }

  //Add task Status state
  const [pendingstatus, setPendingStatus] = useState("pending pendingactive");
  const [completedstatus, setCompletedStatus] = useState("completed");
  function setPending() {
      setNewStatus("pending");
      setPendingStatus("pending pendingactive");
      setCompletedStatus("completed");
  }

  function setCompleted() {
      setNewStatus("completed");
      setCompletedStatus("completed completedactive");
      setPendingStatus("pending");
  }


  const [tasks,setTasks]= useState([]);
  {/*Fetch tasks*/}
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);
  
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  //Search and Filter Tasks
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const filteredTasks = tasks.filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

      let matchStatus = true;

      if (statusFilter === "all") {
        matchStatus = true;
      } else if (task.status === statusFilter) {
        matchStatus = true;
      } else {
        matchStatus = false;
      }

      return matchSearch && matchStatus;
    });

    //Edit task
    const [editStatus, setEditStatus] = useState("pending");
    const [isEditTaskOpen,setEditTaskOpen] = useState(false);
    function setEditPending() {
    setEditStatus("pending");
    setEditPendingStatus("pending pendingactive");
    setEditCompletedStatus("completed");
    }

  function setEditCompleted() {
    setEditStatus("completed");
    setEditCompletedStatus("completed completedactive");
    setEditPendingStatus("pending");
  }
  function CancelEditTask() {
      setEditTaskOpen(false);
      setSelectedTaskId(null);
      setEditTitle("");
      setEditDescription("");
      setEditStatus("pending");
  }
  const [editPendingStatus, setEditPendingStatus] = useState("pending pendingactive");
  const [editCompletedStatus, setEditCompletedStatus] = useState("completed");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function saveEditTask() {
    let status = "pending";

    if (editStatus === "completed") {
      status = "completed";
    } else {
      status = "pending";
    }

    fetch(`http://127.0.0.1:8000/api/tasks/${selectedTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === selectedTaskId ? updatedTask : task
          )
        );

        setEditTaskOpen(false);
        setSelectedTaskId(null);
      });
  }

  //delete task
    function deleteTask(id) {
      const answer = confirm("Delete this task?");

      if (answer === true) {
        fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setTasks((prev) =>
              prev.filter((task) => task.id !== id)
            );
          })
          .catch((err) => console.log(err));
      }
    }

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  const pages = [];
  let start = currentPage;

  if (start === totalPages) {
    start = totalPages - 1;
  }

  if (start < 1) {
    start = 1;
  }

  for (let i = start; i <= start + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      pages.push(i);
    }
  }

  //dark mode
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  let themeClass = "main";

    if (darkMode) {
      themeClass = "main dark";
    }
  return (
    <>
    <div className={themeClass}>
    {/*Add Task*/}
    {
      isAddTaskOpen===true && 
      <div className="addtask-container">
        <span className='mt-8 text-lg font-semibold'>New Task</span>
        <span className='mt-5 font-semibold'>Title</span>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter task title..."/>
        <span className='mt-5 font-semibold'>Description</span>
        <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter task description..." />
        <span className='mt-5 font-semibold'>Status</span>
        <div className="statusbtn">
          <button className={pendingstatus} onClick={setPending}>
            <img src='./pending.png' className='w-[17px] h-[17px]'/>
            <span>Pending</span>
          </button>
          <button className={completedstatus} onClick={setCompleted}>
            <img src='./completed.png' className='w-[17px] h-[17px]'/>
            <span>Completed</span>
          </button>
        </div>
        <div className="cancel-and-create">
          <button className="cancel border border-[#00000014] bg-white text-[#6b7280]" onClick={CancelTask}>Cancel</button>
          <button className="create bg-[#00C4B0] text-white" onClick={createTask}>Create Task</button>
        </div>
      </div>
    }
    <div className={isAddTaskOpen ? "blur-sm" : ""}>

    {/*Edit Task*/}  
    {
      isEditTaskOpen===true && 
      <div className="addtask-container">
        <span className='mt-8 text-lg font-semibold'>Edit Task</span>
        <span className='mt-5 font-semibold'>Title</span>
        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Enter task title..."/>
        <span className='mt-5 font-semibold'>Description</span>
        <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className='!h-[80px]' placeholder="Enter task description..."/>
        <span className='mt-5 font-semibold'>Status</span>
        <div className="statusbtn">
          <button className={editPendingStatus} onClick={setEditPending}>
            <img src="./pending.png" className="w-[17px] h-[17px]" />
            <span>Pending</span>
          </button>

          <button className={editCompletedStatus} onClick={setEditCompleted}>
            <img src="./completed.png" className="w-[17px] h-[17px]" />
            <span>Completed</span>
          </button>
        </div>
        <div className="cancel-and-create">
          <button className="cancel border border-[#00000014] bg-white text-[#6b7280]" onClick={CancelEditTask}>Cancel</button>
          <button className="create bg-[#00C4B0] text-white" onClick={saveEditTask}>Save Changes</button>
        </div>
      </div>
    }
    <div className={isEditTaskOpen ? "blur-sm" : ""}>


    <header>
      <div className="header-container">
      <div className="logo"><img src="logo.png" alt="Logo"/></div>
      <span className="ml-[2.5vw] font-bold">TaskDash</span>
      <button className="dark" onClick={toggleDarkMode}>
        <img src='moon.png' className='h-[20px] w-[20px]'/>
      </button>
      <button className="addtask" onClick={AddTask}>
        <span>+</span><span>Add</span>
      </button>
      </div>
    </header>

    <div className="body-container">
    <div className="tasks-overview">
      <div className="totaltask">
        <div className="img-wrapper bg-gray-100">
          <img src='./tasks.png' className='w-[17px] h-[17px]'/>
        </div>
      <span className='ml-[15px] mt-[10px] text-2xl font-bold'>{tasks.length}</span>
      <span className='ml-[15px] mt-[5px] mb-[10px] text-sm font-semibold text-gray-500'>Total Task/s</span>
      </div>
      <div className="pending">
        <div className="img-wrapper bg-[#FFFBEB]">
          <img src='./pending.png' className='w-[17px] h-[17px]'/>
        </div>
        <span className='ml-[15px] mt-[10px] text-2xl font-bold'>{tasks.filter((task) => task.status === "pending").length}</span>
        <span className='ml-[15px] mt-[5px] mb-[10px] text-sm font-semibold text-gray-500'>Pending</span>
      </div>
      <div className="completed">
        <div className="img-wrapper bg-[#E6FAF7]">
          <img src='./completed.png' className='w-[17px] h-[17px]'/>
        </div>
        <span className='ml-[15px] mt-[10px] text-2xl font-bold'>{tasks.filter((task) => task.status === "completed").length}</span>
        <span className='ml-[15px] mt-[5px] mb-[10px] text-sm font-semibold text-gray-500'>Completed</span>
      </div>
    </div>

    <div className="search-and-filter flex sm:flex-row">
      <div className="search w-[100%] !sm:w-1/2">
        <img src='./search.png'/>
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search tasks..."></input>
      </div>
      <div className="filter w-[100%] !sm:w-1/2">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <div className="task-and-page">
      <span>{filteredTasks.length} task/s</span>
      <span>—</span>
      <span>page {currentPage} of {totalPages}</span>
    </div>
    
    <div className="task-container mt-5">
      
    {/*Tasks */}
    {currentTasks.map((task) => {

      let isCompleted = task.status === "completed";

      let checkIcon = null;
      if (isCompleted) {
        checkIcon = <img src="./check.png" className="w-[13px] h-[13px]" />;
      }

      let checkClass = "check";
      if (isCompleted) {
        checkClass =
          "check bg-[#00C4B0] flex items-center justify-center text-white";
      }

      let titleClass = "mt-3 text-base font-semibold";
      if (isCompleted) {
        titleClass = titleClass + " opacity-50 line-through";
      }

      let descriptionClass = "mt-2.5 text-sm text-gray-500 pr-5";
      if (isCompleted) {
        descriptionClass = descriptionClass + " opacity-50";
      }

      let statusIcon = "./pending.png";
      if (isCompleted) {
        statusIcon = "./completed.png";
      }

      let statusTextClass = "font-semibold text-[#D97706]";
      if (isCompleted) {
        statusTextClass = "font-semibold text-[#00C4B0]";
      }

      let status = "Pending";
      if (isCompleted) {
        status = "Completed";
      }

      let statusClass = "status mt-3 mb-4 text-xs bg-[#FFFBEB]";
      if (isCompleted) {
        statusClass = "status mt-3 mb-4 text-xs bg-[#E6FAF7]";
      }

      return (
        <div className="task" key={task.id}>
          <div className="btn-container">
            <button className={checkClass}>
              {checkIcon}
            </button>
          </div>

          <div className="task-details">
            <div className="task-header">
              <span className={titleClass}>
                {task.title}
              </span>

              <button onClick={() => {
                setEditTaskOpen(true);
                setSelectedTaskId(task.id);
                setEditTitle(task.title);
                setEditDescription(task.description);
                setEditStatus(task.status);
                if (task.status === "pending") {
                  setEditPending();
                } else {
                  setEditCompleted();
                }
              }} 
              className="mt-4 ml-auto w-[17px] h-[17px]">
                <img src="./edit.png" />
              </button>

              <button onClick={() => deleteTask(task.id)} className="mt-4 ml-4 mr-5 w-[17px] h-[17px]">
                <img src="./delete.png" />
              </button>
            </div>

            <span className={descriptionClass}>
              {task.description}
            </span>

            <div className="status-and-date">
              <div className={statusClass}>
                <img src={statusIcon} className="w-[17px] h-[17px]" />
                <span className={statusTextClass}>
                  {status}
                </span>
              </div>

              <span className="date mt-3 mb-4 ml-3 py-[2px] text-xs text-gray-400 font-[JetBrains_Mono,monospace]">
                {formatDate(task.created_at)}
              </span>
            </div>
          </div>
        </div>
      );
    })}

    </div>


    <div className="pagination">
      <button onClick={() => {
        if (currentPage !== 1) {
          setCurrentPage(1);
        }
      }} 
      className={currentPage === 1 ? "doubleprevious opacity-30" : "doubleprevious border border-[#00000014]"}><img src='doubleprevious.png'/></button>

      <button onClick={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }} 
      className={currentPage === 1 ? "previous opacity-30" : "previous border border-[#00000014]"}><img src='previous.png'/></button>

      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : "border border-[#00000014]"}
          onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      
      <button onClick={() => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }}
      className={currentPage === totalPages ? "next opacity-30" : "next border border-[#00000014]" }><img className="scale-x-[-1]" src='previous.png'/></button>

      <button onClick={() => {
        if (currentPage !== totalPages) {
          setCurrentPage(totalPages);
        }
      }}
      className={currentPage === totalPages ? "doublenext opacity-30" : "doublenext border border-[#00000014]"}><img className="scale-x-[-1]" src='doubleprevious.png'/></button>

    </div>

    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default App;
