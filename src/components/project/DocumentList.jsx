import React from "react";


function DocumentList({ documents }) {


    return (

        <div className="mt-8">


            <h2 className="
                text-3xl
                font-bold
                mb-5
                text-slate-800
            ">

                📂 Documents

            </h2>




            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-5
            ">


                {
                    documents.map(doc => (


                        <div

                            key={doc.id}

                            className="
                            bg-white
                            rounded-xl
                            shadow-md
                            border
                            p-5
                            hover:shadow-xl
                            transition
                            "

                        >



                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-3
                            ">


                                <div className="text-3xl">

                                    📄

                                </div>



                                <h3 className="
                                    text-xl
                                    font-bold
                                    text-slate-800
                                ">

                                    {doc.title}

                                </h3>


                            </div>





                            <p className="
                                text-gray-600
                                mb-3
                            ">

                                {doc.description}

                            </p>





                            <p className="
                                text-sm
                                text-gray-500
                                mb-4
                            ">

                                Uploaded by:

                                <b>

                                    {" "}

                                    {doc.userName}

                                </b>

                            </p>






                            <a

                                href={`http://localhost:8080/api/documents/download/${doc.id}`}

                                className="
                                    inline-block
                                    bg-blue-600
                                    text-white
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-blue-700
                                "

                            >

                                ⬇ Download

                            </a>



                        </div>


                    ))

                }


            </div>


        </div>

    );

}


export default DocumentList;