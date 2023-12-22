import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiSecretBook } from "react-icons/gi";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Sell", path: "/admin/dashboard" },
    { link: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav className={`py-4 lg:px-24 px-4 ${sticky ? "sticky top-0 left-0 right-0 bg-[#F49988]" : ""}`}>
        <div className="flex items-center justify-evenly">
          <Link
            to="/"
            className="text-3xl text-[#E2725B] font-bold flex items-center gap-2 uppercase"
          >
            <GiSecretBook className="inline-block" />
            BookHaven
          </Link>

          {/* nav items for large device */}
          <ul className="md:flex gap-5 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                key={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-[#AB4F3F]"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div>
            <button className="hidden lg:flex">
              <FaBarsStaggered className="w-5 hover:text-[#AB4F3F]"/>
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
                {
                    menuOpen ? <FaXmark className="text-3xl text-black"/> : <FaBarsStaggered className="text-3xl text-black"/>
                }
            </button>

          </div>

          
        </div>
        <div className={`space-y-4 px-4 mt-16 py-7 bg-[#AB4F3F] ${menuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}` }>
          {navItems.map(({ link, path }) => (
              <Link
                to={path}
                key={path}
                className="block text-base  uppercase cursor-pointer text-white "
              >
                {link}
              </Link>
            ))}
          </div>
      </nav>
    </header>
  );
};

export default Navbar;
