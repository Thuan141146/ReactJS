import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailveNV.scss';
import { getdetailvebyiddon, editTTveSevice, savebulkhoave } from '../../../services/khubanService';
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
        this.props.fetchAllStatusveStart();
        let ID_DON = this.props.location.state.ID_DON
        console.log('check gio hang:', ID_DON)
        let res = await getdetailvebyiddon(ID_DON)
        console.log('check gio hang:', ID_DON)
        if (res && res.errCode === 0) {
            this.setState({
                listdata: res.data
            })
        }

        this.props.fetchAllStatusveStart();

        let updatett = await editTTveSevice(ID_DON)


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
        this.props.editID_TT_VE({
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
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_GHE) + Number(item.GIA_VE), 0);
        let today1 = moment(new Date()).format('HH:MM-DD/MM/YYYY');
        let today2 = new Date(today1).getTime();
        // console.log('check ngay:', idkh)

        if (listdata && listdata.length > 0) {
            listdata.map((listdata, index) => {
                let object = {};
                object.PTTT = PTTT;
                object.ID_DON = iddon;
                object.NGAY = today1;
                object.ID_SK = listdata.ID_SK;
                object.ID_GHE = listdata.ID_GHE;
                object.GIA_GHE = listdata.GIA_GHE;
                object.GIA_VE = listdata.GIA_VE;
                object.T_TIEN = tongtien;
                result.push(object)
            })
        } else {
            toast.error("Vui l??ng ch???n m??n tr?????c khi nh???n ?????t h??ng")
            return;
        }

        console.log('check push:', result)
        //////bulk create dat hang

        let res = await savebulkhoave({
            arrchonmon: result,
            ID_DON: iddon,
            ID_KH: idkh,
            ID_NV: idnv,
            NGAY_LAP: today1,
            PTTT: PTTT,
            TONG_TIEN: tongtien,

        })
        if (res && res.errCode === 0) {
            toast.success('L??u ????n v?? th??nh c??ng')
        } else {
            toast.error('L??u ????n v?? kh??ng th??nh c??ng')
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
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_GHE) + Number(item.GIA_VE), 0);
        let today1 = moment(new Date()).format('HH:MM-DD/MM/YYYY');
        let today2 = new Date(today1).getTime();

        if (listdata && listdata.length > 0) {
            listdata.map((listdata, index) => {
                let object = {};
                object.PTTT = PTTT;
                object.ID_DON = iddon;
                object.NGAY = today1;
                object.ID_SK = listdata.ID_SK;
                object.ID_GHE = listdata.ID_GHE;
                object.GIA_GHE = listdata.GIA_GHE;
                object.GIA_VE = listdata.GIA_VE;
                object.T_TIEN = tongtien;
                result.push(object)
            })
        } else {
            toast.error("Vui l??ng ch???n m??n tr?????c khi nh???n ?????t h??ng")
            return;
        }

        console.log('check push:', result)
        //////bulk create dat hang

        let res = await savebulkhoave({
            arrchonmon: result,
            ID_DON: iddon,
            ID_KH: idkh,
            ID_NV: idnv,
            NGAY_LAP: today1,
            PTTT: PTTT,
            TONG_TIEN: tongtien,

        })
        if (res && res.errCode === 0) {
            toast.success('L??u ????n v?? th??nh c??ng')
            toast.success('L??u ho?? ????n th??nh c??ng')
            let ID_DON = iddon;
            let ID_KH = idkh;
            let ID_NV = this.props.userInfo.ten_tk;
            let SDT = this.props.location.state.SDT;
            let pttt = PTTT;
            let NGAY_LAP = today1;
            this.props.history.push({
                pathname: "/nhanvien/hoadonve/",
                state: { ID_DON, ID_KH, ID_NV, pttt, SDT, NGAY_LAP }
            })

        } else {
            toast.error('L??u ho?? ????n kh??ng th??nh c??ng')
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
        // console.log('chon mon render:', chonmon)
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_GHE) + Number(item.GIA_VE), 0);
        //let tiengiam1 = listdata.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM) * Number(item.ID_KM) / 100, 0);
        let ship = Number(15000);
        let pttt = this.props.location.state.TEN_TT;
        let TEN_KH = this.props.location.state.TEN_KH
        let SDT = this.props.location.state.SDT
        // console.log('check thanh toan:', DIA_CHI)
        let { ID_TT } = this.state

        return (
            <>

                <div className="back-DetaildonveNV">
                    <div className="title">
                        QU???N L?? KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QU???N L?? CHI TI???T ?????T V??
                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header1">H??nh ???nh</div>
                            <div className="header2">T??n s??? ki???n </div>
                            <div className="header3">S??? gh???</div>
                            <div className="header4">Th???i gian</div>
                            <div className="header5">Th??nh ti???n</div>
                            <div className="header6"></div>
                            <div className="header7">Th??ng tin kh??ch h??ng</div>
                        </div>
                        <div className="intro-giohang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.sk.ANH) {
                                            imageBase64 = new Buffer(item.sk.ANH, 'base64').toString('binary');
                                        }
                                        let SL = item.SL_SPHAM
                                        let tongtiensk = Number(item.GIA_GHE) + Number(item.GIA_VE);


                                        return (


                                            <div className="view-mon">
                                                <div className="mon-left" style={{ backgroundImage: `url(${imageBase64})` }} key={index} ></div>
                                                <div className="mon-right1"
                                                // key={index} onClick={() => this.handleViewDetailMon(item)}
                                                >{item.sk.TEN_LSK}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={tongtiensk}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'??'}
                                                        />
                                                    </div>
                                                    {/* <div >Gi???m: {item && item.ID_KM ? item.ID_KM : '0'}% </div> */}
                                                </div>

                                                <div className="mon-right2">
                                                    <div> Gh??? s???: {item.ttghe.SO_GHE}</div>
                                                    <div>Lo???i: {item.ttghe.TT}</div>
                                                </div>
                                                <div className="mon-right3">
                                                    <div>{item.SUAT_DIEN}</div>
                                                    <div>Ng??y: {item.NGAY_DIEN}</div>
                                                </div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={tongtiensk}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'??'}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="content-right">
                                <div className="ten-kh">T??n Kh??ch h??ng: {userInfo
                                    && userInfo.ten_tk ? userInfo.ten_tk : ''}
                                </div>
                                <div className="sdt-kh">S??? ??i???n tho???i: {userInfo
                                    && userInfo.sdt ? userInfo.sdt : ''}
                                </div>

                                <div className="phi-ship">T???ng ti???n: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                                </div>


                                <div className="Tongtien">T???ng thanh to??n: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                                </div>
                                <div className="pttt">Ph????ng th???c thanh to??n: {pttt}</div>

                                <div className="col-12">
                                    <label>Tr???ng th??i ????n</label>
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
                                        <div>C???p nh???t</div>
                                    </button>
                                </div>
                                <div className="btn-dat"
                                    onClick={() => this.savehoadon()}
                                >
                                    <button>
                                        <div>L??u h??a ????n</div>
                                    </button>
                                </div>
                                <div className="btn-dat"
                                    onClick={() => this.savehoadonandin()}
                                >
                                    <button>
                                        <div>Xu???t v?? l??u h??a ????n</div>
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
        allstatusveRedux: state.admin.allstatusve,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStatusveStart: () => dispatch(actions.fetchAllStatusveStart()),

        editID_TT_VE: (data) => dispatch(actions.editID_TT_VE(data))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetaildonNV));
