import { useContext } from "react";
import { loginContext } from "../Context/AuthContext.js";
import Navbar from "./Navbar.js";

import {
  CircleUserRound,
  Mail,
  UserRound,
} from "lucide-react";

function Profile() {
  const { user } = useContext(loginContext);

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />

      <div className="w-[92%] sm:w-[90%] mx-auto mt-10 sm:mt-16 lg:mt-20 mb-10 sm:mb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">

          <div className="w-full lg:w-[35%] bg-[#eef6fb] flex flex-col items-center justify-center p-8 sm:p-10">
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white flex items-center justify-center shadow-md mb-5">
              <CircleUserRound
                size={60}
                className="sm:hidden text-[#1d4362]"
                strokeWidth={1.5}
              />

              <CircleUserRound
                size={70}
                className="hidden sm:block text-[#1d4362]"
                strokeWidth={1.5}
              />
            </div>

            <p className="text-gray-500 text-base sm:text-lg">
              Hello
            </p>

            <h2 className="text-[#1d4362] font-bold text-xl sm:text-2xl text-center mt-1  max-w-full">
              {user?.name}
            </h2>

            <div className="mt-4 px-5 py-2 bg-[#dcecf8] rounded-full flex items-center gap-2 text-[#1d4362]">
              <UserRound size={18} />
              <span className="font-medium">Traveller</span>
            </div>

          </div>

          {/* Right Side */}
          <div className="w-full lg:w-[65%] p-6 sm:p-8 lg:p-12">

            <div className="flex items-center gap-3 sm:gap-4 mb-7 sm:mb-10">
              <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#eef6fb] flex items-center justify-center">
                <UserRound
                  size={24}
                  className="sm:hidden text-[#1d4362]"
                />

                <UserRound
                  size={27}
                  className="hidden sm:block text-[#1d4362]"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1d4362]">
                  Profile
                </h1>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  Your personal information
                </p>
              </div>
            </div>

            <div className="border border-[#dce7ee] rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 hover:border-[#1d4362] transition">
              
              <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#eef6fb] flex items-center justify-center">
                <UserRound
                  size={21}
                  className="sm:hidden text-[#1d4362]"
                />

                <UserRound
                  size={24}
                  className="hidden sm:block text-[#1d4362]"
                />
              </div>

              <div className="min-w-0">
                <p className="text-gray-500 text-sm">
                  Name
                </p>

                <p className="font-bold text-base sm:text-lg text-[#1d4362] truncate">
                  {user?.name}
                </p>
              </div>

            </div>

            <div className="border border-[#dce7ee] rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:border-[#1d4362] transition">

              <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#eef6fb] flex items-center justify-center">
                <Mail
                  size={21}
                  className="sm:hidden text-[#1d4362]"
                />

                <Mail
                  size={24}
                  className="hidden sm:block text-[#1d4362]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-gray-500 text-sm">
                  Email
                </p>

                <p className="font-bold text-base sm:text-lg text-[#1d4362] truncate">
                  {user?.email}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;