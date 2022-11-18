import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserSevice, deleteUserSevice, editUserSevice } from '../../services/userService';
import ModalUser from './ModalUser';
import { reject } from 'lodash';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        // let response = await getAllUsers('ALL')
        // if (response && response.errCode === 0) {
        //     this.setState({
        //         arrUsers: response.users
        //     })
        // }
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }

    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewuser = async (data) => {
        try {
            let response = await createNewUserSevice(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        console.log('click delete', user)
        try {
            let res = await deleteUserSevice(user.id)
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            reject(e);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user,

        })
    }
    doEditUser = async (user) => {
        try {
            let res = await editUserSevice(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }
            else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e);

        }



    }
    /**
     * run component
     * run construct -> init state
     * did mount
     * render
     * 
     */

    render() {
        // console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromPrarent={this.toggleUserModal}
                    createNewuser={this.createNewuser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromPrarent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className="title text-center"> Quản lí tài khoản người dùng</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>Thêm tài khoản mới</button>
                </div>
                <div className="users-table mt-3 mx-1 ">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Tên tài Khoản</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Role</th>
                                <th>Trạng thái</th>

                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td> {item.ten_tk}</td>
                                        <td>{item.diachi}</td>
                                        <td>{item.gioitinh}</td>
                                        <td>{item.roleid}</td>
                                        <td >
                                            <div className='edit-btn'>
                                                <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>

                                            </div>
                                        </td>
                                    </tr>

                                )
                            })

                            }
                        </tbody>
                    </table>

                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
