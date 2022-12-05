import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from "../../../store/actions";
import './Qldatve.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getQLveByDate, editTTDonSevice, guithuhuyve } from '../../../services/khubanService';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import ModalXacHuyVe from './ModalXacHuyVe';
class Qldatve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            getdon: [],
            statusArr: [],
            ///huyve
            isOpenModalHuyVe: false,
            dataModalHuyVe: {},
            isShowLoadingHuyVe: false,

        }
    }
    async componentDidMount() {
        this.props.fetchAllStatusveStart();

        await this.getDatadon()


    }

    getDatadon = async () => {
        let { currentDate } = this.state;

        let formatDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        let NGAY = new Date(formatDate).getTime();
        let ID_TT = this.state.ID_TT
        let res = await getQLveByDate(formatDate, ID_TT)
        if (res && res.errCode === 0) {
            this.setState({
                datadon: res.data.reverse()
            })
        }
        // console.log('b1809299 check item:', res)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allstatusveRedux !== this.props.allstatusveRedux) {
            let arrStatus = this.props.allstatusveRedux;
            this.setState({
                statusArr: arrStatus,
                ID_TT: arrStatus && arrStatus.length > 0 ? arrStatus[0].idkey : ''
            })
        }
    }

    handleOnchang = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.getDatadon()
        })
        //console.log('b1809299 check item:', this.state)


    }
    // buildDataInputSelect = (inputdata) => {
    //     let result = [];
    //     if (inputdata && inputdata.length > 0) {
    //         inputdata.map((item, index) => {
    //             let object = {};
    //             let labelvn = `${item.TEN_KV}`;

    //             object.label = labelvn
    //             object.value = item.id;
    //             result.push(object)
    //         })
    //     }
    //     return result;
    // }
    // handleChangeSelect = async (selectedOption) => {
    //     this.setState({ selectedKhu: selectedOption });


    // };

    // handleDeleteban = () => {

    // }

    closemodalhuyve = () => {
        this.setState({
            isOpenModalHuyVe: false,
            dataModalHuyVe: {}

        })
    }
    guithuhuyve = async (dataChilFromModal) => {
        let { dataModalHuyVe } = this.state;
        this.setState({
            isShowLoadingHuyVe: true
        })

        let res = await guithuhuyve({
            email: dataChilFromModal.email,
            NGAYDAT: dataModalHuyVe.NGAY,
            NGAYDIEN: dataModalHuyVe.NGAYDIEN,
            SUAT: dataModalHuyVe.SUAT,
            TEN_SK: dataModalHuyVe.TEN_SK,
            T_TIEN: dataModalHuyVe.T_TIEN,
            ID_DON: dataModalHuyVe.ID,
            ten_tk: dataModalHuyVe.ten_tk,
            sdt: dataModalHuyVe.sdt,
            TT: dataModalHuyVe.TT,
            tenpttt: dataModalHuyVe.tenpttt,


        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoadingHuyVe: false
            })

            toast.success('Xác nhận hủy vé thành công');
            this.closemodalhuyve();
            await this.getDatadon();
        }
        else {
            this.setState({
                isShowLoadingHuyVe: false
            })
            toast.error('Xác nhận hủy vé không thành công')
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        // console.log('check tt:', this.state)
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.getDatadon()
        })
        // console.log('b1809299 check item:', this.state)


    }
    handleDetailve = (ve) => {

        let ID_DON = ve.id
        let TEN_TT = ve.tenpttt.TEN_TT;
        let TEN_KH = ve.ten.ten_tk;
        let SDT = ve.SDT;
        console.log('b1809299 check view infor su kien: ', ID_DON)
        console.log('b1809299 check view infor su kien: ', ID_DON)
        this.props.history.push({
            pathname: "/nhanvien/detailvenv/",
            state: { ID_DON, TEN_TT, TEN_KH, SDT }
        })
    }
    handlexacnhanHuyve = (item) => {

        let data = {
            ten_tk: item.ten.ten_tk,
            sdt: item.ten.sdt,
            email: item.ten.email,
            tenpttt: item.tenpttt.TEN_TT,
            NGAY: item.NGAY,
            TT: item.ID_TT,
            T_TIEN: item.T_TIEN,
            TEN_SK: item.donve.TEN_LSK,
            NGAYDIEN: item.donve.NGAY,
            SUAT: item.donve.GIO,
            ID: item.id
        }
        this.setState({
            isOpenModalHuyVe: true,
            dataModalHuyVe: data

        })
        // console.log('b1809299 check item:', data)

    }

    render() {
        let status = this.state.statusArr;
        // console.log('b1809299 check state: ', status)
        let { datadon, ID_TT } = this.state
        let { isOpenModalHuyVe, dataModalHuyVe } = this.state
        console.log('b1809299 check status: ', datadon)

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoadingHuyVe}
                    spinner
                    text='Vui lòng đợi vài giây...'
                >
                    <div className="manage-khachdatban-container">
                        <div className="title">
                            QUẢN LÝ KINH DOANH GOLD COFFEE
                        </div>
                        <div className="title">
                            QUẢN LÝ ĐẶT VÉ
                        </div>

                        <div className="khachdatban-body">
                            <div className="row">
                                <div className="col-3">
                                    <label>Trạng thái đơn</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'ID_TT') }}
                                        value={ID_TT}
                                    >
                                        {
                                            status && status.length > 0 &&
                                            status.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.idkey}>{item.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                {/* <div className="col-6 form-group">
                            <label>Chọn Khu</label>
                            <Select
                                value={this.state.selectedKhu}
                                onChange={this.handleChangeSelect}
                                options={this.state.listkhuvuc}
                            />
                        </div> */}
                                <div className="col-6 form-grop">
                                    <label>Chọn ngày </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnchang}
                                        value={this.state.currentDate}


                                    />
                                </div>
                            </div>

                            <div className="col-12 table-khachdatban">
                                <div className="title">
                                    Danh sách đặt vé
                                </div>
                                <table>
                                    <tbody>
                                        <tr >

                                            <th>Mã đơn</th>
                                            <th>Họ và tên</th>
                                            <th>Số điện thoại</th>
                                            <th>Tên sự kiện</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Mã thanh toán</th>
                                            <th>Thời gian</th>
                                            <th>Trạng thái vé</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                        {datadon && datadon.length > 0 ?
                                            datadon.map((item, index) => {

                                                return (
                                                    <tr key={index}>

                                                        <td>DH00{item.id}</td>
                                                        <td>{item.ten.ten_tk}</td>
                                                        <td>{item.SDT}</td>
                                                        <td>{item.donve.TEN_LSK}</td>
                                                        <td>{item.tenpttt.TEN_TT}</td>
                                                        <td>{item.MATT}</td>
                                                        <td>{item.NGAY}</td>
                                                        <td>{item.tentt.value}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.handleDetailve(item)}
                                                                className="btn-confirm" >Xem chi tiết</button>
                                                            <button
                                                                onClick={() => this.handlexacnhanHuyve(item)}
                                                                className="btn-huydat" >Xác nhận hủy vé</button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :

                                            <tr>

                                                <td colSpan="9" style={{ textAlign: "center" }}>Không có đơn vé</td>


                                            </tr>


                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <ModalXacHuyVe
                        isOpenModalHuyVe={isOpenModalHuyVe}
                        dataModalHuyVe={dataModalHuyVe}
                        closemodalhuyve={this.closemodalhuyve}
                        guithuhuyve={this.guithuhuyve}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        allstatusveRedux: state.admin.allstatusve,

    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchAllStatusveStart: () => dispatch(actions.fetchAllStatusveStart()),
        editID_TTRedux: (data) => dispatch(actions.editID_TT(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Qldatve);
