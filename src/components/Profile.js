import React,{useContext,useRef,useEffect} from 'react'
import { JobsContext } from '../context/JobsContext'
import { LoginContext } from '../context/LoginContext';
import { ThemeContext } from "../context/ThemeContext";
import {Link} from 'react-router-dom'

const Profile = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const { appliedJobs, setAppliedJobs, username } = useContext(JobsContext)
  const nameInput = useRef()
  const [theme, setTheme] = useContext(ThemeContext)

    useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  const loginHandler = (e) => {
    e.preventDefault()
    let name = e.target[0].value
    let setName = name[0].toUpperCase() + name.slice(1)
    localStorage.setItem('username', setName)
    setLoggedIn(true)
    window.location.reload()
  }
  
  const cancelApplication = (e) => {
    let canceled= e.target.getAttribute('name')
    setAppliedJobs(appliedJobs.filter((p,index)=> index != canceled))
  }

  return (
    <div className="min-h-[calc(100vh_-_8rem)] bg-background dark:bg-headerbg dark:text-white pt-3 transition-all">
        {loggedIn &&
        <div className="w-full flex flex-col mt-12 pb-8 gap-6 sm:gap-12 z-1 justify-center items-center text-center ">
          {appliedJobs.length > 0 ? <div className="text-xl">You applied for a total of <span className="text-secondary text-2xl dark:text-yellow-100 "> {appliedJobs.length} </span> jobs </div>
          : <div className="text-xl">You dont have any application yet, <span className="text-secondary dark:text-yellow-100"> {username}</span>.<br/>You can go back <Link className="text-cyan-400 underline" to='/'>Home</Link></div>
          }
          {appliedJobs.map((job,index) => (  
          <div key={job.id} className="flex justify-between items-center w-3/5 px-7 py-5 bg-slate-100 shadow-[0px_10px_15px_-7px_rgb(93_164_164_/_50%)] dark:shadow-xlg dark:shadow-black dark:bg-slate-500 sm:w-4/5 sm:flex-col">
            <div className="sm:relative flex w-2/5 justify-start gap-6 sm:w-full sm:pb-3 sm:border-b-2 sm:mb-3">
              <div className="sm:absolute sm:-top-12 sm:left-0">
                <img className="sm:w-12 sm:h-12" src={job.logo} alt={job.id} />
              </div>
              <div className="sm:pt-2 sm:gap-2 cursor-default flex flex-col gap-1 text-left justify-around items-left">
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-bold sm:mr-4">{job.company}</div>
                </div>
                <div className="text-black font-bold text-xl hover:text-primary cursor-pointer transition-all sm:text-sm">{job.position}</div>
                <div className="group text-secondary text-sm dark:text-black">
                  <span className="mr-2">{job.postedAt} ~</span>
                  <span className="mr-2">{job.contract} ~</span>
                  <span className="">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="cursor-default flex flex-col items-center w-1/5 sm:w-full sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-1 text-red-400">Cancel Application</div>
              <div className="relative w-min">
                <button onClick={cancelApplication} name={index} className="transition-all bg-black text-white active:scale-110 p-1 hover:bg-cyan-800 px-3 rounded-md dark:bg-white dark:text-black ">Cancel</button>
              </div>
            </div>
          </div>
        ))}
        </div>
        || // If you are not logged in
        <div className="flex justify-center items-center h-[calc(100vh_-_140px)] dark:text-primary">
          <form onSubmit={loginHandler} className="p-2 bg-slate-300 rounded-lg shadow-xl h-56 w-96 sm:w-80 flex flex-col justify-around items-center">
            <div className="text-3xl border-b-2 pb-4 w-80 text-center">Log in</div>
            <div>Please Enter Your Name</div>
            <div className="flex gap-2">
              <input ref={nameInput} autoFocus placeholder="Name" className="text-center p-1 rounded-xl focus:outline-dashed hover:outline-double " type='text' />
              <button className="p-1 active:outline-double bg-slate-800 rounded-lg hover:bg-slate-100 transition-all hover:outline-dotted">Submit</button>
            </div>
          </form>
        </div>
        }
    </div>
  )
}

export default Profile
