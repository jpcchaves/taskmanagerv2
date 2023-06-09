import { Icon } from "@chakra-ui/react";
import { MdBarChart, MdHome, MdPerson } from "react-icons/md";

// Admin Imports
import ProfileOverview from "./modules/admin/profile";
import TasksView from "./modules/admin/tasks";
import Dashboard from "./modules/admin/dashboard";

// Auth Imports

const routes = [
  {
    name: "Tarefas",
    layout: "/",
    path: "/tarefas/*",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <TasksView />,
  },
  {
    name: "Dashboard",
    layout: "/",
    path: "/dashboard",
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <Dashboard />,
    secondary: true,
  },
  {
    name: "Perfil",
    layout: "/",
    path: "/perfil",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <ProfileOverview />,
  },
];

export default routes;
