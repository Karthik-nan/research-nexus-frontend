import React from "react";
import { Outlet, useNavigate } from "react-router-dom";


function Layout() {


    const navigate = useNavigate();


    const email = localStorage.getItem("email");



    const logout = () => {


        localStorage.removeItem("token");

        localStorage.removeItem("email");


        navigate("/");


    };





    return (


        <div className="
            min-h-screen
            bg-slate-100
        ">



            {/* Top Navbar */}

            <nav className="
                h-16
                bg-white
                shadow-sm
                flex
                items-center
                justify-between
                px-8
                border-b
            ">



                <div
                    className="cursor-pointer"
                    onClick={()=>navigate("/dashboard")}
                >

                    <h1 className="
                        text-2xl
                        font-bold
                        text-blue-700
                    ">

                        Research Nexus

                    </h1>


                </div>







                <div className="
                    flex
                    items-center
                    gap-5
                ">


                    <div className="
                        text-sm
                        text-gray-600
                    ">

                        👤 {email || "User"}

                    </div>




                    <button

                        onClick={logout}

                        className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                        "

                    >

                        Logout

                    </button>


                </div>




            </nav>









            <div className="flex">





                {/* Sidebar */}


                <aside className="
                    w-64
                    min-h-screen
                    bg-slate-900
                    text-white
                    p-6
                ">



                    <h2 className="
                        text-lg
                        font-semibold
                        mb-8
                        text-slate-300
                    ">

                        MENU

                    </h2>







                    <button

                        onClick={()=>navigate("/dashboard")}

                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            mb-3
                            hover:bg-slate-800
                            hover:text-blue-400
                            transition
                        "

                    >

                        🏠 Dashboard

                    </button>









                    <button

                        onClick={()=>navigate("/projects")}

                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            mb-3
                            hover:bg-slate-800
                            hover:text-blue-400
                            transition
                        "

                    >

                        📁 Projects

                    </button>









                    <button

                        onClick={()=>navigate("/projects/new")}

                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            mb-3
                            hover:bg-slate-800
                            hover:text-blue-400
                            transition
                        "

                    >

                        ➕ Create Project

                    </button>









                    <button

                        onClick={()=>navigate("/profile")}

                        className="
                            w-full
                            text-left
                            px-4
                            py-3
                            rounded-lg
                            mb-3
                            hover:bg-slate-800
                            hover:text-blue-400
                            transition
                        "

                    >

                        👤 Profile

                    </button>





                </aside>









                {/* Main Content */}


                <main className="
                    flex-1
                    p-8
                ">


                    <Outlet />


                </main>





            </div>



        </div>


    );


}


export default Layout;

