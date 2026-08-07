import React, { useState } from "react";
import axios from "axios";


function AddMember({ projectId, onMemberAdded }) {

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("MEMBER");
    const [message, setMessage] = useState("");


    const addMember = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");


            await axios.post(

                `http://localhost:8080/api/projects/${projectId}/members`,

                {
                    email: email,
                    role: role
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            setMessage("Member added successfully ✅");

            setEmail("");

            if(onMemberAdded){
                onMemberAdded();
            }


        }
        catch(error){

            console.error(error);

            setMessage(
                error.response?.data || "Failed to add member"
            );

        }

    };


    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-6
            mt-6
        ">


            <h2 className="
                text-2xl
                font-bold
                mb-4
            ">
                Add Member
            </h2>



            <form onSubmit={addMember}>


                <input

                    type="email"

                    placeholder="Enter member email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                    className="
                        border
                        p-3
                        rounded-lg
                        w-full
                        mb-3
                    "

                    required

                />



                <select

                    value={role}

                    onChange={(e)=>setRole(e.target.value)}

                    className="
                        border
                        p-3
                        rounded-lg
                        w-full
                        mb-3
                    "

                >

                    <option value="MEMBER">
                        Member
                    </option>


                    <option value="OWNER">
                        Owner
                    </option>


                </select>



                <button

                    type="submit"

                    className="
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                    "

                >

                    Add Member

                </button>


            </form>



            {
                message && (

                    <p className="
                        mt-3
                        text-gray-700
                    ">
                        {message}
                    </p>

                )
            }



        </div>

    );

}


export default AddMember;