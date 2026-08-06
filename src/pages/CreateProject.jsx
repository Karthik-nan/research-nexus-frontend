import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateProject() {


const navigate = useNavigate();


const [name,setName] = useState("");

const [description,setDescription] = useState("");

const [loading,setLoading] = useState(false);





const createProject = async()=>{


if(!name || !description){

alert("Please fill all fields");

return;

}



try{


setLoading(true);


const token = localStorage.getItem("token");



await axios.post(

"http://localhost:8080/api/projects",

{

name:name,

description:description

},

{

headers:{

Authorization:`Bearer ${token}`

}

}

);



alert("Project created successfully");


navigate("/dashboard");



}

catch(error){


console.log(error);


alert("Failed to create project");


}

finally{


setLoading(false);


}



};






return (

<div className="max-w-3xl mx-auto">



<div className="
bg-white
shadow-lg
rounded-xl
p-8
">


<h1 className="
text-3xl
font-bold
mb-6
text-slate-800
">

Create New Project

</h1>





<label className="
block
font-semibold
mb-2
">

Project Name

</label>



<input

type="text"

placeholder="Enter project name"

value={name}

onChange={(e)=>setName(e.target.value)}

className="
w-full
border
rounded-lg
p-3
mb-5
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

/>








<label className="
block
font-semibold
mb-2
">

Description

</label>



<textarea

rows="5"

placeholder="Enter project description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

className="
w-full
border
rounded-lg
p-3
mb-6
focus:outline-none
focus:ring-2
focus:ring-blue-500
"

/>







<button

onClick={createProject}

disabled={loading}

className="
bg-blue-600
text-white
px-6
py-3
rounded-lg
hover:bg-blue-700
disabled:bg-gray-400
"

>


{

loading ? "Creating..." : "Create Project"

}


</button>




<button

onClick={()=>navigate("/dashboard")}

className="
ml-4
bg-gray-200
px-6
py-3
rounded-lg
hover:bg-gray-300
"

>

Cancel

</button>





</div>


</div>


);


}


export default CreateProject;