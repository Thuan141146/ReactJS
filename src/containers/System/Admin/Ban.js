import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import *  as actions from "../../../store/actions";
import { connect } from 'react-redux';
import TableBan from './TableBan';
import Lightbox from 'react-image-lightbox';
import Select from 'react-select';
class Ban extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            allkhuArr: [],
            iskhuvuccreate: false,

            ID_KV: '',
            SO_BAN: '',
            TT: '',
            actions: '',
            baneditid: '',

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allkhuRedux !== this.props.allkhuRedux) {
            let arrallkhu = this.props.allkhuRedux;
            this.setState({
                allkhuArr: arrallkhu,
                ID_KV: arrallkhu && arrallkhu.length > 0 ? arrallkhu[0].id : ''

            })
        }
        if (prevProps.allbanRedux !== this.props.allbanRedux) {
            let arrallkhu = this.props.allkhuRedux;
            this.setState({
                ID_KV: arrallkhu && arrallkhu.length > 0 ? arrallkhu[0].id : '',
                SO_BAN: '',
                TT: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleEditBanFromParent = (ban) => {
        // console.log('b1809299 check from parent: ', ban)
        this.setState({
            ID_KV: ban.ID_KV,
            SO_BAN: ban.SO_BAN,
            TT: ban.TT,
            action: CRUD_ACTIONS.EDIT,
            baneditid: ban.id,
        })
    }
    handleSaveBan = () => {
        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.fetchcreateNewBan({
                ID_KV: this.state.ID_KV,
                SO_BAN: this.state.SO_BAN,
                TT: this.state.TT,

            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editBanRedux({
                ID_KV: this.state.ID_KV,
                SO_BAN: this.state.SO_BAN,
                TT: this.state.TT,

            })
        }
    }

    onChangeInputBan = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }
    async componentDidMount() {
        this.props.fetchAllKhuStart();
    }

    render() {
        // console.log('all khu', this.props.allkhuRedux)
        let allkhu = this.state.allkhuArr;
        let { ID_KV, SO_BAN, TT } = this.state;
        return (
            <div className="danh-muc-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ BÀN
                </div>
                <div className="title">

                </div>
                <div className="danh-muc-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label>Chọn khu vực</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInputBan(event, 'ID_KV') }}
                                    value={ID_KV}
                                >
                                    {allkhu && allkhu.length > 0 &&
                                        allkhu.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>{item.TEN_KV}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-6">
                                <label>Nhận số bàn</label>
                                <input className="form-control" type="text"
                                    value={SO_BAN}
                                    onChange={(event) => { this.onChangeInputBan(event, 'SO_BAN') }}
                                />
                            </div>
                            <div className="col-6">
                                <label>Trạng thái bàn</label>
                                <input className="form-control" type="text"
                                    value={TT}
                                    onChange={(event) => { this.onChangeInputBan(event, 'TT') }}
                                />
                            </div>
                            <div className="co-12 my-3">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning col-3" : "btn btn-primary col-3"}
                                    onClick={() => this.handleSaveBan()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        " Cập nhật " : " Thêm bàn mới "
                                    }
                                </button>
                            </div>
                            <div className="col-12 mt-5">
                                <TableBan
                                    handleEditBanFromParentKey={this.handleEditBanFromParent}
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
        allbanRedux: state.admin.allban,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
        fetchcreateNewBan: (data) => dispatch(actions.fetchcreateNewBan(data)),
        editBanRedux: (data) => dispatch(actions.editBan(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ban);

