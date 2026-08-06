import React from "react";


function ProjectHeader({ project }) {


    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-6
            mt-6
            mb-8
        ">


            <h1 className="
                text-4xl
                font-bold
                text-slate-800
            ">

                🚀 {project.name}

            </h1>



            <p className="mt-4 text-gray-600">

                <b>Description:</b>

                <br/>

                {project.description}

            </p>




            <p className="mt-4">

                <b>Created By:</b>

                {" "}

                {project.createdBy}

            </p>


        </div>

    );

}


export default ProjectHeader;