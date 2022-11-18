import React, { Component } from 'react';
import { connect } from "react-redux";
import './Khuyenmai.scss';
import *  as actions from "../../../store/actions";
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify"
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { savebulkkm, getAllkm, deletekm } from '../../../services/khubanService'
class Khuyenmai extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate1: '',
            currentDate2: '',
            rangemon: [],
            km: [],


        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allmonRedux !== this.props.allmonRedux) {
            let data = this.props.allmonRedux;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangemon: data
            })
        }
    }

    async componentDidMount() {
        this.Khuyenmai()
        this.props.fetchAllMonStart();
    }

    Khuyenmai = async () => {


        let res = await getAllkm("ALL")

        if (res && res.errCode === 0) {
            this.setState({
                km: res.khuyenmai.reverse(),

            })
        }


    }
    handleOnchang1 = (date) => {
        this.setState({
            currentDate1: date[0]

        })
        console.log('ngayf', this.state)

    }
    handleOnchang2 = (date) => {
        this.setState({

            currentDate2: date[0]
        })
        console.log('ngayf', this.state)

    }
    handleClickBtnBan = (ban) => {
        let { rangemon } = this.state;
        if (rangemon && rangemon.length > 0) {
            rangemon = rangemon.map(item => {
                if (item.id === ban.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangemon: rangemon
            })
        }
    }
    handleSaveBan = async () => {
        let { rangemon, currentDate1, currentDate2, TEN_KM, PT_GIAM } = this.state;
        let result = [];
        if (!currentDate1) {
            toast.error("Vui lòng chọn ngày bắt đầu!");
            return;
        }
        if (!currentDate2) {
            toast.error("Vui lòng chọn ngày kết thúc!");
            return;
        }
        let formateddate1 = moment(new Date(currentDate1)).format('DD/MM/YYYY');
        let formateddate2 = moment(new Date(currentDate2)).format('DD/MM/YYYY');
        console.log('b1809299 check state1:', formateddate1);
        console.log('b1809299 check state2:', formateddate2);
        if (rangemon && rangemon.length > 0) {
            let selectmon = rangemon.filter(item => item.isSelected === true);
            if (selectmon && selectmon.length > 0) {
                selectmon.map((schedule, index) => {
                    console.log('check schedule', schedule, index)
                    let object = {};
                    object.TEN_KM = TEN_KM;
                    object.PT_GIAM = PT_GIAM;
                    object.NGAYBD = formateddate1;
                    object.NGAYKT = formateddate2;
                    object.ID_MON = schedule.id;
                    result.push(object);
                })
            } else {
                toast.error("Vui lòng chọn món!!");
                return;
            }
        }
        let res = await savebulkkm({
            arrSchedule: result,
            TEN_KM: this.state.TEN_KM,
            PT_GIAM: this.state.PT_GIAM,
            NGAYBD: formateddate1,
            NGAYKT: formateddate2
        })
        // console.log('b1809299 check res', res)
        // console.log('b1809299 check select ban', result)
        if (res && res.errCode === 0) {
            toast.success(" Cập nhật danh sách khuyến mãi thành công");
            this.Khuyenmai()
        } else {
            toast.error("Không thể cập nhật danh sách khuyến mãi");
            console.log('loi >>>res:', res)
        }
    }
    onChangeInputkm = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        console.log('loi >>>res:', this.state)
    }
    handleDeletekm = async (km) => {
        let id = km.id;

        console.log('check propsid:', id)
        let res = await deletekm(id);
        if (res && res.errCode === 0) {

            toast.success('Xóa khuyến mãi thành công');

            await this.Khuyenmai()
        }
        else {
            toast.error('Xóa khuyến mãi không thành công')
        }
    }
    render() {
        let { rangemon } = this.state;
        let km = this.state.km;
        let { TEN_KM, PT_GIAM } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('b1809299 check :', km);
        return (
            <div className="manage-khuyenmai-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ KHUYẾN MÃI
                </div>
                <div className="title">
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <label>Tên khuyến mãi</label>
                            <input className="form-control" type="text"
                                value={TEN_KM}
                                onChange={(event) => { this.onChangeInputkm(event, 'TEN_KM') }}
                            />
                        </div>
                        <div className="col-3 form-group">
                            <label>Chọn ngày bắt đầu</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchang1}
                                value={this.state.currentDate1}
                                minDate={yesterday}

                            />
                        </div>
                        <div className="col-3 form-group">
                            <label>Chọn ngày kết thúc</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchang2}
                                value={this.state.currentDate2}
                                minDate={yesterday}

                            />
                        </div>
                        <div className="col-3">
                            <label>Phầm trăm khuyến mãi</label>
                            <input className="form-control" type="text"
                                value={PT_GIAM}
                                onChange={(event) => { this.onChangeInputkm(event, 'PT_GIAM') }}
                            />
                        </div>
                        <div className="col-12 pick-ban-contariner">
                            {rangemon && rangemon.length > 0 &&
                                rangemon.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-ban active" : "btn btn-ban "}
                                            key={index}
                                            onClick={() => this.handleClickBtnBan(item)}
                                        >
                                            {item.TEN_MON}</button>
                                    )
                                })

                            }
                        </div>
                        <div className="col-12 ">
                            <button
                                className=" btn btn-primary btn-save-ban col-3"
                                onClick={() => this.handleSaveBan()}
                            >Lưu thông tin khuyến mãi</button>

                        </div>



                    </div>
                </div >
                <div className="col-12">
                    <div className="title">
                        Danh sách sản phẩm khuyến mãi
                    </div>
                    <table id="TableChi">

                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Tên khuyến mãi</th>
                                <th>Tên món</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Phần trăm giảm giá</th>
                                {/* <th>SIZE</th>
                        <th>Giá</th> */}
                                {/* <th>Mô tả</th> */}
                                <th> Trạng Thái</th>

                            </tr>
                            {km && km.length > 0 &&
                                km.map((item, index) => {
                                    return (
                                        <tr key={'index'}>
                                            <td>{item.id}</td>
                                            <td>{item.TEN_KM}</td>
                                            <td>{item.ten.TEN_MON}</td>
                                            <td>{item.NGAYBD}</td>
                                            <td>{item.NGAYKT}</td>
                                            <td>{item.PT_GIAM}%</td>
                                            <td >
                                                <div className='edit-btn'>
                                                    <button
                                                        onClick={() => this.handleDeletekm(item)}
                                                        className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allkhuRedux: state.admin.allkhu,
        allmonRedux: state.admin.allmon,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
        fetchAllMonStart: () => dispatch(actions.fetchAllMonStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Khuyenmai);
