import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar: React.FC = () => {
    const navRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                if (window.scrollY >= 80) {
                    navRef.current.classList.add('nav-dark');
                } else {
                    navRef.current.classList.remove('nav-dark');
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='navbar w-full flex justify-between items-center py-5' ref={navRef}>
            <div className="navbar-left flex gap-x-3">
                <img src={logo} alt="netflix-logo" className='logo mx-3' />
                <ul className='flex items-center gap-x-5 text-md'>
                    <li className='font-semibold'>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>Originals</li>
                    <li>Recently Added</li>
                    <li>My List</li>
                </ul>
            </div>
            <div className="navbar-right flex gap-x-4 items-center">
                <img src={search_icon} alt="Search" className='icons' />
                <p>Children</p>
                <img src={bell_icon} alt="Notifications" className='icons' />
                <div className='navbar-profile group flex gap-x-2 cursor-pointer relative'>
                    <img src={profile_img} alt="Profile" className='profile' />
                    <img src={caret_icon} alt="Dropdown" className='drop-down'/>
                    <div className="dropdown hidden group-hover:block top-6 right-4 px-3 py-2 underline absolute">
                        <p onClick={() => logout()}>Sign out of Netflix</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;