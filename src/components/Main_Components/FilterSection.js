import React,{ useContext } from 'react'
import { JobsContext } from '../../context/JobsContext'
import removeIcon from '../../images/icon-remove.svg'

const FilterSection = ({filtered,setFiltered,setCloneArray,detectFilterDecreaser}) => {
  const {jobs} = useContext(JobsContext)
  const handleClearAll = () => {
  setFiltered([])
  setCloneArray(jobs)
  }

  const handleClear = (e) => {
    let innerText = e.currentTarget.previousElementSibling.innerText
    setFiltered(filtered.filter((item) => item !== innerText))
    detectFilterDecreaser(preValue=> preValue + 1)
  }

  return (
    <div className="transition-all rounded-lg w-4/5 p-6 sm:p-2 bg-white dark:bg-slate-400 dark:text-rose-500 py-6 shadow-lg flex justify-between items-center">
      <div className="flex flex-wrap gap-3 sm:gap-2">
        {filtered.map((filteredJob,index) =>
        <div name={index}  key={index} className="cursor-default flex justify-center items-center">
          <div className="bg-background py-1 px-2 brightness-95">{filteredJob}</div>
          <div id={index} onClick={handleClear}><img className="bg-primary p-2 cursor-pointer transition-all dark:bg-darkSecondary dark:hover:bg-slate-300 hover:bg-darkSecondary" src={removeIcon} alt='remove-icon'/></div>
        </div>
        )}    
      </div>
      <button onClick={handleClearAll} className="hover:underline text-lg">Clear</button>  
    </div>
  )
}
export default FilterSection