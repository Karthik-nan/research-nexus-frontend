import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import ProjectHeader from "../components/project/ProjectHeader";
import EditProject from "../components/project/EditProject";
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

    // =========================
    // EDIT PROJECT STATE
    // =========================

    const [showEditForm, setShowEditForm] = useState(false);

    // =========================
    // GET TOKEN
    // =========================

    const getToken = () => {
        return localStorage.getItem("token");
    };

    // =========================
    // LOAD PROJECT DATA
    // =========================

    useEffect(() => {

        if (id) {
            loadProjectData();
        }

    }, [id]);

    const loadProjectData = async () => {

        setLoading(true);

        await Promise.all([
            fetchProject(),
            fetchMembers(),
            fetchDocuments()
        ]);

        setLoading(false);
    };

    // =========================
    // FETCH PROJECT
    // =========================

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

            console.log(
                "Project Response:",
                response.data
            );

            setProject(response.data);

        } catch (error) {

            console.log(
                "Project Error:",
                error.response?.data || error.message
            );

        }
    };

    // =========================
    // FETCH MEMBERS
    // =========================

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

        } catch (error) {

            console.log(
                "Members Error:",
                error.response?.data || error.message
            );

        }
    };

    // =========================
    // FETCH DOCUMENTS
    // =========================

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

        } catch (error) {

            console.log(
                "Documents Error:",
                error.response?.data || error.message
            );

        }
    };

    // =========================
    // PROJECT UPDATED
    // =========================

    const handleProjectUpdated = (updatedProject) => {

        setProject(updatedProject);

        setShowEditForm(false);

    };

    // =========================
    // HANDLE DOCUMENT DELETE
    // =========================

    const handleDocumentDelete = (documentId) => {

        setDocuments(prevDocuments =>
            prevDocuments.filter(
                doc => doc.id !== documentId
            )
        );

    };

    // =========================
    // REMOVE MEMBER
    // =========================

    const removeMember = async (userId) => {

        try {

            await axios.delete(
                `http://localhost:8080/api/projects/${id}/members/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            fetchMembers();

        } catch (error) {

            console.log(
                "Remove Member Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data ||
                "Failed to remove member"
            );

        }
    };

    // =========================
    // DELETE PROJECT
    // =========================

    const deleteProject = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/api/projects/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                }
            );

            alert("Project deleted successfully");

            navigate("/dashboard");

        } catch (error) {

            console.log(
                "Delete Project Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data ||
                "Failed to delete project"
            );

        }
    };

    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="p-8 text-xl font-semibold">
                Loading project...
            </div>
        );

    }

    // =========================
    // PROJECT NOT FOUND
    // =========================

    if (!project) {

        return (

            <div className="p-8">

                <h2 className="text-xl font-bold">
                    Project not found
                </h2>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="
                        mt-4
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                >
                    Go Back
                </button>

            </div>

        );

    }

    // =========================
    // PAGE
    // =========================

    return (

        <div className="p-8">

            {/* =========================
                BACK BUTTON
            ========================= */}

            <button
                onClick={() => navigate("/dashboard")}
                className="
                    bg-gray-200
                    hover:bg-gray-300
                    px-4
                    py-2
                    rounded-lg
                    mb-4
                "
            >
                ← Back
            </button>


            {/* =========================
                PROJECT HEADER
            ========================= */}

            <ProjectHeader
                project={project}
                onEdit={() => setShowEditForm(true)}
            />


            {/* =========================
                EDIT PROJECT
            ========================= */}

            {showEditForm &&
                project.myRole === "OWNER" && (

                <EditProject
                    project={project}
                    onUpdated={handleProjectUpdated}
                    onCancel={() => setShowEditForm(false)}
                />

            )}


            {/* =========================
                DELETE PROJECT
            ========================= */}

            {project.myRole === "OWNER" && (

                <div className="
                    flex
                    justify-end
                    mt-3
                    mb-6
                ">

                    <button
                        onClick={deleteProject}
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            shadow-sm
                            transition
                        "
                    >
                        🗑️ Delete Project
                    </button>

                </div>

            )}


            {/* =========================
                UPLOAD DOCUMENT
            ========================= */}

            {project.myRole === "OWNER" && (

                <UploadDocument
                    projectId={id}
                    onUploadSuccess={fetchDocuments}
                />

            )}


            {/* =========================
                DOCUMENT LIST
            ========================= */}

            <DocumentList
                documents={documents}
                myRole={project.myRole}
                onDelete={handleDocumentDelete}
            />


            {/* =========================
                ADD MEMBER
            ========================= */}

            {project.myRole === "OWNER" && (

                <AddMember
                    projectId={id}
                    onMemberAdded={fetchMembers}
                />

            )}


            {/* =========================
                MEMBER LIST
            ========================= */}

            <MemberList
                members={members}
                myRole={project.myRole}
                removeMember={removeMember}
            />

        </div>

    );

}

export default ProjectDetails;