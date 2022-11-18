import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ten_tk: '',
            matkhau: '',
            diachi: '',
            gioitinh: '',
            roleid: ''

        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            // reset state
            this.setState({
                email: '',
                ten_tk: '',
                matkhau: '',
                diachi: '',
                gioitinh: '',
                roleid: ''
            })
        })
    }

    componentDidMount() {
        console.log('mouting modal')
    }

    toggle = () => {
        this.props.toggleFromPrarent();
    }

    handleOnChangInput = (event, id) => {
        // bad code modify state
        /**
         * this.state ={
         * ten_tk: '',
         * matkhau:''
         * 
         * }
         * this.state.ten_tk === this.state['ten_tk']
         */
        // this.state[id] = event.target.value;

        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state:', this.state)
        // })
        // good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValideInput = () => {
        let isValid = true;
        let arrInput = ['email', 'ten_tk', 'matkhau', 'diachi', 'gioitinh', 'roleid'];
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', this.state[arrInput[i]], arrInput[i])
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('thieu tham so dau vao:' + arrInput[i]);
                break;
            }
        }
        return true;

    }

    handleAddNewUser = () => {
        let isValid = this.checkValideInput();
        if (isValid === true) {
            /// goi api create modal
            // console.log('check props child ', this.props)
            this.props.createNewuser(this.state);
            // console.log(' data modal ', this.state)

        }

    }

    render() {
        // console.log('check child props', this.props);
        // console.log('check child open modal', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Thêm tài khoản mới</ModalHeader>
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
                            />
                        </div>

                        <div className=" input-container">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                onChange={(event) => { this.handleOnChangInput(event, "matkhau") }}
                                value={this.state.matkhau}
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
                        onClick={() => { this.handleAddNewUser() }}
                    >Lưu tài khoản</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





