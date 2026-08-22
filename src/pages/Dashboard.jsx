import API_URL from '../config';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProjectSection from "../components/project/ProjectSection";
import MyProjectCard from "../components/project/MyProjectCard";
import ExploreProjectCard from "../components/project/ExploreProjectCard";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {

    const [myProjects, setMyProjects] = useState([]);
    const [exploreProjects, setExploreProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchMyProjects();
        fetchExploreProjects();

    }, []);

    const fetchMyProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/api/projects/my`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMyProjects(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const fetchExploreProjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${API_URL}/api/projects/explore`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExploreProjects(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");

        navigate("/");

    };

    return (

        <div className="
            min-h-screen
            bg-slate-100
            p-8
        ">

            {/* HEADER */}

            <div className="
                flex
                justify-between
                items-center
                mb-10
            ">

                <div>

                    <h1 className="
                        text-4xl
                        font-bold
                        text-slate-800
                    ">
                        Research Nexus
                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Collaborate. Research. Build together.
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => navigate("/projects/new")}
                        className="
                            bg-blue-600
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-blue-700
                            transition
                        "
                    >
                        + Create Project
                    </button>

                    <button
                        onClick={logout}
                        className="
                            bg-red-500
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            font-semibold
                            hover:bg-red-600
                            transition
                        "
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* DASHBOARD STATS */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                mb-10
            ">

                <StatCard
                    title="My Projects"
                    value={myProjects.length}
                    icon="📁"
                    color="border-blue-500"
                />

                <StatCard
                    title="Explore Projects"
                    value={exploreProjects.length}
                    icon="🌍"
                    color="border-green-500"
                />

                <StatCard
                    title="Profile Status"
                    value="Active"
                    icon="👤"
                    color="border-purple-500"
                />

            </div>

            {/* MY PROJECTS */}

            <ProjectSection
                title="📌 My Projects"
                projects={myProjects}
                CardComponent={MyProjectCard}
            />

            {/* EXPLORE PROJECTS */}

            <ProjectSection
                title="🌎 Explore Projects"
                projects={exploreProjects}
                CardComponent={ExploreProjectCard}
            />

        </div>

    );

}

export default Dashboard;


