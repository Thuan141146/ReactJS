
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TableGiaSanPham from './TableGiaSanPham';
import Lightbox from 'react-image-lightbox';
import './GiaSanPham.scss';
import Select from 'react-select';
import *  as actions from "../../../store/actions";
class GiaSanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeArr: [],
            previewImgURL: '',
            isOpen: false,
            allmonArr: [],

            ID_MON: '',
            ID_SIZE: '',

            GIA: '',
            actions: '',
            giaeditid: '',


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allmonRedux !== this.props.allmonRedux) {
            let arrallmon = this.props.allmonRedux;
            this.setState({
                allmonArr: arrallmon,
                ID_MON: arrallmon && arrallmon.length > 0 ? arrallmon[0].id : ''

            })
        }
        //size
        if (prevProps.allsizeRedux !== this.props.allsizeRedux) {
            let arrsize = this.props.allsizeRedux;
            this.setState({
                sizeArr: arrsize,
                ID_SIZE: arrsize && arrsize.length > 0 ? arrsize[0].id : ''

            })
        }
        if (prevProps.listallgia !== this.props.listallgia) {
            let arrallmon = this.props.allmonRedux;
            let arrsize = this.props.allsizeRedux;
            this.setState({
                ID_MON: arrallmon && arrallmon.length > 0 ? arrallmon[0].id : '',
                ID_SIZE: arrsize && arrsize.length > 0 ? arrsize[0].id : '',
                GIA: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    async componentDidMount() {
        this.props.fetchAllSizeStart();
        this.props.fetchAllMonStart();
    }
    handleSaveGiaMon = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewGiaSizeRedux({
                ID_MON: this.state.ID_MON,
                ID_SIZE: this.state.ID_SIZE,
                GIA: this.state.GIA,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editGiaMonRedux({
                id: this.state.giaeditid,
                ID_MON: this.state.ID_MON,
                ID_SIZE: this.state.ID_SIZE,
                GIA: this.state.GIA,

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
        let arrcheck = ['ID_MON', 'ID_SIZE', 'GIA',]
        for (let i = 0; i < arrcheck.length; i++) {
            if (!this.state[arrcheck[i]]) {
                isValid = false;
                alert('Vui lòng nhập:' + arrcheck[i])
                break;
            }
        }
        return isValid;
    }
    handleEditGiaMonFromParent = (giasize) => {

        console.log('b1809299 check from parent: ', giasize)
        this.setState({
            ID_MON: giasize.ID_MON,
            SIZE: giasize.SIZE,
            ID_DM: giasize.ID_DM,
            GIA: giasize.GIA,
            action: CRUD_ACTIONS.EDIT,
            giaeditid: giasize.id,
        })
    }

    render() {
        //console.log('b1809299 check state: ', this.props.danhmucRedux)
        // console.log('b1809299 check size: ', this.props.allsizeRedux)
        let size = this.state.sizeArr
        let mon = this.state.allmonArr
        let { ID_MON, ID_SIZE, GIA, } = this.state;
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
                                <label>Chọn món</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'ID_MON') }}
                                    value={ID_MON}
                                >
                                    {mon && mon.length > 0 &&
                                        mon.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.TEN_MON}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-3">
                                <label>Chọn size</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'ID_SIZE') }}
                                    value={ID_SIZE}
                                >
                                    {size && size.length > 0 &&
                                        size.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.TEN_SIZE}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className="col-3">
                                <label>Giá</label>
                                <input className="form-control" type="DECIMAL"
                                    value={GIA}
                                    onChange={(event) => { this.onChangeInput(event, 'GIA') }} />
                            </div>


                            <div className="col-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveGiaMon()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Lưu giá món mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12">
                                <TableGiaSanPham
                                    handleEditGiaMonFromParentKey={this.handleEditGiaMonFromParent}
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
        listallgia: state.admin.allgia,
        allsizeRedux: state.admin.allsize,
        allmonRedux: state.admin.allmon,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSizeStart: () => dispatch(actions.fetchAllSizeStart()),
        fetchcreateNewGiaSizeRedux: (data) => dispatch(actions.fetchcreateNewGiaSize(data)),
        editGiaMonRedux: (data) => dispatch(actions.editGiaMon(data)),
        fetchAllMonStart: () => dispatch(actions.fetchAllMonStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GiaSanPham);
