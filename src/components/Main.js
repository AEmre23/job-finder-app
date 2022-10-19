import React, { useState, useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ? Contexts
import { JobsContext } from '../context/JobsContext'
import { LoginContext } from '../context/LoginContext'
import { ThemeContext } from "../context/ThemeContext";
// ! Components
import FilterSection from "./Main_Components/FilterSection";


const Main = () => {
  const { jobs, appliedJobs, setAppliedJobs } = useContext(JobsContext)
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const [theme, setTheme] = useContext(ThemeContext)
  
  const [filtered, setFiltered] = useState([])
  const [cloneArray, setCloneArray] = useState(jobs)
  // While filtering; if you add filter, filterAdder increases and useEffect with filterAdder working
  const [filterAdder, detectFilterAdder] = useState(0)
  // If you remove a filter, same logic above works
  const [filterDecreaser, detectFilterDecreaser] = useState(0)

  useEffect(() => {
    // Tailwind dark theme changer code block, it adds <html> element a 'dark' class.
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setTheme(true)
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme]);

  useEffect(() => {
    // When a new filter added, this works
    for (let a = 0; a < filtered.length; a++) {
      setCloneArray(cloneArray.filter((job) =>
        job.languages.includes(filtered[a]) || job.tools.includes(filtered[a]) || job.level == filtered[a] || job.role == filtered[a]
      ))
    }
  }, [filterAdder]);

  useEffect(() => {
    // when an existing filter removed, this works
    let newClone = jobs
    for (let a = 0; a < filtered.length; a++) {
      newClone = newClone.filter((each) =>
        each.languages.includes(filtered[a]) || each.tools.includes(filtered[a]) || each.level == filtered[a] || each.role == filtered[a]
      )}
    if (filtered == 0) setCloneArray(jobs)
    else setCloneArray(newClone)
  }, [filterDecreaser]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once:true,
    });
    AOS.refresh();
  }, []);

  const JobApplier = (e) => {
    let applies = document.querySelectorAll('[name="apply"]')
    applies.forEach((each) => {
      each.style.display='none'
    })
    // makes the text visible that give you info about u didnt login or you applied the job
    e.target.nextElementSibling.style.display = 'block'
    // I added id to name attribute to get id with click to avoid adding same jobs to applied jobs array
    let index = e.target.getAttribute('name') - 1 
    if (loggedIn && !appliedJobs.includes(jobs[index])) setAppliedJobs(prevApply => [...prevApply, jobs[index]])
  }

  const handleFilter = (e) => {
    // This makes add filters to the top section and makes useEffect with 'filterAdder' works
    let newFilter = e.target.value
    if (filtered.indexOf(newFilter) == -1) setFiltered([...filtered, newFilter])
    detectFilterAdder(preValue=> preValue + 1)
  }

  const StickyJobCounter = () => {
    if (filtered.length >= 1) {
      if(cloneArray.length == 1) return <div>There is only 1 job matching your criteria</div>
      else return <div>There are {cloneArray.length} jobs matching your criteria</div>
    }
    else return <div>There are {jobs.length} job postings in total </div>
}

  return (
    <div className="bg-background dark:bg-headerbg pt-3 min-h-[calc(100vh_-_8rem)] overflow-clip">
      <div className="opacity-80 transition-all cursor-default sticky z-10 left-0 p-3 rounded-tr-lg rounded-br-lg top-3 bg-primary text-white w-max">
        <StickyJobCounter />
      </div>
      <div className="w-full flex flex-col mt-12 pb-8 gap-6 sm:gap-12 z-1 justify-center items-center text-center">
        {filtered.length > 0 &&
        <FilterSection 
          filtered={filtered}
          setFiltered={setFiltered}
          setCloneArray={setCloneArray}
          detectFilterDecreaser={detectFilterDecreaser}
        />
        }
        {cloneArray.map((job, index) => (
          <div data-aos={`${index % 2 == 0 ? "fade-up-left" : "fade-up-right" }`} key={job.id} className={` ${job.featured ? 'border-l-4 border-primary dark:border-white' : ''} flex justify-center items-center w-4/5 px-7 py-7 bg-white transition-all dark:bg-slate-500 shadow-[0px_10px_15px_-7px_rgb(93_164_164_/_50%)] dark:shadow-xlg dark:shadow-black sm:flex-col`}>
            <div className="sm:relative flex w-2/5 justify-start gap-6 sm:w-full sm:pb-3 sm:border-b-2 sm:mb-3">
              <div className="sm:absolute sm:-top-12 sm:left-0">
                <img className="sm:w-12 sm:h-12" src={job.logo} alt={job.id} />
              </div>
              <div className="sm:pt-2 sm:gap-2 cursor-default flex flex-col gap-1 text-left justify-around items-left">
                <div className="flex gap-1 items-center">
                  <div className="text-sm font-bold sm:mr-4">{job.company}</div>
                  {job.new &&
                  <div className="bg-primary text-white p-1 px-2 text-xs rounded-xl">NEW!</div>
                  }
                  {job.featured &&
                    <div className="bg-black text-white p-1 px-2 text-xs rounded-xl">FEATURED</div>
                  }
                </div>
                <div className="text-black font-bold text-xl hover:text-primary cursor-pointer transition-all sm:text-sm">{job.position}</div>
                <div className="group text-secondary dark:text-black text-sm">
                  <span className="mr-2">{job.postedAt} ~</span>
                  <span className="mr-2">{job.contract} ~</span>
                  <span className="">{job.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 w-2/5 justify-end sm:w-full sm:justify-start sm:pb-3 sm:border-b-2 sm:mb-3">                                   {/* Skills */}
              <button onClick={handleFilter} value={job.role} className="hover:bg-primary hover:text-white cursor-pointer transition-all p-2 text-sm bg-background brightness-95 rounded-md font-bold">{job.role}</button>
              <button onClick={handleFilter} value={job.level} className="hover:bg-primary hover:text-white cursor-pointer transition-all p-2 text-sm bg-background brightness-95 rounded-md font-bold">{job.level}</button>
              {job.tools.map((tool, index) => (
                <button onClick={handleFilter} value={tool} key={index} className="hover:bg-primary hover:text-white cursor-pointer transition-all p-2 text-sm bg-background brightness-95 rounded-md font-bold">{tool}</button>
              ))}
              {job.languages.map((lang, index) => (
                <button onClick={handleFilter} value={lang} key={index} className="hover:bg-primary hover:text-white cursor-pointer transition-all p-2 text-sm bg-background brightness-95 rounded-md font-bold">{lang}</button>
              ))}
            </div>
            <div className="cursor-default flex flex-col items-center w-1/5 sm:w-full sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-1">Apply for this Job</div>
              <div className="relative w-min">
                <button name={job.id} onClick={JobApplier} className="transition-all bg-black text-white active:scale-110 p-1 hover:bg-cyan-800 px-3 rounded-md active:scale-110 disabled:brightness-50 disabled:active:scale-100">Apply</button>
                {loggedIn ? <div name='apply' className="absolute -bottom-8 left-1 sm:-bottom-6 sm:left-1  hidden text-green-500">Applied</div> : <div name='apply' className="absolute -bottom-8 -left-14 sm:-bottom-4 sm:-left-48 hidden text-red-500 w-max">You have to login to Apply</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main