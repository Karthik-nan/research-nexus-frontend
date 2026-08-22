import API_URL from '../../config';
import React, { useEffect, useState } from "react";
import ActivityItem from "./ActivityItem";

function ActivityList({ projectId }) {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {

        const fetchActivities = async () => {

            try {

                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${API_URL}/api/activities/project/${projectId}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch activities");
                }

                const data = await response.json();

                setActivities(data);

            } catch (error) {

                console.error(
                    "Activity fetch error:",
                    error
                );

                setError(
                    error.message ||
                    "Failed to load activities"
                );

            } finally {

                setLoading(false);

            }

        };

        if (projectId) {
            fetchActivities();
        }

    }, [projectId]);


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="mt-8">

                <h2 className="
                    text-2xl
                    font-bold
                    text-slate-800
                ">
                    Recent Activity
                </h2>

                <p className="
                    text-gray-500
                    mt-2
                ">
                    Loading activities...
                </p>

            </div>
        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="mt-8">

                <h2 className="
                    text-2xl
                    font-bold
                    text-slate-800
                ">
                    Recent Activity
                </h2>

                <div className="
                    mt-4
                    bg-red-50
                    border
                    border-red-200
                    rounded-xl
                    p-5
                    text-red-600
                ">
                    {error}
                </div>

            </div>
        );

    }


    // =========================
    // NO ACTIVITIES
    // =========================

    if (activities.length === 0) {

        return (
            <div className="mt-8">

                <h2 className="
                    text-2xl
                    font-bold
                    text-slate-800
                ">
                    Recent Activity
                </h2>

                <div className="
                    mt-4
                    bg-gray-50
                    border
                    border-gray-200
                    rounded-xl
                    p-6
                    text-center
                    text-gray-500
                ">
                    No activities yet.
                </div>

            </div>
        );

    }


    // =========================
    // SHOW FIRST 5 OR ALL
    // =========================

    const visibleActivities = showAll
        ? activities
        : activities.slice(0, 5);


    return (

        <div className="mt-8">

            {/* =========================
                HEADER
            ========================= */}

            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-2
                mb-6
            ">

                <div>

                    <h2 className="
                        text-2xl
                        font-bold
                        text-slate-800
                    ">
                        Recent Activity
                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">
                        Track what's happening in this project.
                    </p>

                </div>

                <span className="
                    text-sm
                    font-medium
                    text-gray-500
                ">
                    {activities.length} activities
                </span>

            </div>


            {/* =========================
                ACTIVITY ITEMS
            ========================= */}

            <div>

                {visibleActivities.map((activity) => (

                    <ActivityItem
                        key={activity.id}
                        activity={activity}
                    />

                ))}

            </div>


            {/* =========================
                VIEW ALL / SHOW LESS
            ========================= */}

            {activities.length > 5 && (

                <div className="
                    flex
                    justify-center
                    mt-6
                ">

                    <button
                        type="button"
                        onClick={() =>
                            setShowAll((previous) => !previous)
                        }
                        className="
                            px-6
                            py-2.5
                            rounded-lg
                            border
                            border-gray-300
                            bg-white
                            text-gray-700
                            font-medium
                            hover:bg-gray-50
                            hover:border-gray-400
                            transition
                        "
                    >

                        {showAll
                            ? "Show Less"
                            : `View All Activity (${activities.length})`
                        }

                    </button>

                </div>

            )}

        </div>

    );
}

export default ActivityList;


