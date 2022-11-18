import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import TableKhu from './TableKhu';
import Lightbox from 'react-image-lightbox';
class Khu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            previewImgURL: '',
            ANH: '',


            iskhuvuccreate: false,

            TEN_KV: '',
            MO_TA_KV: '',
            actions: '',
            moneditid: '',

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Listallkhu !== this.props.Listallkhu) {

            this.setState({
                TEN_KV: '',
                MO_TA_KV: '',
                ANH: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: '',


            })
        }
    }
    handleOnchangImageKhu = async (event) => {
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
    openPreviewImageKhu = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true


        })
    }

    handleEditKhuFromParent = (khu) => {
        let imageBase64 = '';
        if (khu.ANH) {
            imageBase64 = new Buffer(khu.ANH, 'base64').toString('binary');
        }
        console.log('b1809299 check from parent: ', khu)
        this.setState({
            TEN_KV: khu.TEN_KV,
            ANH: '',
            previewImgURL: imageBase64,
            MO_TA_KV: khu.MO_TA_KV,
            action: CRUD_ACTIONS.EDIT,
            moneditid: khu.id,
        })
    }
    handleSaveKhuVuc = () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewKhu({
                TEN_KV: this.state.TEN_KV,
                MO_TA_KV: this.state.MO_TA_KV,
                ANH: this.state.ANH,

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editKhuRedux({
                id: this.state.moneditid,
                TEN_KV: this.state.TEN_KV,
                MO_TA_KV: this.state.MO_TA_KV,
                avatar: this.state.avatar,

            })
        }


    }
    onChangeInputKhuVuc = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    render() {
        let { TEN_KV, ANH, MO_TA_KV } = this.state;
        return (
            <div className="danh-muc-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ KHU VỰC
                </div>
                <div className="title">

                </div>
                <div className="danh-muc-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label>Tên khu </label>
                                <input className="form-control" type="text"
                                    value={TEN_KV}
                                    onChange={(event) => { this.onChangeInputKhuVuc(event, 'TEN_KV') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Ảnh</label>
                                <div className="preview-img-container" >
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => this.handleOnchangImageKhu(event)}
                                    />
                                    <label className="upload" htmlFor="previewImg" >Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImageKhu()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <label>Mô tả khu vực</label>
                                <input className="form-control" type="text"
                                    value={MO_TA_KV}
                                    onChange={(event) => { this.onChangeInputKhuVuc(event, 'MO_TA_KV') }}
                                />
                            </div>
                            <div className="co-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveKhuVuc()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Thêm khu vực mới "
                                    }
                                </button>
                            </div>

                            <div className="col-12 mt-5">
                                <TableKhu
                                    handleEditKhuFromParentKey={this.handleEditKhuFromParent}
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
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        Listallkhu: state.admin.allkhu,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchcreateNewKhu: (data) => dispatch(actions.fetchcreateNewKhu(data)),
        fetchDanhMucRedux: () => dispatch(actions.fetchAllDanhMucStart()),
        editKhuRedux: (data) => dispatch(actions.editKhu(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Khu);

