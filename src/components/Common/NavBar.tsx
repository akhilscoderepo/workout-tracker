import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="">
      <div className="flex justify-evenly place-items-end">
        <Link to="/exercise">
          <button className="bg-orange-50 px-1 py-1 m-1 rounded-md text-zinc-800 text-base w-32 h-8 font-semibold">
            New Exercise
          </button>
        </Link>
        <Link
          to="/templates"
          className="text-zinc-8  00 text-base font-semibold"
        >
          Templates
        </Link>
        <Link to="/history" className="text-zinc-800 text-base font-semibold">
          History
        </Link>
      </div>
      <hr className="my-4 border-t border-zinc-800 shadow-zinc-800" />
    </div>
  );
};

export default NavBar;
