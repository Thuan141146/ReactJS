import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './Thongkeve.scss';
import { toast } from 'react-toastify';
// import { getAllStaff, createNewStaffService, deleteStaffService, editStaffService } from '../../services/userServices'
import { thongke, thongkeve } from '../../../services/khubanService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';


class Thongkeve extends Component {

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

        this.getArrDays()

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
            let response = await thongkeve(dateList[i]);
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
        console.log('value', value)

    }

    async handleChangeValue(key, value) {
        this.setState({
            selectedValue: { ...this.state.selectedValue, [key]: value }
        })

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

        let revenue = revenueDate.reduce((total1, item) => total1 + Number(item.T_TIEN), 0);


        console.log('check last7', last7)
        console.log('check timeStart', timeStart)
        console.log('check timeEnd', timeEnd)
        return (
            <div className='thongke-container'>
                <div className='thongke-content'>
                    <div className="title">
                        QUẢN LÝ KINH DOANH GOLD COFFEE
                    </div>
                    <div className="title">
                        QUẢN LÝ THỐNG KÊ DANH THU vé sự kiện
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
                        <div className="col-9">
                            <Bar
                                data={{
                                    labels: last7.map(day => {
                                        return day.data.map(item => moment(new Date(Number(item.NGAY1))).format("DD/MM"))
                                    }),
                                    datasets: [
                                        {
                                            label: 'Doanh thu vé',
                                            //label: 'Doanh thu món',
                                            backgroundColor: '#3e95cd',
                                            borderColor: 'black',
                                            borderWidth: 1,
                                            barThickness: 20,
                                            data: last7.map(revenue => {
                                                return revenue.data.map(total1 => total1.total1)

                                                // return revenue.data.map(ticket => {
                                                //     return ticket.ticketData.reduce((total, item) => total + Number(item.so_luong_ve) * Number(item.don_gia_ve), 0)
                                                // })
                                            }
                                            ),

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
                                            barThickness: 5,  // number (pixels) or 'flex'

                                        }]
                                    }
                                }}
                            />

                        </div>
                        {/* <div className='chi-tiet'>
                            <div className='ct'>

                                <div>Tổng danh thu sự kiện</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Thongkeve);