import NoProject from "./components/NoProject";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import { useState } from 'react';
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    });
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    });
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random()
    };

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    });
  }

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const newTask = {
        projectId: prevState.selectedProjectId,
        id: Math.random(),
        text: text
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      }
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== taskId)
      }
    });
  }

  let selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);
  let content = <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask} 
  onDeleteTask={handleDeleteTask} 
  tasks = {projectsState.tasks.filter(task => task.projectId === projectsState.selectedProjectId)}/>;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject} />
  }


  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar selectedProjectId={projectsState.selectedProjectId} onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} />
        {content}
      </main>
    </>
  );
}

export default App;
