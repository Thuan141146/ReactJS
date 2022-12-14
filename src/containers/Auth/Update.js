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
                        <div className="col-12 text-login"> C???p nh???t th??ng tin </div>
                        <div className="col-12 form-group Update-input">
                            <label>T??n ????ng nh???p:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nh???p t??n ????ng nh???p"
                                value={this.state.ten_tk}
                                onChange={(event) => { this.onChangeInput(event, 'ten_tk') }}
                                disabled={this.state.ten_tk}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>Email </label>
                            <input className="form-control" type="email"
                                value={this.state.email}
                                placeholder="Nh???p email "
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>S??? ??i???n tho???i</label>
                            <input className="form-control" type="text"
                                value={this.state.sdt}
                                placeholder="Nh???p s??? ??ii???n tho???i "
                                onChange={(event) => { this.onChangeInput(event, 'sdt') }}
                            />
                        </div>
                        <div className="col-12 form-group Update-input">
                            <label>?????a ch???</label>
                            <input className="form-control" type="text"
                                value={this.state.diachi}
                                placeholder="Nh???p d???a ch??? "
                                onChange={(event) => { this.onChangeInput(event, 'diachi') }}
                            />
                        </div>
                        {/* <div className="col-12 form-group Update-input">
                            <label>M???t kh???u:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Nh???p m???t kh???u"
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
                            <button className="btn-login" onClick={() => { this.handleSaveUser() }}>C???p nh???t </button>
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
