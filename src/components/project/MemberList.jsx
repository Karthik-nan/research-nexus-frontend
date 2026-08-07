import React from "react";

function MemberList({ members, myRole, removeMember }) {

    return (

        <div className="mt-8">

            <h2 className="text-3xl font-bold mb-5 text-slate-800">
                👥 Project Members
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {members.map((member) => (

                    <div
                        key={member.userId}
                        className="bg-white border rounded-xl shadow p-5"
                    >

                        <div className="flex items-center gap-3">

                            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center text-xl">
                                👤
                            </div>

                            <div>

                                <h3 className="font-bold">
                                    {member.email}
                                </h3>

                                <p className="text-gray-600">
                                    Role:
                                    <span className="font-semibold ml-2">
                                        {member.role}
                                    </span>
                                </p>

                            </div>

                        </div>

                        {myRole === "OWNER" && member.role !== "OWNER" && (

                            <button
                                onClick={() => removeMember(member.userId)}
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Remove
                            </button>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}

export default MemberList;