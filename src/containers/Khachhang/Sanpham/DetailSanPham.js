
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSanPham.scss';
import { getAllMon } from '../../../services/monService'
import NumberFormat from 'react-number-format';
import { getSizeByIdMon, getgiaByIdMon, getdanhgia, getkmByIdMon, guibaoxau } from '../../../services/monService'
import { addtocart, createRatingService } from '../../../services/khubanService';
import _ from 'lodash';
import { withRouter } from 'react-router';
import Sanphamlienquan from './Sanphamlienquan';
import { QuantityPicker } from 'react-qty-picker';
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import StarRatings from 'react-star-ratings';
import ModalReport from './ModalReport';
import moment from 'moment';
class DetailSanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailmon: {},
            arrsize: [],
            arrkm: [],
            giasanpham: {},
            giamgia: {},
            // giasanphamid: -1,
            sanphamlq: [],
            SL: '',
            ID_TK: '',
            ID_MON: '',
            ID_SIZE: '',
            GIA: '',
            arrgia: [],
            NOI_DUNG: '',
            GIAM_GIA: '',
            DIEM: 0,
            allRating: [],

            numberPerPage: 3,
            currentPage: 1,


        }
    }
    async componentDidMount() {
        this.getRating();
        this.props.fetchAllSizeStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.location.state.monid;
            let res = await getAllMon(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailmon: res.mons
                })
            }
            // console.log('b1809299 check res: ', res)
        }
        let id = this.props.location.state.monid;
        let res = await getgiaByIdMon(id);
        // console.log('check all gia:', res)
        if (res && res.errCode === 0) {
            this.setState({
                arrgia: res.data
            })
        }

        let res1 = await getkmByIdMon(id);
        //   console.log('check all gia:', res)
        if (res1 && res1.errCode === 0) {
            this.setState({
                arrkm: res1.data
            })
        }



    }
    async getRating() {
        let ID_MON = this.props.location.state.monid;
        // console.log('check mmon Id getRating', ID_MON)
        let respon = await getdanhgia(ID_MON);
        if (respon && respon.errCode === 0) {
            this.setState({
                allRating: respon.data ? respon.data : [],
            })
        }
        // console.log('check allrating: ', respon)
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.allsizeRedux !== this.props.allsizeRedux) {
            let data = this.props.allsizeRedux;
            this.setState({
                arrsize: data
            })
        }



    }
    handleOnChangeGia = async (event) => {
        let ID_MON = this.props.location.state.monid;
        let idsize = event.ID_SIZE
        let isgia = event.GIA
        let res = await getSizeByIdMon(ID_MON, idsize)
        if (res && res.errCode === 0) {
            this.setState({
                idsize: event.ID_SIZE,
                idgia: event.GIA,
                giasanpham: res.data ? res.data : [],

            })
        }
        // console.log('b1809299 check gia size: ', idsize)

    }
    handleOnChangeApdung = async (event) => {
        let ID_MON = this.props.location.state.monid;
        let res = await getkmByIdMon(ID_MON)
        if (res && res.errCode === 0) {
            toast.success("Áp dụng mã giảm giá thành công")
            this.setState({
                GIAM_GIA: event.PT_GIAM,
                giasanpham: res.data ? res.data : [],
            })
        }
        // console.log('b1809299 check gia size: ', idsize)

    }
    handleOnChangesl = (event) => {
        this.setState({
            sl: event
        })
    }

    handleOnChangeAddToCart = async () => {
        let { userInfo } = this.props
        let ID_TK = userInfo
            && userInfo.id ? userInfo.id : ''
        let SL = this.state.sl;
        let GIA = this.state.idgia;
        let ID_MON = this.state.detailmon.id;
        let ID_SIZE = this.state.idsize;
        let GIAM_GIA = this.state.GIAM_GIA
        if (!ID_SIZE) {
            toast.info("Vui lòng chọn size nước")
        }
        if (ID_TK === '') {
            toast.info("Vui đăng nhập trước khi thêm món")
        }
        if (!SL) {
            toast.info("Vui lòng chọn số lượng")
        } else {

            let res = await addtocart({
                ID_TK: ID_TK,
                ID_MON: ID_MON,
                ID_SIZE: ID_SIZE,
                SL: SL,
                GIA: GIA,
                GIAM_GIA: GIAM_GIA,
            })
            if (res && res.errCode === 0) {
                toast.success('Thêm món vào giỏ hàng thành công')
            } else {
                // toast.error('Thêm món vào giỏ hàng không thành công')
            }
        }

    }
    ratingChanged = (newRating) => {
        console.log(newRating);
        this.setState({
            DIEM: newRating
        })
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        // console.log('check in put', this.state)
    }
    handleCreateDanhGia = async () => {

        let NGAY_DG = moment(new Date()).format('YYYY-MM-DD');
        let ID_MON = this.state.detailmon.id;
        let { userInfo } = this.props
        let ID_TK = userInfo
            && userInfo.id ? userInfo.id : ''
        if (ID_TK === '') {
            toast.info("Vui đăng nhập trước khi đánh giá")
        }
        //console.log('check:',)
        else {
            let res = await createRatingService({
                ID_KH: ID_TK,
                ID_MON: ID_MON,
                NGAY_DG: NGAY_DG,
                DIEM: this.state.DIEM,
                NOI_DUNG: this.state.NOI_DUNG,
            })
            this.setState({
                DIEM: 0,
                NOI_DUNG: '',

            })
            await this.getRating();
        }
    }

    render() {
        let { ID_KH, ID_MON, DIEM, NOI_DUNG, } = this, state
        const { userInfo } = this.props

        let danhmucid = this.props.location.state.danhmucid;
        let { detailmon } = this.state;
        //console.log('check state:', detailmon)
        let { giasanpham } = this.state;
        // console.log(this.props.match.params.id)
        let tenmon = `${detailmon.TEN_MON}`
        // let gia = `${detailmon.GIA}`
        let imageBase64 = '';
        let mota = `${detailmon.MO_TA}`
        if (detailmon.ANH) {
            imageBase64 = new Buffer(detailmon.ANH, 'base64').toString('binary');
        }
        let arrsize = this.state.arrsize;
        let arrgia = this.state.arrgia;
        let arrkm = this.state.arrkm;
        for (let i = 0; i < detailmon.length; i++) {
            console.log('check gi do di:', detailmon[i].ID_MON)
            console.log('check gi do di:', detailmon[i].ID_SIZE)
        }
        let allRating = this.state.allRating;
        console.log('check allRating render', this.props)
        let idkh = this.props.location.state.ID_TK;
        console.log('check allRating render', this.props)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-detailsanpham">
                    <div className="sukien-detail-container">
                        <div className="intro-sukien">
                            <div className="content-left"
                                style={{ backgroundImage: `url(${imageBase64})` }}
                            >
                            </div>

                            <div className="content-right">
                                <div className="up" >{tenmon}</div>
                                <div> </div>
                                <div className="down1"

                                >
                                    {arrkm && arrkm.length > 0 &&
                                        arrkm.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className="ten-giam">Chương trình giảm giá: {item.TEN_KM}</div>

                                                    <div className="ngay-giam">Từ ngày: {item.NGAYBD} đến ngày: {item.NGAYKT}</div>

                                                    <div className="giam-gia"
                                                        key={index} onClick={() => this.handleOnChangeApdung(item)}>
                                                        <div>Vui lòng chọn mã giảm giá</div>
                                                        <div className="giam">Mã giảm {item.PT_GIAM}%</div>
                                                    </div>
                                                </div>
                                                // 
                                            )
                                        })
                                    }
                                </div>
                                <div className="down">
                                    {giasanpham && giasanpham.length > 0 &&
                                        giasanpham.map((item, index) => {

                                            return (
                                                <NumberFormat
                                                    className="gia"
                                                    value={item.GIA}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />
                                            )
                                        })
                                    }

                                </div>
                                <div className="size">Chọn size (bắt buộc)</div>
                                <div className="size-content"
                                >
                                    {arrgia && arrgia.length > 0 &&
                                        arrgia.map((item, index) => {
                                            let gia = `${item.GIA}`
                                            return (
                                                <div className="khung">
                                                    <div className="tensize"
                                                        key={index} onClick={() => this.handleOnChangeGia(item)}
                                                    >
                                                        Size {item.tensize.TEN_SIZE}:   <NumberFormat
                                                            className="gia"
                                                            value={gia}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        /></div>
                                                </div>
                                            )
                                        })
                                    }


                                </div>
                                <div className="text">
                                    Số lượng
                                </div>

                                <div className="component-quantity-input">

                                    <QuantityPicker min={1} width='5rem'
                                        onChange={(event) => this.handleOnChangesl(event)} />
                                </div>
                                <div className="add-to-cart">
                                    <button className="btn-themsp btn-primary "
                                        onClick={(event) => this.handleOnChangeAddToCart(event)}
                                    >Thêm Vào giỏ hàng</button>
                                </div>


                            </div>


                        </div>
                        <div className="mota">
                            <li>Mô tả</li>
                            <div className="mota-title"> - {mota}</div>
                        </div>
                        <div className="detail-info-sukien">
                            {detailmon && detailmon.Markdown && detailmon.Markdown.contentHTML
                                &&
                                <div dangerouslySetInnerHTML={{ __html: detailmon.Markdown.contentHTML }}>

                                </div>
                            }
                        </div>
                        <div className="sp-lienquan">
                            <div className="lq-title">Sản phẩm liên quan</div>
                            <Sanphamlienquan
                                danhmucid={danhmucid}
                            />

                        </div>
                        <div className="danh-gia">
                            <div className="title-sanpham">Thêm đánh giá sản phẩm</div>
                            <div className="diem">
                                <StarRatings
                                    rating={this.state.DIEM}
                                    count={5}
                                    changeRating={this.ratingChanged}
                                    size={17}
                                    starHoverColor={' #febf3e'}
                                    starRatedColor={' #febf3e'}
                                />
                            </div>
                            <div className=" col-6 content-right">
                                <label> Thêm nội dung đánh giá </label>
                                <textarea className="form-control" rows="4"
                                    value={NOI_DUNG}
                                    onChange={(event) => this.onChangeInput(event, 'NOI_DUNG')}

                                >
                                </textarea>
                            </div>
                            <div className="button-danhgia">
                                <button
                                    onClick={() => this.handleCreateDanhGia()}
                                >Đánh giá</button>
                            </div>
                        </div>
                        <div className='danhgia-container'>
                            {allRating && allRating.length > 0 &&
                                allRating.slice(0, this.state.numberPerPage * this.state.currentPage).map((item, index) => {
                                    return (
                                        <CommentItem

                                            key={index}
                                            ID_KH={item.tenkh.ten_tk}
                                            NGAY_DG={item.NGAY_DG}
                                            DIEM={item.DIEM}
                                            NOI_DUNG={item.NOI_DUNG}
                                            id={item.id}
                                            idkhrp={item.ID_KH}
                                            idkh={idkh}
                                        />
                                    )
                                })
                            }

                            <div className='container flex py-2 flex-center'>
                                <div className='row'>
                                    <div className='col-6 d-flex justify-content-center'>
                                        {
                                            allRating.length > this.state.numberPerPage * this.state.currentPage && (
                                                <button
                                                    className='btn btn-success btn-sm font-weight-bold'
                                                    onClick={() => this.setState({
                                                        currentPage: this.state.currentPage + 1
                                                    })}
                                                >
                                                    Xem thêm <i class="fas fa-angle-double-down"></i>
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    }
}
class CommentItem extends Component {
    constructor(props) {
        super(props)
        /// report
        this.state = {
            isOpenModalreport: false,
            dataModalreport: {},
            isShowLoadingreport: false,
        }
    }
    closemodalreport = () => {
        this.setState({
            isOpenModalreport: false,
            dataModalreport: {}

        })
    }
    handlreport = (event) => {
        let NGAY_DG = moment(new Date()).format('YYYY-MM-DD');
        let data = {
            iddg: this.props.id,
            idkhrp: this.props.idkhrp,
            idkh: this.props.idkh,
            NGAY_DG: NGAY_DG,
        }
        this.setState({
            isOpenModalreport: true,
            dataModalreport: data

        })
        // console.log('b1809299 check item:', data)

    }
    guibaoxau = async (dataChilFromModal) => {
        let { dataModalreport } = this.state;
        this.setState({
            isShowLoadingHuyVe: true
        })

        let res = await guibaoxau({
            NOI_DUNG_RP: dataChilFromModal.email,
            ID_DG: dataModalreport.iddg,
            ID_KH: dataModalreport.idkh,
            ID_KH_RP: dataModalreport.idkhrp,
            NGAY_DG: dataModalreport.NGAY_DG,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoadingreport: false
            })

            toast.success('Báo xấu binh luận thành công');
            this.closemodalreport();
        }
        else {
            this.setState({
                isShowLoadingreport: false
            })
            toast.error('Báo xấu binh luận không thành công')
        }
    }
    render() {
        let { isOpenModalreport, dataModalreport } = this.state
        const { id, ID_KH, NGAY_DG, DIEM, NOI_DUNG, idkhrp, idkh } = this.props
        // console.log('check', this.props)
        const { userInfo } = this.props

        return (
            <div className='danhgia-info'>
                <div className='name-report'>
                    <div className='member-name'>
                        <span>{ID_KH}</span>
                    </div>
                    <button
                        onClick={(event) => this.handlreport(event)}
                        className='btn btn-primary'>Báo cáo </button>
                </div>
                <div className='date mt-2'>
                    <span>{moment(NGAY_DG).format("DD/MM/YYYY")}</span>
                </div>
                <div className='rating mt-2'>
                    <ReactStars
                        count={5}
                        value={DIEM}
                        size={35}
                        activeColor="#ffd700"
                        edit={false}
                    />
                </div>
                <div className='comment mt-2'>
                    <span>{NOI_DUNG}</span>
                </div>
                <ModalReport
                    isOpenModalreport={isOpenModalreport}
                    dataModalreport={dataModalreport}
                    closemodalreport={this.closemodalreport}
                    guibaoxau={this.guibaoxau}
                />
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        allsizeRedux: state.admin.allsize,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSizeStart: () => dispatch(actions.fetchAllSizeStart()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSanPham));
