
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TableSanPham from './TableSanPham';
import Lightbox from 'react-image-lightbox';
import './SanPham.scss';
import { getAllDanhMuc } from '../../../services/danhmucService';
import { getAllSize } from '../../../services/monService';
import *  as actions from "../../../store/actions";
class SanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            danhmucArr: [],
            sizeArr: [],
            previewImgURL: '',
            isOpen: false,


            TEN_MON: '',

            ID_DM: '',
            GIA: '',
            ANH: '',
            MO_TA: '',

            actions: '',
            moneditid: '',


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        //danhmuc
        if (prevProps.danhmucRedux !== this.props.danhmucRedux) {
            let arrdanhmuc = this.props.danhmucRedux;
            this.setState({
                danhmucArr: arrdanhmuc,
                ID_DM: arrdanhmuc && arrdanhmuc.length > 0 ? arrdanhmuc[0].id : ''

            })
        }
        if (prevProps.listallmon !== this.props.listallmon) {
            let arrdanhmuc = this.props.danhmucRedux;
            this.setState({
                TEN_MON: '',
                ID_DM: arrdanhmuc && arrdanhmuc.length > 0 ? arrdanhmuc[0].id : '',
                GIA: '',
                ANH: '',
                MO_TA: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
    }
    async componentDidMount() {
        this.props.fetchAllDanhMucStart();
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
    handleSaveSanPham = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewMon({
                TEN_MON: this.state.TEN_MON,
                ID_DM: this.state.ID_DM,
                GIA: this.state.GIA,
                MO_TA: this.state.MO_TA,
                ANH: this.state.ANH,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editMonRedux({
                id: this.state.moneditid,
                TEN_MON: this.state.TEN_MON,
                ID_DM: this.state.ID_DM,
                GIA: this.state.GIA,
                MO_TA: this.state.MO_TA,
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


    }
    checkValidateInput = () => {
        let isValid = true;
        let arrcheck = ['TEN_MON', 'ID_DM', 'GIA', 'MO_TA']
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                alert('Vui lòng nhập:' + arrcheck[i])
                break;
            }
        }
        return isValid;
    }
    handleEditMonFromParent = (mon) => {
        let imageBase64 = '';
        if (mon.ANH) {
            imageBase64 = new Buffer(mon.ANH, 'base64').toString('binary');
        }

        console.log('b1809299 check from parent: ', mon)
        this.setState({
            TEN_MON: mon.TEN_MON,
            ID_DM: mon.ID_DM,
            GIA: mon.GIA,
            MO_TA: mon.MO_TA,
            ANH: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            moneditid: mon.id,
        })
    }

    render() {
        //console.log('b1809299 check state: ', this.props.danhmucRedux)
        // console.log('b1809299 check size: ', this.props.allsizeRedux)
        let danhmuc = this.state.danhmucArr;
        let { TEN_MON, ID_DM, GIA, ANH, MO_TA } = this.state;
        return (
            <div className="danh-muc-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ SẢN PHẨM
                </div>
                <div className="title">

                </div>
                <div className="san-pham-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label>Tên Món</label>
                                <input className="form-control" type="text"
                                    value={TEN_MON}
                                    onChange={(event) => { this.onChangeInput(event, 'TEN_MON') }}

                                />
                            </div>
                            <div className="col-3">
                                <label>Danh Mục</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'ID_DM') }}
                                    value={ID_DM}
                                >
                                    {danhmuc && danhmuc.length > 0 &&
                                        danhmuc.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.TEN_DM}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Giá</label>
                                <input className="form-control" type="text"
                                    value={GIA}
                                    onChange={(event) => { this.onChangeInput(event, 'GIA') }} />
                            </div>
                            <div className="col-9">
                                <label>Mô tả món</label>
                                <input className="form-control" type="text"
                                    value={MO_TA}
                                    onChange={(event) => { this.onChangeInput(event, 'MO_TA') }}

                                />
                            </div>
                            <div className="anh col-3">
                                <label>Ảnh</label>
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
                                    onClick={() => this.handleSaveSanPham()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Lưu món mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12">
                                <TableSanPham
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
        danhmucRedux: state.admin.danhmucs,

        listallmon: state.admin.allmon,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchAllDanhMucStart: () => dispatch(actions.fetchAllDanhMucStart()),
        fetchcreateNewMon: (data) => dispatch(actions.fetchcreateNewMon(data)),
        editMonRedux: (data) => dispatch(actions.editMon(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SanPham);
