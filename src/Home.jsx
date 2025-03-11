import React from 'react'
import DashboardNav from './DashboardNav'
import { useState, useEffect, useRef } from 'react';
import reconstruction from './assets/Reconstruction.png'
import openSign from './assets/opensign.png'
import closeSign from './assets/closedsign.png'
import Footer from './Footer';
import axios from "axios";
import sorry from './assets/logoutmodal.png';
import ok from './assets/ok.png';



const Home = () => {
    const [showDescription, setShowDescription] = useState(false);
    const [showDescription2, setShowDescription2] = useState(false);
    const [showDescription3, setShowDescription3] = useState(false);
    const [showDescription4, setShowDescription4] = useState(false);
    const [isConfirmSubmitModalOpen, setIsConfirmSubmitModalOpen] = useState(false);
    const [IsSubmitErrorModalOpen, setIsSubmitErrorModalOpen] = useState(false);
    const [holidays, setHolidays] = useState([]);
    const countryCode = 'US'
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    // Handle form input changes

    const carouselRef = useRef(null);
    const scrollAmount = 1120;
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const [sign, setSign] = useState(openSign);
    useEffect(() => {
        const fetchHolidays = async () => {
            if (!countryCode) {
                console.error("No country code provided");
                setHolidays([]);                return;
            }

            try {
                const year = new Date().getFullYear();
                const response = await axios.get(
                    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
                );

                // Add response validation
                if (!response.data || !Array.isArray(response.data)) {
                    throw new Error("Invalid API response format");
                }

                console.log('api response', response.data)
                const fetchedHolidays = response.data.map(holiday => holiday.date);
                setHolidays(fetchedHolidays);

            } catch (error) {
                console.error("Error fetching holidays:", error);
                setHolidays([]);
            }
        };

        fetchHolidays();
    }, [countryCode]);

    useEffect(() => {
        const updateSign = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const day = now.getDay();

            // Get local date in YYYY-MM-DD format (instead of ISO)
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const date = String(now.getDate()).padStart(2, '0');
            const todayDate = `${year}-${month}-${date}`;

            const isHoliday = holidays.includes(todayDate);
            let openStatus = false;

            if (isHoliday || day === 0) { // Sunday
                openStatus = (hours >= 10 && hours < 17);
            } else {
                openStatus = (hours >= 9 && hours < 19);
            }

            setIsOpen(openStatus);
            setSign(openStatus ? openSign : closeSign);
        };

        updateSign();
        const interval = setInterval(updateSign, 60000);
        return () => clearInterval(interval);
    }, [holidays]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const elasticEmailUrl = "https://api.elasticemail.com/v2/email/send";
            const apiKey = import.meta.env.VITE_API_KEY;

            const bodyHtml = `
            <h3>New Booking Request</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${formData.message}</p>
          `;
            const bodyText = `New Booking Request
                 Name: ${formData.name}
                 Phone: ${formData.phone}
                 Email: ${formData.email}
                 Message: ${formData.message}`;

            // Create the payload with all required parameters
            const emailData = {
                apikey: apiKey,
                from: "glambykai.hair@gmail.com",
                fromName: "GlamByKai",
                to: 'glambykai.hair@gmail.com',
                subject: "New Booking Request from Website",
                bodyHtml: bodyHtml,
                bodyText: bodyText,

            };

            const response = await fetch(elasticEmailUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(emailData),
            });

            console.log("Status:", response.status);

            const result = await response.json();
            console.log("Response:", result);

            if (result.success) {
                console.log("Email sent successfully");
                setIsConfirmSubmitModalOpen(true);
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setIsSubmitErrorModalOpen(true);
            setFormData({
                name: "",
                phone: "",
                email: "",
                message: ""
            })

        }
    };



    const scrollLeft = () => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.offsetWidth;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const { scrollLeft: currentScroll, offsetWidth, scrollWidth } = carouselRef.current;
            const scrollAmount = offsetWidth;

            if (currentScroll + offsetWidth >= scrollWidth - 1) {
                carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const cardData = [
        {
            title: 'Curling',
            description: 'Get soft, beautiful curls with our gentle wig curling service, adding volume and wave to any style.',
            image: reconstruction,
        },
        {
            title: 'Straightening',
            description: 'Achieve a sleek, polished look with our gentle wig straightening service, leaving your wig smooth and natural-looking.',
            image: reconstruction,
        },
        {
            title: 'Hair Dying',
            description: 'Add vibrant color to your wig with our safe, expert coloring service to bring your ideal shade to life.',
            image: reconstruction,
        },
        {
            title: 'Hair Dying',
            description: 'Add vibrant color to your wig with our safe, expert coloring service to bring your ideal shade to life.',
            image: reconstruction,
        }, {
            title: 'Hair Dying',
            description: 'Add vibrant color to your wig with our safe, expert coloring service to bring your ideal shade to life.',
            image: reconstruction,
        }, {
            title: 'Hair Dying',
            description: 'Add vibrant color to your wig with our safe, expert coloring service to bring your ideal shade to life.',
            image: reconstruction,
        }, {
            title: 'Hair Dying',
            description: 'Add vibrant color to your wig with our safe, expert coloring service to bring your ideal shade to life.',
            image: reconstruction,
        },
    ];



    return (
        <>
            <DashboardNav />
            <div
                id="home"
                className="relative flex flex-col min-h-screen bg-cover bg-center home-container"
            >
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Content container */}
                <div className="relative z-10 flex flex-col justify-center items-start p-8 md:p-16 text-white h-full">
                    <h1 className="text-3xl md:text-5xl font-bold font-openSans mb-4">
                        Look Great With Extensions
                    </h1>

                    <ul className="space-y-4 font-aggy text-xl mb-6">
                        {/* 100% Human Hair */}
                        <li className="flex items-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border text-white mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            100% Human Hair
                        </li>

                        {/* Naturally Treated */}
                        <li className="flex items-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border text-white mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            Naturally Treated
                        </li>

                        {/* Highest Quality */}
                        <li className="flex items-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border text-white mr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                            Highest Quality
                        </li>
                    </ul>


                    <button className="bg-primary hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold"
                        onClick={() => scrollToSection('contact')}
                    >
                        Shop Now
                    </button>
                </div>
            </div>

            <div id="services" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Heading and Subheading */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl  font-arima  text-gray-900">
                            Premium Hair Services
                        </h2>
                        <p className="mt-3 text-xl md:text-lg text-gray-600  font-openSans max-w-2xl mx-auto">
                            Our premium hair services offer expert customization, styling,
                            and conditioning for wigs, ensuring a natural look and long-lasting quality.
                            Perfect for personalized style and maintenance.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1: Wig Reconstruction */}
                        <div
                            className="relative w-full h-80 rounded-2xl shadow-md hover:-translate-y-4 transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => setShowDescription(!showDescription)}
                        >
                            {/* Image covers entire card */}
                            <img
                                src={reconstruction}
                                alt="Wig Reconstruction"
                                className="w-full h-full object-cover"
                            />

                            {/* Title centered over the image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-lg font-semibold text-white font-jua drop-shadow-lg">
                                    Wig Reconstruction
                                </h3>
                            </div>

                            {/* Description overlay appears on click */}
                            {showDescription && (
                                <div className="absolute inset-0 bg-black/30  flex items-center justify-center p-4">
                                    <p className="text-sm text-white text-center">
                                        Expert repairs and revitalization for your existing wigs.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Card 2*/}
                        <div
                            className="relative w-full h-80 rounded-2xl shadow hover:-translate-y-4 transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => setShowDescription2(!showDescription2)}
                        >
                            {/* Image covers entire card */}
                            <img
                                src={reconstruction}
                                alt="Closure Wig Making"
                                className="w-full h-full object-cover"
                            />

                            {/* Title centered over the image */}
                            <div className="absolute inset-0 flex items-center font-jua justify-center">
                                <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                                    Closure Wig Making
                                </h3>
                            </div>

                            {/* Description overlay appears on click */}
                            {showDescription2 && (
                                <div className="absolute inset-0 bg-black/30  flex items-center font-jua justify-center p-4">
                                    <p className="text-sm text-white text-center">
                                        Custom-made closures for a seamless, natural hairline.                                    </p>
                                </div>
                            )}
                        </div>


                        <div
                            className="relative w-full h-80 rounded-2xl shadow hover:-translate-y-4 transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => setShowDescription3(!showDescription3)}
                        >
                            {/* Image covers entire card */}
                            <img
                                src={reconstruction}
                                alt="Closure Wig Making"
                                className="w-full h-full object-cover"
                            />

                            {/* Title centered over the image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-lg font-semibold text-white font-jua drop-shadow-lg">
                                    Revamps
                                </h3>
                            </div>

                            {/* Description overlay appears on click */}
                            {showDescription3 && (
                                <div className="absolute inset-0 bg-black/30  flex items-center font-jua justify-center p-4">
                                    <p className="text-sm text-white text-center">
                                        Transform and refresh your wig with modern styling techniques.
                                    </p>
                                </div>
                            )}
                        </div>



                        <div
                            className="relative w-full h-80 rounded-2xl shadow hover:-translate-y-4 transition-all duration-300 overflow-hidden cursor-pointer"
                            onClick={() => setShowDescription4(!showDescription4)}
                        >
                            {/* Image covers entire card */}
                            <img
                                src={reconstruction}
                                alt="Closure Wig Making"
                                className="w-full h-full object-cover"
                            />

                            {/* Title centered over the image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-lg font-semibold text-white font-jua drop-shadow-lg">
                                    Natural Cornrows
                                </h3>
                            </div>

                            {/* Description overlay appears on click */}
                            {showDescription4 && (
                                <div className="absolute inset-0 bg-black/30  flex items-center font-jua justify-center p-4">
                                    <p className="text-sm text-white text-center">
                                        Authentic, protective styles with a modern twist.
                                    </p>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>


            <div className="py-16 bg-primary rounded-2xl" id='collections'>
                {/* Container for heading and subheading */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-arima">Featured Styles</h2>
                    <p className="mt-3 text-base font-openSans md:text-lg max-w-3xl mx-auto">
                        Our featured Styles showcase our top-quality wigs, highlighting
                        the latest styles, colors, and textures to suit any look. Find your
                        perfect match in our curated selection.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200 md:block hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Carousel Container */}
                    <div
                        ref={carouselRef}
                        className="overflow-x-hidden scroll-smooth mx-auto w-full max-w-[1120px]"
                    >
                        <div className="flex gap-8">
                            {cardData.map((item, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow w-[250px] flex-shrink-0 sm:w-[calc(50%-16px)] md:w-[250px]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-52 object-cover rounded-t-2xl"
                                    />
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-semibold font-jua text-gray-900">{item.title}</h3>
                                        <p className="mt-2 text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-200 md:block hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Mobile Arrows */}
                    <div className="md:hidden flex justify-center gap-4 mt-4">
                        <button
                            onClick={scrollLeft}
                            className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={scrollRight}
                            className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>


            <div className="max-w-6xl mx-auto px-4  py-16" id='contact'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column: Image */}
                    <div className="flex justify-center md:justify-start">
                        <img
                            src={sign}
                            alt="sign"
                            className="w-[400px] h-auto object-cover "
                        />
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium font-arima mb-2">
                            Book Your Visit
                        </h2>
                        {/* Thin black bar under the heading (optional) */}
                        <div className="w-16 h-1 bg-black mb-6" />

                        <form onSubmit={handleSubmit} className="font-cambo">
                            {/* Name and Phone */}
                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block text-lg font-medium mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border-b border-black focus:outline-none px-0 py-1"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-lg font-medium mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border-b border-black focus:outline-none px-0 py-1"
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-lg font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border-b border-black focus:outline-none px-0 py-1"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Message */}
                            <div className="mb-6">
                                <label className="block text-lg font-medium mb-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border-b border-black focus:outline-none px-0 py-1 resize-none"
                                    rows="3"
                                    placeholder="Your message..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`bg-black text-white px-6 py-2 rounded font-semibold transition-colors ${isOpen ? "hover:bg-gray-800 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                disabled={!isOpen}
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>



            {
                isConfirmSubmitModalOpen && (
                    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-xl w-full relative">
                            <button className="absolute top-2 right-2 text-secondary hover:text-gray-800" onClick={() => setIsConfirmSubmitModalOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <img src={ok} alt="Success" className="mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-primary">Success!</h2>
                                <p className="text-body-text font-medium my-4">
                                    You’ve successfully sent your request.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                IsSubmitErrorModalOpen && (
                    <div className="fixed inset-0 bg-gray-600/50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-xl w-full relative">
                            <button className="absolute top-2 right-2 text-secondary hover:text-gray-800" onClick={() => setIsSubmitErrorModalOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <img src={sorry} alt="Success" className="mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-primary">sorry</h2>
                                <p className="text-body-text font-medium my-4">
                                    There seems to be an error trying to submit your  request. Please try again later. if the issue persists contact support.   </p>
                            </div>
                        </div>
                    </div>
                )
            }

            <Footer />
        </>
    )
}

export default Home