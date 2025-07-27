import { Mail, MapPin, Linkedin, Instagram, Youtube, Facebook, ArrowRight } from "lucide-react";
import logo from '../../assets/Images/png/Ecell_white.png'; // adjust path based on your file structure


const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/kiit-e-cell/posts/?feedView=all",
        icon: <Linkedin size={28} className="text-white/80 group-hover:text-blue-400 transition-colors" />,
        bg: "bg-blue-900/30",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/ecell_kiit?igsh=cnpkNnlqZDNlNmpk",
        icon: <Instagram size={28} className="text-white/80 group-hover:text-blue-400 transition-colors" />,
        bg: "bg-blue-900/30",
    },
    {
        name: "YouTube",
        href: "https://youtube.com/@kiit-ecell?si=NlFC7PpmzbjpMXk5",
        icon: <Youtube size={28} className="text-white/80 group-hover:text-blue-400 transition-colors" />,
        bg: "bg-blue-900/30",
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/share/1EYQBw86KY/",
        icon: <Facebook size={28} className="text-white/80 group-hover:text-blue-400 transition-colors" />,
        bg: "bg-blue-900/30",
    },
];

const BlogFooter = () => {
    return (
        <footer className="text-white/90 pt-12 pb-4 px-2 md:px-8 w-full animate-fade-in"
            style={{
                background: `linear-gradient(to bottom, #04192200 0%, #04192267 40.5%, #000000 81%)`,
            }}>
            <div className="mx-auto max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-4">
                {/* Logo and subscribe */}
                <div className="flex flex-col col-span-1 gap-5">
                    {/* Logo */}
                    <div className="flex flex-col gap-2 animate-fade-in">
                        <div className="flex items-center gap-4">
                            {/* Logo block - E in box */}
                            <div className="flex flex-col gap-1 w-full">
                                {/* The geometric E logo */}
                                <div className="flex flex-col items-center text-center w-full max-w-[180px]">
                                    <img
                                        src={logo}
                                        alt="Logo"
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div className="uppercase text-[10px] sm:text-xs text-blue-300 font-medium pt-2 leading-tight tracking-wide">
                                        Kalinga Institute Of Industrial Technology
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Subscribe section */}
                    <div className="pt-3">
                        <p className="font-medium text-base mb-2 text-white/90">Subscribe to Our Blogs</p>
                        <form className="relative w-full group">
                            <input
                                type="email"
                                className="w-full px-5 py-3 rounded-full bg-transparent border-2 border-blue-600 text-white/90 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                placeholder="Enter your email"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 my-auto h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors"
                                tabIndex={-1}
                            >
                                <ArrowRight size={22} className="text-white" />
                            </button>
                        </form>
                    </div>
                    <div className="pt-3">
                        <p className="font-medium text-base mb-2 text-white/90">Get connected with us on social networks:</p>
                        <div className="flex gap-4">
                            {socialLinks.map(link => (
                                <a
                                    href={link.href}
                                    key={link.name}
                                    aria-label={link.name}
                                    className={`rounded-lg p-1.5 ${link.bg} group transition-transform hover:scale-110 focus:scale-105 ring-1 ring-blue-600`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Initiatives */}
                <div>
                    <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase">Our Initiatives</h3>
                    <ul className="space-y-1 text-base">
                        <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">E-Summit</li>
                        <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">BuildSchool</li>
                        <li className="hover:text-blue-300 transition-colors duration-150 cursor-pointer">Ideathon</li>

                    </ul>
                </div>
                {/* Useful Links */}
                <div>
                    <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase">Useful Links</h3>
                    <ul className="space-y-1 text-base">
                        <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">Home</li>
                        <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">About Us</li>
                        <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">E-Cell Blog</li>
                        <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">Gallery</li>
                        <li className="hover:text-blue-300 cursor-pointer transition-colors duration-150">Contact Us</li>
                    </ul>
                </div>
                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold mb-2 text-blue-400 tracking-wider uppercase">Contact</h3>
                    <div className="flex items-start gap-3 mb-3">
                        <MapPin size={22} className="text-blue-400 mt-0.5" />
                        <span className="text-base text-white/90">E-cell KIIT<br />Bhubaneswar,Odisha</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail size={22} className="text-blue-400" />
                        <a href="mailto:support@ecell.in" className="underline hover:text-blue-300 duration-150">
                            support@ecell.in
                        </a>
                    </div>
                </div>
            </div>
            {/* Copyright */}
            <div className="mx-auto mt-8 pt-4 border-t border-blue-600 text-center text-blue-400 text-base font-medium animate-fade-in">
                © 2025 Copyright: KIIT E-cell
            </div>
        </footer>
    );
};

export default BlogFooter;