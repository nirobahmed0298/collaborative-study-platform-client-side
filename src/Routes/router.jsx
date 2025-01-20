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
import RoleRoute from "../Components/PrivateRoute/roleRoute";
import UpdateAllStudy from "../Components/Pages/Dashboard/AdminDashboard/UpdateAllStudy";
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
                loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/sessions/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    // Student Dashboard
                    {
                        path: '/dashboard/viewBookedSection',
                        element: <RoleRoute><ViewBookedSection></ViewBookedSection></RoleRoute>
                    },
                    {
                        path: '/dashboard/viewBookedSection/:id',
                        element: <RoleRoute><ViewBookedDetails></ViewBookedDetails></RoleRoute>,
                        loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/sessions/${params.id}`)
                    },
                    {
                        path: '/dashboard/createNote',
                        element: <RoleRoute><CreateNote></CreateNote></RoleRoute>
                    },
                    {
                        path: '/dashboard/manageNote',
                        element: <RoleRoute><ManageNote></ManageNote></RoleRoute>,
                    },
                    {
                        path: '/dashboard/updateNote/:id',
                        element: <RoleRoute><UpdateNote></UpdateNote></RoleRoute>,
                        loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/notes/${params.id}`)

                    },
                    {
                        path: '/dashboard/allMaterials',
                        element: <RoleRoute><AllMaterials></AllMaterials></RoleRoute>,

                    },
                    // Tutor Dashboard
                    {
                        path: '/dashboard/createStudy',
                        element: <RoleRoute><CreateStudy></CreateStudy></RoleRoute>,

                    },
                    {
                        path: '/dashboard/ViewAllStudy',
                        element: <RoleRoute><ViewAllStudy></ViewAllStudy></RoleRoute>,

                    },
                    {
                        path: '/dashboard/createStudy',
                        element: <RoleRoute><CreateStudy></CreateStudy></RoleRoute>,

                    },
                    {
                        path: '/dashboard/updateMaterials',
                        element: <RoleRoute><UploadMaterial></UploadMaterial></RoleRoute>,

                    },
                    {
                        path: '/dashboard/TutorAllMaterials',
                        element: <RoleRoute><ViewAllMaterial></ViewAllMaterial></RoleRoute>,
                    },
                    {
                        path: '/dashboard/TutorAllMaterials/:id',
                        element: <RoleRoute><UpdateTutorMaterial></UpdateTutorMaterial></RoleRoute>,
                        loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/materials/${params.id}`)

                    },
                    // Admin Dashboard
                    {
                        path: '/dashboard/TutorAllMaterials',
                        element: <RoleRoute><ViewAllMaterial></ViewAllMaterial></RoleRoute>,
                    },
                    {
                        path: '/dashboard/allUser',
                        element: <RoleRoute><AllUser></AllUser></RoleRoute>,
                    },
                    {
                        path: '/dashboard/AdminViewAllStudy',
                        element: <RoleRoute><AdminViewAllStudy></AdminViewAllStudy></RoleRoute>,
                    },
                    {
                        path: '/dashboard/AdminViewAllStudy/:id',
                        element: <RoleRoute><UpdateAllStudy></UpdateAllStudy></RoleRoute>,
                        loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/sessions/${params.id}`)

                    },
                    {
                        path: '/dashboard/AdminAllMaterials',
                        element: <RoleRoute><AdminViewMaterial></AdminViewMaterial></RoleRoute>,
                    },
                ]
            },

            {
                path: '/payment/:id',
                element: <PrivateRoute><BookedSession></BookedSession></PrivateRoute>,
                loader: ({ params }) => fetch(`https://collaborative-study-platform-server.vercel.app/sessions/${params.id}`)
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