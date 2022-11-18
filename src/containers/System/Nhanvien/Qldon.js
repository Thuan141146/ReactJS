import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from "../../../store/actions";
import './Qldon.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getQLdonByDate, editTTDonSevice, xacnhanhuydon } from '../../../services/khubanService';
import moment from 'moment';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class Qldon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            getdon: [],
            statusArr: [],
            // isOpenModalXacNhan: false,
            // dataModal: {},

        }
    }
    async componentDidMount() {
        this.props.fetchAllStatusStart();

        await this.getDatadon()


    }

    getDatadon = async () => {
        let { currentDate } = this.state;

        let formatDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        let NGAY = new Date(formatDate).getTime();
        let ID_TT = this.state.ID_TT
        let res = await getQLdonByDate(formatDate, ID_TT)
        if (res && res.errCode === 0) {
            this.setState({
                datadon: res.data
            })
        }
        // console.log('b1809299 check item:', res)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allstatusRedux !== this.props.allstatusRedux) {
            let arrStatus = this.props.allstatusRedux;
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

    // closemodalxacnhan = () => {
    //     this.setState({
    //         isOpenModalXacNhan: false,
    //         dataModal: {}

    //     })
    // }
    // guithuxacnhan = async (dataChilFromModal) => {
    //     let { dataModal } = this.state;
    //     this.setState({
    //         isShowLoading: true
    //     })

    //     let res = await guithuxacnhan({
    //         email: dataChilFromModal.email,
    //         imgBase64: dataChilFromModal.imgBase64,
    //         khuvucid: dataModal.khuvucid,
    //         ID_TK: dataModal.ID_TK,
    //         ID_BAN: dataModal.ID_BAN,
    //         ten_tk: dataModal.ten_tk,

    //     });
    //     if (res && res.errCode === 0) {
    //         this.setState({
    //             isShowLoading: false
    //         })

    //         toast.success('Gửi thư xác nhận thành công');
    //         this.closemodalxacnhan();
    //         await this.getDataDatLich();
    //     }
    //     else {
    //         this.setState({
    //             isShowLoading: false
    //         })
    //         toast.error('Gửi thư xác nhận không thành công')
    //     }
    // }
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
    // handleBtnConfirm = (item) => {

    //     let data = {
    //         ID_TK: item.ID_TK,
    //         iddon: item.id,
    //         PTTT: item.datapttt.TEN_TT,
    //         TEN_TK: item.tenkhach.ten_tk,
    //         SDT: item.tenkhach.sdt,
    //         DIA_CHI: item.tenkhach.diachi,
    //         EMAIL: item.tenkhach.email

    //     }
    //     this.setState({
    //         isOpenModalXacNhan: true,
    //         dataModal: data

    //     })
    //     // console.log('b1809299 check item:', data)

    // }
    handleDetailOrder = (don) => {

        let ID_DON = don.id
        let TEN_TT = don.datapttt.TEN_TT;
        let TEN_KH = don.tenkhach.ten_tk;
        let DIA_CHI = don.DIA_CHI;
        let SDT = don.tenkhach.sdt;
        console.log('b1809299 check view infor su kien: ', ID_DON)
        console.log('b1809299 check view infor su kien: ', ID_DON)
        this.props.history.push({
            pathname: "/nhanvien/detaildonnv/",
            state: { ID_DON, TEN_TT, TEN_KH, DIA_CHI, SDT }
        })
    }
    handlexacnhanHuydon = async (don) => {
        let ID = don.id;
        let ID_TT = don.ID_TT;
        console.log('check propsid:', ID)
        let res = await xacnhanhuydon(ID, ID_TT);
        if (res && res.errCode === 0) {

            toast.success('Xác nhận hủy đơn thành công');

            await this.getDatadon()
        }
        else {
            toast.error('Xác nhận hủy đơn  không thành công')
        }
    }
    render() {
        let status = this.state.statusArr;
        // console.log('b1809299 check state: ', status)
        let { datadon, isOpenModalXacNhan, dataModal, ID_TT } = this.state
        console.log('b1809299 check state: ', datadon)

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Vui lòng đợi vài giây...'
                >
                    <div className="manage-khachdatban-container">
                        <div className="title">
                            QUẢN LÝ KINH DOANH GOLD COFFEE
                        </div>
                        <div className="title">
                            QUẢN LÝ ĐƠN HÀNG
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
                                    Danh sách đơn hàng
                                </div>
                                <table>
                                    <tbody>
                                        <tr >

                                            <th>Mã đơn</th>
                                            <th>Họ và tên</th>
                                            <th>Địa chỉ</th>
                                            <th>Trạng thái đơn</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Mã thanh toán</th>
                                            <th>Thời gian</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                        {datadon && datadon.length > 0 ?
                                            datadon.map((item, index) => {

                                                return (
                                                    <tr key={index}>

                                                        <td>DH00{item.id}</td>
                                                        <td>{item.tenkhach.ten_tk}</td>
                                                        <td>{item.DIA_CHI}</td>
                                                        <td>{item.datatt.value}</td>
                                                        <td>{item.datapttt.TEN_TT}</td>
                                                        <td>{item.MATT}</td>
                                                        <td>{item.NGAY}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.handleDetailOrder(item)}
                                                                className="btn-confirm" >Xem chi tiết</button>
                                                            <button
                                                                onClick={() => this.handlexacnhanHuydon(item)}
                                                                className="btn-huydat" >Hủy đơn</button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :

                                            <tr>

                                                <td colSpan="8" style={{ textAlign: "center" }}>Không có đơn hàng</td>


                                            </tr>


                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* <ModalXacNhanDon
                        isOpenModal={isOpenModalXacNhan}
                        dataModal={dataModal}
                        closemodalxacnhan={this.closemodalxacnhan}
                    // guithuxacnhan={this.guithuxacnhan}
                    /> */}
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        allstatusRedux: state.admin.allstatus,

    };
};

const mapDispatchToProps = dispatch => {

    return {
        fetchAllStatusStart: () => dispatch(actions.fetchAllStatusStart()),
        editID_TTRedux: (data) => dispatch(actions.editID_TT(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Qldon);
