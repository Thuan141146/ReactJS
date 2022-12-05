import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableChi.scss';
import *  as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { couldStartTrivia } from 'typescript';
import { monthsShort } from 'moment';
import NumberFormat from 'react-number-format';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { getchiByDate } from '../../../services/khubanService';
class TableChi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phieuchiRedux: [],
            currentDate: moment(new Date()).startOf('day').valueOf(),

        }

    }
    componentDidMount() {
        this.props.fetchAllPhieuChiStart();
        this.chingay()
    }
    chingay = async () => {
        let { currentDate } = this.state;
        let formateDate = moment(new Date(currentDate)).format('DD/MM/YYYY');
        let NGAY = new Date(formateDate).getTime();
        // console.log('b1809299 check item:', NGAY)

        let res = await getchiByDate({
            // khuvucid: khu,
            NGAY: formateDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                datachi: res.data.reverse(),
            })
            await this.chingay();

        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listphieuchi !== this.props.listphieuchi) {
            this.setState({
                phieuchiRedux: this.props.listphieuchi
            })
        }
    }
    handleDeletePhieuChi = (phieu) => {

        this.props.deletePhieuChi(phieu.id);

    }
    handleEditMon = (phieu) => {
        // console.log('thuan check', mon)
        this.props.handleEditMonFromParentKey(phieu)
    }
    handleOnchang = (date) => {

        this.setState({
            currentDate: date[0]
        }, async () => {
            // let { selectedKhu } = this.props;
            await this.chingay()
        })
        // console.log('b1809299 check item:', this.state)


    }
    render() {

        // console.log('check all mon:', this.props.listallmon)
        // console.log('check state: ', this.state.allmonRedux)
        let arrallphieuchi = this.state.datachi;
        // console.log('check all phieu chi:', arrallphieuchi)
        //console.log('b1809299 check chi: ', arrallphieuchi)
        //let tongchi = arrallphieuchi.reduce((tongchi, item) => tongchi += Number(item.TIEN), 0);
        // console.log('check tong tien: ', tongchi)
        return (

            <table id="TableChi">
                <div className="title">
                    Danh sách chi theo ngày
                </div>
                <div className="col-5 form-grop">

                    <DatePicker
                        className="form-control"
                        onChange={this.handleOnchang}
                        value={this.state.currentDate}

                    />
                </div>

                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Nội dung chi</th>
                        <th>Số tiền</th>
                        <th>Ngày</th>
                        {/* <th>SIZE</th>
                        <th>Giá</th> */}
                        {/* <th>Mô tả</th> */}
                        <th> Trạng Thái</th>

                    </tr>
                    {arrallphieuchi && arrallphieuchi.length > 0 &&
                        arrallphieuchi.map((item, index) => {
                            return (
                                <tr key={'index'}>
                                    <td>{item.id}</td>
                                    <td>{item.NOI_DUNG}</td>
                                    <td>
                                        <NumberFormat
                                            className="gia"
                                            value={item.TIEN}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={' đ'}
                                        />
                                    </td>
                                    <td>{item.NGAY}</td>
                                    {/* <td>{item.GIA}</td> */}
                                    {/* <td>{item.MO_TA}</td> */}
                                    <td >
                                        <div className='edit-btn'>
                                            {/* <button
                                                onClick={() => this.handleEditMon(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button> */}
                                            <button
                                                onClick={() => this.handleDeletePhieuChi(item)}
                                                className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        );
    }
}

const mapStateToProps = state => {
    return {
        listphieuchi: state.admin.phieuchi,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllPhieuChiStart: () => dispatch(actions.fetchAllPhieuChiStart()),
        deletePhieuChi: (id) => dispatch(actions.deletePhieuChi(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableChi);
