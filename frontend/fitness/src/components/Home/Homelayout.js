import React, { useEffect } from "react";

function Homelayout() {
  useEffect(() => {
    // --- Part 1: Set background images ---
    const elements = document.querySelectorAll('.set-bg');
    elements.forEach(element => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });

    // --- Part 2: Initialize Owl Carousel ---
    // We need to check if jQuery ($) and the owlCarousel plugin are available.
    if (window.$ && window.$.fn.owlCarousel) {
      window.$('.hero-items').owlCarousel({
        loop: true,
        items: 1, // Show one item at a time
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"], // Example navigation arrows
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
      });
    }
  }, []); // The empty dependency array ensures this runs only once after mount.

  return (
    <div>
      {/* Header */}
      <header className="header-section">
        <div className="container-fluid">
          <div className="logo">
            <a href="./index.html">
              <img src="assets/home/img/logo.png" alt="logo" />
            </a>
          </div>
          <div className="top-social">
            <a href="#"><i className="fa fa-pinterest-p"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-pinterest-p"></i></a>
            <a href="#"><i className="fa fa-youtube-play"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </div>
          <div className="container">
            <div className="nav-menu">
              <nav className="mainmenu mobile-menu">
                <ul>
                  <li className="active"><a href="./index.html">Home</a></li>
                  <li><a href="./about-us.html">About us</a></li>
                  <li><a href="./schedule.html">Schedule</a></li>
                  <li><a href="./gallery.html">Gallery</a></li>
                  <li>
                    <a href="./blog.html">Blog</a>
                    <ul className="dropdown">
                      <li><a href="./about-us.html">About Us</a></li>
                      <li><a href="./blog-single.html">Blog Details</a></li>
                    </ul>
                  </li>
                  <li><a href="./contact.html">Contacts</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div id="mobile-menu-wrap"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        {/* This div is the target for Owl Carousel */}
        <div className="hero-items owl-carousel">
          
          <div className="single-hero-item set-bg" data-setbg="assets/home/img/hero-slider/hero-1.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-text">
                    <h2>Join Us Now</h2>
                    <h1>FITNESS & SPORT</h1>
                    <a href="#" className="primary-btn">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="single-hero-item set-bg" data-setbg="assets/home/img/hero-slider/hero-2.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-text">
                    <h2>Join Us Now</h2>
                    <h1>FITNESS & SPORT</h1>
                    <a href="#" className="primary-btn">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="single-hero-item set-bg" data-setbg="assets/home/img/hero-slider/hero-3.jpg">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="hero-text">
                    <h2>Join Us Now</h2>
                    <h1>FITNESS & SPORT</h1>
                    <a href="#" className="primary-btn">Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Homelayout;