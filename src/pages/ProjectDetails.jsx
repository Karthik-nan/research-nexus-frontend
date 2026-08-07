import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import ProjectHeader from "../components/project/ProjectHeader";
import DocumentList from "../components/project/DocumentList";
import UploadDocument from "../components/project/UploadDocument";
import MemberList from "../components/project/MemberList";
import AddMember from "../components/project/AddMember";


function ProjectDetails() {


    const { id } = useParams();

    const navigate = useNavigate();


    const [project, setProject] = useState(null);

    const [members, setMembers] = useState([]);

    const [documents, setDocuments] = useState([]);

    const [loading, setLoading] = useState(true);



    const getToken = () => {

        return localStorage.getItem("token");

    };





    useEffect(() => {

        if(id){

            loadProjectData();

        }

    }, [id]);





    const loadProjectData = async()=>{

        await Promise.all([

            fetchProject(),

            fetchMembers(),

            fetchDocuments()

            

        ]);


        setLoading(false);

    };







    const fetchProject = async () => {

        try {

            console.log("Project ID:", id);


            const response = await axios.get(

                `http://localhost:8080/api/projects/${id}`,

                {
                    headers:{
                        Authorization:`Bearer ${getToken()}`
                    }
                }

            );


            console.log("Project Response:", response.data);


            setProject(response.data);


        }
        catch(error){

            console.log(
                "Project Error:",
                error.response?.data || error.message
            );

        }

    };








    const fetchMembers = async()=>{


        try{


            const response = await axios.get(

                `http://localhost:8080/api/projects/${id}/members`,

                {
                    headers:{
                        Authorization:`Bearer ${getToken()}`
                    }
                }

            );


            setMembers(response.data);


        }
        catch(error){

            console.log(
                "Members Error:",
                error.response?.data || error.message
            );

        }


    };








    const fetchDocuments = async()=>{


        try{


            const response = await axios.get(

                `http://localhost:8080/api/documents/project/${id}`,

                {
                    headers:{
                        Authorization:`Bearer ${getToken()}`
                    }
                }

            );


            setDocuments(response.data);


        }
        catch(error){

            console.log(
                "Documents Error:",
                error.response?.data || error.message
            );

        }


    };


    const removeMember = async(userId)=>{


        try{


            await axios.delete(

                `http://localhost:8080/api/projects/${id}/members/${userId}`,

                {
                    headers:{
                        Authorization:`Bearer ${getToken()}`
                    }
                }

            );


            fetchMembers();


        }
        catch(error){

            console.log(
                "Remove Member Error:",
                error.response?.data || error.message
            );

        }


    };








    if(loading){

        return (

            <div className="p-8 text-xl font-semibold">

                Loading project...

            </div>

        );

    }







    if(!project){

    return (

        <div className="p-8">

            <h2 className="text-xl font-bold">

                Project not found

            </h2>


            <button

                onClick={()=>navigate("/dashboard")}

                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"

            >

                Go Back

            </button>

        </div>

    );

}









    return (

        <div className="p-8">


            <button

                onClick={()=>navigate("/dashboard")}

                className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded-lg
                "

            >

                ← Back

            </button>




         <ProjectHeader
    project={project}
/>

{project?.myRole === "OWNER" && (
    <UploadDocument
        projectId={id}
        onUploadSuccess={fetchDocuments}
    />
)}

<DocumentList
    documents={documents}
/>


           {
           project?.myRole === "OWNER" && (
    <AddMember
        projectId={id}
        onMemberAdded={fetchMembers}
    />
              )

           }







         <MemberList
    members={members}
    myRole={project?.myRole}
    removeMember={removeMember}
          />



        </div>

    );

}


export default ProjectDetails;