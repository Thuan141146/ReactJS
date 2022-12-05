
import React, { Component } from 'react';
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TableChi from './TableChi';
import Lightbox from 'react-image-lightbox';
import './XemBL.scss';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllDanhMuc, } from '../../../services/danhmucService';
import { getAllSize } from '../../../services/monService';
import *  as actions from "../../../store/actions";
import { getallbinhluan } from '../../../services/khubanService';
import { toast } from "react-toastify"
class XemBL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baoxau: [],
            currentDate: moment(new Date()).startOf('day').valueOf(),
            rangemon: [],

        }
    }
    async componentDidMount() {
        this.baoxau()
        this.props.fetchAllMonStart();
    }

    baoxau = async () => {
        let { currentDate } = this.state;
        let NGAY = moment(new Date(currentDate)).format('YYYY-MM-DD');
        let ID_MON = this.state.ID_MON
        console.log('b1809299 check item:', ID_MON)
        let res = await getallbinhluan(NGAY, ID_MON)
        if (res && res.errCode === 0) {
            this.setState({
                baoxau: res.data.reverse(),
            })

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
    handleOnchang = (date) => {

        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.baoxau()
        })
        // console.log('b1809299 check item:', this.state)


    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        // console.log('check tt:', this.state)
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.baoxau()
        })
        console.log('b1809299 check item:', this.state)


    }
    render() {
        let status = this.state.rangemon;
        // console.log('check all mon:', this.props.listallmon)
        let { ID_MON } = this.state
        // console.log('check state: ', this.state.allmonRedux)
        let arrallphieuchi = this.state.baoxau;
        console.log('check state: ', arrallphieuchi)
        return (
            <div className="XemBL-container">
                <div className="title">
                    QUẢN LÝ KINH DOANH GOLD COFFEE
                </div>
                <div className="title">
                    QUẢN LÝ BÌnh luận
                </div>
                <div className="title">

                </div>
                <div className="XemBL-body">
                    <div className="container">
                        <div className="row">

                            <div className="col-12">
                                <table id="TableChi">
                                    <div className="title">
                                        Danh sách bình luận theo ngày
                                    </div>
                                    <div className="row">
                                        <div className="col-5 form-grop">
                                            <label>Chọn Ngày</label>
                                            <DatePicker
                                                className="form-control"
                                                onChange={this.handleOnchang}
                                                value={this.state.currentDate}

                                            />
                                        </div>
                                        <div className="col-5">
                                            <label>Chọn món</label>
                                            <select className="form-control"
                                                onChange={(event) => { this.onChangeInput(event, 'ID_MON') }}
                                                value={ID_MON}
                                            >
                                                {
                                                    status && status.length > 0 &&
                                                    status.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.id}>{item.TEN_MON}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <tbody>
                                        <tr>
                                            <th>Ngày đánh giá</th>
                                            <th>Tên tài khoản</th>
                                            <th>Tên món</th>
                                            <th>Điểm đánh giá</th>
                                            <th>Nội dung đánh giá</th>
                                            {/* <th>SIZE</th>
                        <th>Giá</th> */}
                                            {/* <th>Mô tả</th> */}

                                        </tr>
                                        {arrallphieuchi && arrallphieuchi.length > 0 ?
                                            arrallphieuchi.map((item, index) => {
                                                let NGAY = moment(new Date(item.NGAY_DG)).format('DD-MM-YYYY');
                                                return (

                                                    <tr key={'index'}>
                                                        <td>{NGAY}</td>
                                                        <td>{item.tenkh.ten_tk}</td>
                                                        <td>{item.tenmon1.TEN_MON}</td>
                                                        <td>
                                                            {item.DIEM} Sao
                                                        </td>
                                                        <td>{item.NOI_DUNG}</td>
                                                    </tr>
                                                )
                                            })
                                            :

                                            <tr>

                                                <td colSpan="9" style={{ textAlign: "center" }}>Không có bình luận</td>


                                            </tr>
                                        }
                                    </tbody>
                                </table>
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
        allmonRedux: state.admin.allmon,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllMonStart: () => dispatch(actions.fetchAllMonStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(XemBL);
