import { usePuterStore } from "~/lib/puter"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" }
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) {
            navigate(next || "/");
        }
    }, [auth.isAuthenticated, next, navigate])

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center px-2">
            {/* Main auth card */}
            <div className="relative w-full max-w-md sm:max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-sm opacity-75"></div>
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20">
                    {/* Header section */}
                    <div className="text-center mb-8 sm:mb-10">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                            Welcome Back! 👋
                        </h1>
                        <p className="text-gray-600 font-medium text-base sm:text-lg">
                            Continue Your Amazing Job Journey
                        </p>
                    </div>
                    {/* Auth button section */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <button
                                disabled
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Signing you in...
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button
                                        onClick={auth.signOut}
                                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log Out
                                    </button>
                                ) : (
                                    <button
                                        onClick={auth.signIn}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                                    >
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In to Continue
                                    </button>
                                )}
                            </>
                        )}

                        {/* Trust indicators */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                Secure Login
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                Quick Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Auth