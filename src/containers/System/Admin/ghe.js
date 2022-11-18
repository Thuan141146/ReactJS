import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import TableBan from './TableBan';
import Lightbox from 'react-image-lightbox';
import Select from 'react-select';
import Tableghe from './Tableghe';
class ghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            allkhuArr: [],
            iskhuvuccreate: false,

            GIA: '',
            SO_GHE: '',
            TT: '',
            actions: '',
            baneditid: '',

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allgheRedux !== this.props.allgheRedux) {
            let arrallghe = this.props.allgheRedux;
            this.setState({
                GIA: '',
                SO_GHE: '',
                TT: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleEditgheFromParent = (ghe) => {
        // console.log('b1809299 check from parent: ', ghe)
        this.setState({
            GIA: ghe.GIA,
            SO_GHE: ghe.SO_GHE,
            TT: ghe.TT,
            action: CRUD_ACTIONS.EDIT,
            baneditid: ghe.id,
        })
    }
    handleSaveghe = () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewghe({
                GIA: this.state.GIA,
                SO_GHE: this.state.SO_GHE,
                TT: this.state.TT,

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editgheRedux({
                SO_GHE: this.state.SO_GHE,
                TT: this.state.TT,
                GIA: this.state.GIA,
                id: this.state.baneditid,

            })
        }
    }

    onChangeInputghe = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        console.log('check input', this.state)
    }
    async componentDidMount() {
    }

    render() {
        // console.log('all khu', this.props.allkhuRedux)

        let { GIA, SO_GHE, TT } = this.state;
        return (
            <div className="danh-muc-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ Ghế sự kiện
                </div>
                <div className="title">

                </div>
                <div className="danh-muc-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <label>Nhận số ghế</label>
                                <input className="form-control" type="text"
                                    value={SO_GHE}
                                    onChange={(event) => { this.onChangeInputghe(event, 'SO_GHE') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>loại ghế</label>
                                <input className="form-control" type="text"
                                    value={TT}
                                    onChange={(event) => { this.onChangeInputghe(event, 'TT') }}
                                />
                            </div>
                            <div className="col-3">
                                <label>Giá ghế</label>
                                <input className="form-control" type="text"
                                    value={GIA}
                                    onChange={(event) => { this.onChangeInputghe(event, 'GIA') }}
                                />
                            </div>
                            <div className="co-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveghe()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Thêm ghế mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12 mt-5">
                                <Tableghe
                                    handleEditgheFromParentKey={this.handleEditgheFromParent}
                                    action={this.state.action} />
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allkhuRedux: state.admin.allkhu,
        allgheRedux: state.admin.allghe,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
        fetchcreateNewghe: (data) => dispatch(actions.fetchcreateNewghe(data)),
        editgheRedux: (data) => dispatch(actions.editghe(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ghe);

