// import { Link } from "react-router";
import Navbar from "./Navbar.js";
import Hero from "./Hero.js";
// import Footer from "./Footer.jsx";
function Home() {
  // const searchCountry = country.filter((item) =>
  //   item.names.common.toLowerCase().includes(searchInput.toLowerCase()),
  // );
  return (
    <div className="flex flex-col h-screen bg-base-100">
      <Navbar />
      <Hero />
      {/* <Footer/> */}
    </div>
  );
}
export default Home;
