import React, { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <footer className="bg-black text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top section: 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* ABOUT US */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
                            About Us
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            We offer high-quality wigs designed to empower confidence and
                            self-expression. Discover styles that celebrate individuality
                            and experience the difference with us.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="text-gray-400 hover:text-white hover:-translate-y-4 transition-all duration-500"
                            >
                                <FaFacebookF size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="text-gray-400 hover:text-white hover:-translate-y-4 transition-all duration-500"
                            >
                                <FaInstagram size={20} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="text-gray-400 hover:text-white hover:-translate-y-4 transition-all duration-500"
                            >
                                <FaTwitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* USEFUL LINKS */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
                            Useful Links
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <button
                                    onClick={() => scrollToSection('services')}
                                    className="hover:text-gray-200"
                                >
                                    Our Services
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
                            <li>
                                <a href="/" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>

                        </ul>
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 uppercase tracking-wide">
                            Contact Info
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>
                                <span className="font-semibold">Mon - Sat:</span> 9:00am - 7:00pm
                            </li>
                            <li>
                                <span className="font-semibold">Sun & Holidays:</span> 10:00am - 5:00pm
                            </li>
                            <li>
                                <a href="tel:0594673844" className="text-blue-500 hover:underline">
                                    0594673844
                                </a>
                            </li>
                            <li>
                                <span className="font-semibold">Location:</span> Accra, Ghana
                            </li>
                            <li>
                                <a href="mailto:glambykai.hair@gmail.com" className="text-white">glambykai.hair@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 border-t border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <p>
                        &copy; Glam by Kai Hair. All Rights Reserved
                    </p>
                    <div className="flex space-x-4 mt-2 md:mt-0">
                        <a href="/" className="hover:text-white transition-colors ">
                            Home
                        </a>
                        <a href="/" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <button
                            onClick={() => scrollToSection('collections')}
                            className="hover:text-gray-200"
                        >
                            Collections
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="hover:text-gray-200"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
