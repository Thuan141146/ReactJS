import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            ten_tk: '',
            matkhau: '',
            diachi: '',
            gioitinh: '',
            roleid: ''


        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                ten_tk: user.ten_tk,
                matkhau: 'harcode',
                diachi: user.diachi,
                gioitinh: user.gioitinh,
                roleid: user.roleid,
            })
        }
        console.log('didmout edit modal', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromPrarent();
    }

    handleOnChangInput = (event, id) => {
        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['ten_tk', 'matkhau', 'roleid'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('thieu tham so dau vao:' + arrInput[i]);
                break;
            }
        }
        return isValid;

    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            /// goi api eidt user modal
            // console.log('check props child ', this.props)
            this.props.editUser(this.state);
            // console.log(' data modal ', this.state)

        }

    }

    render() {
        console.log('check props from parent: ', this.props);
        // console.log('check child open modal', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}> Chỉnh sửa tài khoản </ModalHeader>
                <ModalBody>

                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangInput(event, "email") }}
                                value={this.state.email}

                            />
                        </div>
                        <div className="input-container">
                            <label>Tên đăng nhập</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangInput(event, "ten_tk") }}
                                value={this.state.ten_tk}
                                disabled

                            />
                        </div>

                        <div className=" input-container">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangInput(event, "matkhau") }}
                                value={this.state.matkhau}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                onChange={(event) => { this.handleOnChangInput(event, "diachi") }}
                                value={this.state.diachi}
                            />
                        </div>
                        <div class="form-group">
                            <label for="inputrole">Giới tính</label>
                            <select name="gioitinh" class="form-control"
                                onChange={(event) => { this.handleOnChangInput(event, "gioitinh") }}
                                value={this.state.gioitinh} >
                                <option value="F">Nam</option>
                                <option value="M">Nữ</option>
                                <option value="O">Khác</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inputrole">Loại tài khoản</label>
                            <select name="roleid" class="form-control"
                                onChange={(event) => { this.handleOnChangInput(event, "roleid") }}
                                value={this.state.roleid} >
                                <option value="1">Quản trị viên</option>
                                <option value="2">Nhân viên</option>
                                <option value="3">Khách hàng</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleSaveUser() }}
                    >Cập nhật</Button>{' '}
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => { this.toggle() }}
                    >Thoát</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





