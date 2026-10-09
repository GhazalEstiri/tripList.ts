import { useState } from "react";
import { Link } from "react-router";
import { MapPinned, CircleUserRound, X, Menu } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar relative bg-base-100 min-h-16 w-[90%] mx-auto border-b-2 border-[#1d4362]">
      <div className="navbar-start">
        <Link
          to="/"
          className="text-xl font-bold text-[#1d4362] flex items-center gap-3"
        >
          <MapPinned className="text-[#1d4362]" />
          Wanderly
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <Link to="/Countries">Countries</Link>
          </li>

          <li>
            <Link to="/Favorite">Favorite</Link>
          </li>

          <li>
            <Link to="/Profile">Profile</Link>
          </li>
          <li>
            <Link to="/MyTrip">MyTrip</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-base-200 transition cursor-pointer"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <Link
          to="/Login"
          className="btn btn-sm bg-[#1d4362] text-white hover:bg-[#6084a1] rounded-full w-10 h-10 min-h-10 p-0 flex items-center justify-center"
        >
          <CircleUserRound size={21} />
        </Link>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full md:hidden mt-2 p-4 rounded-xl bg-[#0D1825] border border-[#1E3042] flex flex-col gap-2 z-50">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 rounded-lg hover:bg-white/10"
          >
            Home
          </Link>

          <Link
            to="/Countries"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 rounded-lg hover:bg-white/10"
          >
            Countries
          </Link>

          <Link
            to="/Favorite"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 rounded-lg hover:bg-white/10"
          >
            Favorite
          </Link>

          <Link
            to="/Profile"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 rounded-lg hover:bg-white/10"
          >
            Profile
          </Link>
          <Link
            to="/MyTrip"
            onClick={() => setMenuOpen(false)}
            className="text-white p-2 rounded-lg hover:bg-white/10"
          >
            MyTrip
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
