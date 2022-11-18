import React, { Component } from 'react';
import { connect } from "react-redux";
import './Giohang.scss';
import { getcartbyid, deleteproductcartService, deleteproductcartbyidService, getPayment } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import { getSizeByIdMon, savebulkdonhang } from '../../../services/monService'
import { QuantityPicker } from 'react-qty-picker';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import moment from 'moment';
import *  as actions from "../../../store/actions";
class Giohang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            ptttArr: [],
            PTTT: ''
        }
    }
    async componentDidMount() {
        this.props.fetchPTTTStart();
        if (this.props.userInfo) {
            this.setState({
                diachi: this.props.userInfo.diachi
            })
        }

        // let ID_TK = this.props.userInfo.id
        // console.log('check gio hang:', ID_TK)
        // let res = await getcartbyid(ID_TK)
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         listdata: res.data
        //     })
        // }

        await this.getcartbyidfromuser();

    }

    getcartbyidfromuser = async () => {
        let ID_TK = this.props.location.state.iduser
        // console.log('check gio hang:', ID_TK)
        let res = await getcartbyid(ID_TK)
        if (res && res.errCode === 0) {

            this.setState({
                listdata: res.data.reverse()
            })
        }
        let data = this.state.listdata;
        data = data.map(item => ({ ...item, isSelected: false }))
        this.setState({
            listdata: data
        })
        // let chonmon = data.filter(item => item.isSelected === true)
        // console.log('chon mon111:', chonmon)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allptttRedux !== this.props.allptttRedux) {
            let allptttGenders = this.props.allptttRedux;
            this.setState({
                ptttArr: allptttGenders,
                PTTT: allptttGenders && allptttGenders.length > 0 ? allptttGenders[0].id : ''

            })
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                diachi: this.props.userInfo.diachi
            })
        }
    }
    handleOnchangEmail = (event) => {
        this.setState({
            diachi: event.target.value
        })
    }
    handleDelete = async (mon) => {
        // console.log('check delete product cart:', mon.id)
        try {
            let res = await deleteproductcartService(mon.id)
            if (res && res.errCode === 0) {
                toast.success("Xóa món thành công")
                await this.getcartbyidfromuser();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    handleOnChangesl = (event) => {
        this.setState({
            sl: event.target.value
        })
    }
    //// click product
    handledatmon = async (inputid) => {
        let { listdata } = this.state
        if (listdata && listdata.length > 0) {
            listdata = listdata.map(item => {
                if (item.id === inputid.id)
                    item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                listdata: listdata
            })
        }

        // console.log('check id mon:', ID_MON)
        // let res = await getSizeByIdMon(ID_MON, idsize)
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         giasanpham: res.data ? res.data : []
        //     })
        // }
        // console.log('check price product:', res)
    }
    /// handle order
    handleOder = async () => {
        let result = [];
        let PTTT = this.state.PTTT;
        let { listdata } = this.state;
        let ten_tk = this.props.userInfo.ten_tk;
        let iduser = this.props.userInfo.id;
        let DIA_CHI = this.state.diachi
        let sdt = this.props.userInfo.sdt;
        let chonmon = listdata.filter(item => item.isSelected === true);
        let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) * Number(item.SL), 0);
        let tiengiam1 = chonmon.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA) * Number(item.SL) * Number(item.GIAM_GIA) / 100, 0);
        let ship = Number(15000)
        let tongdon = tongtien + ship - tiengiam1;
        console.log('tong tien:', this.state)
        let formateDate = moment(new Date()).format('DD/MM/YYYY');
        let today1 = moment(new Date()).format("YYYY/MM/DD");
        let today2 = new Date(today1).getTime() / 10;

        console.log('check ngay:', today2)

        if (chonmon && chonmon.length > 0) {
            chonmon.map((chonmon, index) => {
                let object = {};
                object.ID_TK = iduser;
                object.TEN_TK = ten_tk;
                object.DIA_CHI = DIA_CHI;
                object.SDT = sdt;
                object.PTTT = PTTT;
                object.NGAY = formateDate;
                object.NGAY1 = today2;
                object.ID_MON = chonmon.ID_MON;
                object.ID_SIZE = chonmon.ID_SIZE;
                object.GIA_SPHAM = chonmon.GIA;
                object.SL_SPHAM = chonmon.SL;
                object.T_TIEN = tongdon;
                object.ID_KM = chonmon.GIAM_GIA;
                result.push(object)
            })
        } else {
            toast.error("Vui lòng chọn món trước khi nhấn đặt hàng")
            return;
        }
        console.log('check push:', result)
        //////bulk create dat hang
        if (PTTT === 1) {
            let res = await savebulkdonhang({
                arrchonmon: result,
                ID_TK: iduser,
                NGAY: formateDate,
                DIA_CHI: DIA_CHI,
                PTTT: PTTT,
                T_TIEN: tongdon,
                TIEN_GIAM: tiengiam1,
                NGAY1: today2,


            })

            if (res && res.errCode === 0) {
                toast.success('Đặt món thành công')

                let ID_TK = this.props.location.state.iduser
                let res = await deleteproductcartbyidService(ID_TK)
                if (res && res.errCode === 0) {
                    await this.getcartbyidfromuser();
                }
                else {
                    alert(res.errMessage)
                }

            } else {
                toast.error('Đặt món không thành công')
            }


        } else {
            let { listdata } = this.state;
            let chonmon = listdata.filter(item => item.isSelected === true);
            let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) * Number(item.SL), 0);
            let tiengiam1 = chonmon.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA) * Number(item.SL) * Number(item.GIAM_GIA) / 100, 0);
            let ship = Number(15000)
            let tongdon = tongtien + ship - tiengiam1;
            let today = new Date().getTime();
            let today1 = moment(new Date()).format("YYYY/MM/DD");
            let today2 = new Date(today1).getTime() / 10;
            let formateDate = moment(new Date()).format('DD/MM/YYYY');
            console.log('tien:', tongdon)
            console.log('mã dơn:', today)
            if (!DIA_CHI) {
                toast.error("Vui Lòng nhập địa chỉ giao hàng")
            } else {

                let res = await getPayment({
                    transactionRef: ten_tk + today,
                    orderType: tongdon,
                    amount: tongdon,
                })
                console.log('check link:', res);
                window.location.href = res;
                let res1 = await savebulkdonhang({
                    arrchonmon: result,
                    ID_TK: iduser,
                    NGAY: formateDate,
                    DIA_CHI: DIA_CHI,
                    PTTT: PTTT,
                    T_TIEN: tongdon,
                    TIEN_GIAM: tiengiam1,
                    MATT: ten_tk + today,
                    NGAY1: today2,

                })
                if (res1 && res1.errCode === 0) {
                    // toast.success('Đặt món thành công')
                    let ID_TK = this.props.location.state.iduser
                    let res = await deleteproductcartbyidService(ID_TK)
                    if (res && res.errCode === 0) {
                        await this.getcartbyidfromuser();
                    }
                    else {
                        alert(res.errMessage)
                    }

                } else {
                    toast.error('Đặt món không thành công')
                }
            }


        }

        // console.log('check state: ', this.state);
    }
    handleViewDetaildon = (user) => {
        let ID_TK = this.props.location.state.iduser
        console.log('b1809299 check view infor su kien: ', ID_TK)
        this.props.history.push({
            pathname: "/chitietdonhang/${user.ID_TK}",
            state: { ID_TK }
        })
    }
    handleVNPay = async () => {


    }
    handleOnchangdiachi = (event) => {
        let DIA_CHI = this.props.location.state.DIA_CHI
        this.setState({
            DIA_CHI: event.target.value
        })
    }
    render() {
        let ID_PTTTS = this.state.ptttArr;
        let { PTTT, } = this.state;
        // let today = new Date().getTime();
        // console.log('check ngay', ID_PTTT);
        let listdata = this.state.listdata;
        console.log('check props:', this.props)
        const { userInfo } = this.props

        let chonmon = listdata.filter(item => item.isSelected === true)

        let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) * Number(item.SL), 0);
        let tiengiam1 = chonmon.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA) * Number(item.SL) * Number(item.GIAM_GIA) / 100, 0);
        let ship = Number(15000)
        let tongdon = tongtien + ship - tiengiam1;
        // console.log('tong tien:', this.state)
        // for (let i = 0; i < chonmon.length; i++) {
        //     console.log('check gi do di:', chonmon[i].ID_MON)
        //     console.log('check gi do di:', chonmon[i].ID_SIZE)
        // }
        let today1 = moment(new Date()).format("YYYY/MM/DD");
        let today2 = new Date(today1).getTime();
        // let ngay1 = new Date(today1).getTime() / 1000;
        console.log('check gi do di:', today2)

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-giohang">
                    <div className="giohang">
                        Giỏ hàng
                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header1">Hình ảnh</div>
                            <div className="header2">Tên sản phẩm </div>
                            <div className="header3">Size</div>
                            <div className="header4">Số lượng</div>
                            <div className="header5">Thành tiền</div>
                            <div className="header6"></div>
                            <div className="header7">Thông tin khách hàng</div>
                        </div>


                        <div className="intro-giohang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.ttmon.ANH) {
                                            imageBase64 = new Buffer(item.ttmon.ANH, 'base64').toString('binary');
                                        }
                                        let SL = item.SL
                                        let tiengiam = Number(item.GIAM_GIA) / 100 * Number(item.SL);
                                        let tongtienmon = Number(item.GIA) * Number(item.SL);
                                        let thanhtien = tongtienmon - tiengiam
                                        return (
                                            <div className={item.isSelected === true ? "view-mon active" : "view-mon "}
                                                key={index}
                                                onClick={() => this.handledatmon(item)}
                                            >
                                                <div className="mon-left" style={{ backgroundImage: `url(${imageBase64})` }} />
                                                <div className="mon-right1"

                                                >{item.ttmon.TEN_MON}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={item.GIA}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        /></div>
                                                    <div >Giảm: {item && item.GIAM_GIA ? item.GIAM_GIA : '0'}% </div>
                                                </div>


                                                <div className="mon-right2">{item.ttsize.TEN_SIZE}</div>
                                                <div className="mon-right3">
                                                    <input className="form-control" min={1} type="number" value={SL}
                                                        onChange={(event) => this.handleOnChangesl(event)}
                                                    />
                                                </div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={thanhtien}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' đ'}
                                                    />
                                                </div>
                                                <div className="mon-right5">
                                                    <button onClick={() => this.handleDelete(item)}><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="content-right">
                                <div className="ten-kh">Tên Khách hàng: {userInfo
                                    && userInfo.ten_tk ? userInfo.ten_tk : ''}
                                </div>
                                <div className="sdt-kh">Số điện thoại: {userInfo
                                    && userInfo.sdt ? userInfo.sdt : ''}
                                </div>
                                <div className="dc-kh">
                                    <label>Địa chỉ nhận hàng</label>
                                    <input className="form-control" type="diachi" value={this.state.diachi}
                                        onChange={(event) => this.handleOnchangEmail(event)}
                                    />
                                </div>


                                <div className="phi-ship">Tổng tiền hàng: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                /></div>
                                <div className="phi-ship">Tổng tiền giảm giá: <NumberFormat
                                    className="gia"
                                    value={tiengiam1}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                /></div>
                                <div className="phi-ship">Phí Ship: 15.000đ</div>

                                <div className="Tongtien">Tổng thanh toán: <NumberFormat
                                    className="gia"
                                    value={tongdon}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>
                                <div className="pt-tt">
                                    <label>Phương thức thanh toán</label>
                                    <select className="form-control btn-pttt"
                                        onChange={(event) => { this.onChangeInput(event, 'PTTT') }}
                                        value={PTTT}
                                    >
                                        {
                                            ID_PTTTS && ID_PTTTS.length > 0 &&
                                            ID_PTTTS.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>📌 {item.TEN_TT}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="don-kh"
                                    onClick={(event) => this.handleViewDetaildon(event)}
                                >Xem đơn hàng </div>
                                <div className="btn-dat"
                                    onClick={() => this.handleOder()}
                                >
                                    <button>
                                        <div> Đặt hàng</div>


                                    </button>
                                </div>
                                {/* <div className="btn-vnpay"
                                    onClick={() => this.handleVNPay()}
                                >
                                    <button>
                                        <div></div>

                                    </button>
                                </div> */}


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
        allptttRedux: state.admin.allpttt,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPTTTStart: () => dispatch(actions.fetchPTTTStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Giohang);
