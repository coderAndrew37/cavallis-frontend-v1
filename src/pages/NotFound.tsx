import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white text-center"
      style={{ backgroundImage: "url('/404-background.jpeg')" }} // ✅ Replace with your image
    >
      <h1 className="text-7xl font-bold drop-shadow-lg">404</h1>
      <p className="text-2xl drop-shadow-md mb-6">Oops! Page not found.</p>
      <Link to="/" className="bg-green-500 px-6 py-3 text-lg rounded shadow-md">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
