import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import Binhluan from '../containers/System/Nhanvien/Binhluan';
import Chi from '../containers/System/Nhanvien/Chi';
import Danhthu from '../containers/System/Nhanvien/Danhthu';
import DetaildonNV from '../containers/System/Nhanvien/DetaildonNV';
import DetailveNV from '../containers/System/Nhanvien/DetailveNV';
import Hoadon from '../containers/System/Nhanvien/Hoadon';
import Hoadonve from '../containers/System/Nhanvien/Hoadonve';
import QLDatBan from '../containers/System/Nhanvien/QLDatBan';
import Qldatve from '../containers/System/Nhanvien/Qldatve';
import Qldon from '../containers/System/Nhanvien/Qldon';
import QLKhachDatBan from '../containers/System/Nhanvien/QLKhachDatBan';
import XemBL from '../containers/System/Nhanvien/XemBL';
class Nhanvien extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/nhanvien/datban" component={QLDatBan} />
                            <Route path="/nhanvien/khachdatban" component={QLKhachDatBan} />
                            <Route path="/nhanvien/qldon" component={Qldon} />
                            <Route path="/nhanvien/detaildonnv/" component={DetaildonNV} />
                            <Route path="/nhanvien/hoadon/" component={Hoadon} />
                            <Route path="/nhanvien/danhthu" component={Danhthu} />
                            <Route path="/nhanvien/chi" component={Chi} />
                            <Route path="/nhanvien/user-vesk" component={Qldatve} />
                            <Route path="/nhanvien/detailvenv/" component={DetailveNV} />
                            <Route path="/nhanvien/binhluan/" component={Binhluan} />
                            <Route path="/nhanvien/hoadonve/" component={Hoadonve} />
                            <Route path="/nhanvien/xembinhluan/" component={XemBL} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Nhanvien);
