import { Link, useNavigate } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { usePuterStore } from '~/lib/puter'
import { RxDashboard } from 'react-icons/rx'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { auth } = usePuterStore()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = () => {
        auth?.signOut()
        setIsDropdownOpen(false)
        setIsMobileMenuOpen(false)
        navigate('/auth')
    }

    const handleWipe = () => {
        setIsDropdownOpen(false)
        setIsMobileMenuOpen(false)
        navigate('/wipe')
    }

    return (
        <header className="navbar">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <p className="text-2xl font-bold text-gradient">Resumind</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/upload" className="primary-button">
                    Upload Resume
                </Link>
                {auth?.isAuthenticated && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setIsDropdownOpen((open) => !open)}
                            aria-label="Dashboard"
                        >
                            <RxDashboard size={26} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-50 flex flex-col">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleWipe}
                                >
                                    Wipe App Data
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
                aria-label="Toggle Menu"
            >
                {isMobileMenuOpen ? (
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl p-6 shadow-lg mt-9 animate-fadeIn">
                    <div className="flex flex-col gap-4">
                        <Link
                            to="/upload"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="primary-button text-center"
                        >
                            Upload Resume
                        </Link>
                        {auth?.isAuthenticated && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors w-full justify-center"
                                    onClick={() => setIsDropdownOpen((open) => !open)}
                                    aria-label="Dashboard"
                                >
                                    <RxDashboard size={24} />
                                    <span>Dashboard</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute left-0 right-0 mt-2 w-full bg-white shadow-lg rounded z-50 flex flex-col">
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            onClick={handleWipe}
                                        >
                                            Wipe App Data
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar