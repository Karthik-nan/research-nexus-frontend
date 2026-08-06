import React from "react";
import { useNavigate } from "react-router-dom";


function MyProjectCard({project}) {


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
            cursor-pointer
        ">


            <h3 className="
                text-2xl
                font-bold
                text-slate-800
            ">
                {project.name}
            </h3>



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

                <b>
                    {" "}
                    {project.createdBy}
                </b>

            </p>



            <button

                onClick={()=>navigate(`/project/${project.id}`)}

                className="
                    mt-5
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                "

            >

                Open Project →

            </button>



        </div>

    );

}


export default MyProjectCard;