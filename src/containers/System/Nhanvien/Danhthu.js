import React, { Component } from 'react';
import { connect } from "react-redux";
import *  as actions from "../../../store/actions";
import './Danhthu.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getdanhthuByDate, getchiByDate, getdanhthuvnpay, getdanhthuveByDate } from '../../../services/khubanService';
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
            datadanhthuve: [],
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
        // let NGAY = new Date(currentDate).getTime();
        // console.log('b1809299 check item 19:', NGAY)
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
        let res3 = await getdanhthuveByDate({
            // khuvucid: khu,
            NGAY: formateDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                datadanhthu: res.data,
                datachi: res1.data,
                datadanhthuvnpay: res2.data,
                datadanhthuve: res3.data,
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
        //console.log('b1809299 check item:', this.state)


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
        ////danh thu ve
        let datadanhthuve = this.state.datadanhthuve;
        console.log('b1809299 check state ve: ', datadanhthuve)
        let tongtienve = datadanhthuve.reduce((tongtienve, item) => tongtienve += Number(item.T_TIEN), 0);
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
        ///tong b??n
        let tongban = tongtien + tiengiam
        let thucthu = tongtien - tongchi - giamgia + tongtienve
        console.log('check tong tien: ', thucthu)
        return (
            <>

                <div className="manage-khachdatban-container">
                    <div className="title">
                        QU???N L?? KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QU???N L?? DANH THU
                    </div>

                    <div className="danhthu-body">
                        <div className="row">
                            {/* <div className="col-4">
                                    <label>Theo m??n</label>
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
                                <label>Theo ng??y</label>
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
                                    > <i className="fas fa-search"></i> T??m ki???m </button>
                                </div>
                            </div>
                            <div className="ct-danhthu">
                                <div className="title">
                                    Danh thu gold coffee
                                </div>
                                <div className="tong-chi">T???ng ti???n m??n: <NumberFormat
                                    className="tongtien"
                                    value={tongban}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />

                                </div>
                                <div className="tong-chi">T???ng ti???n b??n v?? : <NumberFormat
                                    className="tongtien"
                                    value={tongtienve}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />

                                </div>
                                <div className="tong-chi">T???ng ti???n thanh to??n VNPAY: <NumberFormat
                                    className="gia"
                                    value={tongvnpay}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                /></div>
                                <div className="tong-chi">T???ng chi: <NumberFormat
                                    className="gia"
                                    value={tongchi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                /></div>
                                <div className="giam-gia">T???ng gi???m gi??: <NumberFormat
                                    className="gia"
                                    value={tiengiam}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                /></div>
                                <div className="thuc-thu">Th???c thu: <NumberFormat
                                    className="gia"
                                    value={thucthu}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
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
