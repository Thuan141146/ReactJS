import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from "../../../store/actions";
import './Danhthu.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getdanhthuByDate, getchiByDate, getdanhthuvnpay } from '../../../services/khubanService';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import Chart from '../Nhanvien/Chart';

class Danhthu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            datadanhthu: [],
            datachi: [],
            datadanhthuvnpay: [],
            // isOpenModalXacNhan: false,
            // dataModal: {},

        }
    }
    async componentDidMount() {

        this.danhthungay()
    }

    danhthungay = async () => {
        let { currentDate } = this.state;
        let formateDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        let NGAY = new Date(formateDate).getTime();
        // console.log('b1809299 check item:', NGAY)
        let res = await getdanhthuByDate({
            // khuvucid: khu,
            NGAY: formateDate
        })
        let res1 = await getchiByDate({
            // khuvucid: khu,
            NGAY: formateDate
        })
        let res2 = await getdanhthuvnpay({
            // khuvucid: khu,
            NGAY: formateDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                datadanhthu: res.data,
                datachi: res1.data,
                datadanhthuvnpay: res2.data,
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnchang = (date) => {

        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.danhthungay()
        })
        // console.log('b1809299 check item:', this.state)


    }
    // onChangeInput = (event, id) => {
    //     let copyState = { ...this.state }
    //     // console.log('check tt:', this.state)
    //     // copyState[id] = event.target.value;

    //     this.setState({
    //         ...copyState
    //     })
    //     console.log('b1809299 check item:', this.state)
    //     // , async () => {
    //     //     // let { selectedKhu } = this.props;
    //     //     await this.getDatadon()
    //     // }

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

    render() {

        let chi = Number(15000)
        let giamgia = Number()
        let datadanhthu = this.state.datadanhthu;
        console.log('b1809299 check state 1: ', datadanhthu)
        ///danhthu
        let tongtien = datadanhthu.reduce((tongtien, item) => tongtien += Number(item.T_TIEN), 0);
        console.log('check tong tien: ', tongtien)
        // tien giam
        let tiengiam = datadanhthu.reduce((tiengiam, item) => tiengiam += Number(item.TIEN_GIAM), 0);
        console.log('check tong tien: ', tiengiam)
        ///chi
        let datachi = this.state.datachi;
        console.log('b1809299 check chi: ', datachi)
        let tongchi = datachi.reduce((tongchi, item) => tongchi += Number(item.TIEN), 0);
        console.log('check tong tien: ', tongchi)
        ///danh thu vnpay
        let datadanhthuvnpay = this.state.datadanhthuvnpay;
        console.log('b1809299 check vnpay: ', datadanhthuvnpay)
        let tongvnpay = datadanhthuvnpay.reduce((tongvnpay, item) => tongvnpay += Number(item.T_TIEN), 0);
        console.log('check tong tien vnpay: ', tongvnpay)
        ///danh thu vnpay
        ///thucthu
        ///tong bán
        let tongban = tongtien + tiengiam
        let thucthu = tongtien - tongchi - giamgia
        console.log('check tong tien: ', thucthu)
        return (
            <>

                <div className="manage-khachdatban-container">
                    <div className="title">
                        QUẢN LÝ KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QUẢN LÝ DANH THU
                    </div>

                    <div className="danhthu-body">
                        <div className="row">
                            {/* <div className="col-4">
                                    <label>Theo món</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'ID_MON') }}
                                        value={ID_MON}
                                    >
                                        {
                                            status && status.length > 0 &&
                                            status.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.TEN_MON}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> */}
                            <div className="col-4 form-grop">
                                <label>Theo ngày</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchang}
                                    value={this.state.currentDate}

                                />
                            </div>
                            <div className="col-3 form-grop">
                                <div className="timkiem" >
                                    <button
                                        onClick={() => this.danhthungay()}
                                    > <i className="fas fa-search"></i> Tìm kiếm </button>
                                </div>
                            </div>
                            <div className="ct-danhthu">
                                <div className="title">
                                    Danh thu gold coffee
                                </div>
                                <div className="tong-chi">Tổng tiền bán: <NumberFormat
                                    className="tongtien"
                                    value={tongban}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />

                                </div>
                                <div className="tong-chi">Tổng tiền thanh toán VNPAY: <NumberFormat
                                    className="gia"
                                    value={tongvnpay}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                /></div>
                                <div className="tong-chi">Tổng chi: <NumberFormat
                                    className="gia"
                                    value={tongchi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                /></div>
                                <div className="giam-gia">Tổng giảm giá: <NumberFormat
                                    className="gia"
                                    value={tiengiam}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                /></div>
                                <div className="thuc-thu">Thực thu: <NumberFormat
                                    className="gia"
                                    value={thucthu}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />

                                </div>

                            </div>


                        </div>



                    </div>

                    {/* <Chart
                    /> */}


                </div>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        allmonRedux: state.admin.allmon

    };
};

const mapDispatchToProps = dispatch => {

    return {
        loadAllMonHome: () => dispatch(actions.fetchAllMonStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Danhthu);
