import React from "react";

function ActivityItem({ activity }) {

    return (

        <div className="
            border
            border-gray-200
            rounded-xl
            p-5
            mb-4
            bg-white
            shadow-sm
            hover:shadow-md
            transition
        ">

            <div className="
                flex
                items-center
                justify-between
                gap-3
            ">

                <h3 className="
                    font-semibold
                    text-slate-800
                ">
                    {activity.action}
                </h3>

            </div>

            {activity.description && (

                <p className="
                    text-gray-600
                    mt-2
                ">
                    {activity.description}
                </p>

            )}

            <div className="
                flex
                items-center
                gap-2
                mt-3
                text-sm
                text-gray-400
            ">

                <span>
                    {activity.userName || "Unknown user"}
                </span>

                <span>
                    •
                </span>

                <span>
                    {activity.createdAt
                        ? new Date(activity.createdAt).toLocaleString()
                        : "Unknown time"
                    }
                </span>

            </div>

        </div>

    );
}

export default ActivityItem;