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

    const [currentUser, setCurrentUser] = useState(null);



    const getToken = () => {

        return localStorage.getItem("token");

    };




    useEffect(() => {

        fetchProject();
        fetchMembers();
        fetchDocuments();
        fetchCurrentUser();

    }, []);





    const fetchProject = async () => {

        try {

            const response = await axios.get(

                `http://localhost:8080/api/projects/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }

            );


            setProject(response.data);


        }
        catch(error) {

            console.log(error);

        }

    };





    const fetchMembers = async () => {

        try {


            const response = await axios.get(

                `http://localhost:8080/api/projects/${id}/members`,

                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }

            );


            setMembers(response.data);


        }
        catch(error) {

            console.log(error);

        }

    };






    const fetchDocuments = async () => {

        try {


            const response = await axios.get(

                `http://localhost:8080/api/documents/project/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }

            );


            setDocuments(response.data);


        }
        catch(error) {

            console.log(error);

        }

    };






    const fetchCurrentUser = async () => {

        try {


            const response = await axios.get(

                "http://localhost:8080/api/users/me",

                {
                    headers:{
                        Authorization:`Bearer ${getToken()}`
                    }
                }

            );


            setCurrentUser(response.data);


        }
        catch(error){

            console.log(error);

        }

    };






    const removeMember = async(userId)=>{


        try {


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

            console.log(error);

        }


    };






    if(!project){

        return <h2>Loading...</h2>;

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





            <UploadDocument

                projectId={id}

                onUploadSuccess={fetchDocuments}

            />





            <DocumentList

                documents={documents}

            />





            {
                currentUser?.role === "OWNER" &&

                <AddMember

                    projectId={id}

                    onMemberAdded={fetchMembers}

                />

            }





            <MemberList

                members={members}

                currentUser={currentUser}

                removeMember={removeMember}

            />



        </div>

    );

}


export default ProjectDetails;