import React, { Component } from 'react';
import { CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import './ModalChuyenBan.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import *  as actions from "../../../store/actions";
import { getbantrong } from '../../../services/khubanService'
import DatePicker from '../../../components/Input/DatePicker';
// import moment from 'moment';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
class ModalChuyenBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentDate: moment(new Date()).startOf('day').valueOf(),
            listkhuvuc: [],
            selectedKhu: {},
            currentDate: '',
            rangeBan: [],
        }
    }


    async componentDidMount() {
        this.props.fetchAllKhuStart();
        this.bantrong()
        if (this.props.dataModalHuyBan) {
            this.setState({
                BAN_SO: this.props.dataModalChuyenBan.BAN_SO
            })
        }

    }
    bantrong = async () => {
        let { currentDate } = this.state;
        let NGAY = new Date(currentDate).getTime();
        let ID_KV = this.state.ID_KV
        let res = await getbantrong(NGAY, ID_KV)
        if (res && res.errCode === 0) {
            this.setState({
                bantrong: res.data,

            })
        }


    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModalChuyenBan !== this.props.dataModalChuyenBan) {
            this.setState({
                BAN_SO: this.props.dataModalChuyenBan.BAN_SO
            })
        }
        if (prevProps.allkhuRedux !== this.props.allkhuRedux) {
            let arrallkhu = this.props.allkhuRedux;
            this.setState({
                allkhuArr: arrallkhu,
                ID_KV: arrallkhu && arrallkhu.length > 0 ? arrallkhu[0].id : ''

            })
        }
    }


    handleOnchangEmail = (event) => {
        this.setState({
            BAN_SO: event.target.value
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: Base64
            })
        }
    }
    ChuyenBan = () => {
        this.props.ChuyenBan(this.state)
    }
    onChangeInputBan = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {

            await this.bantrong()
        })
        console.log("check data", this.state);
    }
    onChangeInputkhu = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {

            await this.bantrong()
        })
        console.log("check data", this.state);
    }
    handleOnchang = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.bantrong()
        })
        //console.log('b1809299 check item:', this.state)


    }
    render() {
        // toggle={}
        let allkhu = this.state.allkhuArr;
        let { isOpenModalChuyenBan, closemodalChuyenBan, dataModalChuyenBan, } = this.props;
        // console.log("check data", dataModalChuyenBan);
        let { ID_KV, ID_BAN } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let bantrong = this.state.bantrong;
        console.log('b1809299 check props:', dataModalChuyenBan);
        let TEN_KHU = dataModalChuyenBan.tenkhu;
        let TEN_BAN = dataModalChuyenBan.BAN_SO;
        console.log('b1809299 check props:', TEN_BAN);
        return (
            <Modal
                isOpen={isOpenModalChuyenBan}
                className={"dat-ban-container"}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Chuyển bàn</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closemodalChuyenBan}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="tt">Khu: {TEN_KHU}</div>
                        <div className="tt">Bàn số: {TEN_BAN}</div>
                        <div className='tt'>Chọn bàn cần chuyển đến</div>
                        <div className="col-6 form-group">
                            <label>Chọn Ngày</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchang}
                                value={this.state.currentDate}
                                minDate={yesterday}

                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn khu</label>
                            <select className="form-control"
                                onChange={(event) => { this.onChangeInputkhu(event, 'ID_KV') }}
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
                        <div className="col-6 form-group">
                            <label>Chọn Bàn </label>
                            <select className="form-control"
                                onChange={(event) => { this.onChangeInputBan(event, 'ID_BAN') }}
                                value={ID_BAN}
                            >
                                {bantrong && bantrong.length > 0 &&
                                    bantrong.map((item, index) => {
                                        return (
                                            <option key={index} value={item.bankey}>Bàn số: {item.timeTypeData.SO_BAN}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.ChuyenBan()}>Xác nhận</Button>{' '}
                    <Button color="secondary" onClick={closemodalChuyenBan}>Hủy</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        allkhuRedux: state.admin.allkhu,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalChuyenBan);
