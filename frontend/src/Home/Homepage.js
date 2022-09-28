import React from "react";
import Helmet from "react-helmet";
import testimonial1 from "./images/testimonials/1.png";
import testimonial2 from "./images/testimonials/2.png";
import testimonial3 from "./images/testimonials/3.png";


export default function Homepage() {
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <title>MediBook SG</title>

        <link rel="stylesheet" href="plugins/bootstrap/bootstrap.min.css" />
        <link rel="stylesheet" href="plugins/slick/slick.css" />
        <link rel="stylesheet" href="plugins/slick/slick-theme.css" />
        <link rel="stylesheet" href="plugins/fancybox/jquery.fancybox.min.css" />
        <link rel="stylesheet" href="plugins/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="plugins/animation/animate.min.css" />
        <link rel="stylesheet" href="plugins/jquery-ui/jquery-ui.css" />
        <link rel="stylesheet" href="plugins/timePicker/timePicker.css" />
        
        <link href="css/style.css" rel="stylesheet" />
        
        <link rel="icon" href="images/logo.png" type="image/x-icon" width="100" height="100"></link>
      </Helmet>
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="top-left text-center text-md-left">
                <h6>Opening Hours : Sunday to Saturday - 8am to 7pm</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="header-uper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-3">
              <div className="logo">
                <h1>MediBook Singapore</h1>
              </div>
            </div>
            <div className="col-xl-8 col-lg-9">
              <div className="right-side">
                <ul className="contact-info pl-0 mb-4 mb-md-0">
                  <li className="item text-left">
                    <div className="icon-box">
                      <i className="far fa-envelope"></i>
                    </div>
                    <strong>Email</strong>
                    <br />
                    <a href="mailto:info@medic.com">
                      <span>info@medibook.com.sg</span>
                    </a>
                  </li>
                  <li className="item text-left">
                    <div className="icon-box">
                      <i className="fas fa-phone"></i>
                    </div>
                    <strong>Call Now</strong>
                    <br />
                    <span>+ 65 9179 - 9882</span>
                  </li>
                </ul>
                <div className="link-btn text-center text-lg-right">
                  <a href="login/" className="btn-style-one">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarLinks">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="index.html">Home</a>
              </li>
              <li className="nav-item @@about">
                <a className="nav-link" href="about.html">About</a>
              </li>
              <li className="nav-item @@contact">
                <a className="nav-link" href="contact.html">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="hero-slider">
        <div className="slider-item slide1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content style text-center">
                  <h2 className="text-white text-bold mb-2" data-animation-in="slideInLeft">Crowd Sensoring Capabilities</h2>
                  <p className="tag-text mb-4" data-animation-in="slideInRight">Check the MediBook's crowd control data available on your patient dashboard <br /> so you no longer have to wait!</p>
                  <a href="about.html" className="btn btn-main btn-white" data-animation-in="slideInLeft" data-duration-in="1.2">explore</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content style text-center">
                  <h2 className="text-white" data-animation-in="slideInRight">We Care About Your Health</h2>
                  <p className="tag-text mb-4" data-animation-in="slideInRight" data-duration-in="0.6">Our doctors and medical staff and here to help! </p>
                  <a href="about.html" className="btn btn-main btn-white" data-animation-in="slideInRight" data-duration-in="1.2">about us</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="content text-center style">
                  <h2 className="text-white text-bold mb-2" data-animation-in="slideInRight">Best Medical Services</h2>
                  <p className="tag-text mb-4" data-animation-in="slideInLeft">We have a multitude of services available at your disposal.</p>
                  <a href="about.html" className="btn btn-main btn-white" data-animation-in="slideInRight"  data-duration-in="1.2">Explore</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="cta">
        <div className="container">
          <div className="cta-block row no-gutters">
            <div className="col-lg-4 col-md-6 emmergency item">
              <i className="fa fa-phone"></i>
              <h2>Emegency Cases</h2>
              <a>+65 9179 9999</a>
              <p>Call our special hotline for emergency cases</p>
            </div>
            <div className="col-lg-4 col-md-6 top-doctor item">
              <i className="fa fa-stethoscope"></i>
              <h2>Check the Crowd</h2>
              <p>Utilise our Crowd Sensing Service to check for control control</p>
            </div>
            <div className="col-lg-4 col-md-12 working-time item">
              <i className="fa fa-hourglass-o"></i>
              <h2>Working Hours</h2>
              <ul className="w-hours">
                <li>Mon - Sunday <span>8:00 - 19:00</span></li>
                <li>Public Holiday <span>8:00 - 12:00</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h3>What Our
                  <span>Patients Says</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="testimonial-carousel">
                <div className="slide-item">
                  <div className="inner-box text-center">
                    <div className="image-box">
                      <figure>
                        <img loading="lazy" src={testimonial1} alt="" />
                      </figure>
                    </div>
                    <h6>Mike Long</h6>
                    <p className="mb-0">Neque porro quisquam est, qui dolorem ipsum quia consectetur, dolor sit amet, consectetur, numquam Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Molestias, at?</p>
                  </div>
                </div>
                <div className="slide-item">
                  <div className="inner-box text-center">
                    <div className="image-box">
                      <figure>
                      <img loading="lazy" src={testimonial2} alt="" />
                      </figure>
                    </div>
                    <h6>Alex Johnson</h6>
                    <p className="mb-0">Neque porro quisquam est, qui dolorem ipsum quia consectetur, dolor sit amet, consectetur, numquam Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Molestias, at?</p>
                  </div>
                </div>
                <div className="slide-item">
                  <div className="inner-box text-center">
                    <div className="image-box">
                      <figure>
                      <img loading="lazy" src={testimonial3} alt="" />
                      </figure>
                    </div>
                    <h6>Jessica Joanne</h6>
                    <p className="mb-0">Neque porro quisquam est, qui dolorem ipsum quia consectetur, dolor sit amet, consectetur, numquam Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Molestias, at?</p>
                  </div>
                </div>
                <div className="slide-item">
                  <div className="inner-box text-center">
                    <div className="image-box">
                      <figure>
                      <img loading="lazy" src={testimonial1} alt="" />
                      </figure>
                    </div>
                    <h6>Lim Pei Ying</h6>
                    <p className="mb-0">Neque porro quisquam est, qui dolorem ipsum quia consectetur, dolor sit amet, consectetur, numquam Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Molestias, at?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="appoinment-section section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="accordion-section">
                <div className="section-title">
                  <h3>FAQ</h3>
                </div>
                <div className="accordion-holder">
                  <div className="accordion" id="accordionGroup" role="tablist" aria-multiselectable="true">
                    <div className="card">
                      <div className="card-header" role="tab" id="headingOne">
                        <h4 className="card-title">
                          <a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Why Should I choose MediBook SG
                          </a>
                        </h4>
                      </div>
                      <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordionGroup">
                        <div className="card-body">
                          MediBook SG is the future. Here at MediBook, you will find a dedicated team of doctors and nurses doing the most 
                          they can for the least amount of time and cost to you. Our combination of comprehensive services, heartland prices, 
                          and our crowd sensoring optimisation feature is hard to find anywhere else.


                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" role="tab" id="headingTwo">
                        <h4 className="card-title">
                          <a className="collapsed" role="button" data-toggle="collapse" href="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo">
                            How do I check the crowd at the facility? 
                          </a>
                        </h4>
                      </div>
                      <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordionGroup">
                        <div className="card-body">
                          You simply login as a patient and on the Patient Dashboard, the current crowd data will be shown to you. Crowd Sensoring
                          Data is automatically updated every 10 minutes. With this new feature, you no longer have to queue hours just to see a doctor.
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header" role="tab" id="headingThree">
                        <h4 className="card-title">
                          <a className="collapsed" role="button" data-toggle="collapse" href="#collapseThree"
                            aria-expanded="false" aria-controls="collapseThree">
                            How can I ensure my medical data is protected?
                          </a>
                        </h4>
                      </div>
                      <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordionGroup">
                        <div className="card-body">
                          MediBook SG has designed a sophisticated security system that ensures that only doctor assigned to you can view your patient data. When the doctor finishes
                          their examination with you, their access to your personal data is revoked preventing unauthorised access to your data when it is not needed.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-area pl-0 pl-lg-5">
                <div className="section-title">
                  <h3> Send an Enquiry
                  </h3>
                </div>
                <form name="contact_form" className="default-form contact-form" action="!#" method="post">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" type="text" name="Name" placeholder="Name" required="" />
                      </div>
                      <div className="form-group">
                        <input className="form-control" type="email" name="Email" placeholder="Email" required="" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input className="form-control" type="text" name="Phone" placeholder="Phone" required="" />
                      </div>
                      <div className="form-group">
                        <select className="form-control" name="subject">
                          <option>General</option>
                          <option>Content</option>
                          <option>Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea className="form-control" name="form_message" placeholder="Your Message" required=""></textarea>
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className="btn-style-one">submit now</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>                    
        </div>
      </section>

      <footer className="footer-main">
        <div className="footer-top">
          <div className="container">
            <div className="row justify-content-between">
                <div>
                  <ul className="location-link">
                    <li className="item">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>13 Computing Dr, SG 117417, Singapore</p>
                    </li>
                    <li className="item">
                      <i className="far fa-envelope" aria-hidden="true"></i>
                      <a href="mailto:info@medibook.com.sg">
                        <p>info@medibook.com.sg</p>
                      </a>
                    </li>
                    <li className="item">
                      <i className="fas fa-phone" aria-hidden="true"></i>
                      <p>(88017) +123 4567</p>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="back-to-top" className="back-to-top">
        <i className="fa fa-angle-up"></i>
      </div>

      <div className="scroll-to-top scroll-to-target" data-target=".header-top">
        <span className="icon fa fa-angle-up"></span>
      </div>

    </div>
  );
};
