import React, { Component } from 'react';
import { connect } from "react-redux";
import './Hoadon.scss';
import { getalldonbyiddon, editTTDonSevice, savebulkhoadon } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { withRouter } from 'react-router';
import *  as actions from "../../../store/actions";
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
class Hoadon extends Component {
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
        let today1 = new Date().toLocaleString();
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
            toast.error("Vui l??ng ch???n m??n tr?????c khi nh???n ?????t h??ng")
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
            toast.success('L??u ho?? ????n th??nh c??ng')
        } else {
            toast.error('L??u ho?? ????n kh??ng th??nh c??ng')
        }
    }

    // console.log('check state: ', this.state);
    savehoadonandin = async () => {
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
        let today1 = new Date().toLocaleString();
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
            toast.error("Vui l??ng ch???n m??n tr?????c khi nh???n ?????t h??ng")
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
            toast.success('L??u ho?? ????n th??nh c??ng')

        } else {
            toast.error('L??u ho?? ????n kh??ng th??nh c??ng')
        }
    }

    render() {
        let status = this.state.statusArr;
        // let today = new Date().getTime();
        console.log('check ngay hoa don', this.props);
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
        let pttt = this.props.location.state.pttt;
        let TEN_KH = this.props.location.state.ID_KH
        let SDT = this.props.location.state.SDT
        let DIA_CHI = this.props.location.state.DIA_CHI
        let IDHD = this.props.location.state.ID_DON
        let NV = this.props.location.state.ID_NV
        let NGAY = this.props.location.state.NGAY_LAP
        // console.log('check thanh toan:', DIA_CHI)
        let { ID_TT } = this.state


        return (
            <>

                <ReactToPrint

                    trigger={() => {
                        return <button className="">In h??a ????n</button>

                    }}
                    content={() => this.componentRef}
                    documentTitle='new document'
                    pageStyle="print"
                    onAfterPrint={() => { console.log('document printed') }}


                />
                <div className="back-Hoadon" ref={el => (this.componentRef = el)}>
                    <div className="title">
                        GOLD COFFEE
                    </div>
                    <div className="title">
                        h??a ????n b??n l???
                    </div>
                    <div className="tt-kh">
                        <div className="ten-kh">S??? H??: 000{IDHD
                            && IDHD ? IDHD : ''}
                        </div>
                        <div className="ten-kh">Ng??y l??p h??a ????n: {NGAY
                            && NGAY ? NGAY : ''}
                        </div>
                        <div className="ten-kh">Nh??n vi??n: {NV
                            && NV ? NV : ''}
                        </div>
                        <div className="ten-kh">T??n Kh??ch h??ng: {TEN_KH
                            && TEN_KH ? TEN_KH : ''}
                        </div>
                        <div className="sdt-kh">S??? ??i???n tho???i: {SDT
                            && SDT ? SDT : ''}
                        </div>
                        <div className="dc-kh">?????a ch???: {DIA_CHI
                            && DIA_CHI ? DIA_CHI : ''}
                        </div>

                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header2">M??n </div>
                            <div className="header3">Size</div>
                            <div className="header4">S??? l?????ng</div>
                            <div className="header5">Th??nh ti???n</div>
                            <div className="header6"></div>

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

                                                <div className="mon-right1"
                                                    key={index}
                                                >{item.mon.TEN_MON}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={item.GIA_SPHAM}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'??'}
                                                        />
                                                    </div>
                                                    <div >Gi???m: {item && item.ID_KM ? item.ID_KM : '0'}% </div>
                                                </div>

                                                <div className="mon-right2">{item.tsize.TEN_SIZE}</div>
                                                <div className="mon-right3">{SL}</div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={thanhtien}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'??'}
                                                    /></div>
                                            </div>
                                        )
                                    })
                                }

                            </div>


                        </div>
                        <div className='tien'>
                            <div className="phi-ship">T???ng ti???n h??ng: <NumberFormat
                                className="gia"
                                value={tongtien}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'??'}
                            />
                            </div>
                            <div className="phi-ship">T???ng ti???n gi???m gi??: <NumberFormat
                                className="gia"
                                value={tiengiam1}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'??'}
                            />
                            </div>
                            <div className="phi-ship">Ph?? Ship: 15.000??</div>

                            <div className="Tongtien">T???ng thanh to??n: <NumberFormat
                                className="gia"
                                value={today}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'??'}
                            />
                            </div>
                            <div className="pttt">Ph????ng th???c thanh to??n: {pttt}</div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hoadon));
