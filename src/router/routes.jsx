import AddchartIcon from '@mui/icons-material/Addchart';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import GroupsIcon from '@mui/icons-material/Groups';
const routes = [
    {
        path: "/",
        content: "Home",
        icon: <AddchartIcon/>
    },
    {
        path: "/services",
        content: "Service",
        icon: <DryCleaningIcon/>
    },
    {
        path: "/orders",
        content: "Order",
        icon: <MiscellaneousServicesIcon/>
    },
    {
        path: "/client",
        content: "Client",
        icon: <GroupsIcon/>
    }
]

export default routes