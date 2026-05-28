import './App.css';
import { useState } from 'react';

function App() {
  const [isAddTaskOpen,setAddTaskOpen] = useState(false);
  function AddTask(){
    setAddTaskOpen(true);
  }
  function CancelTask(){
    setAddTaskOpen(false);
    setPending();
  }

  //Add task Status state
  const [pendingstatus, setPendingStatus] = useState("pending pendingactive");
  const [completedstatus, setCompletedStatus] = useState("completed");
  function setPending() {
    setPendingStatus("pending pendingactive");
    setCompletedStatus("completed");
  }

  function setCompleted() {
    setCompletedStatus("completed completedactive");
    setPendingStatus("pending");
  }

  {/*Sample tasks*/}
  const tasks = [
  {
    id: 1,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "pending",
    date: "May 25, 2026",
  },
  {
    id: 2,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 3,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 4,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 5,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 6,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 7,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 8,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 9,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 10,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  {
    id: 11,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
    {
    id: 12,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
    {
    id: 13,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
    {
    id: 14,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
    {
    id: 15,
    title: "Title",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    status: "completed",
    date: "May 25, 2026",
  },
  ];

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

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

  return (
    <>
    {/*Add Task*/}
    {
      isAddTaskOpen===true && 
      <div className="addtask-container">
        <span className='mt-8 text-lg font-semibold'>New Task</span>
        <span className='mt-5 font-semibold'>Title</span>
        <input placeholder="Enter task title..."></input>
        <span className='mt-5 font-semibold'>Description</span>
        <textarea className='!h-[80px] !align-top !items-start' placeholder="Enter task description..."></textarea>
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
          <button className="create bg-[#00C4B0] text-white">Create Task</button>
        </div>
      </div>
    }
    <div className={isAddTaskOpen ? "blur-sm" : ""}>
      

    <header>
      <div className="header-container">
      <div className="logo"><img src="logo.png" alt="Logo"/></div>
      <span className="ml-[2.5vw] font-bold">TaskDash</span>
      <button className="dark">
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
      <span className='ml-[15px] mt-[10px] text-2xl font-bold'>12</span>
      <span className='ml-[15px] mt-[5px] text-sm font-semibold text-gray-500'>Total Tasks</span>
      </div>
      <div className="pending">
        <div className="img-wrapper bg-[#FFFBEB]">
          <img src='./pending.png' className='w-[17px] h-[17px]'/>
        </div>
        <span className='ml-[15px] mt-[10px] text-2xl font-bold'>12</span>
        <span className='ml-[15px] mt-[5px] text-sm font-semibold text-gray-500'>Pending</span>
      </div>
      <div className="completed">
        <div className="img-wrapper bg-[#E6FAF7]">
          <img src='./completed.png' className='w-[17px] h-[17px]'/>
        </div>
        <span className='ml-[15px] mt-[10px] text-2xl font-bold'>12</span>
        <span className='ml-[15px] mt-[5px] text-sm font-semibold text-gray-500'>Completed</span>
      </div>
    </div>

    <div className="search-and-filter">
      <div className="search">
        <img src='./search.png'/>
        <input placeholder="Search tasks..."></input>
      </div>
      <div className="filter">
        <select>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <div className="task-and-page">
      <span>{tasks.length} tasks</span>
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

              <button className="mt-4 ml-auto w-[17px] h-[17px]">
                <img src="./edit.png" />
              </button>

              <button className="mt-4 ml-4 mr-5 w-[17px] h-[17px]">
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
                {task.date}
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
    </>
  )
}

export default App;
