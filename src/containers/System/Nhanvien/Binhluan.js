
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TableChi from './TableChi';
import Lightbox from 'react-image-lightbox';
import './Binhluan.scss';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllDanhMuc, } from '../../../services/danhmucService';
import { getAllSize } from '../../../services/monService';
import *  as actions from "../../../store/actions";
import { getallbaoxaudate, deletebaoxau, deletedanhgia } from '../../../services/khubanService';
import { toast } from "react-toastify"
class Binhluan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baoxau: [],
            currentDate: moment(new Date()).startOf('day').valueOf(),


        }
    }
    async componentDidMount() {
        this.baoxau()
    }

    baoxau = async () => {
        let { currentDate } = this.state;
        let NGAY = moment(new Date(currentDate)).format('YYYY-MM-DD');
        // let NGAY = new Date(formateDate).getTime();
        console.log('b1809299 check item:', NGAY)
        let res = await getallbaoxaudate(NGAY)
        if (res && res.errCode === 0) {
            this.setState({
                baoxau: res.data.reverse(),
            })

        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleDeletebinhluan = async (baoxau) => {
        let ID_DG = baoxau.ID_DG
        console.log('b1809299 check item:', ID_DG)
        let res = await deletedanhgia(ID_DG);
        let res1 = await deletebaoxau(ID_DG);
        if (res && res.errCode === 0) {

            toast.success('Xóa bình luận thành công');

            await this.baoxau()
        }
        else {
            toast.error('Xóa bình luận không thành công')
        }

    }
    handleOnchang = (date) => {

        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.baoxau()
        })
        // console.log('b1809299 check item:', this.state)


    }
    render() {

        // console.log('check all mon:', this.props.listallmon)
        // console.log('check state: ', this.state.allmonRedux)
        let arrallphieuchi = this.state.baoxau;
        console.log('check state: ', arrallphieuchi)
        return (
            <div className="Binhluan-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ báo xấu BÌNH Luận
                </div>
                <div className="title">

                </div>
                <div className="Binhluan-body">
                    <div className="container">
                        <div className="row">

                            <div className="col-12">
                                <table id="TableChi">
                                    <div className="title">
                                        Danh sách báo xấu bình luận theo ngày
                                    </div>
                                    <div className="col-5 form-grop">

                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnchang}
                                            value={this.state.currentDate}

                                        />
                                    </div>

                                    <tbody>
                                        <tr>
                                            <th>Ngày</th>
                                            {/* <th>Tên tài khoản báo xấu</th> */}
                                            <th>Tên tài khoản báo xấu</th>
                                            <th>Nội dung báo xấu</th>
                                            <th>Điểm đánh giá</th>
                                            <th>Nội dung đánh giá</th>
                                            {/* <th>SIZE</th>
                        <th>Giá</th> */}
                                            {/* <th>Mô tả</th> */}
                                            <th> Công cụ</th>

                                        </tr>
                                        {arrallphieuchi && arrallphieuchi.length > 0 ?
                                            arrallphieuchi.map((item, index) => {
                                                let NGAY = moment(new Date(item.NGAY_DG)).format('DD-MM-YYYY');
                                                return (

                                                    <tr key={'index'}>
                                                        <td>{NGAY}</td>
                                                        {/* <td>{"item.tenkhg.ten_tk"}</td> */}
                                                        <td>{item.tenkhrp.ten_tk}</td>
                                                        <td>
                                                            {item.NOI_DUNG_RP}
                                                        </td>
                                                        <td>{item.ND.DIEM} Sao</td>
                                                        <td>{item.ND.NOI_DUNG}</td>
                                                        {/* <td>{item.MO_TA}</td> */}
                                                        <td >
                                                            <div className='edit-btn'>
                                                                {/* <button
                                                onClick={() => this.handleEditMon(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button> */}
                                                                <button
                                                                    onClick={() => this.handleDeletebinhluan(item)}
                                                                    className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :

                                            <tr>

                                                <td colSpan="9" style={{ textAlign: "center" }}>Không có báo xấu bình luận</td>


                                            </tr>
                                        }
                                    </tbody>
                                </table>
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
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Binhluan);
