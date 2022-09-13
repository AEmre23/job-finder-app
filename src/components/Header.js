import React, { useContext,useEffect } from 'react'
import { JobsContext } from '../context/JobsContext'
import { LoginContext } from '../context/LoginContext';
import { ThemeContext } from '../context/ThemeContext';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import {MdOutlineLightMode} from 'react-icons/md'
import {MdOutlineNightlight} from 'react-icons/md'

const Header = () => {
  const { appliedJobs,username } = useContext(JobsContext)
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [theme,setTheme] = useContext(ThemeContext)

  useEffect(() => {
    if(localStorage.getItem('username') != null) setLoggedIn(true)
  }, []);

  const Logout = () => {
    localStorage.removeItem('username')
    setLoggedIn(false)
  }
  
  const themeChanger = () => {
    setTheme(!theme)
    if (theme == false) localStorage.setItem('theme', 'dark')
    else localStorage.removeItem('theme')
  }

  return (
    <div className="bg-desktop dark:brightness-90 h-32 opacity-75 flex justify-between items-center text-white px-16  sm:px-2">
      <div className="relative">
        <Link to='/'>
          <div className=" text-slate-100 hover:text-white p-2 bg-white bg-opacity-50 backdrop-blur-md rounded drop-shadow-lg text-3xl hover:scale-110 transition-all">
            JobFinder
          </div>
        </Link>
        {theme ? <MdOutlineNightlight onClick={themeChanger} className="cursor-pointer hover:scale-90 absolute -bottom-8 left-0 w-6 h-6" />
          : <MdOutlineLightMode onClick={themeChanger} className="cursor-pointer hover:scale-90 absolute -bottom-8 left-0 w-6 h-6" /> 
        }
      </div>
      <div className="flex justify-around w-64 sm:justify-end sm:gap-2 ">
        {loggedIn &&
          <div className="items-end text-right gap-1 flex flex-col justify-center sm:items-end">
            <div className="text-l">Welcome {username}</div>
            <div className="text-sm">Applied jobs <span className="w-40 h-32 p-1 rounded-[50%] text-blue-400 text-lg bg-white">{appliedJobs.length}</span></div>
            <button onClick={Logout} className="text-s bg-slate-400 text-center w-16 rounded-md shadow-md hover:bg-slate-50 hover:text-slate-400 transition-all">Logout</button>
          </div>
          ||
          <div className="text-right flex flex-col justify-center sm:items-start">
            <Link to='profile'>
              <button className="text-xl bg-slate-400 px-2 py-1 rounded-md shadow-md hover:bg-slate-50 hover:text-slate-400 transition-all">Login</button>
            </Link>
          </div> 
        }
        <div className="w-16 h-16">
          <Link to='profile'>
            <CgProfile className="transition-all w-16 h-16 sm:w-14 sm:h-14 hover:scale-105 hover:rounded-[50%] hover:shadow-[0_0_0_2px_aqua]" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
