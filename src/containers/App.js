import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import System from '../routes/System';
//import { CustomToastCloseButton } from '../components/CustomToast';
import DetailSuKien from './Khachhang/Sukien/DetailSuKien';
import AllSuKien from './Khachhang/Sukien/AllSuKien';
import SanPham from './Khachhang/Sanpham/SanPham';
// import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage.js';
import GioiThieu from './Khachhang/Gioithieu/GioiThieu';
///////////////////
import CustomScrollbars from '../components/CustomScrollbars';
import DetailSanPham from './Khachhang/Sanpham/DetailSanPham';
import Nhanvien from '../routes/Nhanvien';
import Khu from './Khachhang/Datban/Khu';
import DetailKhu from './Khachhang/Datban/DetailKhu';
import Sanphamdanhmuc from './Khachhang/Sanpham/Sanphamdanhmuc';
import Verifyemail from './Khachhang/Verifyemail';
import Giohang from './Khachhang/Giohang/Giohang';
import LoginCustomer from './Auth/LoginCustomer';
import HomeCustomer from '../routes/HomeCustomer';
import Alldonhang from './Khachhang/Giohang/Alldonhang';
import Detaildon from './Khachhang/Giohang/Detaildon';
import Dangky from './Auth/Dangky';
import CTdatban from './Khachhang/Datban/CTdatban';
import Allve from './Khachhang/Sukien/Allve';
import Detailve from './Khachhang/Sukien/Detailve';
import Update from './Auth/Update';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_SUKIEN} component={DetailSuKien} />
                                    <Route path={path.DETAIL_SANPHAM} component={DetailSanPham} />
                                    <Route path={path.SUKIEN} component={AllSuKien} />
                                    <Route path={path.SANPHAM} component={SanPham} />
                                    <Route path={path.KHU} component={Khu} />
                                    <Route path={path.DETAIL_KHU} component={DetailKhu} />
                                    <Route path={path.GIOITHIEU} component={GioiThieu} />
                                    <Route path={path.DANHMUCSANPHAM} component={Sanphamdanhmuc} />
                                    <Route path={path.VERIFY_EMAIL_BOOKING_BAN} component={Verifyemail} />
                                    <Route path={path.GIOHANG} component={Giohang} />
                                    <Route path={path.HOME} exact component={HomeCustomer} />
                                    <Route path={path.LOGIN_CUSTOMER} component={LoginCustomer} />
                                    <Route path={path.DETAIL_DON} component={Alldonhang} />
                                    <Route path={path.CHITIET_DON} component={Detaildon} />
                                    <Route path={path.DANGKY} component={Dangky} />
                                    <Route path={path.DETAIL_DATBAN} component={CTdatban} />
                                    <Route path={path.ALL_VE} component={Allve} />
                                    <Route path={path.CHITIET_VE} component={Detailve} />
                                    <Route path={path.UPDATE} component={Update} />
                                    <Route path={'/nhanvien/'} component={userIsAuthenticated(Nhanvien)} />

                                </Switch>`
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}
                        <ToastContainer
                            position="bottom-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);