import { Link } from "react-router-dom";

function Success({ code }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 gap-8">
      <div>
        <h2 className="text-center text-green-500 font-semibold text-2xl">
          File uploaded !!
        </h2>
        <div className="flex items-center justify-center">
          <h3 className="text-center f">To download the file use code: </h3>
          <h3 className="font-bold align-middle ">{" "}{code}</h3>
        </div>
      </div>
      <Link
        to="/"
        className="bg-filepass-blue text-white px-4 py-2 rounded-xl border-none cursor-pointer ml-3"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Success;
