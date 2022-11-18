import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils, dateFormat } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import TableDanhMuc from './TableDanhMuc';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class DanhMuc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,

            isdanhmuccreate: false,

            TEN_DM: '',
            ANH: '',
            actions: '',
            danhmuceditid: '',

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.Lisdanhmucs !== this.props.Lisdanhmucs) {
            this.setState({
                TEN_DM: '',
                ANH: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',

            })
        }
    }

    handleOnchangImageDanhMuc = async (event) => {
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
    openPreviewImageDanhMuc = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true


        })
    }
    handleEditDanhMucFromParent = (danhmuc) => {
        let imageBase64 = '';
        if (danhmuc.ANH) {
            imageBase64 = new Buffer(danhmuc.ANH, 'base64').toString('binary');
        }
        // console.log('b1809299 check from parent: ', sukien)
        this.setState({
            TEN_DM: danhmuc.TEN_DM,
            ANH: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            danhmuceditid: danhmuc.id,
        })
    }
    handleSaveDanhMuc = () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            // console.log('thuanb1809299', this.state)
            this.props.createNewDanhMuc({
                TEN_DM: this.state.TEN_DM,
                ANH: this.state.ANH,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            /// chinh sua danh muc
            this.props.editdanhmucRedux({
                id: this.state.danhmuceditid,
                TEN_DM: this.state.TEN_DM,
                avatar: this.state.avatar,
            })
        }
    }

    onChangeInputDanhMuc = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    render() {
        let { TEN_DM, ANH } = this.state;
        return (
            <div className="danh-muc-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ DANH MỤC
                </div>
                <div className="title">

                </div>
                <div className="danh-muc-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label>Tên danh mục</label>
                                <input className="form-control" type="text"
                                    value={TEN_DM}
                                    onChange={(event) => { this.onChangeInputDanhMuc(event, 'TEN_DM') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Ảnh</label>
                                <div className="preview-img-container" >
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangImageDanhMuc(event)}
                                    />
                                    <label className="upload" htmlFor="previewImg" >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImageDanhMuc()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                onClick={() => this.handleSaveDanhMuc()}
                            >
                                {this.state.action === CRUD_ACTIONS.EDIT ?
                                    " Cập nhật " : " Lưu danh mục mới "
                                }
                            </button>
                            <div className="col-12 mt-5">
                                <TableDanhMuc
                                    handleEditDanhMucFromParentKey={this.handleEditDanhMucFromParent}
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
        Lisdanhmucs: state.admin.danhmucs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewDanhMuc: (data1) => dispatch(actions.createNewDanhMuc(data1)),
        fetchDanhMucRedux: () => dispatch(actions.fetchAllDanhMucStart()),
        editdanhmucRedux: (data) => dispatch(actions.editdanhmuc(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(DanhMuc);
