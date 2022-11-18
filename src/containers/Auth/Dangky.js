import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Dangky.scss';
// import { FormattedMessage } from "react-intl";
import { handleLoginApi, createNewUserSevice } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
import { toast } from 'react-toastify';

class Dangky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
            email: '',
            ten_tk: '',
            matkhau: '',
            sdt: '',
            diachi: '',
            gender: '',
            role: '',
            position: '',

        }

    }
    handleOnchangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log('username: ', this.state.username, 'password: ', this.state.password)
        // console.log('all state ', this.state)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {

                this.props.userLoginSuccess(data.user)
                this.setState({
                    isLoggedIn: true
                })
                let { isLoggedIn } = this.state;
                this.props.history.push({
                    pathname: "/home",
                    state: { isLoggedIn }
                });
                console.log('Đăng nhập thành công!')
                console.log('check isLoggedIn', isLoggedIn)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }

            // console.log('b1809399', error.response);


        }


    }

    handleShowHideOassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === 13) {
            this.handleLogin();
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['email', 'ten_tk', 'matkhau', 'sdt', 'diachi']
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                alert('Vui lòng nhập:' + arrcheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        //         email: '',
        //         ten_tk: '',
        //         matkhau: '',
        //         sdt: '',
        //         diachi: '',
        //         gender: '',
        //         role: '',
        //         position: '',
        //         avatar: '',
    }
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        // console.log('thuanb1809299', this.state)
        let res = await createNewUserSevice({
            email: this.state.email,
            ten_tk: this.state.ten_tk,
            matkhau: this.state.matkhau,
            diachi: this.state.diachi,
            gioitinh: this.state.gender,
            sdt: this.state.sdt,
            roleid: 'R3',
            khu: 'P0',
            avatar: this.state.avatar
        })
        if (res && res.errCode === 1) {
            toast.error('Tên đăng nhập đã được sử dụng vui lòng nhập tên khác !!')
        } else {
            toast.success('Tạo tài khoản thành công!!')
            this.props.history.push({
                pathname: "/logincustomer",
            });
        }


    }

    render() {

        let { email, ten_tk, matkhau, sdt, diachi, gender, role, position, avatar } = this.state;
        return (
            <div className="Dangky-background">

                <div className="Dangky-container">
                    <div className="Dangky-content">
                        <div className="col-12 text-login"> Đăng ký tài khoản </div>
                        <div className="col-12 form-group Dangky-input">
                            <label>Tên đăng nhập:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên đăng nhập"
                                value={ten_tk}
                                onChange={(event) => { this.onChangeInput(event, 'ten_tk') }}
                            />
                        </div>
                        <div className="col-12 form-group Dangky-input">
                            <label>Email </label>
                            <input className="form-control" type="email"
                                value={email}
                                placeholder="Nhập email "
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="col-12 form-group Dangky-input">
                            <label>Số điện thoại</label>
                            <input className="form-control" type="text"
                                value={sdt}
                                placeholder="Nhập số điiện thoại "
                                onChange={(event) => { this.onChangeInput(event, 'sdt') }}
                            />
                        </div>
                        <div className="col-12 form-group Dangky-input">
                            <label>Địa chỉ</label>
                            <input className="form-control" type="text"
                                value={diachi}
                                placeholder="Nhập dịa chỉ "
                                onChange={(event) => { this.onChangeInput(event, 'diachi') }}
                            />
                        </div>
                        <div className="col-12 form-group Dangky-input">
                            <label>Mật khẩu:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(event) => { this.onChangeInput(event, 'matkhau') }}
                                />
                                <span onClick={() => { this.handleShowHideOassword() }}
                                ><i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>

                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}

                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleSaveUser() }}>Tạo tài khoản </button>
                        </div>


                    </div>
                </div>
            </div>

        )
    }
}
//26:49#35
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dangky);
