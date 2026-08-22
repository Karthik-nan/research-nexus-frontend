import API_URL from '../config';
import React, { useEffect, useState } from "react";
import axios from "axios";


function Profile() {


    const [user,setUser] = useState(null);





    useEffect(()=>{

        fetchUser();

    },[]);






    const fetchUser = async()=>{


        try{


            const token = localStorage.getItem("token");


            const response = await axios.get(

                `${API_URL}/api/users/me`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );


            setUser(response.data);



        }
        catch(error){

            console.log(
                "Failed to load profile",
                error
            );

        }


    };







    if(!user){

        return (

            <h2 className="text-xl">

                Loading profile...

            </h2>

        );

    }







    return (


        <div>



            <h1 className="
                text-3xl
                font-bold
                text-slate-800
                mb-6
            ">

                My Profile

            </h1>








            <div className="
                bg-white
                rounded-xl
                shadow
                p-8
                max-w-xl
            ">





                <div className="
                    flex
                    items-center
                    gap-5
                    mb-6
                ">



                    <div className="
                        w-20
                        h-20
                        rounded-full
                        bg-blue-600
                        text-white
                        flex
                        items-center
                        justify-center
                        text-3xl
                        font-bold
                    ">

                        {user.name?.charAt(0)}

                    </div>





                    <div>


                        <h2 className="
                            text-2xl
                            font-bold
                        ">

                            {user.name}

                        </h2>


                        <p className="
                            text-gray-500
                        ">

                            {user.email}

                        </p>


                    </div>



                </div>









                <div className="space-y-4">



                    <div className="
                        border
                        p-4
                        rounded-lg
                    ">


                        <p className="text-gray-500">

                            User ID

                        </p>


                        <p className="font-semibold">

                            {user.id}

                        </p>


                    </div>






                    <div className="
                        border
                        p-4
                        rounded-lg
                    ">


                        <p className="text-gray-500">

                            Account Status

                        </p>


                        <p className="
                            font-semibold
                            text-green-600
                        ">

                            Active

                        </p>


                    </div>





                </div>





            </div>




        </div>


    );


}


export default Profile;


