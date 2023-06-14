import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


export function User() {
  const [showForm, setAddProjectShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedLogs, setSortedLogs] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddProject = () => {
    setAddProjectShowForm(true);
    setShowProjects(false);
    setSelectedProject(null);
  };
  

  const exportToExcel = () => {
    const logsData = sortedLogs.map((log) => ({
      'Log ID': log.idLogs,
      'Severity Level': log.severity_level,
      'Created At': log.created_at,
      'Message': log.info
    }));

    const worksheet = XLSX.utils.json_to_sheet(logsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'logs.xlsx');
  };

  const handleAddProjectSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/users/add-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: projectName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjectName('');
        setAddProjectShowForm(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleViewProjects = () => {
    setAddProjectShowForm(false);
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/users/projects', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        setShowProjects(true);
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
    setSortedLogs(project.Logs);
  };

  const handleSortLogs = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortOrder('asc');
      setSortColumn(column);
    }
  };

  const sortLogs = () => {
    let sortedData = [...sortedLogs];

    if (sortColumn === 'severity_level') {
      sortedData.sort((a, b) => {
        const aValue = a.severity_level.toLowerCase();
        const bValue = b.severity_level.toLowerCase();
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      });
    }

    if (sortColumn === 'createdAt') {
      sortedData.sort((a, b) => {
        const aValue = new Date(a.createdAt);
        const bValue = new Date(b.createdAt);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    if (sortColumn === 'idLogs') {
      sortedData.sort((a, b) => {
        const aValue = parseInt(a.idLogs);
        const bValue = parseInt(b.idLogs);
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }

    setSortedLogs(sortedData);
  };

  useEffect(() => {
    sortLogs();
  }, [sortOrder, sortColumn]);

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
      {showProjects && (
        <div className="User-form-container">
          <h3>Projects</h3>
          {projects.projects.length > 0 && (
            <table className="table mt-3 center">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Project Name</th>
                </tr>
              </thead>
              <tbody>
                {projects.projects.map((project) => (
                  <tr
                    key={project.idProjects}
                    onClick={() => handleProjectClick(project)}
                    className="clickable-row"
                  >
                    <td>{project.idProjects}</td>
                    <td>{project.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      {selectedProject && (
        <div>
          <div className="User-form-container">
            <input
              type="text"
              id="myInput"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button className="btn btn-primary float-right" onClick={exportToExcel}>
                Export to Excel
              </button>
          <div>
            <h3>Logs for Project: {selectedProject.name}</h3>
            {sortedLogs.length > 0 ? (
              <table className="table mt-3 center">
                <thead>
                  <tr>
                    <th onClick={() => handleSortLogs('idLogs')}>Log ID</th>
                    <th onClick={() => handleSortLogs('severity_level')}>Severity Level</th>
                    <th>Info</th>
                    <th onClick={() => handleSortLogs('createdAt')}>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLogs
                    .filter((log) => log.info.toUpperCase().includes(searchQuery.toUpperCase()))
                    .map((log) => (
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
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
