import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import *  as actions from "../../../store/actions";
import './UserManageNhanVien.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
import TableNhanVien from "./TableNhanVien";

class UserManageNhanVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
            ///

            email: '',
            ten_tk: '',
            matkhau: '',
            sdt: '',
            diachi: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
            ///

            actions: '',
            usereditid: '',


        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // this.props.dispatch(actions.fetchGenderStart())
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('check gioi tinh', res)
        // } catch (e) {
        //     console.log(e);

        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //gioitinh
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].idkey : ''

            })
        }
        //khuvuc
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].idkey : ''
            })
        }
        //loaitaikhoan
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].idkey : ''
            })


        }
        if (prevProps.lisUsers !== this.props.lisUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            this.setState({
                email: '',
                ten_tk: '',
                matkhau: '',
                sdt: '',
                diachi: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].idkey : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].idkey : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].idkey : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''

            })
        }
    }
    //hinhanh
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);
            console.log('hoi dan it base64 image: ', Base64)
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: ObjectUrl,
                avatar: Base64
            })
        }
    }
    //moanh
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true


        })
    }
    //lunguoidung
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            ///
            // console.log('thuanb1809299', this.state)
            this.props.createNewUser({
                email: this.state.email,
                ten_tk: this.state.ten_tk,
                matkhau: this.state.matkhau,
                diachi: this.state.diachi,
                gioitinh: this.state.gender,
                sdt: this.state.sdt,
                roleid: this.state.role,
                khu: this.state.position,
                avatar: this.state.avatar
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            /// chinh sua ng dung
            this.props.editAUserRedux({
                id: this.state.usereditid,
                email: this.state.email,
                ten_tk: this.state.ten_tk,
                matkhau: this.state.matkhau,
                diachi: this.state.diachi,
                gioitinh: this.state.gender,
                sdt: this.state.sdt,
                roleid: this.state.role,
                khu: this.state.position,
                avatar: this.state.avatar,
            })
        }

    }

    //checkinput
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
    //inputnguoidung
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

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.anh) {
            imageBase64 = new Buffer(user.anh, 'base64').toString('binary');
        }

        console.log('b1809299 check from parent: ', user)
        this.setState({
            email: user.email,
            ten_tk: user.ten_tk,
            matkhau: 'HARDCODE',
            sdt: user.sdt,
            diachi: user.diachi,
            role: user.roleid,
            gender: user.gioitinh,
            position: user.khu,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            usereditid: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let isGetGenders = this.props.isLoadingGender;
        // console.log('Check state compoment: ', this.state)

        let { email, ten_tk, matkhau, sdt, diachi, gender, role, position, avatar } = this.state;
        return (
            <div className="user-redux-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ Nhân viên
                </div>
                <div className="title">

                </div>

                <div className="user-redux-body" >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">{isGetGenders === true ? "loading genders" : " "}</div>
                            <div className="col-3">
                                <label>Email </label>
                                <input className="form-control" type="email"
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}

                                />
                            </div>
                            <div className="col-3">
                                <label>Tên đăng Nhập </label>
                                <input className="form-control" type="text"
                                    value={ten_tk}
                                    onChange={(event) => { this.onChangeInput(event, 'ten_tk') }}

                                />
                            </div>
                            <div className="col-3">
                                <label>Mật khẩu</label>
                                <input className="form-control" type="password"
                                    value={matkhau}
                                    onChange={(event) => { this.onChangeInput(event, 'matkhau') }}

                                />
                            </div>
                            <div className="col-3">
                                <label>Số điện thoại</label>
                                <input className="form-control" type="text"
                                    value={sdt}
                                    onChange={(event) => { this.onChangeInput(event, 'sdt') }}
                                />
                            </div>
                            <div className="col-6">
                                <label>Địa chỉ</label>
                                <input className="form-control" type="text"
                                    value={diachi}
                                    onChange={(event) => { this.onChangeInput(event, 'diachi') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Giới tính</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idkey}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Loại tài khoản</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idkey}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Loại thanh viên</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idkey}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Ảnh</label>
                                <div className="preview-img-container" >
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="upload" htmlFor="previewImg" >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="co-12 my-3  ">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Lưu tài khoản "
                                    }
                                </button>
                            </div>
                            <div className="col-12 mt-5">
                                <TableNhanVien
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        lisUsers: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),

        editAUserRedux: (data) => dispatch(actions.editAUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageNhanVien);
