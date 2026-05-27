import './App.css';

function App() {

  return (
    <>
    <header>
      <div className="header-container">
      <div className="logo"><img src="logo.png" alt="Logo"/></div>
      <span className="ml-[2.5vw] font-bold">TaskDash</span>
      <button className="dark">
        <img src='moon.png' className='h-[20px] w-[20px]'/>
      </button>
      <button className="addtask"><span>+</span><span>Add</span></button>
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
      <span>10 tasks</span>
      <span>—</span>
      <span>page 1 of 3</span>
    </div>
    
    <div className="task-container mt-5">

      <div className="task">
        <div className="btn-container"><button className="check"></button>
        </div>
        <div className="task-details">
          <div className="task-header">
            <span className='mt-3 text-base font-semibold'>Title</span>
            <button className='mt-4 ml-auto w-[17px] h-[17px] '>
              <img src='./edit.png' />
            </button>
            <button className='mt-4 ml-4 mr-5 w-[17px] h-[17px]'>
              <img src='./delete.png'/>
            </button>
          </div>
          <span className='mt-2.5 text-sm text-gray-500 pr-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <div className="status-and-date">
            <div className="status mt-3 mb-4 text-xs bg-[#FFFBEB]"><img src='./pending.png'/><span className="font-semibold text-[#D97706]">Pending</span></div>
            <span className="date mt-3 mb-4 ml-3  py-[2px] text-xs text-gray-400 font-[JetBrains_Mono,monospace]">May 25, 2026</span>
          </div>
        </div>
      </div>  

      <div className="task">
        <div className="btn-container"><button className="check bg-[#00C4B0] flex items-center justify-center text-white"><img src='./check.png' className='w-[13px] h-[13px]'/></button>
        </div>
        <div className="task-details">
          <span className='mt-3 text-base font-semibold opacity-50 line-through'>Title</span>
          <span className='mt-2.5 text-sm text-gray-500 pr-5 opacity-50'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
          <div className="status-and-date">
            <div className="status mt-3 mb-4 text-xs bg-[#E6FAF7]"><img src='./completed.png'/><span className="font-semibold text-[#00C4B0]">Completed</span></div>
            <span className="date mt-3 mb-4 ml-3  py-[2px] text-xs text-gray-400 font-[JetBrains_Mono,monospace]">May 25, 2026</span>
          </div>
        </div>
      </div>  

    </div>
    <div className="pagination">
      <button className="doubleprevious opacity-30"><img src='doubleprevious.png'/></button>
      <button className="previous opacity-30"><img src='previous.png'/></button>
      <button className="active">1</button>
      <button className="border border-[#00000014]">2</button>
      <button className='border border-[#00000014]'>3</button>
      <button className="next border border-[#00000014]"><img className="scale-x-[-1]" src='previous.png'/></button>
      <button className="doublenext border border-[#00000014]"><img className="scale-x-[-1]" src='doubleprevious.png'/></button>
    </div>
    </div>
    </>
  )
}

export default App;
