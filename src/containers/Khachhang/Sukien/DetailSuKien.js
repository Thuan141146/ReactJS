import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import './DetailSuKien.scss';
import { getdetailinfosukien } from '../../../services/danhmucService';
import { getQLgheByDate, getPayment } from '../../../services/khubanService';
import { savebulkvesk } from '../../../services/monService'
//import DatveModal from './Modal/DatveModal';
import { isTemplateExpression } from 'typescript';
import { iteratee } from 'lodash';
import *  as actions from "../../../store/actions";
import { toast } from 'react-toastify';
class DetailSuKien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsukien: {},
            dsghe: [],
            ptttArr: [],
            PTTT: ''
            // isOpenModalDatve: false,
        }
    }
    async componentDidMount() {
        this.props.fetchPTTTStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getdetailinfosukien(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailsukien: res.data
                })
            }
            let ID_SK = this.props.match.params.id;
            console.log('b1809299 check res: ', ID_SK)
            let res1 = await getQLgheByDate(ID_SK);
            if (res1 && res1.errCode === 0) {
                this.setState({
                    dsghe: res1.ghe ? res1.ghe : []
                })
            }
            // console.log('b1809299 check res: ', res)


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allptttRedux !== this.props.allptttRedux) {
            let allptttGenders = this.props.allptttRedux;
            this.setState({
                ptttArr: allptttGenders,
                PTTT: allptttGenders && allptttGenders.length > 0 ? allptttGenders[0].id : ''

            })
        }

    }

    handledatve = (sukien) => {
        this.setState({
            isOpenModalDatve: true,
            //datadatban: time
        })
        console.log('b1809299 check: time', sukien)
    }
    closebooking = () => {
        this.setState({
            isOpenModalDatve: false
        })
    }
    handleClickBtnBan = (ghe) => {
        let { dsghe } = this.state;
        if (dsghe && dsghe.length > 0) {
            dsghe = dsghe.map(item => {
                if (item.id === ghe.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                dsghe: dsghe
            })
        }
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    /// handle order
    handleOder = async () => {
        let result = [];
        let PTTT = this.state.PTTT;
        let { dsghe } = this.state;
        let { detailsukien } = this.state;
        let ID_SK = detailsukien.id;
        let NGAY_DIEN = detailsukien.NGAY;
        let SUAT_DIEN = detailsukien.GIO;
        let { userInfo } = this.props
        let ten_tk = userInfo
            && userInfo.ten_tk ? userInfo.ten_tk : ''
        if (ten_tk === '') {
            toast.info("Vui ????ng nh???p tr?????c khi ?????t v??")
        }
        else {
            // let ten_tk = this.props.userInfo.ten_tk;
            let iduser = userInfo
                && userInfo.id ? userInfo.id : ''
            if (iduser === '') {

            }
            let sdt = userInfo
                && userInfo.sdt ? userInfo.sdt : ''
            if (sdt === '') {

            }
            let chonmon = dsghe.filter(item => item.isSelected === true)
            //let count = chonmon.setCount((count) => count + 1, 0)
            let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) + Number(item.GIA_SK), 0);
            console.log('tong tien:', this.state)
            let formateDate = moment(new Date()).format('DD/MM/YYYY');
            let today1 = moment(new Date()).format("YYYY/MM/DD");
            let today2 = new Date(today1).getTime();
            console.log('check ngay:', today2)

            if (chonmon && chonmon.length > 0) {
                chonmon.map((chonmon, index) => {
                    let object = {};
                    object.ID_TK = iduser;
                    object.TEN_TK = ten_tk;
                    object.SDT = sdt;
                    object.PTTT = PTTT;
                    object.NGAY = formateDate;
                    object.NGAY1 = today2;
                    object.ID_GHE = chonmon.ID_GHE;
                    object.GIA_GHE = chonmon.GIA;
                    object.GIA_VE = chonmon.GIA_SK;
                    object.NGAY_DIEN = NGAY_DIEN;
                    object.SUAT_DIEN = SUAT_DIEN;
                    object.ID_SK = ID_SK;
                    result.push(object)
                })
            } else {
                toast.error("Vui l??ng ch???n gh??? tr?????c khi nh???n ?????t v??")
                return;
            }
            console.log('check push:', result)
            //////bulk create dat hang
            if (PTTT === 1) {
                let res = await savebulkvesk({
                    arrchonmon: result,
                    ID_TK: iduser,
                    NGAY: formateDate,
                    PTTT: PTTT,
                    T_TIEN: tongtien,
                    SDT: sdt,
                    NGAY1: today2,
                    ID_SK: ID_SK,
                    // TIEN_GIAM: tiengiam1,
                })

                if (res && res.errCode === 0) {
                    toast.success('?????t v?? th??nh c??ng')

                    //let ID_TK = this.props.location.state.iduser
                    // let res = await deleteproductcartbyidService(ID_TK)
                    if (res && res.errCode === 0) {
                        // await this.getcartbyidfromuser();
                    }
                    else {
                        alert(res.errMessage)
                    }

                } else {
                    toast.error('?????t v?? kh??ng th??nh c??ng')
                }


            } else {
                let chonmon = dsghe.filter(item => item.isSelected === true)
                //let count = chonmon.setCount((count) => count + 1, 0)
                let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) + Number(item.GIA_SK), 0);
                console.log('tong tien:', this.state)
                let today = new Date().getTime();
                let ten_tk = this.props.userInfo.ten_tk;
                let formateDate = moment(new Date()).format('DD/MM/YYYY');
                let today1 = moment(new Date()).format("YYYY/MM/DD");
                let today2 = new Date(today1).getTime();
                console.log('tien:', tongtien)
                console.log('m?? d??n:', today)
                let res = await getPayment({
                    transactionRef: ten_tk + today,
                    orderType: tongtien,
                    amount: tongtien,
                })
                console.log('check link:', res);
                window.location.href = res;
                let res1 = await savebulkvesk({
                    arrchonmon: result,
                    ID_TK: iduser,
                    NGAY: formateDate,
                    PTTT: PTTT,
                    T_TIEN: tongtien,
                    SDT: sdt,
                    ID_SK: ID_SK,
                    // TIEN_GIAM: tiengiam1,
                    MATT: ten_tk + today,
                    NGAY1: today2,

                })
                if (res1 && res1.errCode === 0) {
                    toast.success('?????t v?? th??nh c??ng')
                    //let ID_TK = this.props.location.state.iduser
                    // let res = await deleteproductcartbyidService(ID_TK)
                    if (res && res.errCode === 0) {
                        // await this.getcartbyidfromuser();
                    }
                    else {
                        alert(res.errMessage)
                    }

                } else {
                    toast.error('?????t v?? kh??ng th??nh c??ng')
                }
            }


        }

        // console.log('check state: ', this.state);
    }
    handleViewDetaildon = (user) => {
        let ID_TK = this.props.userInfo.id
        console.log('b1809299 check view infor su kien: ', ID_TK)
        this.props.history.push({
            pathname: "/allve/${user.ID_TK}",
            state: { ID_TK }
        })
    }
    render() {

        // console.log(this.props.match.params.id)
        let { detailsukien } = this.state;
        console.log('b1809299 check state: ', this.props)
        let TEN_LSK = `${detailsukien.TEN_LSK}`
        let formatDate = `${detailsukien.NGAY}`
        let GIO = `${detailsukien.GIO}`
        let dsghe = this.state.dsghe;
        //console.log('ds', dsghe)
        let PTTT = this.state.PTTT;
        let ID_PTTTS = this.state.ptttArr;
        const { userInfo } = this.props
        let chonmon = dsghe.filter(item => item.isSelected === true)
        //let count = chonmon.setCount((count) => count + 1, 0)
        let tongtien = chonmon.reduce((tongtien, item) => tongtien + Number(item.GIA) + Number(item.GIA_SK), 0);
        // let thanhtien = tongtien + tongtien1;
        let today1 = moment(new Date()).format("YYYY/MM/DD");
        let today2 = new Date(today1).getTime();
        console.log('tien:', today2)

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-sk">
                    <div className="sukien-detail-container">
                        <div className="intro-sukien">
                            <div className="content-left"
                                style={{ backgroundImage: `url(${detailsukien.ANH ? detailsukien.ANH : ''})` }}
                            >

                            </div>
                            <div className="content-right">
                                <div className="up">
                                    {TEN_LSK}
                                </div>
                                <div className="up1">
                                    Ng??y: {formatDate} th???i gian: {GIO}
                                </div>
                                <div className="up2">
                                    {detailsukien.dateTypeData
                                        && detailsukien.dateTypeData.value
                                        && <span>
                                            Th???i gian: {detailsukien.dateTypeData.value}
                                        </span>}
                                </div>
                                <div className="up3">
                                    {detailsukien.gia
                                        && detailsukien.gia.value
                                        &&
                                        <span>  Gi?? v?? ch??? t???:
                                            <NumberFormat
                                                className="currency"
                                                value={detailsukien.gia.value}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' ??'}
                                            />
                                        </span>}
                                </div>
                                <div className="down">
                                    {detailsukien.Markdown
                                        && detailsukien.Markdown.mota
                                        && <span>
                                            {detailsukien.Markdown.mota}
                                        </span>
                                    }
                                </div>
                                <div className="chu-thich">
                                    <div className="body-chu-thich">
                                        <button>VIP</button>
                                        <div className="ten">gh??? vip</div>

                                    </div>
                                    <div className="body-chu-thich">
                                        <button>VIP1</button>
                                        <div className="ten">gh??? vip lo???i 1 </div>

                                    </div>
                                    <div className="body-chu-thich">
                                        <button>GT</button>
                                        <div className="ten">gh??? th?????ng</div>

                                    </div>
                                    <div className="body-chu-thich">
                                        <button>GT1</button>
                                        <div className="ten">gh??? th?????ng lo???i 1</div>

                                    </div>
                                    <div className="body-chu-thich">
                                        <button>GT3</button>
                                        <div className="ten">gh??? th?????ng lo???i 3</div>

                                    </div>

                                </div>
                                <div className="ghe-trong" >
                                    <div className="all-available-ban">
                                        <div className="text-caledar">
                                            <span>Danh s??ch gh??? tr???ng</span>
                                        </div>
                                        <div className="ban-content">
                                            {dsghe && dsghe.length > 0 ?
                                                dsghe.map((item, index) => {
                                                    //let ban = item.timeTypeData.SO_BAN
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={item.isSelected === true ? "btn btn-ban active" : "btn btn-ban "}
                                                            onClick={() => this.handleClickBtnBan(item)}
                                                        >Gh???: {item.tenghe.SO_GHE} {item.TT}</button>
                                                    )
                                                })
                                                :
                                                <div className="het-ban"> S??? ki???n n??y ???? h???t gh??? tr???ng, Qu?? kh??ch vui l??ng cho s??? ki???n kh??c !!
                                                </div>

                                            }
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="lich-sukien">
                        </div>
                        <div className="tong-tt">
                            <div className="row">
                                <div className="pttt">
                                    <label>Ph????ng th???c thanh to??n</label>
                                    <select className="form-control btn-pttt"
                                        onChange={(event) => { this.onChangeInput(event, 'PTTT') }}
                                        value={PTTT}
                                    >
                                        {
                                            ID_PTTTS && ID_PTTTS.length > 0 &&
                                            ID_PTTTS.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>???? {item.TEN_TT}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <div className="don-kh"
                                        onClick={(event) => this.handleViewDetaildon(event)}
                                    >Xem v?? ???? ?????t </div>
                                </div>

                                <div className="tongtien">
                                    <div>Th??ng tin ?????t v??</div>
                                    <div>T??n kh??ch h??ng: {userInfo
                                        && userInfo.ten_tk ? userInfo.ten_tk : ''}
                                    </div>
                                    <div>S??? ??i???n tho???i: {userInfo
                                        && userInfo.sdt ? userInfo.sdt : ''}
                                    </div>
                                    <div>T???ng thanh to??n:    <NumberFormat
                                        className="gia"
                                        value={tongtien}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={' ??'}
                                    /></div>

                                </div>
                                <button
                                    className=" btn btn-primary btn-save-ban col-3"
                                    onClick={() => this.handleOder()}
                                >?????t v??</button>
                            </div>

                        </div>
                        <div className="detail-info-sukien">
                            {detailsukien && detailsukien.Markdown && detailsukien.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailsukien.Markdown.contentHTML }}>

                                </div>
                            }
                        </div>
                        <div className="danhgia-sukien">

                        </div>

                    </div>
                </div>


            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        allptttRedux: state.admin.allpttt,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPTTTStart: () => dispatch(actions.fetchPTTTStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSuKien);
