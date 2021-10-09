import React, {useEffect, useState} from "react";

import Header from "./Components/Header";

import api from "./services/Api";

import './App.css';



function App(){
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response =>{
      setProjects(response.data) 
    } );
  },[])
  async function HandleAddProject() {
    //setProjects([...projects, `Novo Projeto ${(Date.now())}`])

   const response = await api.post('projects',{
      title: `novo projeto ${(Date.now())}`,
      owner: "Joao Neiva"
    });

    const project = response.data;

    setProjects([...projects, project]);
    
  }
  return(
    <>
      
      <Header title="Projects" />
      
      

      <ul>
        {projects.map( project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={HandleAddProject} > adiconar projeto</button>
    </>
  )  

  
}

export default App;