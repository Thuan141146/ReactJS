import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import * as actions from "../../store/actions";
class HomeHeader extends Component {

    tohome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    };
    tosanpham = () => {
        if (this.props.history) {
            this.props.history.push(`/SanPham/all`)
        }
    };
    togioithieu = () => {
        if (this.props.history) {
            this.props.history.push(`/GioiThieu`)
        }
    }
    toallsukien = () => {
        if (this.props.history) {
            this.props.history.push(`/sukien/all`)
        }
    }
    toallkhu = () => {
        if (this.props.history) {
            this.props.history.push(`/khu/all`)
        }
    }
    handleOnChangecaphe = () => {
        if (this.props.history) {
            this.props.history.push(`/danhmuc/26`)
        }
    }
    handleOnChangetratruyenthong = () => {
        if (this.props.history) {
            this.props.history.push(`/danhmuc/27`)
        }
    }
    handleOnChangetranguyenvi = () => {
        if (this.props.history) {
            this.props.history.push(`/danhmuc/28`)
        }
    }
    handleOnChangedaxay = () => {
        if (this.props.history) {
            this.props.history.push(`/danhmuc/30`)
        }
    }
    togiohang = () => {
        let iduser = this.props.userInfo.id
        if (this.props.history) {
            this.props.history.push({
                pathname: "/giohang/",
                state: { iduser }
            })
        }
    }
    login = () => {
        if (this.props.history) {
            this.props.history.push(`/logincustomer`)
        }
    }
    dangky = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: "/dangky/",
            })
        }
    }
    render() {
        const { processLogout, userInfo } = this.props;
        // console.log('check userinfo', userInfo)
        // let imageBase64 = '';
        // if (userInfo.anh) {
        //     imageBase64 = new Buffer(userInfo.anh, 'base64').toString('binary');
        // }
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="header-logo"
                                onClick={() => this.tohome()}
                            />
                        </div>
                        <div className="center-content" >
                            <div className="child-content"
                                onClick={() => this.tosanpham()}>
                                <div className="subs-title1"><b>Cửa hàng</b></div>
                                <div className="subs-title">Các loại thức uống</div>
                            </div>
                            <div className="child-content"
                                onClick={() => this.togioithieu()}>
                                <div className="subs-title1"><b>Giới thiệu</b></div>
                                <div className="subs-title"> Thông tin về của hàng</div>
                            </div>
                            <div className="child-content">
                                <div className="search">
                                    <i className="fas fa-search"></i>
                                    <input type="text" placeholder=" Tìm kiếm " />
                                </div>
                            </div>

                        </div>
                        <div className="right-content">
                            <div>
                                <i className="fas fa-shopping-cart"
                                    onClick={() => this.togiohang()}
                                ></i>
                            </div>
                            <div className="info-kh">
                                {userInfo && userInfo.ten_tk
                                    ? userInfo.ten_tk :
                                    <i className="fas fa-user" onClick={() => this.login()}></i>}
                            </div>
                            <div className="btn btn-logout" onClick={processLogout} title="log out">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>

                        </div></div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><b>GOLD COFFEE</b></div>
                            <div className="title2">Chất lượng đậm vị</div>

                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-coffee"></i></div>
                                    <div className="text-child"
                                        onClick={(event) => this.handleOnChangecaphe(event)}
                                    >Coffee</div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-coffee"></i></div>
                                    <div className="text-child"
                                        onClick={(event) => this.handleOnChangetratruyenthong(event)}
                                    >Trà truyền thống</div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-coffee"></i></div>
                                    <div className="text-child"
                                        onClick={(event) => this.handleOnChangetranguyenvi(event)}
                                    >Trà nguyên vị</div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-coffee"></i></div>
                                    <div className="text-child"
                                        onClick={(event) => this.handleOnChangedaxay(event)}
                                    >Đá xay</div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-couch"></i></div>
                                    <div className="text-child"
                                        onClick={() => this.toallkhu()}
                                    >Đặt bàn</div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i className="fas fa-ticket-alt"></i></div>
                                    <div className="text-child"
                                        onClick={() => this.toallsukien()}
                                    >Sự kiện</div>

                                </div>
                                <div className="options-child">
                                    <div className="icon-child"><i class="fas fa-users"></i></div>
                                    <div className="text-child"
                                        onClick={() => this.dangky()}
                                    >Đăng ký tài khoản</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
