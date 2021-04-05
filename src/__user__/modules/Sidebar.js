import React from 'react'
// import 'admin-sidebar.scss'


const Sidebar = () => {
    return (<>
        <div class="sidebar-container">
            <div class='sidenav col-3' id='navBar'>
                <div class='list-group'>
                    <div href='#' class='list-group-item active list-group-item-action' data-toggle="list" role="tab">DashBoard</div>
                    <div href='#' class='list-group-item list-group-item-action' data-toggle="list" role="tab">회원목록 조회</div>
                    <div href='#' class='list-group-item list-group-item-action' data-toggle="list" role="tab">Chart</div>
                    <div href='#' class='list-group-item list-group-item-action' data-toggle="list" role="tab">데이터 출력</div>
                    <div href='#' class='list-group-item list-group-item-action' data-toggle="list" role="tab">Completed</div>
                </div>
            </div>
        </div>
    </>)
}
export default Sidebar;