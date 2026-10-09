import { useEffect, useState } from "react";
import { getCountry, searchCountry } from "../Services/Api.js";
import { useNavigate } from "react-router";
import Navbar from "./Navbar.js";
import { ChevronRight, Search } from "lucide-react";
interface Country {
  name: string;
  flags: {
    png: string;
  };
}

function Countries() {
  const [country, setCountry] = useState<Country[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pages = 10;
  const navigate = useNavigate();

  async function getApi() {
    const limit = 25;
    const offset = (currentPage - 1) * limit;
    const countryData = await getCountry(limit, offset);
    setCountry(countryData);
  }
  async function handleSearch() {
    const nameCountry = searchInput;
    const searchData = await searchCountry(nameCountry);
    setCountry(searchData);
    console.log(country);
  }
  const pageNumber = Array.from({ length: pages }, (v, i) => i + 1);
  console.log(pageNumber);

  function handleClick(item: Country) {
    navigate("/CountryDetail", {
      state: item,
    });
  }

  useEffect(() => {
    if (searchInput.length == 0) {
      getApi();
    } else {
      handleSearch();
    }
  }, [currentPage, searchInput]);

  // const searchCountry = country.filter((item) =>
  //   item.name.toLowerCase().includes(searchInput.toLowerCase()),
  // )
  return (
    <div className="flex  flex-col overflow-x-hidden">
      <Navbar />
      <section className="px-6 pt-10 pb-8  ">
        <div className="mx-auto max-w-345 ">
          <div className="rounded-2xl bg-[#EAF5FA] px-8 py-10 md:px-12 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#B9DDF2]/60" />

            <div className="relative z-10 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#2E6F9E]">
                Explore the world
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-[#17324A] md:text-5xl">
                Discover your next
                <span className="text-[#2E6F9E]"> destination.</span>
              </h1>

              <p className="mt-4 max-w-xl text-[#718396]">
                Explore countries, discover new cultures and save the places you
                want to visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center flex-col md:flex-row px-15 py-5 rounded-2xl mx-auto mt-5 items-center gap-40 bg-base-100  max-w-[90%]">
        <div className="hidden md:flex aura aura-dual  justify-center">
          <div className="card bg-base-100 flex justify-center">
            <div className="card-body flex justify-center">
              <div className="card bg-base-100 rounded-box grid h-20 grow place-items-center justify-center">
                <h1 className="font-bold text-[#1d4362] text-2xl">countries</h1>
                <p className="text-[#1d4362ad] tracking-[0.25em]">
                  250 Destination available
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="card bg-base-100 rounded-box grid h-20 place-items-center gap-10 -mt-40 md:mt-0">
          <h1 className="flex text-[#1D4362] font-medium tracking-[3px]">
            Search Your Destination{" "}
          </h1>
          <div className="max-w-150 border-2 border-[#1d436286] rounded-2xl py-2 px-5 flex flex-row gap-6  bg-white ">
            <Search className="text-[#1d436286]" />

            <input
              type="text"
              placeholder="Search country..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex outline-none placeholder:text-[#1d4362ad]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 p-18 ">
        {country.length > 0 ? (
          country.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item)}
              className="bg-[#F7F9F8] shadow-xl flex p-10 font-bold text-[#1d4362] text-sm cursor-pointer rounded-2xl"
            >
              <div className="flex w-200 flex-col gap-8 justify-between">
                <div key={item.flags.png} className="">
                  <img src={item.flags.png} alt={item.name} />
                </div>
                <div className="flex flex-col justify-center items-baseline w-full gap-6 ">
                  <p className="line-clamp-1 text-center w-full">{item.name}</p>
                  <div className=" flex justify-center items-center bg-[#E8F4FD] rounded-2xl p-2 text-sm text-[#1d4362]  mx-auto w-full">
                    More details <ChevronRight />
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>Nothing found</p>
        )}
      </div>

      <div className="join flex justify-center items-center mb-5 -mt-10 max-w-50 mx-auto">
        {pageNumber.map((btn) => {
          return (
            <button
              key={btn}
              onClick={() => setCurrentPage(btn)}
              className={`join-item btn ${btn === currentPage && "btn-active"} p-2 md:p-5`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Countries;
