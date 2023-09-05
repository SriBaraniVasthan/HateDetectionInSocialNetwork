
import StudentPage from "./StudentPage";
import StaffPage from "./StaffPage";
import Constant from "../../constants/Constant";
import Departments from "./Departments";

const ContentContainer = ({activeMenu}) => {

    const sideMenu = Constant.instituteSideMenu;

    return (
        <div>
            {activeMenu == sideMenu[0] && <Departments/>}
            {activeMenu == sideMenu[1] && <StudentPage/>}
            {activeMenu == sideMenu[2] && <StaffPage/>}
        </div>
    );
}

export default ContentContainer;