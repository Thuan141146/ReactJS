
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TableChi from './TableChi';
import Lightbox from 'react-image-lightbox';
import './Chi.scss';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllDanhMuc, } from '../../../services/danhmucService';
import { getAllSize } from '../../../services/monService';
import *  as actions from "../../../store/actions";
class Chi extends Component {
    constructor(props) {
        super(props);
        this.state = {

            nhanvienArr: [],
            previewImgURL: '',
            isOpen: false,


            TIEN: '',

            ID_NV: '',
            TIEN: '',
            ANH: '',
            NOI_DUNG: '',

            actions: '',
            moneditid: '',


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //danhmuc
        if (prevProps.nhanvienRedux !== this.props.nhanvienRedux) {
            let arrnhanvien = this.props.nhanvienRedux;
            this.setState({
                nhanvienArr: arrnhanvien,
                ID_NV: arrnhanvien && arrnhanvien.length > 0 ? arrnhanvien[0].id : ''

            })
        }
        if (prevProps.listphieuchi !== this.props.listphieuchi) {
            let arrnhanvien = this.props.nhanvienRedux;
            this.setState({
                TIEN: '',
                ID_NV: arrnhanvien && arrnhanvien.length > 0 ? arrnhanvien[0].id : '',
                NGAY: '',
                ANH: '',
                NOI_DUNG: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }
    async componentDidMount() {
        this.props.fetchAllNhanVienStart();
    }
    handleOnchangeImage = async (event) => {
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
    //moanh
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true


        })
    }
    handleSavePhieuChi = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        let { currentDate } = this.state;
        let formateDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        // let NGAY = new Date(formateDate).getTime();
        // console.log('b1809299 check item:', NGAY)
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewPhieuChi({
                TIEN: this.state.TIEN,
                ID_NV: this.state.ID_NV,
                NOI_DUNG: this.state.NOI_DUNG,
                NGAY: formateDate,
                ANH: this.state.ANH,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editphieuchiRedux({
                id: this.state.moneditid,
                TIEN: this.state.TIEN,
                ID_NV: this.state.ID_NV,
                NOI_DUNG: this.state.NOI_DUNG,
                NGAY: formateDate,
                ANH: this.state.ANH,
            })
        }


    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        // ID_DM: '',
        // TEN_MON: '',
        // SIZE: '',
        // GIA: '',
        //ANH: '',
        // MO_TA: '',
        console.log('b1809299 check item:', this.state)

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['TIEN', 'NOI_DUNG']
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                alert('Vui lòng nhập:' + arrcheck[i])
                break;
            }
        }
        return isValid;
    }
    handleEditMonFromParent = (phieu) => {
        let imageBase64 = '';
        if (phieu.ANH) {
            imageBase64 = new Buffer(phieu.ANH, 'base64').toString('binary');
        }

        console.log('b1809299 check from parent: ', phieu)
        this.setState({
            TIEN: phieu.TIEN,
            ID_NV: phieu.ID_NV,
            NOI_DUNG: phieu.NOI_DUNG,
            NGAY: phieu.NGAY,
            ANH: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            moneditid: phieu.id,
        })
    }
    handleOnchang = (date) => {

        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            //await this.handleSavePhieuChi()
        })
        // console.log('b1809299 check item:', this.state)


    }
    render() {
        //console.log('b1809299 check state: ', this.props.danhmucRedux)
        // console.log('b1809299 check size: ', this.props.allsizeRedux)
        let nhanvien = this.state.nhanvienArr;
        // console.log('b1809299 check state: ', nhanvien)
        let { ID_NV, TIEN, NOI_DUNG, ANH, NGAY } = this.state;
        return (
            <div className="chi-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ Chi tiêu
                </div>
                <div className="title">

                </div>
                <div className="chi-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label>Số tiền</label>
                                <input className="form-control" type="text"
                                    value={TIEN}
                                    onChange={(event) => { this.onChangeInput(event, 'TIEN') }}

                                />
                            </div>
                            <div className="col-3">
                                <label>Nhân viên</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'ID_NV') }}
                                    value={ID_NV}
                                >
                                    {nhanvien && nhanvien.length > 0 &&
                                        nhanvien.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.ten_tk}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4 form-grop">
                                <label>Theo ngày</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchang}
                                    value={this.state.currentDate}

                                />
                            </div>
                            <div className=" col-6 content-right">
                                <label> Nội dung chi  </label>
                                <textarea className="form-control" rows="4"
                                    value={NOI_DUNG}
                                    onChange={(event) => this.onChangeInput(event, 'NOI_DUNG')}

                                >
                                </textarea>
                            </div>
                            <div className="anh col-3">
                                <label>Ảnh hóa đơn </label>
                                <div className="preview-img-container" >
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className="upload" htmlFor="previewImg" >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSavePhieuChi()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật  " : " Lập phiếu chi mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12">
                                <TableChi
                                    handleEditMonFromParentKey={this.handleEditMonFromParent}
                                    action={this.state.action}
                                />
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
        nhanvienRedux: state.admin.nhanvien,

        listphieuchi: state.admin.phieuchi,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchAllNhanVienStart: () => dispatch(actions.fetchAllNhanVienStart()),
        fetchcreateNewPhieuChi: (data) => dispatch(actions.fetchcreateNewPhieuChi(data)),
        editphieuchiRedux: (data) => dispatch(actions.editphieuchi(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chi);
