import React, { Component } from 'react';
import { connect } from "react-redux";
import './CTdatban.scss';
import { getcartbyid, getdatbanbyid, huyban } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import { getSizeByIdMon, savebulkdonhang } from '../../../services/monService'
import { QuantityPicker } from 'react-qty-picker';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import moment from 'moment';
import *  as actions from "../../../store/actions";
class CTdatban extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            SDT: '',
            PTTT: ''
        }
    }
    async componentDidMount() {


        // let ID_TK = this.props.userInfo.id
        // console.log('check gio hang:', ID_TK)
        // let res = await getdatbanbyid(ID_TK)
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         listdata: res.data
        //     })
        // }

        await this.timkiem();

    }

    timkiem = async () => {
        let SDT = this.state.SDT;
        console.log('check gio hang:', SDT)
        let res = await getdatbanbyid(SDT)
        if (res && res.errCode === 0) {

            this.setState({
                listdata: res.data
            })
        }
        //     let data = this.state.listdata;
        //     data = data.map(item => ({ ...item, isSelected: false }))
        //     this.setState({
        //         listdata: data
        //     })
        //     // let chonmon = data.filter(item => item.isSelected === true)
        //     // console.log('chon mon111:', chonmon)

    }


    handleDetailOrder = (don) => {

        let ID_DON = don.id
        let TEN_TT = don.datapttt.TEN_TT;
        //  console.log('b1809299 check view infor su kien: ', ID_DON)
        // console.log('b1809299 check view infor su kien: ', ID_DON)
        this.props.history.push({
            pathname: "/detaildon/${don.ID_DON}",
            state: { ID_DON, TEN_TT }
        })
    }
    handleHuyban = async (ban) => {
        let ID = ban.id;
        let ID_TT = ban.ID_TT;
        console.log('check propsid:', ID)

        let res = await huyban(ID, ID_TT);
        if (res && res.errCode === 0) {

            toast.success('Gửi yêu cầu hủy bàn thành công');

            await this.timkiem();
        }
        else {
            toast.error('Gửi yêu cầu hủy bàn không thành công')
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        //         email: '',
        //         ten_tk: '',
        //         matkhau: '',
        //         sdt: '',
        //         diachi: '',
        //         gender: '',
        //         role: '',
        //         position: '',
        //         avatar: '',
    }
    render() {
        // let today = new Date().getTime();
        // console.log('check ngay', ID_PTTT);
        let listdata = this.state.listdata;
        // console.log('check props:', this.props)
        console.log('check props:', listdata)
        const { userInfo } = this.props
        let formatDate = `${moment(listdata.NGAY).format('DD-MM-YYYY')}`
        let { SDT } = this.state
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-CTdatban">
                    <div className="CTdatban">
                        Thông tin đặt bàn
                    </div>
                    <div className="col-3 sdt">
                        <label>Số điện thoại</label>
                        <input className="form-control" type="text"
                            value={SDT}
                            onChange={(event) => { this.onChangeInput(event, 'SDT') }}
                        />


                    </div>
                    <div className="col-3 my-3  ">
                        <button className="btn-tim"
                            onClick={() => this.timkiem()}
                        ><i className="fas fa-search"></i> Tìm kiếm</button>
                    </div>
                    <div className="CTdatban-container">
                        <div className="header">
                            <div className="header1">Mã đặt bàn</div>
                            <div className="header2">Tên Khách hàng</div>
                            <div className="header3">Ngày đặt</div>
                            <div className="header4">Thông tin</div>
                            <div className="header5">Trạng thái đơn</div>
                            <div className="header6">Trạng thái</div>
                        </div>


                        <div className="intro-CTdatban" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        //let formatDate = moment(item.NGAY).format('DD-MM-YYYY')
                                        return (
                                            <div className="view-mon "
                                            // key={index}
                                            // onClick={() => this.handledatmon(item)}
                                            >
                                                <div className="mon-left">DH00{item.id}</div>
                                                <div className="mon-right1">{item.taikhoanData.ten_tk}</div>
                                                <div className="mon-right2">{formatDate}</div>
                                                <div className="mon-right3">{item.ghichu}
                                                    <div > Khu: {item.khuData.TEN_KV}</div>
                                                    <div > Bàn: {item.banData.SO_BAN}</div>
                                                </div>
                                                <div className="mon-right4">{item.ttData.value}</div>
                                                <div className="mon-right5">
                                                    <button className="btn-huy"
                                                        onClick={() => this.handleHuyban(item)}
                                                    >Yêu cầu hủy bàn</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

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

    };
};

const mapDispatchToProps = dispatch => {
    return {
        YCHDRedux: (data) => dispatch(actions.YCHD(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CTdatban);
