import React, { useState } from "react";
import "./ContactBody.css";

const ContactBody = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <div className="container">
      <div className="col-md-12">
        <div className="wrapper">
          <div className="row no-gutters">
            <div className="col-lg-6">
              <div className="contact-wrap w-100 p-md-5 p-4">
                <h3>Contact us</h3>
                <p className="mb-4">
                  We're open for any suggestion or just to have a chat
                </p>
                <div id="form-message-warning" className="mb-4"></div>
                {/* <div id="form-message-success" className="mb-4">
                  Your message was sent, thank you!
                </div> */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="text">
                        <p>
                          
                          <span>Phone:</span> + 977 9867009290
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="text">
                        <p>
                          <span>Email:</span>devtech@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="dbox w-100 d-flex align-items-start">
                      <div className="text">
                        <p>
                        <span>Address:</span> Kathmandu, Nepal
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  method="POST"
                  id="contactForm"
                  name="contactForm"
                  className="contactForm"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols="30"
                          rows="4"
                          placeholder="Create a message here"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <button type="submit" className="btn btn-dark">Send Message</button>
                    </div>
                  </div>
                </form>
                <div className="w-100 social-media mt-5">
                  <h3>Follow us here</h3>
                  <p>
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                    <a href="#">Dribbble</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-stretch">
              <div
                className="info-wrap w-100 p-5 img"
                style={{ backgroundImage: "url(images/img.jpg)" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBody;
