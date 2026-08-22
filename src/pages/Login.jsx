import API_URL from '../config';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const handleLogin = async(e)=>{

    e.preventDefault();


    try{


      const response = await axios.post(

        `${API_URL}/api/users/login`,

        {
          email,
          password
        }

      );



      // Save JWT token

      localStorage.setItem(

        "token",

        response.data.token

      );



      // Save logged-in email

      localStorage.setItem(

        "email",

        email

      );



      navigate("/dashboard");


    }
    catch(error){

      console.log(error);


      alert(

        "Invalid email or password"

      );

    }

  };





  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-100
    ">


      <div className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-96
      ">



        <h1 className="
          text-3xl
          font-bold
          text-center
          text-slate-800
          mb-6
        ">

          Research Nexus

        </h1>





        <h2 className="
          text-xl
          font-semibold
          mb-4
        ">

          Login

        </h2>






        <form onSubmit={handleLogin}>


          <label className="block mb-2">

            Email

          </label>



          <input


            type="email"


            placeholder="Enter email"


            value={email}


            onChange={
              (e)=>setEmail(e.target.value)
            }


            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "


          />







          <label className="block mb-2">

            Password

          </label>





          <input


            type="password"


            placeholder="Enter password"


            value={password}


            onChange={
              (e)=>setPassword(e.target.value)
            }


            className="
              w-full
              border
              p-3
              rounded-lg
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "


          />







          <button


            type="submit"


            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded-lg
              hover:bg-blue-700
              transition
            "


          >

            Login


          </button>




        </form>




      </div>


    </div>

  );


}


export default Login;


