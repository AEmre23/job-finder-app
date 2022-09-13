import React, { useState, createContext } from "react";
import jsonData from '../data.json'

export const JobsContext = createContext();

export const JobsProvider = (props) => {
  const [jobs, setJobs] = useState(jsonData)
  const [appliedJobs,setAppliedJobs] = useState([])
  let username = localStorage.getItem('username')
  return (
    <JobsContext.Provider value={{
      jobs,
      setJobs,
      appliedJobs,
      setAppliedJobs,
      username
    }}>
      {props.children}
    </JobsContext.Provider>
  )
}
