import { createBrowserRouter } from "react-router-dom";
import MainLayOut from './../Components/MainLayOut/MainLayOut';
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Auth/Login";
import SignUp from './../Components/Pages/Auth/SignUp';
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Details from "../Components/Pages/Details/Details";
import AllTutor from './../Components/Pages/AllTutor/AllTutor';
import Dashboard from './../Components/Pages/Dashboard/Dashboard';
import BookedSession from "../Components/Pages/Dashboard/StudentDashboard/bookedSession/BookedSession";
import ViewBookedSection from "../Components/Pages/Dashboard/StudentDashboard/ViewBookedSection";
import ViewBookedDetails from "../Components/Pages/Dashboard/StudentDashboard/ViewBookedDetails";
import CreateNote from "../Components/Pages/Dashboard/StudentDashboard/CreateNote";
import ManageNote from "../Components/Pages/Dashboard/StudentDashboard/ManageNote";
import UpdateNote from "../Components/Pages/Dashboard/StudentDashboard/UpdateNote";
import AllMaterials from "../Components/Pages/Dashboard/StudentDashboard/AllMaterials";
import CreateStudy from "../Components/Pages/Dashboard/TutorDashboard/CreateStudy";
import ViewAllStudy from "../Components/Pages/Dashboard/TutorDashboard/ViewAllStudy";
import UploadMaterial from "../Components/Pages/Dashboard/TutorDashboard/UploadMaterial";
import UpdateTutorMaterial from "../../UpdateTutorMaterial";
import AllUser from "../Components/Pages/Dashboard/AdminDashboard/AllUser";
import AdminViewAllStudy from "../Components/Pages/Dashboard/AdminDashboard/AdminViewAllStudy";
import AdminViewMaterial from "../Components/Pages/Dashboard/AdminDashboard/AdminViewMaterial";
import ViewAllMaterial from './../Components/Pages/Dashboard/TutorDashboard/ViewAllMaterial';
import ErrorPage from "../Components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/allTutor',
                element: <AllTutor></AllTutor>,
            },
            {
                path: '/details/:id',
                element: <PrivateRoute><Details></Details></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/sessions/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: '/dashboard/viewBookedSection',
                        element: <PrivateRoute><ViewBookedSection></ViewBookedSection></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/viewBookedSection/:id',
                        element: <PrivateRoute><ViewBookedDetails></ViewBookedDetails></PrivateRoute>,
                        loader: ({ params }) => fetch(`http://localhost:5000/sessions/${params.id}`)
                    },
                    {
                        path: '/dashboard/createNote',
                        element: <PrivateRoute><CreateNote></CreateNote></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/manageNote',
                        element: <PrivateRoute><ManageNote></ManageNote></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/updateNote/:id',
                        element: <PrivateRoute><UpdateNote></UpdateNote></PrivateRoute>,
                        loader: ({ params }) => fetch(`http://localhost:5000/notes/${params.id}`)

                    },
                    {
                        path: '/dashboard/allMaterials',
                        element: <PrivateRoute><AllMaterials></AllMaterials></PrivateRoute>,

                    },
                    // Tutor Dashboard
                    {
                        path: '/dashboard/createStudy',
                        element: <PrivateRoute><CreateStudy></CreateStudy></PrivateRoute>,

                    },
                    {
                        path: '/dashboard/ViewAllStudy',
                        element: <PrivateRoute><ViewAllStudy></ViewAllStudy></PrivateRoute>,

                    },
                    {
                        path: '/dashboard/createStudy',
                        element: <PrivateRoute><CreateStudy></CreateStudy></PrivateRoute>,

                    },
                    {
                        path: '/dashboard/updateMaterials',
                        element: <PrivateRoute><UploadMaterial></UploadMaterial></PrivateRoute>,

                    },
                    {
                        path: '/dashboard/TutorAllMaterials',
                        element: <PrivateRoute><ViewAllMaterial></ViewAllMaterial></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/TutorAllMaterials/:id',
                        element: <PrivateRoute><UpdateTutorMaterial></UpdateTutorMaterial></PrivateRoute>,
                        loader: ({ params }) => fetch(`http://localhost:5000/materials/${params.id}`)

                    },
                    // Admin Dashboard
                    {
                        path: '/dashboard/TutorAllMaterials',
                        element: <PrivateRoute><ViewAllMaterial></ViewAllMaterial></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/allUser',
                        element: <PrivateRoute><AllUser></AllUser></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/AdminViewAllStudy',
                        element: <PrivateRoute><AdminViewAllStudy></AdminViewAllStudy></PrivateRoute>,
                    },
                    {
                        path: '/dashboard/AdminAllMaterials',
                        element: <PrivateRoute><AdminViewMaterial></AdminViewMaterial></PrivateRoute>,
                    },
                ]
            },

            {
                path: '/payment/:id',
                element: <PrivateRoute><BookedSession></BookedSession></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/sessions/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>,
            },
        ]
    },
]);
export default router;