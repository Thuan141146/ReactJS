import React, { Component } from 'react';
import { connect } from "react-redux";
import './QLDatBan.scss';
import *  as actions from "../../../store/actions";
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify"
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { savebulkqlban, getbantrong, dongbanService } from '../../../services/khubanService'
class QLDatBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listkhuvuc: [],
            selectedKhu: {},
            currentDate: '',
            rangeBan: [],
            bantrong: [],
            allkhuArr: [],

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allkhuRedux !== this.props.allkhuRedux) {
            let dataSelect = this.buildDataInputSelect(this.props.allkhuRedux)
            this.setState({
                listkhuvuc: dataSelect,

            })
        }
        if (prevProps.allban !== this.props.allban) {
            let data = this.props.allban;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeBan: data
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

    async componentDidMount() {
        this.props.fetchAllKhuStart();
        this.props.fetchAllBanStart();
        this.bantrong()

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
    buildDataInputSelect = (inputdata) => {
        let result = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelvn = `${item.TEN_KV}`;

                object.label = labelvn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedKhu: selectedOption });

    };
    handleOnchang = (date) => {
        this.setState({
            currentDate: date[0]
        })
        console.log('ngayf', this.state)

    }
    handleClickBtnBan = (ban) => {
        let { rangeBan } = this.state;
        if (rangeBan && rangeBan.length > 0) {
            rangeBan = rangeBan.map(item => {
                if (item.id === ban.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeBan: rangeBan
            })
        }
    }
    handleSaveBan = async () => {
        let { rangeBan, selectedKhu, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Vui l??ng ch???n ng??y!");
            return;
        }
        if (selectedKhu && _.isEmpty(selectedKhu)) {
            toast.error("Vui l??ng ch???n khu!");
            return;
        }
        let formateddate = new Date(currentDate).getTime();
        console.log('b1809299 check state:', formateddate);
        if (rangeBan && rangeBan.length > 0) {
            let selectBan = rangeBan.filter(item => item.isSelected === true);
            if (selectBan && selectBan.length > 0) {
                selectBan.map((schedule, index) => {
                    console.log('check schedule', schedule, index, selectedKhu)
                    let object = {};
                    object.khuvucid = selectedKhu.value;
                    object.ngay = formateddate;
                    object.TT = schedule.TT;
                    object.bankey = schedule.id;
                    result.push(object);
                })
            } else {
                toast.error("Vui l??ng ch???n b??n!!");
                return;
            }
        }
        let res = await savebulkqlban({
            arrSchedule: result,
            khuvucid: selectedKhu.value,
            formateddate: formateddate
        })
        // console.log('b1809299 check res', res)
        // console.log('b1809299 check select ban', result)
        if (res && res.errCode === 0) {
            toast.success(" C???p nh???t danh s??ch b??n th??nh c??ng");

        } else {
            toast.error("Kh??ng th??? c???p nh???t danh s??ch b??n");
            console.log('loi >>>res:', res)
        }
    }
    onChangeInputBan = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {

            await this.bantrong()
        })
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
    handleDongban = async (ban) => {
        let id = ban.id;

        console.log('check propsid:', id)
        let res = await dongbanService(id);
        if (res && res.errCode === 0) {

            toast.success('????ng b??n th??nh c??ng');

            await this.bantrong()
        }
        else {
            toast.error('????ng b??n kh??ng th??nh c??ng')
        }
    }
    render() {
        let { rangeBan, bantrong } = this.state;
        let allkhu = this.state.allkhuArr;
        let { ID_KV, } = this.state;

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('b1809299 check props:', bantrong);
        return (
            <div className="manage-datban-container">
                <div className="title">
                    QU???N L?? KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QU???N L?? TR???NG TH??I B??N
                </div>
                <div className="title">
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Ch???n Khu</label>
                            <Select
                                value={this.state.selectedKhu}
                                onChange={this.handleChangeSelect}
                                options={this.state.listkhuvuc}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Ch???n Ng??y</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchang}
                                value={this.state.currentDate}
                                minDate={yesterday}

                            />
                        </div>
                        <div className="col-12 pick-ban-contariner">
                            {rangeBan && rangeBan.length > 0 &&
                                rangeBan.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? "btn btn-ban active" : "btn btn-ban "}
                                            key={index}
                                            onClick={() => this.handleClickBtnBan(item)}
                                        >
                                            B??n s???: {item.SO_BAN}</button>
                                    )
                                })

                            }
                        </div>
                        <div className="col-12 ">
                            <button
                                className=" btn btn-primary btn-save-ban col-3"
                                onClick={() => this.handleSaveBan()}
                            >M??? b??n</button>

                        </div>



                    </div>

                    <table id="TableChi">
                        <div className="title">
                            Danh s??ch b??n tr???ng
                        </div>
                        <div className="col-5">
                            <label>Ch???n khu v???c</label>
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
                        <div className="col-5 form-grop">
                            <label>Ch???n ng??y </label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchang}
                                value={this.state.currentDate}


                            />
                        </div>
                        <tbody>

                            <tr>
                                <th>ID</th>
                                <th>T??n Khu</th>
                                <th>S??? b??n</th>
                                <th>M?? t???</th>
                                {/* <th>SIZE</th>
                        <th>Gi??</th> */}
                                {/* <th>M?? t???</th> */}
                                <th> Tr???ng Th??i</th>

                            </tr>
                            {bantrong && bantrong.length > 0 ?
                                bantrong.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.tenkhu.TEN_KV}</td>
                                            <td>{item.timeTypeData.SO_BAN}</td>
                                            <td>{item.TT}</td>
                                            <td >
                                                <div className='edit-btn'>
                                                    <button
                                                        onClick={() => this.handleDongban(item)}
                                                    >????ng b??n</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                                :

                                <tr>

                                    <td colSpan="8" style={{ textAlign: "center" }}>Kh??ng c?? b??n tr???ng</td>


                                </tr>
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
        allban: state.admin.allban,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuStart: () => dispatch(actions.fetchAllKhuStart()),
        fetchAllBanStart: () => dispatch(actions.fetchAllBanStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QLDatBan);
