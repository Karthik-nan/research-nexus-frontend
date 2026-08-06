import React, { useState } from "react";
import axios from "axios";


function UploadDocument({ projectId, onUploadSuccess }) {


    const [title,setTitle] = useState("");

    const [description,setDescription] = useState("");

    const [file,setFile] = useState(null);




    const uploadDocument = async()=>{


        if(!file){

            alert("Select file");

            return;

        }



        try{


            const formData = new FormData();



            formData.append(
                "title",
                title
            );


            formData.append(
                "description",
                description
            );


            formData.append(
                "file",
                file
            );


            formData.append(
                "projectId",
                projectId
            );





            await axios.post(

                "http://localhost:8080/api/documents/upload",

                formData,

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`,

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            alert("Document uploaded");



            setTitle("");

            setDescription("");

            setFile(null);



            onUploadSuccess();


        }
        catch(error){


            console.log(error);

            alert("Upload failed");


        }


    };






    return (

        <div className="
            bg-white
            p-6
            rounded-xl
            shadow
            mb-8
        ">



            <h2 className="
                text-2xl
                font-bold
                mb-5
            ">

                Upload Document

            </h2>





            <input

                className="
                    border
                    p-3
                    w-full
                    mb-3
                "

                placeholder="Title"

                value={title}

                onChange={
                    (e)=>setTitle(e.target.value)
                }

            />






            <textarea

                className="
                    border
                    p-3
                    w-full
                    mb-3
                "

                placeholder="Description"

                value={description}

                onChange={
                    (e)=>setDescription(e.target.value)
                }

            />






            <input

                type="file"

                onChange={
                    (e)=>setFile(e.target.files[0])
                }

                className="mb-4"

            />






            <button

                onClick={uploadDocument}

                className="
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded-lg
                "

            >

                Upload

            </button>



        </div>

    );

}


export default UploadDocument;