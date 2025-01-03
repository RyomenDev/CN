import { useState } from "react";
import HomeData from "../../Data/MainData.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import LoginButton from "./LoginBtn";
import SeheduleInterviewBtn from ".//ScheduleInterviewBtn";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const userName = userData?.name;

  const [isContactLanguageOpen, setIsContactLanguageOpen] = useState(false); // State to toggle contact and language visibility
  const { header } = HomeData;
  const { contactOptions, languages, logo, appName } = header;

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleHamburgerClick = () => {
    setIsContactLanguageOpen(!isContactLanguageOpen); // Toggle contact and language section visibility
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 flex flex-wrap justify-between items-center py-4 px-6 bg-gray-900 text-white shadow-lg border-b-4 border-gray-800">
      {/* Logo Section */}
      <div
        className="flex items-center justify-start cursor-pointer gap-2 hover:shadow-lg rounded-lg transition-all duration-300"
        onClick={handleLogoClick}
      >
        <img
          src={logo}
          alt="HealthBridge"
          className="w-auto h-12 md:h-16 transition-transform duration-300 hover:scale-105"
        />
        <div className="ml-2 text-2xl font-semibold text-white md:text-3xl hover:text-indigo-400 transition-all duration-300">
          {appName}
        </div>
      </div>

      <SeheduleInterviewBtn />

      {/* Hamburger Icon (Mobile) */}
      <div
        className="md:hidden flex items-center"
        onClick={handleHamburgerClick} // Show contact and language options on click
      >
        <button className="text-white focus:outline-none">
          <span className="block w-6 h-1 bg-white mb-2"></span>
          <span className="block w-6 h-1 bg-white mb-2"></span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full md:w-1/4 flex justify-center mb-4 md:mb-0">
        <form className="relative w-full max-w-lg" action="#">
          <input
            id="search"
            type="text"
            className="w-full py-2 pl-4 pr-12 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-800 text-white"
            name="s"
            autoComplete="off"
            placeholder="Search..."
            aria-label="Search..."
          />
          <button
            id="search-submit"
            type="submit"
            className="absolute right-2 top-2 text-indigo-500 hover:text-indigo-700"
            title="Search"
            aria-label="Search"
          ></button>
        </form>
      </div>
      <div>
        {authStatus ? (
          <div className="flex gap-4">
            <div className="text-2xl font-semibold">Hello, {userName}</div>
            <LogoutBtn />
          </div>
        ) : (
          <div>
            <LoginButton />
          </div>
        )}
      </div>

      {/* Language Section (Visible on Mobile when Hamburger is clicked) */}
      <div
        className={`${
          isContactLanguageOpen ? "flex" : "hidden"
        } md:flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-6`}
      >
        {/* Language Selector */}
        <div className="mt-4 md:mt-0">
          <select
            className="bg-transparent border border-gray-700 rounded-lg text-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Select Language"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="text-black">
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
