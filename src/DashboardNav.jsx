import React from 'react'
import { useState, useEffect, useRef } from 'react';
import silhouetteLogo from './assets/GlamByKai_Logo.png';
import scissors from './assets/scissors.png';
import Comb from './assets/hair-comb.png';
import dryer from './assets/hair-dryer.png';
import iron from './assets/hair-iron.png';




const DashboardNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null)
  const menuButtonRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);


  const handleClickOutsideMobileMenu = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target) &&
      !menuButtonRef.current.contains(event.target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Tailwind's md breakpoint
    const handleResize = (e) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);

    // Add listener
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);



  useEffect(() => {

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    };
  }, [mobileMenuOpen]);

  const tools = [
    { src: Comb, size: 10, rotate: 0, left: 13, top: 20 },
    { src: dryer, size: 12, rotate: 45, left: 15, top: 50 },
    { src: scissors, size: 14, rotate: 90, left: 20, top: 20 },
    { src: iron, size: 10, rotate: 85, left: 25, top: 65 },
    { src: scissors, size: 7, rotate: 80, left: 18, top: 25 },
    { src: iron, size: 7, rotate: 45, left: 30, top: 35 },
    { src: Comb, size: 7, rotate: 45, left: 25, top: 35 },
    { src: dryer, size: 10, rotate: 55, left: 30, top: 65 },
    { src: Comb, size: 10, rotate: 0, left: 35, top: 20 },
    { src: dryer, size: 10, rotate: 0, left: 35, top: 50 },
    { src: iron, size: 10, rotate: 15, left: 40, top: 45 },
    { src: Comb, size: 10, rotate: 85, left: 45, top: 65 },
    { src: iron, size: 10, rotate: 85, left: 47, top: 40 },
    { src: dryer, size: 10, rotate: 85, left: 45, top: 20 },
    { src: scissors, size: 10, rotate: 85, left: 50, top: 20 },
    { src: Comb, size: 10, rotate: 85, left: 50, top: 55 },
    { src: iron, size: 10, rotate: 85, left: 53, top: 40 },
    { src: Comb, size: 10, rotate: 85, left: 57, top: 55 },
    { src: scissors, size: 10, rotate: 85, left: 55, top: 20 },
    { src: dryer, size: 12, rotate: 45, left: 60, top: 30 },
    { src: Comb, size: 10, rotate: 0, left: 65, top: 15 },
    { src: dryer, size: 12, rotate: 5, left: 65, top: 50 },


    { src: Comb, size: 10, rotate: 85, left: 70, top: 55 },
    { src: iron, size: 10, rotate: 85, left: 73, top: 40 },
    { src: Comb, size: 10, rotate: 85, left: 80, top: 55 },
    { src: scissors, size: 10, rotate: 85, left: 80, top: 10 },
    { src: dryer, size: 12, rotate: 45, left: 70, top: 30 },
    { src: Comb, size: 10, rotate: 0, left: 77, top: 15 },
    { src: dryer, size: 12, rotate: 5, left: 75, top: 50 },


    { src: Comb, size: 10, rotate: 85, left: 80, top: 55 },
    { src: iron, size: 10, rotate: 85, left: 83, top: 40 },
    { src: Comb, size: 10, rotate: 85, left: 90, top: 55 },
    { src: scissors, size: 10, rotate: 85, left: 90, top: 20 },
    { src: dryer, size: 12, rotate: 45, left: 80, top: 30 },
    { src: Comb, size: 10, rotate: 0, left: 87, top: 15 },
    { src: dryer, size: 12, rotate: 5, left: 85, top: 50 },












  ];

  const mobiletools = [
    { src: Comb, size: 10, rotate: 0, left: 35, top: 20 },
    { src: dryer, size: 14, rotate: 30, left: 38, top: 50 },
    { src: scissors, size: 10, rotate: 0, left: 50, top: 30 },
    { src: iron, size: 10, rotate: 0, left: 55, top: 10 },
    { src: Comb, size: 10, rotate: 0, left: 58, top: 49 },
    { src: scissors, size: 10, rotate: 0, left: 70, top: 30 },
    { src: dryer, size: 14, rotate: 30, left: 78, top: 50 },
    { src: iron, size: 12, rotate: 30, left: 78, top: 15 },
  ];


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log('mobile tools', mobiletools)
  return (
    <>
      <header className="shadow-md w-full">

        <div className="relative bg-white h-[140px] border-b border-gray-200 overflow-hidden">
          <div className="absolute left-8 top-1/2  -translate-y-1/2 flex items-center">
            <img
              src={silhouetteLogo}
              alt="Glam by Kai Logo"
              className="h-[100px] w-auto z-50"
            />
          </div>
          {/* desktop */}
          <div className='hidden md:block'>
            {tools.map((tool, index) => {

              return (
                <img
                  key={index}
                  src={tool.src}
                  alt=""
                  style={{
                    position: 'absolute',
                    left: `${tool.left}%`,
                    top: `${tool.top}%`,
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
                    transform: `rotate(${tool.rotate}deg)`,
                    width: `${tool.size * 5}px`,
                    height: `${tool.size * 5}px`,
                    animation: `float ${6 + index}s infinite ease-in-out`
                  }}
                  className="transition-transform duration-300 hover:scale-110 hover:rotate-12"
                />
              );
            })}



          </div>
          <div className="block md:hidden">
            {mobiletools.map((tool, index) => (
              <img
                key={index}
                src={tool.src}
                alt=""
                style={{
                  position: 'absolute',
                  // For mobile, you can adjust the left value as needed.
                  left: `${tool.left}%`,
                  top: `${tool.top}%`,
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))',
                  transform: `rotate(${tool.rotate}deg)`,
                  width: `${tool.size * 5}px`,
                  height: `${tool.size * 5}px`,
                  animation: `float ${6 + index}s infinite ease-in-out`
                }}
                className="transition-transform duration-300 hover:scale-110 hover:rotate-12"
              />
            ))}
          </div>


        </div>

        <nav className="bg-primary h-[60px] md:h-[83px] flex items-end justify-end pr-8">


          <div className="block md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-white"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>



          <ul className="hidden md:flex gap-6 font-jua text-black mb-6 mr-20">
            <li>
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-gray-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-gray-200"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('collections')}
                className="hover:text-gray-200"
              >
                Collections
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-gray-200"
              >
                Contact Us
              </button>
            </li>
          </ul>


          {mobileMenuOpen && (
            <div ref={mobileMenuRef} className="origin-top-right absolute right-0 top-50 w-56 rounded-md shadow-lg bg-gray-200 text-black  mt-2 z-50">
              <div className="py-2" role="menu" aria-orientation="vertical">
                <>
                  <ul >
                    <li>
                      <button
                        onClick={() => scrollToSection('home')}
                        className="hover:text-gray-200"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('services')}
                        className="hover:text-gray-200"
                      >
                        Services
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('collections')}
                        className="hover:text-gray-200"
                      >
                        Collections
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('contact')}
                        className="hover:text-gray-200"
                      >
                        Contact Us
                      </button>
                    </li>
                  </ul>
                </>
              </div>
            </div>
          )}
        </nav>



      </header>
    </>
  )
}

export default DashboardNav