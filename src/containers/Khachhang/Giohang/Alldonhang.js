import React, { Component } from 'react';
import { connect } from "react-redux";
import './Alldonhang.scss';
import { getcartbyid, getalldonbyid, huydon } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import { getSizeByIdMon, savebulkdonhang } from '../../../services/monService'
import { QuantityPicker } from 'react-qty-picker';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import moment from 'moment';
import *  as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
class Alldonhang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            ptttArr: [],
            PTTT: '',
            currentDate: moment(new Date()).startOf('day').valueOf(),
        }
    }
    async componentDidMount() {


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
        let ID_TK = this.props.location.state.ID_TK;
        let { currentDate } = this.state;
        let formatDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        // console.log('check gio hang:', ID_TK)
        let res = await getalldonbyid(ID_TK, formatDate)
        if (res && res.errCode === 0) {
            this.setState({
                listdata: res.data.reverse()
            })
        }
        // let data = this.state.listdata;
        // data = data.map(item => ({ ...item, isSelected: false }))
        // this.setState({
        //     listdata: data.reverse()
        // })
        // let chonmon = data.filter(item => item.isSelected === true)
        // console.log('chon mon111:', chonmon)

    }


    handleDetailOrder = (don) => {

        let ID_DON = don.id
        let TEN_TT = don.datapttt.TEN_TT;
        let DIA_CHI = don.DIA_CHI
        //console.log('b1809299 check view infor su kien: ', DIA_CHI)
        // console.log('b1809299 check view infor su kien: ', ID_DON)
        this.props.history.push({
            pathname: "/detaildon/${don.ID_DON}",
            state: { ID_DON, TEN_TT, DIA_CHI }
        })
    }
    handleHuydon = async (don) => {
        let ID = don.id;
        let ID_TT = don.ID_TT;
        console.log('check propsid:', ID_TT)
        let res = await huydon(ID, ID_TT);
        if (res && res.errCode === 0) {

            toast.success('Gửi yêu cầu hủy đơn thành công');

            await this.getcartbyidfromuser();
        }
        else {
            toast.error('Gửi yêu cầu hủy đơn  không thành công')
        }
    }
    handleOnchang = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.getcartbyidfromuser()
        })
        //console.log('b1809299 check item:', this.state)


    }
    render() {
        // let today = new Date().getTime();
        // console.log('check ngay', ID_PTTT);
        let listdata = this.state.listdata;
        console.log('check props:', listdata)
        const { userInfo } = this.props
        let formatDate = `${moment(listdata.NGAY).format('DD-MM-YYYY')}`
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-Alldonhang">
                    <div className="Alldonhang">
                        Đơn hàng
                    </div>
                    <div className="col-4 form-grop">
                        <label>Chọn ngày </label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnchang}
                            value={this.state.currentDate}


                        />
                    </div>
                    <div className="Alldonhang-container">
                        <div className="header">
                            <div className="header1">Mã đơn hàng</div>
                            <div className="header2">Địa chỉ</div>
                            <div className="header3">Ngày đặt</div>
                            <div className="header4">Phương thức thanh toán</div>
                            <div className="header5">Trạng thái đơn</div>
                            <div className="header6">Trạng thái</div>
                        </div>


                        <div className="intro-Alldonhang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {

                                        return (
                                            <div className="view-mon "
                                                key={index}
                                            // onClick={() => this.handledatmon(item)}
                                            >
                                                <div className="mon-left">DH00{item.id}</div>
                                                <div className="mon-right1">{item.DIA_CHI}</div>
                                                <div className="mon-right2">{item.NGAY}</div>
                                                <div className="mon-right3">{item.datapttt.TEN_TT}</div>
                                                <div className="mon-right4">{item.datatt.value}</div>
                                                <div className="mon-right5">
                                                    <button className="btn-chitiet"
                                                        onClick={() => this.handleDetailOrder(item)}
                                                    >Xem chi tiết</button>
                                                    <button className="btn-huy"
                                                        onClick={() => this.handleHuydon(item)}
                                                    >Hủy đơn</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Alldonhang);
