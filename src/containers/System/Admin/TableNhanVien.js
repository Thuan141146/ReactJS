import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableNhanVien.scss';
import *  as actions from "../../../store/actions";

class TableNhanVien extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllNhanVienStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.nhanvienRedux !== this.props.nhanvienRedux) {
            this.setState({
                userRedux: this.props.nhanvienRedux
            })
        }
    }

    handleDeleteUser = (user) => {

        this.props.deleteAUserRedux(user.id);

    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        // console.log('b1809299 check allusers:', this.props.lisUsers);
        // console.log('b1809299 check state: ', this, this.state.userRedux)
        let arrUsers = this.state.userRedux;
        return (
            <table id="TableNhanVien">
                <div className="title">
                    Danh sách Nhân viên
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Tên tài Khoản</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td> {item.ten_tk}</td>
                                    <td>{item.diachi}</td>
                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return {
        nhanvienRedux: state.admin.nhanvien,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
        fetchAllNhanVienStart: () => dispatch(actions.fetchAllNhanVienStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableNhanVien);
