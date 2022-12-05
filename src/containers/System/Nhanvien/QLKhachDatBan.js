import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from "../../../store/actions";
import './QLKhachDatBan.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getlistdatban, guithuxacnhan, xacnhanhuyban, guithuhuyban, chuyenban } from '../../../services/khubanService';
import moment from 'moment';
import ModalXacNhan from './ModalXacNhan';
import ModalHuyBan from './ModalHuyBan';
import ModalChuyenBan from './ModalChuyenBan';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
class QLKhachDatBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            datadatlich: [],
            // selectedKhu: {},
            isOpenModalXacNhan: false,
            dataModal: {},
            isShowLoading: false,
            statusArr: [],
            ///huyban
            isOpenModalHuyBan: false,
            dataModalHuyBan: {},
            isShowLoadingHuyBan: false,
            ///chuyenban
            isOpenModalChuyenBan: false,
            dataModalChuyenBan: {},
            isShowLoadingChuyenBan: false,
        }
    }
    async componentDidMount() {
        this.props.fetchstatusbanStart();

        this.getDataDatLich()


    }

    getDataDatLich = async () => {
        let { currentDate } = this.state;
        let formateDate = new Date(currentDate).getTime();
        let ID_TT = this.state.ID_TT
        let res = await getlistdatban(formateDate, ID_TT)
        if (res && res.errCode === 0) {
            this.setState({
                datadatlich: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ttbanRedux !== this.props.ttbanRedux) {
            let arrStatus = this.props.ttbanRedux;
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
            await this.getDataDatLich()
        })

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
    handleBtnConfirm = (item) => {

        let data = {
            khuvucid: item.khuvucid,
            ID_TK: item.ID_TK,
            email: item.taikhoanData.email,
            ID_BAN: item.ID_BAN,
            ten_tk: item.taikhoanData.ten_tk
        }
        this.setState({
            isOpenModalXacNhan: true,
            dataModal: data

        })
        // console.log('b1809299 check item:', data)

    }
    handleDeleteban = () => {

    }
    closemodalxacnhan = () => {
        this.setState({
            isOpenModalXacNhan: false,
            dataModal: {}

        })
    }
    guithuxacnhan = async (dataChilFromModal) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await guithuxacnhan({
            email: dataChilFromModal.email,
            imgBase64: dataChilFromModal.imgBase64,
            khuvucid: dataModal.khuvucid,
            ID_TK: dataModal.ID_TK,
            ID_BAN: dataModal.ID_BAN,
            ten_tk: dataModal.ten_tk,


        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })

            toast.success('Gửi thư xác nhận thành công');
            this.closemodalxacnhan();
            await this.getDataDatLich();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Gửi thư xác nhận không thành công')
        }
    }
    handleHuyban = (item) => {

        let data = {
            khuvucid: item.khuvucid,
            ID_TK: item.ID_TK,
            email: item.taikhoanData.email,
            ID_BAN: item.ID_BAN,
            ten_tk: item.taikhoanData.ten_tk,
            TT: item.ID_TT,
            ID: item.id,
            BAN_SO: item.banData.SO_BAN,
            GHI_CHU: item.ghichu,

        }
        this.setState({
            isOpenModalHuyBan: true,
            dataModalHuyBan: data

        })
        // console.log('b1809299 check item:', data)

    }
    ////hủy bAN
    closemodalHuyBan = () => {
        this.setState({
            isOpenModalHuyBan: false,
            dataModalHuyBan: {}

        })
    }
    guithuhuyban = async (dataChilFromModalHuyBan) => {
        let { dataModalHuyBan } = this.state;
        this.setState({
            isShowLoadingHuyBan: true
        })
        let res = await guithuhuyban({
            email: dataChilFromModalHuyBan.email,
            khuvucid: dataModalHuyBan.khuvucid,
            ID_TK: dataModalHuyBan.ID_TK,
            ID_BAN: dataModalHuyBan.ID_BAN,
            ten_tk: dataModalHuyBan.ten_tk,
            ID_TT: dataModalHuyBan.TT,
            ID: dataModalHuyBan.ID,
            BAN_SO: dataModalHuyBan.BAN_SO,
            GHI_CHU: dataModalHuyBan.GHI_CHU,

        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoadingHuyBan: false
            })

            toast.success('Xác nhận hủy bàn thành công');
            this.closemodalHuyBan();
            await this.getDataDatLich();
        }
        else {
            this.setState({
                isShowLoadingHuyBan: false
            })
            toast.error('Xác nhận hủy không thành công')
        }
    }
    // handleHuyban = async (ban) => {
    //     let ID = ban.id;
    //     let ID_TT = ban.ID_TT;
    //     console.log('check propsid:', ID_TT)
    //     let res = await xacnhanhuyban(ID, ID_TT);
    //     if (res && res.errCode === 0) {

    //         toast.success('Xác nhận hủy bàn thành công');

    //         this.getDataDatLich()
    //     }
    //     else {
    //         toast.error('Xác nhận hủy bàn không thành công')
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
            await this.getDataDatLich()
        })
        // console.log('b1809299 check item:', this.state)


    }
    closemodalChuyenBan = () => {
        this.setState({
            isOpenModalChuyenBan: false,
            dataModalChuyenBan: {}

        })
    }
    handlechhuyenban = (item) => {

        let data = {
            khuvucid: item.khuvucid,
            tenkhu: item.khuData.TEN_KV,
            ID_TK: item.ID_TK,
            email: item.taikhoanData.email,
            ID_BAN: item.ID_BAN,
            ten_tk: item.taikhoanData.ten_tk,
            TT: item.ID_TT,
            ID: item.id,
            BAN_SO: item.banData.SO_BAN,
            GHI_CHU: item.ghichu,

        }
        this.setState({
            isOpenModalChuyenBan: true,
            dataModalChuyenBan: data

        })
        // console.log('b1809299 check item:', data)

    }
    ChuyenBan = async (dataChilFromModalChuyBan) => {
        let { dataModalChuyenBan } = this.state;
        this.setState({
        })
        let res = await chuyenban({
            ID_BAN: dataChilFromModalChuyBan.ID_BAN,
            khuvucid: dataChilFromModalChuyBan.ID_KV,
            ID: dataModalChuyenBan.ID


        });
        if (res && res.errCode === 0) {
            this.setState({

            })

            toast.success('Chuyển bàn thành công');
            this.closemodalChuyenBan();
            await this.getDataDatLich();
        }
        else {
            this.setState({

            })
            toast.error('Chuyển bàn không thành công')
        }
    }
    render() {
        let { datadatlich, isOpenModalXacNhan, dataModal } = this.state
        let { isOpenModalHuyBan, dataModalHuyBan } = this.state
        let { isOpenModalChuyenBan, dataModalChuyenBan } = this.state
        // console.log('b1809299 check state: ', datadatlich)
        let { ID_TT } = this.state
        let status = this.state.statusArr;
        //console.log('b1809299 check status: ', status)
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Vui lòng đợi vài giây...'
                >
                    <LoadingOverlay
                        active={this.state.isShowLoadingHuyBan}
                        spinner
                        text='Vui lòng đợi vài giây...'
                    >
                        <div className="manage-khachdatban-container">
                            <div className="title">
                                QUẢN LÝ KINH DOANH GOLD COFFEE
                            </div>
                            <div className="title">
                                QUẢN LÝ ĐẶT BÀN
                            </div>

                            <div className="khachdatban-body">
                                <div className="row">
                                    <div className="col-3">
                                        <label>Trạng thái bàn</label>
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
                                    <div className="col-6 form-grop">
                                        <label>Chọn ngày đặt</label>
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.handleOnchang}
                                            value={this.state.currentDate}


                                        />
                                    </div>
                                    {/* <div className="col-6 form-group">
                            <label>Chọn Khu</label>
                            <Select
                                value={this.state.selectedKhu}
                                onChange={this.handleChangeSelect}
                                options={this.state.listkhuvuc}
                            />
                        </div> */}
                                </div>

                                <div className="col-12 table-khachdatban">
                                    <div className="title">
                                        Danh sách Bàn đặt
                                    </div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>STT</th>
                                                <th>Họ và tên</th>
                                                <th>Số điện thoại</th>
                                                <th>Khu</th>
                                                <th>Bàn số</th>
                                                <th>Ghi chú</th>
                                                <th>Trang thái đơn</th>
                                                <th>Công cụ</th>
                                            </tr>
                                            {datadatlich && datadatlich.length > 0 ?
                                                datadatlich.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.taikhoanData.ten_tk}</td>
                                                            <td>{item.taikhoanData.sdt}</td>
                                                            <td>{item.khuData.TEN_KV}</td>
                                                            <td>{item.banData.SO_BAN}</td>
                                                            <td>{item.ghichu}</td>
                                                            <td>{item.ttData.value}</td>
                                                            <td>
                                                                <button
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                    className="btn-confirm" > Nhận bàn</button>
                                                                <button
                                                                    onClick={() => this.handleHuyban(item)}
                                                                    className="btn-huydat" >Xác nhận hủy bàn</button>
                                                                <button
                                                                    onClick={() => this.handlechhuyenban(item)}
                                                                    className="btn-confirm" > Chuyển bàn</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                :

                                                <tr>

                                                    <td colSpan="8" style={{ textAlign: "center" }}>Không có khách đặt bàn</td>


                                                </tr>


                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <ModalXacNhan
                            isOpenModal={isOpenModalXacNhan}
                            dataModal={dataModal}
                            closemodalxacnhan={this.closemodalxacnhan}
                            guithuxacnhan={this.guithuxacnhan}
                        />
                        <ModalHuyBan
                            isOpenModalHuyBan={isOpenModalHuyBan}
                            dataModalHuyBan={dataModalHuyBan}
                            closemodalHuyBan={this.closemodalHuyBan}
                            guithuhuyban={this.guithuhuyban}
                        />
                        <ModalChuyenBan
                            isOpenModalChuyenBan={isOpenModalChuyenBan}
                            dataModalChuyenBan={dataModalChuyenBan}
                            closemodalChuyenBan={this.closemodalChuyenBan}
                            ChuyenBan={this.ChuyenBan}
                        />

                    </LoadingOverlay>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        ttbanRedux: state.admin.ttban,

    };
};

const mapDispatchToProps = dispatch => {

    return {
        // fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
        fetchstatusbanStart: () => dispatch(actions.fetchstatusbanStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QLKhachDatBan);
