import { ThreeDots } from "react-loader-spinner"; 

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <ThreeDots
          visible={true}
          height="50"
          width="50"
          color="#3498db"
          ariaLabel="three-dots-loading"
        />
        <p className="mt-4 text-xl text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
