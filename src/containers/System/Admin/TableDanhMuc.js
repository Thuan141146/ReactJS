import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableDanhMuc.scss';
import *  as actions from "../../../store/actions";


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danhmucRedux: [],

        }

    }
    componentDidMount() {
        this.props.fetchDanhMucRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Lisdanhmucs !== this.props.Lisdanhmucs) {
            this.setState({
                danhmucRedux: this.props.Lisdanhmucs
            })
        }
    }
    handleDeleteDanhMuc = (danhmuc) => {

        this.props.deleteDanhMucRedux(danhmuc.id);

    }
    handleEditDanhMuc = (danhmuc) => {
        // console.log('thuan check', mon)
        this.props.handleEditDanhMucFromParentKey(danhmuc)
    }
    render() {
        console.log('chek all danh muc:', this.props.Lisdanhmucs);
        let arrDanhMuc = this.state.danhmucRedux;
        return (
            <table id="TableDanhMuc">
                <div className="title">
                    Danh sách danh mục
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th> Trạng Thái</th>

                    </tr>
                    {arrDanhMuc && arrDanhMuc.length > 0 &&
                        arrDanhMuc.map((item, index) => {
                            return (
                                <tr key={'index'}>
                                    <td>{item.id}</td>
                                    <td className="tendanhmuc">{item.TEN_DM}</td>

                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditDanhMuc(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteDanhMuc(item)}
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
        Lisdanhmucs: state.admin.danhmucs,
        lisUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDanhMucRedux: () => dispatch(actions.fetchAllDanhMucStart()),
        deleteDanhMucRedux: (id) => dispatch(actions.deleteDanhMuc(id)),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
