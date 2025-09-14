import { Link, Outlet } from 'react-router-dom'
const UserLayout = () => {
  return (
   <div className="container-scroller">

      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a className="navbar-brand brand-logo" href=""><img src="/admin/assets/assets/images/logo.svg" alt="logo" style={{height:'100px'}} /></a>
          <a className="navbar-brand brand-logo-mini" href=""><img src="/admin/assets/assets/images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu"></span>
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects"/>
              </div>
            </form>
          </div>
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              <a class="nav-link" id="profileDropdown" href="#" >
                <div class="nav-profile-text">
                  <p class="mb-1 text-black">Admin</p>
                </div>
              </a>
            </li>
            
           
            <li class="nav-item nav-logout d-none d-lg-block">
              <a class="nav-link" href="#">
                <div class="nav-profile-text">
                  <p class="mb-1 text-black">Logout</p>
                </div>
              </a>
            </li>
            
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <div className="container-fluid page-body-wrapper">

      <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
           
            <li className="nav-item">
              <Link to=""className="nav-link">
                <span className="menu-title">Dashboard</span>
                <i className="mdi mdi-home menu-icon"></i>
              </Link>
              
            </li>
           
            
       
            
            
          </ul>
        </nav>
    {/* <div classNameName='container-fluid page-body-wrapper'>
        <main classNameName='main-panel'>
            <Outlet/>
        </main>
    </div> */}
 <div className="main-panel d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="content-wrapper flex-grow-1">
            <Outlet />
          </div>



     <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2023 <a href="https://www.bootstrapdash.com/" target="_blank" rel="noreferrer">BootstrapDash</a>. All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>

  )
}

export default UserLayout