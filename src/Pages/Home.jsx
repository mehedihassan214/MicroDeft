import { useEffect } from "react";
import { useCoursesQuery } from "../Redux/apiSlice";
import Loading from "../Components/Loading";

const Home = () => {
  const { data, isLoading, isError } = useCoursesQuery();

  useEffect(() => {
    console.log("Data:", data?.data?.data);
    console.log("Is Loading:", isLoading);
    console.log("Is Error:", isError);
  }, [isLoading, isError, data]);

  let content;

  if (isLoading) {
    content = <Loading />;
  } else if (isError) {
    content = <p className="error-text">Error loading courses. Please try again later.</p>;
  } else if (data?.data?.data?.length > 0) {
    content = (
      <div className="course-grid">
        {data?.data?.data?.map((course) => (
          <div key={course.id} className="course-card">
            <div className="image-container">
              <img src={course.image} alt={course.title} className="course-image" />
              <span className={`status-badge ${course.status === "Passed" ? "passed" : "failed"}`}>
                {course.status}
              </span>
            </div>
            <div className="course-details">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <button className="details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <p>No courses available.</p>;
  }

  return (
    <div className="home-container">
      <div className="container">{content}</div>
    </div>
  );
};

export default Home;
