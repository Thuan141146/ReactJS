import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableGiaSanPham.scss';
import *  as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { couldStartTrivia } from 'typescript';



class TableGiaSanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allgiaRedux: []

        }

    }
    componentDidMount() {
        this.props.fetchAllGiaMonStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listallgia !== this.props.listallgia) {
            this.setState({
                allgiaRedux: this.props.listallgia
            })
        }
    }
    handleDeleteGiaMon = (giamon) => {

        this.props.deleteGiaMon(giamon.id);

    }
    handleEditGiaMon = (giasize) => {
        // console.log('thuan check', mon)
        this.props.handleEditGiaMonFromParentKey(giasize)
    }
    render() {
        let allgiaArr = this.state.allgiaRedux;
        // console.log('check all mon:', this.props.listallgia)
        // console.log('check state: gia san phamr ', this.state.allgiaRedux)

        return (
            <table id="TableGiaSanPham">
                <div className="title">
                    Danh sách giá sản phẩm
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Tên món</th>
                        <th>Tên size</th>
                        <th>Giá</th>
                        <th> Trạng Thái</th>

                    </tr>
                    {allgiaArr && allgiaArr.length > 0 &&
                        allgiaArr.map((item, index) => {
                            let tenmon = item.tenmon.TEN_MON
                            let tensize = item.tensize.TEN_SIZE
                            return (

                                <tr key={'index'}>
                                    <td>{item.id}</td>
                                    <td>{tenmon}</td>
                                    <td>{tensize}</td>
                                    <td>{item.GIA}</td>
                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditGiaMon(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteGiaMon(item)}
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
        listallgia: state.admin.allgia,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllGiaMonStart: () => dispatch(actions.fetchAllGiaMonStart()),
        deleteGiaMon: (id) => dispatch(actions.deleteGiaMon(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableGiaSanPham);
