import React from 'react';
import "./footer.css"
const Footer = () => {
  return (
    <div className="footer">
        <p><h4>Todo List &copy; Harsh Saxena</h4></p>
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="20" height="20" />
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="YouTube" width="20" height="20" />
        </a>
    </div>
  )
}

export default Footer;