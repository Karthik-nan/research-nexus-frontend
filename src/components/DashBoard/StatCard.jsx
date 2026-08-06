import React from "react";

function StatCard({ title, value, icon, color }) {
    return (
        <div
            className={`
                bg-white
                rounded-2xl
                shadow-md
                p-6
                border-l-4
                ${color}
                hover:shadow-xl
                transition
                duration-300
            `}
        >
            <div className="flex items-center justify-between">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold text-slate-800 mt-2">
                        {value}
                    </h2>

                </div>

                <div className="text-5xl">
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatCard;