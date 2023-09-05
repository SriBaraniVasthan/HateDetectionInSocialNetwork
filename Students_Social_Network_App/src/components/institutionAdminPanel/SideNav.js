
import './insHome.css';

const SideNav = ({menuList, currentMenu, onClickMenu, institute}) => {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light side-nav" >
            <ul className="nav nav-pills flex-column mb-auto">
            {
                menuList.map((menu) => {
                    return (
                    <li className="nav-item" key={menu}>
                        <a href="#" className={menu == currentMenu ? "nav-link active" : "nav-link link-dark"} aria-current="page" id={menu} onClick={onClickMenu}>
                            {menu}
                        </a>
                    </li>
                )})
            }            
            </ul>
            <hr/>
            <div>
                <p class="share-color">Unique Code: {institute.code}</p>
            </div>
        </div>      
    );
}

export default SideNav;