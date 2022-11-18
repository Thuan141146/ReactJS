import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableSanPham.scss';
import *  as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { couldStartTrivia } from 'typescript';
import { monthsShort } from 'moment';



class TableSanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allmonRedux: []

        }

    }
    componentDidMount() {
        this.props.fetchAllMonStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listallmon !== this.props.listallmon) {
            this.setState({
                allmonRedux: this.props.listallmon
            })
        }
    }
    handleDeleteMon = (mon) => {

        this.props.deleteMon(mon.id);

    }
    handleEditMon = (mon) => {
        // console.log('thuan check', mon)
        this.props.handleEditMonFromParentKey(mon)
    }
    render() {

        // console.log('check all mon:', this.props.listallmon)
        // console.log('check state: ', this.state.allmonRedux)
        let arrallmon = this.state.allmonRedux;
        console.log('check all mon:', arrallmon)
        return (
            <table id="TableSanPham">
                <div className="title">
                    Danh sách sản phẩm
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>ID danh mục</th>
                        <th>Tên Món</th>
                        {/* <th>SIZE</th>
                        <th>Giá</th> */}
                        {/* <th>Mô tả</th> */}
                        <th> Trạng Thái</th>

                    </tr>
                    {arrallmon && arrallmon.length > 0 &&
                        arrallmon.map((item, index) => {
                            return (
                                <tr key={'index'}>
                                    <td>{item.id}</td>
                                    <td>{item.tendanhmuc.TEN_DM}</td>
                                    <td>{item.TEN_MON}</td>
                                    {/* <td>{item.SIZE}</td> */}
                                    {/* <td>{item.GIA}</td> */}
                                    {/* <td>{item.MO_TA}</td> */}
                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditMon(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteMon(item)}
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
        listallmon: state.admin.allmon,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllMonStart: () => dispatch(actions.fetchAllMonStart()),
        deleteMon: (id) => dispatch(actions.deleteMon(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSanPham);
