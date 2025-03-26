import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div 
        className="app-menu" 
        style={{ 
          boxShadow: "rgba(0, 0, 0, 0.75) 0px 0px 4px -1px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px"
        }}
      >

        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="logo">
            <a 
              href="" 
              style={{
                fontSize: "30px",
                textDecoration: "none",
                color: "#000",
                fontWeight: "700"
              }}
            >
              Power <span style={{ color: "#c11325" }}>Gym</span>
            </a>
          </div>
        </div>
        
        {/* Menu */}
        <div className="scrollbar">
          <ul className="menu" style={{ display: "flex", listStyle: "none", padding: 0 }}>
            <li className="menu-item">
              <a href="dashboard" className="menu-link">
                <span className="menu-icon">
                  <i data-feather="airplay"></i>
                </span>
                <span className="menu-text"> Dashboards </span>
              </a>
            </li>

            <li className="menu-item">
              <a href="#menuApps" data-bs-toggle="collapse" className="menu-link">
                <span className="menu-icon">
                  <i data-feather="aperture"></i>
                </span>
                <span className="menu-text"> Pages </span>
                <span className="menu-arrow"></span>
              </a>
              <div className="collapse" id="menuApps">
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a href="complaintsssignreferencenumber" className="menu-link">
                      <span className="menu-icon">
                        <i data-feather="users"></i>
                      </span>
                      <span className="menu-text"> Schedult Management </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>


            <li className="menu-item">
              <a href="#menuExpages" data-bs-toggle="collapse" className="menu-link">
                <span className="menu-icon">
                  <i data-feather="package"></i>
                </span>
                <span className="menu-text"> Settings </span>
                <span className="menu-arrow"></span>
              </a>
              <div className="collapse" id="menuExpages">
                <ul className="sub-menu">
                  <li className="menu-item">
                    <a href="widgets.html" className="menu-link">
                      <span className="menu-icon">
                        <i data-feather="gift"></i>
                      </span>
                      <span className="menu-text"> Change Password </span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

          <div className="flex items-center space-x-8">
          {/* Profile Image - Using a random user image from picsum.photos */}
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                marginRight: "10px"
              }}
            />
    
            {/* Logout Button */}
            <button 
              className="btn btn-secondary text-white rounded-md"
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </div>
      </div>
    );
  }
}