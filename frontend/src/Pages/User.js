import React, { useState } from 'react';

export function User() {
  const [showForm, setAddProjectShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showProjects, setShowProjects] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAddProject = () => {
    setAddProjectShowForm(true);
    setShowProjects(false);
    setSelectedProject(null); 
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    // Logic for submitting the form and adding the project
    const token = localStorage.getItem('token');

    // Perform API call to the users/add-project route to add a new project
    fetch('http://localhost:3000/users/add-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name:projectName}),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data);
        // Clear the form fields
        setProjectName('');
        setAddProjectShowForm(false);
      })
      .catch((error) => {
        // Handle any errors that occurred during the API call
        console.error(error);
      });
  };
  const handleViewProjects = () => {
    // Fetch user's projects from the server
    setAddProjectShowForm(false);
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/users/projects',{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setShowProjects(true); // Update the projects state with the fetched data
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleViewProjectDetails = () => {
    setAddProjectShowForm(true);
  };
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };
  return (
    <div>
      <h1 className="text-center">Welcome to User Page</h1>
      <div className="User-form-container">
        <nav className="d-flex justify-content-center mt-3">
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="btn btn-primary" onClick={handleAddProject}>
                Add Project
              </button>
            </li>
            <li className="list-inline-item">
              <button className="btn btn-primary" onClick={handleViewProjects}>
                View Projects
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {showForm && (
        <div className="Add-user-form-container">
          <form onSubmit={handleAddProjectSubmit}>
            <div className="form-group mt-3">
              <label>Project Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-3">
              <button type="submit" className="btn btn-primary">
                Add Project
              </button>
            </div>
          </form>
        </div>
        )}
    {/* Table to display user's projects */}
    {showProjects && (
      <div className="User-form-container">
      <h3>Projects</h3>
      {projects.projects.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Project Name</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {projects.projects.map((project) => (
              <tr key={project.idProjects} onClick={() => handleProjectClick(project)} className="clickable-row">
                <td>{project.idProjects}</td>
                <td>{project.name}</td>
                <td>{project.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )}
    {selectedProject && (
        <div>
          <h3>Logs for Project: {selectedProject.name}</h3>
          {selectedProject.Logs.length > 0 ? (
            <table className="table mt-3">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Severity Level</th>
                  <th>Info</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {selectedProject.Logs.map((log) => (
                  <tr key={log.idLogs}>
                    <td>{log.idLogs}</td>
                    <td>{log.severity_level}</td>
                    <td>{log.info}</td>
                    <td>{log.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No logs available for this project.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
