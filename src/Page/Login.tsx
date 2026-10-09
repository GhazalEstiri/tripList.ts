import React, { useContext, useState } from "react";
import { loginContext } from "../Context/AuthContext.js";
import { useNavigate } from "react-router";
import {
  LockKeyhole,
  Mail,
  UserRound,
  Eye,
  EyeOff,
  MapPinned,
} from "lucide-react";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pasword, setPasword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remmember, setRemmember] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const regexPasword = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/;
  const regexName = /^[A-Za-z]+$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { user, logout, login } = useContext(loginContext);
  const navigate = useNavigate();

  const handleInputs = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setError("Name is empty.");
      return;
    }

    if (!regexName.test(name)) {
      setError("Name format is wrong.");
      return;
    }

    if (!email) {
      setError("Email is empty.");
      return;
    }

    if (!regexEmail.test(email)) {
      setError("Email format is wrong.");
      return;
    }

    if (!pasword) {
      setError("Password is empty.");
      return;
    }

    if (!regexPasword.test(pasword)) {
      setError(
        "Password must be at least 8 characters and contain a letter and a number.",
      );
      return;
    }
    if (!confirmPassword) {
      setError("confirmPassword is empty.");
      return;
    }
    if (pasword !==confirmPassword) {
      setError("یکی نیست پسسووردا");
      return;
    }

    login(name, email, remmember);
    setError("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex items-center justify-center p-5">
      <div className="w-full max-w-[1000px] min-h-[620px] bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(30,60,90,0.12)] flex">
        <div className="hidden md:block w-[45%] relative">
          <img
            src="Travel.webp"
            alt="Travel"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#102f4d]/60 via-transparent to-transparent" />

          <div className="absolute top-8 left-8 flex items-center gap-2 text-white">
            <MapPinned size={21} />
            <span className="font-bold text-lg">Wanderly</span>
          </div>

          <div className="absolute bottom-10 left-9 right-9 text-white">
            <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
              Explore the world
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Your next
              <br />
              adventure
              <br />
              is waiting.
            </h2>

            <p className="mt-4 text-sm leading-6 opacity-85 max-w-[280px]">
              Discover new places, save your favorites and build your dream
              travel list.
            </p>
          </div>
        </div>

        <div className="w-full md:w-[55%] flex items-center justify-center px-7 py-10 sm:px-12 lg:px-20">
          <div className="w-full max-w-[380px]">
            {/* <div className="flex items-center gap-2 text-[#173c5c] mb-12">
              <MapPinned size={22} />
              <span className="font-bold text-lg">Wanderly</span>
            </div> */}

            {user ? (
              <div className="flex flex-col items-center text-center gap-5">
                <div className="w-16 h-16 rounded-full bg-[#eaf3f8] flex items-center justify-center text-[#173c5c]">
                  <UserRound size={30} />
                </div>

                <div>
                  <p className="text-3xl font-bold text-[#173c5c]">
                    Hello <span className="text-[#2c6288]">{user.name}</span>
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    You are successfully logged in.
                  </p>
                </div>

                <button
                  onClick={logout}
                  className="w-full py-3 rounded-full bg-[#093775] text-white font-medium hover:bg-[#001f49] transition"
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-[#173c5c]">
                    Welcome Back
                  </h1>

                  <p className="text-sm text-gray-400 mt-2">
                    Sign in to continue your journey
                  </p>
                </div>

                <form onSubmit={handleInputs} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-[#52677a] mb-2">
                      Name
                    </label>

                    <div className="relative">
                      <UserRound
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        value={name}
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#52677a] mb-2">
                      Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-4 text-sm outline-none focus:border-[#173c5c] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#52677a] mb-2">
                      Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={pasword}
                        placeholder="••••••••"
                        onChange={(e) => setPasword(e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-12 text-sm outline-none focus:border-[#173c5c] transition"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173c5c]"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#52677a] mb-2">
                      confirmPassword
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        placeholder="••••••••"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 rounded-xl border border-[#dce5ec] bg-[#fbfcfd] pl-11 pr-12 text-sm outline-none focus:border-[#173c5c] transition"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#173c5c]"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-gray-500">
                      {/* <input type="checkbox" className="accent-[#173c5c]" /> */}
                      <input
                        type="checkbox"
                        className="checkbox validator"
                        title="Required"
                        onChange={() => setRemmember(!remmember)}
                      />
                      Remember me
                    </label>

                    {/* <button
                      type="button"
                      className="text-[#2c6288] hover:underline"
                    >
                      Forgot password?
                    </button> */}
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full h-12 rounded-full bg-[#173c5c] text-white text-sm font-semibold shadow-md hover:bg-[#0f304b] transition"
                  >
                    Sign In
                  </button>

                  {/* <div className="flex items-center gap-3">
                    <div className="h-px bg-[#e5ebef] flex-1" />
                    <span className="text-xs text-gray-400">or</span>
                    <div className="h-px bg-[#e5ebef] flex-1" />
                  </div> */}

                  {/* <button
                    type="button"
                    className="w-full h-12 rounded-full border border-[#dce5ec] bg-white text-sm font-medium text-[#42566a] hover:bg-gray-50 transition"
                  >
                    <span className="mr-2 font-bold text-[#4285F4]">G</span>
                    Continue with Google
                  </button> */}
                </form>

                {/* <p className="text-center text-xs text-gray-400 mt-8">
                  Don't have an account?
                  <button className="text-[#2c6288] font-medium hover:underline">
                    Sign up
                  </button>
                </p> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
