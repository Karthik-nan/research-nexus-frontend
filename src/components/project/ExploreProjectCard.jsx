import React from "react";
import { useNavigate } from "react-router-dom";


function ExploreProjectCard({project}) {


    const navigate = useNavigate();



    return (

        <div className="
            bg-white
            rounded-xl
            shadow-md
            border
            p-6
            hover:shadow-xl
            transition
        ">


            <div className="
                flex
                justify-between
                items-start
            ">


                <h3 className="
                    text-2xl
                    font-bold
                    text-slate-800
                ">

                    {project.name}

                </h3>



                <span className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                ">

                    Project

                </span>


            </div>





            <p className="
                mt-3
                text-gray-600
            ">

                {project.description}

            </p>





            <p className="
                mt-4
                text-sm
                text-gray-500
            ">


                👤 Created By:

                <b className="text-slate-700">

                    {" "}

                    {project.createdBy}

                </b>


            </p>






            <button

                onClick={()=>navigate(`/project/${project.id}`)}

                className="
                    mt-5
                    bg-green-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-green-700
                    transition
                "

            >

                View Project →

            </button>




        </div>

    );

}


export default ExploreProjectCard;