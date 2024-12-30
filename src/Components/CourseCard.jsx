import React from "react";
import cart1 from "../assets/cart1.jpg";
import cart2 from "../assets/cart2.jpg";
import cart3 from "../assets/cart3.jpg";
import cart4 from "../assets/cart4.jpg";

const CourseCard = ({ course }) => {
  return (
    <div className="course-container">
      <h1 className="course-heading">Available Courses</h1>
      <div className="course-grid">
        <div key={course.id} className="course-card">
          <div className="course-image-container">
            <img
              src={course.image}
              alt={course.title}
              className="course-image"
            />
            <span
              className={`course-status ${
                course.status === "Passed" ? "passed" : "failed"
              }`}
            >
              {course.status}
            </span>
          </div>
          <div className="course-content">
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <button className="course-button" style={{background:course.badge_color}} >View Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
