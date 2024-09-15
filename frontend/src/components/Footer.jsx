import React from "react";
import "./Footer.css"
import { FaFacebookF, FaInstagram, FaLinkedinIn   } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../images/logo.png"

function Footer() {
  return (
    <footer class="footer" >
    <div class="container" >
      <div class="row">
        <div class="footer-col">
          <h4>company</h4>
          <div>
          <img src={logo} alt="Logo" style={{ width: "100px" }} />
        </div>
        </div>
        <div class="footer-col">
          <h4>get help</h4>
          <ul>
            <li><a href="/Home">Home</a></li>
            <li><a href="/About">About us</a></li>
            <li><a href="/ContactUS">Contact US</a></li>
            <li><a href="#">Privacy Policies</a></li>
            {/* <li><a href="#">payment options</a></li> */}
          </ul>
        </div>
        <div class="footer-col">
          <h4>quick links</h4>
          <ul>
            <li><a href="/Services">Services</a></li>
            <li><a href="/Projects">Projects</a></li>
            <li><a href="/Career">Career</a></li>
            <li><a href="/CMS Login">CMS Login</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaInstagram  /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
    </div>
 </footer>
  );
}

export default Footer;
