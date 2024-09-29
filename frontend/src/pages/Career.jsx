import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Career.css'; 

function Career() {

  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  //internship form data state variables
  const [internshipFormData, setInternshipFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    github: '',
    linkedin: '',
    message: ''
  });

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching Jobs:", error);
    }
  };

  const handleViewMore = (job) => {
    setSelectedJob(job);
    setShowJobDetail(true);
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplyPopup(true);
  };

  const goToNext = () => {
    if (currentIndex < jobs.length - 3) {
      setCurrentIndex(currentIndex + 3);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Formats in "Day, Month Name, Year" format
  };

  const JobDetailPopup = ({ job, onClose }) => {
    return (
      <div className="popup-container">
        <div className="popup-content">
          <h2>{job.title}</h2>
          <div style={{backgroundColor: 'whitesmoke', padding: '10px',borderRadius: '10px', marginBottom: '50px'}}>
          <p><b>Description:</b> {job.description}</p>
          <p><b>Requirements:</b> {job.requirements}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Employment Type:</b> {job.employmentType}</p>
          <p><b>Salary Range:</b> {job.salaryRange}</p>
          <p><b>Benefits:</b> {job.benefits}</p>
          <p><b>Date Posted:</b> {formatDate(job.datePosted)}</p> <br/>
          </div>
          <button className="viewmore-close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  const ApplyNowPopup = ({ job, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      qualifications: '',
      linkedin: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5001/jobApplication', formData);
  
        if (response.status === 200) {
          alert(response.data.message); // Show success message
          onClose(); // Close the popup after submission
        } else {
          alert(response.data.message); // Show error message
        }
      } catch (error) {
        console.error('Error submitting the application:', error);
        alert('Failed to submit the application. Please try again.');
      }
    };
  
    return (
      <div className="popup-container">
        <div className="popup-content">
          <h2>Apply for {job.title}</h2>
          <div style={{
            backgroundColor: 'whitesmoke',
            padding: '10px',
            borderRadius: '10px',
            paddingTop: '50px',
            paddingBottom: '20px',
            maxWidth: '600px',
            margin: '0 auto 50px'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
  
              {/* Email */}
              <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
  
              {/* Phone Number */}
              <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
  
              {/* Qualifications */}
              <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
                <label
                  htmlFor="qualifications"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Qualifications:
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  value={formData.qualifications}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                ></textarea>
              </div>
  
              {/* LinkedIn (optional) */}
              <div style={{ display: 'flex', width: '90%', marginBottom: '20px' }}>
                <label
                  htmlFor="linkedin"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  LinkedIn Profile (optional):
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>
  
              {/* Submit Button */}
              <div style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                <input
                  type="submit"
                  value="Submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100px',
                  }}
                />
              </div>
            </form>
          </div>
          <button className="applynow-close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  //internship form data submisssion logic
  const handleInternshipFormChange = (e) => {
    setInternshipFormData({ ...internshipFormData, [e.target.name]: e.target.value });
  };

  const handleInternshipFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', internshipFormData.name);
    formData.append('email', internshipFormData.email);
    formData.append('phone', internshipFormData.phone);
    formData.append('role', internshipFormData.role);
    formData.append('resume', internshipFormData.resume);
    formData.append('github', internshipFormData.github);
    formData.append('linkedin', internshipFormData.linkedin);
    formData.append('message', internshipFormData.message);
  
    try {
      const response = await axios.post('http://localhost:5001/internshipApplication', internshipFormData);

      if (response.status === 200) {
        alert(response.data.message); // Show success message
        setInternshipFormData({ // Reset the form data
          name: '',
          email: '',
          phone: '',
          role: '',
          resume: '',
          github: '',
          linkedin: '',
          message: ''
        });
      } else {
        alert(response.data.message); // Show error message
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      alert('Failed to submit the application. Please try again.');
    }
  };


  return (
    <>
      <Navbar />
    
      <div className='Banner'>
        <img className="banner-image" src={`${process.env.PUBLIC_URL}/Hire.jpg`} alt="Banner-Background" />
      </div>

      <div className='Company-Desc'>
        <div className='Objectives'>
          <h1> What we Aim? </h1><br/>
          <ol>
            <li> <b>Nurturing Future Leaders</b> </li>
            <p> We aim to provide a platform for interns and new employees to learn, grow, and develop their careers in a hands-on, dynamic environment. </p>

            <li> <b>Fostering Innovation</b> </li>
            <p> We believe in empowering our team members to think creatively and take ownership of projects, encouraging innovative solutions that drive both personal and company-wide success. </p>

            <li> <b>Building a Supportive Culture</b> </li>
            <p> Our objective is to cultivate an inclusive and collaborative workplace where every voice is heard, and team members support each other in achieving shared goals. </p>

            <li> <b>Investing in Growth</b> </li>
            <p> We are dedicated to continuous learning and professional development, helping our employees and interns build a strong foundation for a successful career in the tech industry. </p>
    
            <li> <b> Promoting Work-Life Balance</b></li>
            <p>We strive to maintain a healthy work-life balance by offering flexibility and support, ensuring our team members stay motivated and passionate about their work while also having time for personal well-being.</p>
          </ol>
        </div>
    
        <div className='Benefits'>
          <h1> What we Offer? </h1><br/>
          <ol>
            <li> <b>Career Development</b> </li>
            <p>We prioritize the growth of our employees and interns through mentorship, skill-building workshops, and exposure to real-world projects.</p>

            <li> <b>Hands-On Experience</b> </li>
            <p>Interns at Dev-Tech gain practical experience by working on actual SAAS projects, allowing them to apply their skills and learn new ones in a supportive environment.</p>

            <li> <b>Mentorship and Guidance</b> </li>
            <p>Each intern and new hire will receive mentorship from experienced professionals, ensuring that they have the resources and support needed to succeed.</p>

            <li> <b>Collaborative Work Culture</b> </li>
            <p>We foster a culture of collaboration and teamwork, where every team member is encouraged to contribute ideas, take initiative, and learn from others.</p>

            <li> <b>Path to Full-Time Employment</b> </li>
            <p>For our interns, we provide a clear pathway to transition into full-time roles upon successful completion of the internship.</p> 

            <li> <b>Flexible Work Environment</b> </li>
            <p>We understand the importance of work-life balance and offer flexibility in our work culture to ensure our employees and interns are able to thrive.</p>
          </ol>
        </div>
      </div>

      <div className='JobOfferings'>
        <h1 className="career-title">Job Offerings!!</h1>
        <br/>
        {jobs.length > 0 ? (
          <div className="job-slider">
            <button className="slider-button" onClick={goToPrevious} disabled={currentIndex === 0}>
              &#9664; {/* Left Arrow */}
            </button>
            <div className="job-list">
              {jobs.slice(currentIndex, currentIndex + 3).map(job => (
                <div className="job-card" key={job.id}>
                  <h2 className="job-title">{job.title}</h2>
                  <p className="job-info"> <b>Type:</b> {job.employmentType}</p>
                  <p className="job-info"> <b>Salary:</b> {job.salaryRange}</p>
                  <p className="job-info"> <b>Location:</b> {job.location}</p>
                  <button className= "view-more" onClick={() => handleViewMore(job)}>View More</button>
                  <button className= "apply-now" onClick={() => handleApplyNow(job)}>Apply Now</button>
                </div>
              ))}
            </div>
            <button className="slider-button" onClick={goToNext} disabled={currentIndex + 3 >= jobs.length}>
              &#9654; {/* Right Arrow */}
            </button>
          </div>
        ) : (
          <div className="no-jobs">
            <h2>No job openings at the moment. Please check back later!</h2>
          </div>
        )}
        
        {showJobDetail && (
          <JobDetailPopup job={selectedJob} onClose={() => setShowJobDetail(false)} />
        )}
        {showApplyPopup && (
          <ApplyNowPopup job={selectedJob} onClose={() => setShowApplyPopup(false)} />
        )}
        
      </div>

      <div className='Internship'>
        <b> <p> Join as Intern? </p></b> <br/>
        <div className='InternshipWrapper'>
          <div className='InternImg'> Image Section </div>
          <div className='InternshipForm'>
            <h2>Apply Now!!</h2> <br/>  
            <form onSubmit={handleInternshipFormSubmit}>
              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Full Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={internshipFormData.name}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={internshipFormData.email}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="phone"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={internshipFormData.phone}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="role"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={internshipFormData.role}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                >
                  <option value="">Select a role</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Mobile Developer">Mobile Developer</option>
                </select>
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="github"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  GitHub Profile (optional):
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={internshipFormData.github}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="linkedin"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  LinkedIn Profile (optional):
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={internshipFormData.linkedin}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', width: '100%', marginBottom: '50px' }}>
                <label
                  htmlFor="message"
                  style={{
                    display: 'inline-block',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '10px',
                    fontWeight: 'bold'
                  }}
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={internshipFormData.message}
                  onChange={handleInternshipFormChange}
                  style={{
                    width: 'calc(100% - 160px)',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    resize: 'vertical',
                  }}
                ></textarea>
              </div>

              <div style={{ textAlign: 'center' }}>
                <input
                  type="submit"
                  value="Submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '150px',
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Career;
