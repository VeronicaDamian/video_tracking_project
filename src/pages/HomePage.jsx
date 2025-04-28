import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatTime, formatCurrency } from "../utils/formatters";

const HomePage = () => {
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);


  const features = [
    {
      icon: "bi-film",
      title: "Video Project Tracking",
      description:
        "Track all your video editing projects in one place with detailed duration and status information.",
    },
    {
      icon: "bi-cash-coin",
      title: "Payment Calculator",
      description:
        "Automatically calculate earnings based on project duration and client-specific rates.",
    },
    {
      icon: "bi-clock-history",
      title: "Time Tracking",
      description:
        "Record your work sessions with precise start and end times to optimize productivity.",
    },
    {
      icon: "bi-graph-up",
      title: "Performance Analytics",
      description:
        "Gain insights into your productivity, earnings, and content creation metrics.",
    },
  ];


  const workflowSteps = [
    {
      step: 1,
      title: "Create Projects",
      description:
        "Add your video projects with client information, duration, and other details.",
    },
    {
      step: 2,
      title: "Track Your Time",
      description: "Record work sessions to keep track of your editing time.",
    },
    {
      step: 3,
      title: "Calculate Payments",
      description:
        "Automatically calculate earnings based on project duration and client rates.",
    },
    {
      step: 4,
      title: "Analyze Performance",
      description:
        "View analytics to optimize your workflow and increase productivity.",
    },
  ];

 
  const clients = [
    {
      name: "Evan",
      niche: "Dungeons & Dragons Content Creator",
      testimonial:
        "This tool has transformed how I organize my video content. Highly recommended!",
    },
    {
      name: "Sarah",
      niche: "Cooking Tutorial Channel",
      testimonial:
        "The payment calculator saves me hours every month on client billing.",
    },
    {
      name: "Michael",
      niche: "Tech Review Channel",
      testimonial:
        "As a freelancer, tracking my editing time accurately has helped me optimize my workflow.",
    },
  ];

  useEffect(() => {
 
    setAnimateHero(true);

    const featuresTimer = setTimeout(() => {
      setAnimateFeatures(true);
    }, 400);

 
    const featureRotationInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      clearTimeout(featuresTimer);
      clearInterval(featureRotationInterval);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section with Video Editing Theme */}
      <section
        className={`hero bg-dark text-white py-5 ${
          animateHero ? "fade-in" : ""
        }`}
      >
        <div className="hero-bg-overlay">
          <div className="film-strip-top"></div>
          <div className="film-strip-bottom"></div>
        </div>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">
                Video Tracking Simplified
              </h1>
              <p className="lead mb-4">
                Track your video projects, calculate payments, and analyze your
                performance with this all-in-one tool for video professionals.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Link
                  to="/projects"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  <i className="bi bi-collection-play me-2"></i>
                  View Projects
                </Link>
                <Link
                  to="/time-tracking"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  <i className="bi bi-stopwatch me-2"></i>
                  Start Tracking
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0 text-center">
              <div className="hero-image-container">
                {/* Video editing equipment/software collage - removed images */}
                <div className="editing-setup-image">
                  <div className="timeline-overlay">
                    <div className="timeline-marker"></div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-marker"></div>
                  </div>
                </div>
                <div className="hero-stats">
                  <div className="stats-card bg-primary text-white p-3 rounded shadow">
                    <i className="bi bi-clock me-2"></i>
                    <span className="fw-bold">{formatTime(3600)}</span>
                    <small className="d-block">Video Content</small>
                  </div>
                  <div className="stats-card bg-success text-white p-3 rounded shadow">
                    <i className="bi bi-cash me-2"></i>
                    <span className="fw-bold">{formatCurrency(1440)}</span>
                    <small className="d-block">Earnings</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Key Features</h2>
            <p className="lead text-muted">
              Everything you need to manage your video editing workflow
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`col-md-6 col-lg-3 ${
                  animateFeatures ? "fade-in" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className={`card h-100 border-0 shadow-sm ${
                    activeFeature === index ? "feature-highlight" : ""
                  }`}
                >
                  <div className="feature-image-container">
                    <div className="feature-icon">
                      <i className={`bi ${feature.icon} text-primary`}></i>
                    </div>
                  </div>
                  <div className="card-body text-center p-4">
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text text-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editing Software Section */}
      <section className="editing-software py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="display-6 fw-bold mb-4">
                Compatible with Your Workflow
              </h2>
              <p className="lead mb-4">
                Our application integrates seamlessly with your existing editing
                process, whether you use Premiere Pro, Final Cut, DaVinci
                Resolve, or any other editing software.
              </p>
              <div className="software-compatibility mb-4">
                <div className="d-flex flex-wrap gap-3">
                  <div className="software-badge">Premiere Pro</div>
                  <div className="software-badge">Final Cut Pro</div>
                  <div className="software-badge">DaVinci Resolve</div>
                  <div className="software-badge">After Effects</div>
                  <div className="software-badge">Adobe Audition</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="software-image-container text-center">
                <div className="software-icons">
                  <div className="software-icon premiere"></div>
                  <div className="software-icon final-cut"></div>
                  <div className="software-icon davinci"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">How It Works</h2>
            <p className="lead text-muted">
              Simple steps to optimize your video editing workflow
            </p>
          </div>

          <div className="workflow-container">
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="row g-4 align-items-center workflow-row">
                  <div
                    className={`col-md-6 ${
                      index % 2 === 1 ? "order-md-2" : ""
                    }`}
                  >
                    <div className="step-content d-flex align-items-start">
                      <div className="step-number bg-primary text-white rounded-circle p-3 me-3">
                        {step.step}
                      </div>
                      <div>
                        <h4>{step.title}</h4>
                        <p className="text-muted">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-6 ${
                      index % 2 === 1 ? "order-md-1" : ""
                    }`}
                  >
                    <div className="workflow-image text-center">
                      <div className="workflow-image-overlay">
                        <div className="overlay-icon">
                          <i
                            className={`bi bi-${
                              index === 0
                                ? "plus-circle"
                                : index === 1
                                ? "stopwatch"
                                : index === 2
                                ? "calculator"
                                : "graph-up"
                            }`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="workflow-connector">
                    <div className="connector-line"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Creator Workstation Section */}
      <section className="creator-workstation py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-2">
              <h2 className="display-6 fw-bold mb-4">
                Built for Video Creators
              </h2>
              <p className="lead mb-3">
                Designed with the unique needs of video professionals in mind,
                our tool helps you:
              </p>
              <ul className="creator-benefits">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Organize projects by client, status, and deadline
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Track actual editing time versus content duration
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Calculate fair compensation based on project complexity
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Identify your most profitable types of projects
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Optimize your workflow based on performance data
                </li>
              </ul>
            </div>
            <div className="col-md-6 order-md-1">
              <div className="workstation-image-container text-center">
                <div className="equipment-overlays">
                  <div className="equipment camera"></div>
                  <div className="equipment microphone"></div>
                  <div className="equipment keyboard"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Sample Clients */}
      <section className="testimonials py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Client Testimonials</h2>
            <p className="lead text-muted">
              What video editors say about our tool
            </p>
          </div>

          <div className="row g-4">
            {clients.map((client, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="testimonial-image-container">
                    <div className="creator-type-badge">
                      {client.niche.split(" ")[0]}
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className="bi bi-star-fill text-warning me-1"
                        ></i>
                      ))}
                    </div>
                    <p className="card-text mb-4 fst-italic">
                      "{client.testimonial}"
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 bg-primary text-white rounded-circle p-3">
                        <i className="bi bi-person"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h5 className="mb-0">{client.name}</h5>
                        <small className="text-muted">{client.niche}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta py-5 bg-primary text-white">
        <div className="film-strip-top"></div>
        <div className="container text-center">
          <h2 className="display-6 fw-bold mb-3">
            Ready to optimize your video editing workflow?
          </h2>
          <p className="lead mb-4">
            Start tracking your projects today and increase your productivity.
          </p>
          <Link to="/projects" className="btn btn-light btn-lg px-5">
            Get Started
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
        <div className="film-strip-bottom"></div>
      </section>

      {/* Custom CSS for animations, styling, and video editing theme */}
      <style jsx>{`
        /* Hero section styling */
        .hero {
          position: relative;
          overflow: hidden;
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
        }

        .film-strip-top,
        .film-strip-bottom {
          height: 30px;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 40 30"><rect x="0" y="0" width="5" height="30" fill="rgba(0,0,0,0.8)"/><rect x="10" y="0" width="5" height="30" fill="rgba(0,0,0,0.8)"/><rect x="20" y="0" width="5" height="30" fill="rgba(0,0,0,0.8)"/><rect x="30" y="0" width="5" height="30" fill="rgba(0,0,0,0.8)"/></svg>');
          background-repeat: repeat-x;
        }

        .film-strip-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }

        .film-strip-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
        }

        /* Hero image & editing setup */
        .hero-image-container {
          position: relative;
          display: inline-block;
        }

        .editing-setup-image {
          position: relative;
          display: inline-block;
        }

        .timeline-overlay {
          position: absolute;
          bottom: 30px;
          left: 50px;
          right: 50px;
          height: 20px;
          background: rgba(30, 30, 30, 0.8);
          border-radius: 4px;
          display: flex;
          justify-content: space-around;
        }

        .timeline-marker {
          width: 10px;
          height: 20px;
          background-color: #007bff;
        }

        .hero-stats {
          position: absolute;
          width: 100%;
          display: flex;
          justify-content: space-around;
          bottom: -20px;
        }

        .stats-card {
          transform: rotate(-5deg);
          transition: all 0.3s ease;
        }

        .stats-card:hover {
          transform: rotate(0) scale(1.1);
        }

        /* Features section */
        .feature-image-container {
          position: relative;
          overflow: hidden;
        }

        .feature-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.9);
          padding: 15px;
          border-top-left-radius: 10px;
        }

        .feature-icon i {
          font-size: 32px;
        }

        .feature-highlight {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }

        /* Editing software section */
        .software-badge {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 500;
        }

        .software-image-container {
          position: relative;
        }

        .software-icons {
          position: absolute;
          bottom: -20px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .software-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 10px;
          background-color: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* Workflow section */
        .workflow-container {
          position: relative;
        }

        .workflow-step {
          margin-bottom: 50px;
        }

        .workflow-connector {
          position: relative;
          height: 50px;
        }

        .connector-line {
          position: absolute;
          top: 0;
          left: 50%;
          height: 100%;
          width: 2px;
          background-color: #dee2e6;
        }

        .connector-line:before {
          content: "";
          position: absolute;
          bottom: 0;
          left: -4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #007bff;
        }

        .step-number {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.5rem;
        }

        .workflow-image {
          position: relative;
        }

        .workflow-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .workflow-image:hover .workflow-image-overlay {
          opacity: 1;
        }

        .overlay-icon {
          background: rgba(255, 255, 255, 0.9);
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overlay-icon i {
          font-size: 30px;
          color: #007bff;
        }

        /* Creator workstation section */
        .workstation-image-container {
          position: relative;
        }

        .equipment-overlays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .equipment {
          position: absolute;
          width: 60px;
          height: 60px;
          background-color: rgba(0, 123, 255, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .equipment:before {
          font-family: "bootstrap-icons";
          color: white;
          font-size: 30px;
        }

        .camera {
          top: 10%;
          right: 10%;
        }

        .camera:before {
          content: "\\f219"; /* Bootstrap icon for camera */
        }

        .microphone {
          bottom: 20%;
          left: 10%;
        }

        .microphone:before {
          content: "\\f59e"; /* Bootstrap icon for mic */
        }

        .keyboard {
          bottom: 10%;
          right: 30%;
        }

        .keyboard:before {
          content: "\\f5c4"; /* Bootstrap icon for keyboard */
        }

        .creator-benefits li {
          list-style-type: none;
          padding-left: 5px;
        }

        /* Testimonials section */
        .testimonial-image-container {
          position: relative;
          overflow: hidden;
        }

        .creator-type-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 123, 255, 0.8);
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
        }

        /* Card styling */
        .card {
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Different animation delays for the features */
        .fade-in:nth-child(1) {
          animation-delay: 0.1s;
        }
        .fade-in:nth-child(2) {
          animation-delay: 0.3s;
        }
        .fade-in:nth-child(3) {
          animation-delay: 0.5s;
        }
        .fade-in:nth-child(4) {
          animation-delay: 0.7s;
        }

        /* CTA section */
        .cta {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
