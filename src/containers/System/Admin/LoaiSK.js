import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils, dateFormat } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import TableLoaiSK from './TableLoaiSK';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify"
import Select from 'react-select';
class LoaiSK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,
            timeArr: [],
            priceArr: [],
            ptttArr: [],

            isloaiskcreate: false,

            TEN_LSK: '',
            MO_TA: '',
            ANH: '',
            ID_GIA: '',
            ID_PTT_TT: '',
            currentDate: '',
            NGAY: '',
            GIO: '',
            actions: '',
            sukieneditid: '',



        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //time
        if (prevProps.timeRedux !== this.props.timeRedux) {
            let arrTimes = this.props.timeRedux;
            this.setState({
                timeArr: arrTimes,
                GIO: arrTimes && arrTimes.length > 0 ? arrTimes[0].idkey : ''
            })
        }
        if (prevProps.allpriceRedux !== this.props.allpriceRedux) {
            let arrprices = this.props.allpriceRedux;
            this.setState({
                priceArr: arrprices,
                ID_GIA: arrprices && arrprices.length > 0 ? arrprices[0].idkey : ''
            })
        } if (prevProps.allptttRedux !== this.props.allptttRedux) {
            let arrpttt = this.props.allptttRedux;
            this.setState({
                ptttArr: arrpttt,
                ID_PTT_TT: arrpttt && arrpttt.length > 0 ? arrpttt[0].ID_TT : ''
            })
        }

        if (prevProps.Lisloaisk !== this.props.Lisloaisk) {
            let arrTimes = this.props.timeRedux;
            let arrpttt = this.props.allptttRedux;
            let arrprices = this.props.allpriceRedux;
            this.setState({
                TEN_LSK: '',
                MO_TA: '',
                ANH: '',
                ID_GIA: arrprices && arrprices.length > 0 ? arrprices[0].idkey : '',
                ID_PTT_TT: arrpttt && arrpttt.length > 0 ? arrpttt[0].ID_TT : '',
                NGAY: '',
                GIO: arrTimes && arrTimes.length > 0 ? arrTimes[0].idkey : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',


            })
        }
    }

    handleOnchangImageLoaiSk = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);
            console.log('hoi dan it base64 image: ', Base64)
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: ObjectUrl,
                ANH: Base64
            })
        }
    }
    openPreviewImageLoaiSk = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true


        })
    }

    handleEditSuKienFromParent = (sukien) => {
        let imageBase64 = '';
        if (sukien.ANH) {
            imageBase64 = new Buffer(sukien.ANH, 'base64').toString('binary');
        }

        // console.log('b1809299 check from parent: ', sukien)
        this.setState({
            TEN_LSK: sukien.TEN_LSK,
            GIA: sukien.GIA,
            ID_NGAY: sukien.ID_NGAY,
            ID_PTT_TT: sukien.ID_PTT_TT,
            GIO: sukien.GIO,
            MO_TA: sukien.MO_TA,
            ANH: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            sukieneditid: sukien.id,
        })
    }
    handleSaveLoaiSK = () => {
        let { NGAY } = this.state
        // let formatDate = moment((currentDate).format(dateFormat.SEND_TO_SERVER))
        // let Object = {};
        // Object.NGAY = formatDate;
        let formatDate = `${moment(NGAY).format('DD-MM-YYYY')}`
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewLoaiSK({
                TEN_LSK: this.state.TEN_LSK,
                ID_GIA: this.state.ID_GIA,
                ID_PT_TT: this.state.ID_PTT_TT,
                NGAY: formatDate,
                GIO: this.state.GIO,
                MO_TA: this.state.MO_TA,
                ANH: this.state.ANH,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            /// chinh sua su kien
            this.props.editsukienRedux({
                id: this.state.sukieneditid,
                TEN_LSK: this.state.TEN_LSK,
                ID_GIA: this.state.ID_GIA,
                ID_PT_TT: this.state.ID_PT_TT,
                NGAY: formatDate,
                GIO: this.state.GIO,
                MO_TA: this.state.MO_TA,
                ANH: this.state.ANH,
            })
        }


    }

    onChangeInputLoaiSK = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        // console.log('check in put', event)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['TEN_LSK', 'ID_GIA', 'NGAY', 'GIO', 'MO_TA']
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                alert('Vui lòng nhập:' + arrcheck[i])
                break;
            }
        }
        return isValid;
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            NGAY: date[0]
        })

    }
    async componentDidMount() {
        this.props.getTimeStart();
        this.props.fetchPriceStart();
        this.props.fetchPTTTStart();
    }

    render() {
        console.log('check state: ', this.state)
        let times = this.state.timeArr;
        let prices = this.state.priceArr;
        let pttt = this.state.ptttArr;
        let { TEN_LSK, MO_TA, ANH, ID_GIA, ID_PTT_TT, NGAY, GIO } = this.state;
        //console.log('check time:', this.props.timeRedux)
        // console.log('Check state compoment: ', this.state)
        return (
            <div className="loai-sk-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ SỰ KIỆN
                </div>
                <div className="title">

                </div>
                <div className="danh-muc-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label>Tên Sự kiện</label>
                                <input className="form-control" type="text"
                                    value={TEN_LSK}
                                    onChange={(event) => { this.onChangeInputLoaiSK(event, 'TEN_LSK') }}
                                />
                            </div>

                            <div className="col-6">
                                <label>Giá vé</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInputLoaiSK(event, 'ID_GIA') }}
                                    value={ID_GIA}
                                >
                                    {
                                        prices && prices.length > 0 &&
                                        prices.map((item, index) => {
                                            return (
                                                <option key={index} value={item.idkey}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label>Chọn phương thức thanh toán</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInputLoaiSK(event, 'ID_PTT_TT') }}
                                    value={ID_PTT_TT}
                                >
                                    {
                                        pttt && pttt.length > 0 &&
                                        pttt.map((item, index) => {
                                            return (
                                                <option key={index} value={item.ID_TT}>{item.TEN_TT}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6 form-group">
                                <label>Ngày</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.NGAY}
                                    minDate={new Date()}

                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Suất diễn</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInputLoaiSK(event, 'GIO') }}
                                    value={GIO}
                                >
                                    {
                                        times && times.length > 0 &&
                                        times.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-12 pick-hour-container">
                            </div>
                            <div className="col-6">
                                <label>Mô tả sự kiện</label>
                                <input className="form-control" type="text"
                                    value={MO_TA}
                                    onChange={(event) => { this.onChangeInputLoaiSK(event, 'MO_TA') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Ảnh sự kiện</label>
                                <div className="preview-img-container" >
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangImageLoaiSk(event)}
                                    />
                                    <label className="upload" htmlFor="previewImg" >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImageLoaiSk()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveLoaiSK()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Lưu sự kiện mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12 mt-5">
                                <TableLoaiSK
                                    handleEditSuKienFromParentKey={this.handleEditSuKienFromParent}
                                    action={this.state.action} />
                            </div>

                        </div>

                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        Lisloaisk: state.admin.loaisk,
        timeRedux: state.admin.times,
        allpriceRedux: state.admin.allprice,
        allptttRedux: state.admin.allpttt
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewLoaiSK: (data1) => dispatch(actions.createNewLoaiSK(data1)),
        fetchLoaiSKRedux: () => dispatch(actions.fetchAllLoaiSKStart()),
        getTimeStart: () => dispatch(actions.fetchTimeStart()),
        editsukienRedux: (data) => dispatch(actions.editsukien(data)),
        fetchPriceStart: (id) => dispatch(actions.fetchPriceStart()),
        fetchPTTTStart: () => dispatch(actions.fetchPTTTStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoaiSK);
