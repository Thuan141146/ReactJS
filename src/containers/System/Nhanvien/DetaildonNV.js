import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetaildonNV.scss';
import { getalldonbyiddon, editTTDonSevice, savebulkhoadon } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { withRouter } from 'react-router';
import *  as actions from "../../../store/actions";
import { toast } from 'react-toastify';
class DetaildonNV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            ptttArr: [],
            PTTT: '',
            statusArr: [],
            id: '',
        }
    }
    async componentDidMount() {
        this.props.fetchAllStatusStart();
        let ID_DON = this.props.location.state.ID_DON
        console.log('check gio hang:', ID_DON)
        let res = await getalldonbyiddon(ID_DON)
        console.log('check gio hang:', ID_DON)
        if (res && res.errCode === 0) {
            this.setState({
                listdata: res.data
            })
        }

        this.props.fetchAllStatusStart();

        let updatett = await editTTDonSevice(ID_DON)


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
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        // console.log('check tt:', this.state)
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        console.log('b1809299 check item:', this.state)


    }
    update = () => {
        let ID_DON = this.props.location.state.ID_DON
        this.props.editID_TTRedux({
            ID_TT: this.state.ID_TT,
            id: ID_DON

        })

    }
    /// handle order
    savehoadon = async () => {
        let result = [];
        let { listdata } = this.state;
        let idnv = this.props.userInfo.id;
        let iddon = this.props.location.state.ID_DON;
        let PTTT = this.props.location.state.TEN_TT;
        let idkh = this.props.location.state.TEN_KH;
        let diachi = this.props.location.state.DIA_CHI;
        let chonmon = listdata.filter(item => item.isSelected === true);
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM), 0);
        let ship = Number(15000)
        let tongdon = tongtien + ship;
        console.log('tong tien:', tongdon)
        let today1 = moment(new Date()).format('HH:MM-DD/MM/YYYY');
        let today2 = new Date(today1).getTime();
        // console.log('check ngay:', idkh)

        if (listdata && listdata.length > 0) {
            listdata.map((listdata, index) => {
                let object = {};
                object.GHI_CHU = diachi;
                object.PTTT = PTTT;
                object.NGAY = today1;
                object.ID_MON = listdata.ID_MON;
                object.ID_SIZE = listdata.ID_SIZE;
                object.GIA_SPHAM = listdata.GIA_SPHAM;
                object.SL_SPHAM = listdata.SL_SPHAM;
                object.T_TIEN = tongdon;
                result.push(object)
            })
        } else {
            toast.error("Vui lòng chọn món trước khi nhấn đặt hàng")
            return;
        }

        console.log('check push:', result)
        //////bulk create dat hang

        let res = await savebulkhoadon({
            arrchonmon: result,
            ID_DON: iddon,
            ID_KH: idkh,
            ID_NV: idnv,
            NGAY_LAP: today1,
            GHI_CHU: diachi,
            PTTT: PTTT,
            TONG_TIEN: tongdon,

        })
        if (res && res.errCode === 0) {
            toast.success('Lưu hoá đơn thành công')
        } else {
            toast.error('Lưu hoá đơn không thành công')
        }
    }

    // console.log('check state: ', this.state);
    savehoadonandin = async () => {
        let result = [];
        let { listdata } = this.state;
        let idnv = this.props.userInfo.id;
        let tennv = this.props.userInfo.ten_tk;
        let iddon = this.props.location.state.ID_DON;
        let PTTT = this.props.location.state.TEN_TT;
        let idkh = this.props.location.state.TEN_KH;
        let diachi = this.props.location.state.DIA_CHI;

        let chonmon = listdata.filter(item => item.isSelected === true);
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM), 0);
        let tiengiam1 = listdata.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM) * Number(item.ID_KM) / 100, 0);
        let ship = Number(15000);
        let today = tongtien + ship - tiengiam1;
        console.log('tong tien:', today)
        let today1 = moment(new Date()).format('HH:MM-DD/MM/YYYY');
        let today2 = new Date(today1).getTime();
        // console.log('check ngay:', idkh)

        if (listdata && listdata.length > 0) {
            listdata.map((listdata, index) => {
                let object = {};
                object.GHI_CHU = diachi;
                object.PTTT = PTTT;
                object.NGAY = today1;
                object.ID_MON = listdata.ID_MON;
                object.ID_SIZE = listdata.ID_SIZE;
                object.GIA_SPHAM = listdata.GIA_SPHAM;
                object.SL_SPHAM = listdata.SL_SPHAM;
                object.ID_KM = listdata.ID_KM;
                object.T_TIEN = today;
                result.push(object)
            })
        } else {
            toast.error("Vui lòng chọn món trước khi nhấn đặt hàng")
            return;
        }

        console.log('check push:', result)
        //////bulk create dat hang

        let res = await savebulkhoadon({
            arrchonmon: result,
            ID_DON: iddon,
            ID_KH: idkh,
            ID_NV: idnv,
            NGAY_LAP: today1,
            GHI_CHU: diachi,
            PTTT: PTTT,
            GIAM_GIA: tiengiam1,
            TONG_TIEN: today,

        })
        if (res && res.errCode === 0) {
            toast.success('Lưu hoá đơn thành công')
            let ID_DON = iddon;
            let ID_KH = idkh;
            let DIA_CHI = diachi
            let ID_NV = this.props.userInfo.ten_tk;
            let SDT = this.props.location.state.SDT;
            let pttt = PTTT;
            let NGAY_LAP = today1;
            this.props.history.push({
                pathname: "/nhanvien/hoadon/",
                state: { ID_DON, ID_KH, ID_NV, pttt, DIA_CHI, SDT, NGAY_LAP }
            })

        } else {
            toast.error('Lưu hoá đơn không thành công')
        }
    }

    render() {
        let status = this.state.statusArr;
        // let today = new Date().getTime();
        console.log('check ngay', this.props);
        let listdata = this.state.listdata;
        console.log('check props:', listdata)
        const { userInfo } = this.props
        let chonmon = listdata.filter(item => item.isSelected === true)
        //console.log('chon mon render:', listdata)
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM), 0);
        let tiengiam1 = listdata.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM) * Number(item.ID_KM) / 100, 0);
        let ship = Number(15000);
        let today = tongtien + ship - tiengiam1;
        console.log('tong:', today)
        let pttt = this.props.location.state.TEN_TT;
        let TEN_KH = this.props.location.state.TEN_KH
        let SDT = this.props.location.state.SDT
        let DIA_CHI = this.props.location.state.DIA_CHI
        // console.log('check thanh toan:', DIA_CHI)
        let { ID_TT } = this.state

        return (
            <>

                <div className="back-DetaildonNV">
                    <div className="title">
                        QUẢN LÝ KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QUẢN LÝ ĐƠN HÀNG
                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header1">Hình ảnh</div>
                            <div className="header2">Tên sản phẩm </div>
                            <div className="header3">Size</div>
                            <div className="header4">Số lượng</div>
                            <div className="header5">Thành tiền</div>
                            <div className="header6"></div>
                            <div className="header7">Thông tin nhận hàng</div>
                        </div>
                        <div className="intro-giohang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.mon.ANH) {
                                            imageBase64 = new Buffer(item.mon.ANH, 'base64').toString('binary');
                                        }
                                        let SL = item.SL_SPHAM
                                        let tongtienmon = Number(item.GIA_SPHAM) * Number(item.SL_SPHAM);
                                        let tongtiegiam = Number(item.ID_KM) / 100 * Number(item.GIA_SPHAM) * Number(item.SL_SPHAM);
                                        let thanhtien = tongtienmon - tongtiegiam
                                        return (


                                            <div className="view-mon">
                                                <div className="mon-left" style={{ backgroundImage: `url(${imageBase64})` }} key={index}></div>
                                                <div className="mon-right1"
                                                    key={index}
                                                >{item.mon.TEN_MON}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={item.GIA_SPHAM}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        />
                                                    </div>
                                                    <div >Giảm: {item && item.ID_KM ? item.ID_KM : '0'}% </div>
                                                </div>

                                                <div className="mon-right2">{item.tsize.TEN_SIZE}</div>
                                                <div className="mon-right3">{SL}</div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={thanhtien}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    /></div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="content-right">
                                <div className="ten-kh">Tên Khách hàng: {TEN_KH
                                    && TEN_KH ? TEN_KH : ''}
                                </div>
                                <div className="sdt-kh">Số điện thoại: {SDT
                                    && SDT ? SDT : ''}
                                </div>
                                <div className="dc-kh">Địa chỉ: {this.props.location.state.DIA_CHI}
                                </div>
                                <div className="phi-ship">Tổng tiền hàng: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>
                                <div className="phi-ship">Tổng tiền giảm giá: <NumberFormat
                                    className="gia"
                                    value={tiengiam1 ? tiengiam1 : '0'}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>
                                <div className="phi-ship">Phí Ship: 15.000đ</div>

                                <div className="Tongtien">Tổng thanh toán: <NumberFormat
                                    className="gia"
                                    value={today}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>
                                <div className="pttt">Phương thức thanh toán: {pttt}</div>
                                <div className="col-12">
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
                                <div className="btn-dat"
                                    onClick={() => this.update()}
                                >
                                    <button>
                                        <div>Cập nhật</div>
                                    </button>
                                </div>
                                <div className="btn-dat"
                                    onClick={() => this.savehoadon()}
                                >
                                    <button>
                                        <div>Lưu hóa đơn</div>
                                    </button>
                                </div>
                                <div className="btn-dat"
                                    onClick={() => this.savehoadonandin()}
                                >
                                    <button>
                                        <div>Xuất và lưu hóa đơn</div>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        allstatusRedux: state.admin.allstatus,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStatusStart: () => dispatch(actions.fetchAllStatusStart()),

        editID_TTRedux: (data) => dispatch(actions.editID_TT(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetaildonNV));
