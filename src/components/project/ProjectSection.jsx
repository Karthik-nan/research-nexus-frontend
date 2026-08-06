import React from "react";


function ProjectSection({
    title,
    projects,
    CardComponent
}) {


    return (

        <div className="mb-10">


            <h2 className="
                text-3xl
                font-bold
                mb-6
                text-slate-800
            ">

                {title}

            </h2>




            {
                projects.length === 0 ?


                (

                    <p className="
                        text-gray-500
                    ">

                        No projects found.

                    </p>

                )


                :

                (

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    ">


                        {
                            projects.map(project=>(


                                <CardComponent

                                    key={project.id}

                                    project={project}

                                />


                            ))
                        }


                    </div>

                )


            }


        </div>

    );

}


export default ProjectSection;