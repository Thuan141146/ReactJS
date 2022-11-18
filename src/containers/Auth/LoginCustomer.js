import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './LoginCustomer.scss';
// import { FormattedMessage } from "react-intl";
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';

class LoginCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''

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
    dangky = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: "/dangky/",
            })
        }
    }
    render() {


        return (
            <div className="logincustomer-background">

                <div className="logincustomer-container">
                    <div className="logincustomer-content">
                        <div className="col-12 text-login"> Đăng nhập </div>
                        <div className="col-12 form-group logincustomer-input">
                            <label>Tên đăng nhập:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Nhập tên đăng nhập"
                                value={this.state.username}
                                onChange={(event) => this.handleOnchangeUsername(event)}
                            />
                        </div>
                        <div className="col-12 form-group logincustomer-input">
                            <label>Mật khẩu:</label>
                            <div className="custom-input-password">
                                <input
                                    className="form-control"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    onChange={(event) => this.handleOnchangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
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
                            <button className="btn-login" onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                        </div>
                        <div className="col-12">
                            <button className="btn-login" onClick={() => this.dangky()}>Tạo tài khoản </button>
                        </div>
                        <div className="col-12 ">
                            <span className="forgot-password">Quên mật khẩu?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Hoặc đăng nhập với:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook facebook"></i>
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
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCustomer);
