import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Update.scss';
// import { FormattedMessage } from "react-intl";
import { handleLoginApi, createNewUserSevice } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
import { toast } from 'react-toastify';

class Update extends Component {
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
    async componentDidMount() {
        if (this.props.userInfo) {
            this.setState({
                email: this.props.userInfo.email,
                ten_tk: this.props.userInfo.ten_tk,
                sdt: this.props.userInfo.sdt,
                diachi: this.props.userInfo.diachi
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                email: this.props.userInfo.email,
                ten_tk: this.props.userInfo.ten_tk,
                sdt: this.props.userInfo.sdt,
                diachi: this.props.userInfo.diachi
            })
        }
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
    handleSaveUser = () => {
        let { userInfo } = this.props
        let id = userInfo.id
        /// chinh sua ng dung
        this.props.editAUserRedux({
            id: id,
            email: this.state.email,
            ten_tk: this.state.ten_tk,
            diachi: this.state.diachi,
            sdt: this.state.sdt,

        })


    }
    render() {

        let { email, ten_tk, matkhau, sdt, diachi, userInfo } = this.props;
        console.log("check du liu:", this.props)
        return (
            <div className="Update-background">

                <div className="Update-container">
                    <div className="Update-content">
                        <div className="col-12 text-login"> Cập nhật thông tin </div>
                        <div className="col-12 form-group Update-input">
                            <label>Tên đăng nhập:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên đăng nhập"
                                value={this.state.ten_tk}
                                onChange={(event) => { this.onChangeInput(event, 'ten_tk') }}
                                disabled={this.state.ten_tk}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>Email </label>
                            <input className="form-control" type="email"
                                value={this.state.email}
                                placeholder="Nhập email "
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>Số điện thoại</label>
                            <input className="form-control" type="text"
                                value={this.state.sdt}
                                placeholder="Nhập số điiện thoại "
                                onChange={(event) => { this.onChangeInput(event, 'sdt') }}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>Địa chỉ</label>
                            <input className="form-control" type="text"
                                value={this.state.diachi}
                                placeholder="Nhập dịa chỉ "
                                onChange={(event) => { this.onChangeInput(event, 'diachi') }}
                            />
                        </div>
                        {/* <div className="col-12 form-group Update-input">
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

                        </div> */}
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}

                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => { this.handleSaveUser() }}>Cập nhật </button>
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
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
