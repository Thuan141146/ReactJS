import React, { Component } from 'react';
import { connect } from "react-redux";
import './Qlghesk.scss';
import *  as actions from "../../../store/actions";
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify"
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { savebulkqlghe, getghetrong, donggheService } from '../../../services/khubanService'
import { push } from 'connected-react-router';
class Qlghesk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listsk: [],
            selectedKhu: {},
            currentDate: '',
            rangeBan: [],
            ghetrong: [],
            allskArr: [],

        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allsukien !== this.props.allsukien) {
            let dataSelect = this.buildDataInputSelect(this.props.allsukien)
            this.setState({
                listsk: dataSelect,

            })
        }
        if (prevProps.allghe !== this.props.allghe) {
            let data = this.props.allghe;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeBan: data
            })
        }
        if (prevProps.allsukien !== this.props.allsukien) {
            let arrallsk = this.props.allsukien;
            this.setState({
                allskArr: arrallsk,
                TEN_LSK: arrallsk && arrallsk.length > 0 ? arrallsk[0].id : ''

            })
        }
    }

    async componentDidMount() {
        this.props.fetchAllgheStart();
        this.props.fetchAllsukien();
        this.ghetrong()

    }

    ghetrong = async () => {
        let ID_SK = this.state.ID_SK
        console.log('in', ID_SK)
        let TT = this.state.TT
        let res = await getghetrong(ID_SK, TT)


        if (res && res.errCode === 0) {
            this.setState({
                ghetrong: res.data,

            })
        }


    }
    buildDataInputSelect = (inputdata) => {
        let result = [];
        if (inputdata && inputdata.length > 0) {
            inputdata.map((item, index) => {
                let object = {};
                let labelvn = `${item.TEN_LSK}`;

                object.label = labelvn;
                object.value = item.id;
                object.gia = item.timeTypeData.value;
                result.push(object)
            })
        }
        return result;
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedKhu: selectedOption });

    };

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
        if (selectedKhu && _.isEmpty(selectedKhu)) {
            toast.error("Vui l??ng ch???n s??? ki???n!");
            return;
        }
        if (rangeBan && rangeBan.length > 0) {
            let selectBan = rangeBan.filter(item => item.isSelected === true);
            if (selectBan && selectBan.length > 0) {
                selectBan.map((schedule, index) => {
                    console.log('check schedule', schedule, index, selectedKhu)
                    let object = {};
                    object.ID_SK = selectedKhu.value;
                    object.GIA_SK = selectedKhu.gia;
                    object.TT = schedule.TT;
                    object.ID_GHE = schedule.id;
                    object.GIA = schedule.GIA;
                    result.push(object);
                })

            } else {
                toast.error("Vui l??ng ch???n gh???!!");
                return;
            }
            console.log('b1809299 check select ban', result)
        }
        let res = await savebulkqlghe({
            arrSchedule: result,
            ID_SK: selectedKhu.value,
        })
        // console.log('b1809299 check res', res)
        // console.log('b1809299 check select ban', result)
        if (res && res.errCode === 0) {
            toast.success(" C???p nh???t danh s??ch gh??? th??nh c??ng");
            await this.ghetrong()

        } else {
            toast.error("Kh??ng th??? c???p nh???t danh s??ch gh???");
            console.log('loi >>>res:', res)
        }
    }
    onChangeInputghe = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {

            await this.ghetrong()
        })
    }
    handleDongban = async (ghe) => {
        let id = ghe.id;

        console.log('check propsid:', id)
        let res = await donggheService(id);
        if (res && res.errCode === 0) {

            toast.success('????ng gh??? th??nh c??ng');

            await this.ghetrong()
        }
        else {
            toast.error('????ng gh??? kh??ng th??nh c??ng')
        }
    }
    onChangeInputKhuVuc = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {

            await this.ghetrong()
        })
        // console.log("check", this.state)
    }
    render() {
        let { rangeBan, ghetrong } = this.state;
        let allkhu = this.state.allskArr;
        let { ID_SK, TT } = this.state;

        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        // console.log('b1809299 check props:', allkhu);
        return (
            <div className="manage-ghesk-container">
                <div className="title">
                    QU???N L?? KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QU???N L?? TR???NG TH??I gh??? s??? ki???n
                </div>
                <div className="title">
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Ch???n s??? ki???n</label>
                            <Select
                                value={this.state.selectedKhu}
                                onChange={this.handleChangeSelect}
                                options={this.state.listsk}
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
                                            Gh??? s???: {item.SO_GHE} {item.TT}</button>
                                    )
                                })

                            }
                        </div>
                        <div className="col-12 ">
                            <button
                                className=" btn btn-primary btn-save-ban col-3"
                                onClick={() => this.handleSaveBan()}
                            >L??u th??ng tin</button>

                        </div>
                        <table id="TableChi">
                            <div className="title">
                                Danh s??ch gh??? tr???ng
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <label>Lo???i gh??? </label>
                                    <input className="form-control" type="text"
                                        value={TT}
                                        onChange={(event) => { this.onChangeInputKhuVuc(event, 'TT') }}
                                    />
                                </div>
                                <div className="col-5">
                                    <label>Ch???n s??? ki???n</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInputghe(event, 'ID_SK') }}
                                        value={ID_SK}
                                    >
                                        {allkhu && allkhu.length > 0 &&
                                            allkhu.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.TEN_LSK}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                            </div>

                            <tbody>

                                <tr>
                                    <th>ID</th>
                                    <th>T??n s??? ki???n</th>
                                    <th>S??? gh???</th>
                                    <th>Lo???i gh???</th>
                                    {/* <th>SIZE</th>
                        <th>Gi??</th> */}
                                    {/* <th>M?? t???</th> */}
                                    <th> C??ng c???</th>

                                </tr>
                                {ghetrong && ghetrong.length > 0 ?
                                    ghetrong.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.ttsk.TEN_LSK}</td>
                                                <td>{item.tenghe.SO_GHE}</td>
                                                <td>{item.TT}</td>
                                                <td >
                                                    <div className='edit-btn'>
                                                        <button
                                                            onClick={() => this.handleDongban(item)}
                                                        >????ng v??</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :

                                    <tr>

                                        <td colSpan="8" style={{ textAlign: "center" }}> ???? h???t gh???</td>


                                    </tr>
                                }
                            </tbody>
                        </table>


                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allsukien: state.admin.allsukien,
        allghe: state.admin.allghe,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllsukien: (id) => dispatch(actions.fetchAllsukien()),
        fetchAllgheStart: () => dispatch(actions.fetchAllgheStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Qlghesk);
