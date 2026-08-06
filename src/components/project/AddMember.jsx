import React, { useState } from "react";
import axios from "axios";


function AddMember({ projectId, onMemberAdded }) {


    const [memberEmail,setMemberEmail] = useState("");

    const [memberRole,setMemberRole] = useState("MEMBER");





    const addMember = async()=>{


        try{


            await axios.post(

                `http://localhost:8080/api/projects/${projectId}/members`,

                {

                    email: memberEmail,

                    role: memberRole

                },

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );



            alert("Member added");



            setMemberEmail("");



            onMemberAdded();


        }
        catch(error){


            alert(

                error.response?.data ||
                "Failed"

            );


        }


    };





    return (

        <div className="
            bg-white
            rounded-xl
            shadow-md
            p-6
            mb-8
        ">



            <h2 className="
                text-2xl
                font-bold
                mb-5
            ">

                ➕ Add Member

            </h2>





            <div className="
                flex
                gap-3
                flex-wrap
            ">



                <input

                    className="
                        border
                        rounded-lg
                        p-3
                        flex-1
                    "

                    placeholder="Member email"

                    value={memberEmail}

                    onChange={
                        (e)=>
                        setMemberEmail(e.target.value)
                    }

                />






                <select

                    value={memberRole}

                    onChange={
                        (e)=>
                        setMemberRole(e.target.value)
                    }

                    className="
                        border
                        rounded-lg
                        p-3
                    "

                >


                    <option value="MEMBER">

                        MEMBER

                    </option>



                    <option value="ADMIN">

                        ADMIN

                    </option>


                </select>






                <button

                    onClick={addMember}

                    className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-lg
                        hover:bg-green-700
                    "

                >

                    Add Member

                </button>



            </div>



        </div>

    );

}


export default AddMember;