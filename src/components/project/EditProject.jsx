import React, { useState } from "react";
import axios from "axios";

function EditProject({ project, onUpdated, onCancel }) {

    const [name, setName] = useState(project.name || "");
    const [description, setDescription] = useState(
        project.description || ""
    );

    const [loading, setLoading] = useState(false);

    const getToken = () => {
        return localStorage.getItem("token");
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            alert("Project name cannot be empty");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.put(
                `http://localhost:8080/api/projects/${project.id}`,
                {
                    name: name.trim(),
                    description: description.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(
                "Updated Project:",
                response.data
            );

            alert("Project updated successfully");

            onUpdated(response.data);

        } catch (error) {

            console.log(
                "Update Project Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data ||
                "Failed to update project"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="
            bg-white
            rounded-xl
            shadow-lg
            p-6
            mb-8
            border
        ">

            <h2 className="
                text-2xl
                font-bold
                text-slate-800
                mb-6
            ">
                ✏️ Edit Project
            </h2>


            {/* PROJECT NAME */}

            <label className="
                block
                font-semibold
                mb-2
            ">
                Project Name
            </label>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    px-4
                    py-3
                    mb-5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                placeholder="Enter project name"
            />


            {/* DESCRIPTION */}

            <label className="
                block
                font-semibold
                mb-2
            ">
                Description
            </label>

            <textarea
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
                rows="4"
                className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    px-4
                    py-3
                    mb-5
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
                placeholder="Enter project description"
            />


            {/* BUTTONS */}

            <div className="flex gap-3">

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        disabled:bg-green-300
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        font-semibold
                    "
                >
                    {loading
                        ? "Saving..."
                        : "💾 Save Changes"
                    }
                </button>


                <button
                    onClick={onCancel}
                    disabled={loading}
                    className="
                        bg-gray-200
                        hover:bg-gray-300
                        disabled:bg-gray-100
                        text-gray-800
                        px-5
                        py-2
                        rounded-lg
                        font-semibold
                    "
                >
                    ❌ Cancel
                </button>

            </div>

        </div>
    );
}

export default EditProject;