import { useState } from "react";
import { useCreateCourseMutation } from "../Redux/apiSlice";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const CourseForm = () => {
  const [createCourse] = useCreateCourseMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for this field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate each field
    const newErrors = {};
    if (!formData.title) newErrors.title = "You need to fill up this input field.";
    if (!formData.description) newErrors.description = "You need to fill up this input field.";
    if (!formData.badge_text) newErrors.badge_text = "You need to fill up this input field.";
    if (!formData.badge_color) newErrors.badge_color = "You need to select a badge color.";
    if (!formData.instructor_name) newErrors.instructor_name = "You need to fill up this input field.";

    // Set errors or submit the form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true);
      try {
        const result = await createCourse(formData);
        toast.success("Your course has been created!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setFormData({
          title: "",
          description: "",
          badge_text: "",
          badge_color: "",
          instructor_name: "",
        });
      } catch (error) {
        toast.error("Course creation failed!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Add New Course</h2>
        
        {/* Form Fields */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="React professional course"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Description of the course"
            rows="4"
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="badge_text" className="block text-sm font-medium text-gray-700">
            Badge Text
          </label>
          <input
            type="text"
            id="badge_text"
            name="badge_text"
            value={formData.badge_text}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Featured"
          />
          {errors.badge_text && <p className="mt-1 text-sm text-red-500">{errors.badge_text}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="badge_color" className="block text-sm font-medium text-gray-700">
            Badge Color
          </label>
          <input
            type="color"
            id="badge_color"
            name="badge_color"
            value={formData.badge_color}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.badge_color && <p className="mt-1 text-sm text-red-500">{errors.badge_color}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="instructor_name" className="block text-sm font-medium text-gray-700">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructor_name"
            name="instructor_name"
            value={formData.instructor_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Naim"
          />
          {errors.instructor_name && <p className="mt-1 text-sm text-red-500">{errors.instructor_name}</p>}
        </div>

        {/* Submit Button or Loader */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              color="#fff"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
