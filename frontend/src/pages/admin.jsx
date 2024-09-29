//admin.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    employmentType: 'Full-Time',
    salaryRange: '',
    benefits: '',
    status: 'Open',
  });
  const [editingJob, setEditingJob] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);


  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/jobs');
      setJobs(response.data);
    } catch (error) {
      setError('Error fetching jobs');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await axios.put(`http://localhost:5001/jobs/${editingJob._id}`, formData);
      } else {
        await axios.post('http://localhost:5001/jobs', formData);
      }
      setSuccess(editingJob ? 'Job updated successfully' : 'Job created successfully');
      resetForm();
      fetchJobs();
    } catch (error) {
      setError('Failed to submit the job');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      employmentType: 'Full-Time',
      salaryRange: '',
      benefits: '',
      status: 'Open',
    });
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements.join(', '),
      location: job.location.join(', '),
      employmentType: job.employmentType,
      salaryRange: job.salaryRange,
      benefits: job.benefits.join(', '),
      status: job.status,
    });
  };

  const handleDelete = async (job) => {
    try {
      await axios.delete(`http://localhost:5001/jobs/${job._id}`);
      setSuccess('Job deleted successfully');
      fetchJobs();
    } catch (error) {
      setError('Failed to delete the job');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="admin-container">
      {/* <h1>Admin Panel</h1> */}
      <div className="admin-job-management">
        <div className="admin-job-form">
          <h2>{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Requirements (comma-separated)</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Location (comma-separated)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>
            <div>
              <label>Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Benefits (comma-separated)</label>
              <input
                type="text"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <button type="submit">{editingJob ? 'Update Job' : 'Create Job'}</button>
          </form>

          {error && <div className="admin-error">{error}</div>}
          {success && <div className="admin-success">{success}</div>}
        </div>

        <div className="admin-job-list">
          <h2>Job Listings</h2>
          {currentJobs.map((job) => (
            <div className="admin-job-item" key={job._id}>
              <h3 style={{fontWeight: 'bold'}}>{job.title}</h3>
              <p>{job.description}</p>
              <p><b>Requirements:</b> {job.requirements.join(', ')}</p>
              <p><b>Location:</b> {job.location.join(', ')}</p>
              <p><b>Employment Type:</b> {job.employmentType}</p>
              <p><b>Salary Range:</b> {job.salaryRange}</p>
              <p><b>Benefits:</b> {job.benefits.join(', ')}</p>
              <p><b>Status:</b> {job.status}</p>
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job)}>Delete</button>
            </div>
          ))}
          <div className="admin-pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            Back
          </button>
          
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;