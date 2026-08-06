import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import Profile from "./pages/Profile";

import Layout from "./components/Layout";



function App() {


  return (


    <BrowserRouter>


      <Routes>



        {/* Public Routes */}

        <Route

          path="/"

          element={<Login />}

        />



        <Route

          path="/register"

          element={<Register />}

        />







        {/* Protected Layout Routes */}


        <Route element={<Layout />}>



          <Route

            path="/dashboard"

            element={<Dashboard />}

          />



          <Route

            path="/projects"

            element={<Projects />}

          />



          <Route

            path="/projects/new"

            element={<CreateProject />}

          />



          <Route

            path="/project/:id"

            element={<ProjectDetails />}

          />



          <Route

            path="/profile"

            element={<Profile />}

          />



        </Route>




      </Routes>


    </BrowserRouter>


  );

}


export default App;