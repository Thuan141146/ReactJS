import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './Thongke.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { thongke, thongkeve } from '../../../services/khubanService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


class Thongke extends Component {

    constructor(props) {
        super(props);
        this.state = {
            revenueDate: [],

            selectedValue: '',
            ngay_ban: '',
            last7: [],

            timeStart: moment().subtract(7, 'day').startOf('day'),
            timeEnd: moment().startOf('day')
        }
    }

    async componentDidMount() {

        this.getArrDays();


    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.timeStart !== this.state.timeStart || prevState.timeEnd !== this.state.timeEnd) {
            await this.getArrDays()
        }

    }

    async getArrDays() {
        let timeStart = this.state.timeStart;
        let timeEnd = this.state.timeEnd;
        let totalDay = timeEnd.diff(timeStart, 'day')
        let dateList = []
        for (let i = 1; i <= totalDay; i++) {
            let dateClone = timeStart.clone()
            dateList.push(dateClone.add(i, 'day').unix() * 1000)
        }



        //console.log('dateClone', dateList);


        let arr7Days = []
        for (let i = 0; i < dateList.length; i++) {
            let response = await thongke(dateList[i]);
            arr7Days.push(response)
        }
        this.setState({
            last7: arr7Days
        })

        console.log("arr7Days", arr7Days)

    }

    handleOnChangeDataPicker = (key, value) => {
        this.setState({
            [key]: moment(value[0])
        })
        // console.log('value', value)

    }

    async handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value }
        })
        // console.log("check ngay", value)
        let response = await thongke(value);
        if (response && response.errCode === 0) {
            this.setState({
                revenueDate: response.data
            })
            console.log('check response', response)
        }
    }

    render() {
        let { revenueDate, last7, timeStart, timeEnd } = this.state;

        //let revenue = last7.reduce((revenue, item) => revenue + Number(item.data[0].total), 0);


        //console.log('check', last7)
        //console.log('check bat dau', timeStart)
        //console.log('check ngay ket thuc', timeEnd)
        return (
            <div className='thongke-container'>
                <div className='thongke-content'>
                    <div className="title">
                        QUẢN LÝ KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QUẢN LÝ THỐNG KÊ DANH THU MÓN
                    </div>
                    <div className="row">
                        <div className='col-5'>
                            <span>Ngày bắt đầu</span>
                            <DatePicker
                                onChange={(value) => this.handleOnChangeDataPicker('timeStart', value)}
                                className='form-control'

                            />
                        </div>

                        <div className='col-5'>
                            <span>Ngày kết thúc</span>
                            <DatePicker
                                onChange={(value) => this.handleOnChangeDataPicker('timeEnd', value)}
                                className='form-control'

                            />
                        </div>

                    </div>
                    <div className="thong-ke-mon">
                        <div className='col-9'>
                            <Bar
                                data={{
                                    labels: last7.map(day => {
                                        return day.data.map(item => moment(new Date(Number(item.NGAY1))).format("DD/MM"))
                                    }),
                                    // labels: lastve7.map(day => {
                                    //     return day.data.map(item => moment(new Date(Number(item.NGAY1))).format("DD/MM"))
                                    // }),
                                    datasets: [
                                        {
                                            label: 'Doanh thu món',
                                            //label: 'Doanh thu món',
                                            backgroundColor: '#3e95cd',
                                            borderColor: 'black',
                                            borderWidth: 1,
                                            barThickness: 20,
                                            data: last7.map(revenue => {
                                                return revenue.data.map(total => total.total)
                                            }),
                                            // data1: last7.map(revenue => {
                                            //     return revenue.data.reduce((total, item) => total + Number(item.total), 0);

                                            // })

                                        }

                                    ],

                                }}

                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Doanh thu ngày gần nhất"
                                        },
                                    },

                                    scales: {
                                        xAxes: [{
                                            barThickness: 4,  // number (pixels) or 'flex'

                                        }]
                                    }
                                }}
                            />

                        </div>
                        {/* <div className='chi-tiet'>
                            <div className='ct'>

                                <div>Tổng danh thu món</div>
                                <div>tiền: 30.000đ</div>
                            </div>

                        </div> */}
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // listReport: state.admin.reportData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // fetchReportRedux: () => dispatch(actions.fetchReportStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thongke);