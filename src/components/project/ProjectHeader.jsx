import React from "react";

function ProjectHeader({ project, onEdit }) {

    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-6
            mt-6
            mb-8
        ">

            {/* PROJECT TITLE + EDIT BUTTON */}

            <div className="
                flex
                justify-between
                items-center
            ">

                <h1 className="
                    text-4xl
                    font-bold
                    text-slate-800
                ">

                    🚀 {project.name}

                </h1>


                {/* EDIT BUTTON */}

                {project.myRole === "OWNER" && (

                    <button
                        onClick={onEdit}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            transition
                        "
                    >

                        ✏️ Edit Project

                    </button>

                )}

            </div>


            {/* DESCRIPTION */}

            <p className="
                mt-4
                text-gray-600
            ">

                <b>Description:</b>

                <br />

                {project.description}

            </p>


            {/* CREATED BY */}

            <p className="mt-4">

                <b>Created By:</b>

                {" "}

                {project.createdBy}

            </p>

        </div>

    );

}

export default ProjectHeader;