import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import DanhMuc from '../containers/System/Admin/DanhMuc';
import Header from '../containers/Header/Header';
import SanPham from '../containers/System/Admin/SanPham';
import GiaSanPham from '../containers/System/Admin/GiaSanPham';
import LoaiSK from '../containers/System/Admin/LoaiSK';
import QLSK from '../containers/System/Admin/QLSK';
import GioiThieu from '../containers/Khachhang/Gioithieu/GioiThieu';
import Khu from '../containers/System/Admin/Khu';
import Ban from '../containers/System/Admin/Ban';
import UserManageNhanVien from '../containers/System/Admin/UserManageNhanVien';
import Khuyenmai from '../containers/System/Admin/Khuyenmai';
import ghe from '../containers/System/Admin/ghe';
import Qlghesk from '../containers/System/Admin/Qlghesk';
import Thongke from '../containers/System/Admin/Thongke';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManageNhanVien} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/danh-muc" component={DanhMuc} />
                            <Route path="/system/san-pham" component={SanPham} />
                            <Route path="/system/gia-sp" component={GiaSanPham} />
                            <Route path="/system/gioi-thieu" component={GioiThieu} />
                            <Route path="/system/loai-sk" component={LoaiSK} />
                            <Route path="/system/manage-ctsk" component={QLSK} />
                            <Route path="/system/khu" component={Khu} />
                            <Route path="/system/ban" component={Ban} />
                            <Route path="/system/km" component={Khuyenmai} />
                            <Route path="/system/manage-ghe" component={ghe} />
                            <Route path="/system/manage-ttghe" component={Qlghesk} />
                            <Route path="/system/thongke" component={Thongke} />




                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
