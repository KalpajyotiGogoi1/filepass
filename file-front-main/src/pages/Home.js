import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { GoDownload } from "react-icons/go";

function Home() {
  return (
    <div>
      <Header />
      <div className="mx-6">
        <h3 className="text-center font-light">
          Select file. Enter a unique code. Hit send.
        </h3>

        <div className="flex justify-center items-center mt-20 gap-20">
          <Link
            to="/send"
            className="bg-white rounded-lg drop-shadow-2xl shadow-xl  flex-col h-24 w-24 flex items-center justify-center"
          >
            <GoUpload color="4C5CEB" size="3em" />
            <p className = 'text-center font-semibold'>
              Send
            </p>
          </Link>
          <Link
            to="/recive"
            className="bg-white rounded-lg drop-shadow-2xl  shadow-xl flex-col h-24 w-24 flex items-center justify-center"
          >
            <GoDownload color="4C5CEB" size="3em" />
            <p className = "text-center font-semibold">Receive</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
