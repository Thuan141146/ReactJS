import React, { Component } from 'react';

import { connect } from "react-redux";

import './BanSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUADES } from '../../../utils';
import { getQLBanByDate } from '../../../services/khubanService';
import DatbanModal from './Modal/DatbanModal';
class BanSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableBan: [],
            isOpenModalBooking: false,
            datadatban: {},
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidMount() {
        console.log('tieng viet:', moment(new Date()).format('dddd - DD/MM'));
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = ` Hôm nay - ${ddMM}`;
                object.label = today;
            }
            else {
                let labelngay = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelngay)
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        this.setState({
            allDays: allDays,
        })

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        let { allDays } = this.state
        if (this.props.khuvucidFromParent !== prevProps.khuvucidFromParent) {
            let res = await getQLBanByDate(this.props.khuvucidFromParent, allDays[0].value);
            this.setState({
                allAvalableBan: res.data ? res.data : []
            })
        }

    }
    handleOnChangeSelect = async (event) => {
        if (this.props.khuvucidFromParent && this.props.khuvucidFromParent !== -1) {
            let khuvucid = this.props.khuvucidFromParent;
            let ngay = event.target.value
            let res = await getQLBanByDate(khuvucid, ngay);

            if (res && res.errCode === 0) {
                let data = res.data;
                this.setState({
                    allAvalableBan: res.data ? res.data : []
                })
            }

            console.log('check res all ql ban from react:', res)
        }
        // console.log('check res all ql ban from react:', event.target.value)

    }
    handledatban = (time) => {
        this.setState({
            isOpenModalBooking: true,
            datadatban: time
        })
        console.log('b1809299 check: time', time)
    }
    closebooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays, allAvalableBan, isOpenModalBooking, datadatban } = this.state

        return (
            <>
                <div className="ban-schedule-container">
                    <div className="all-ban">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>
                    <div className="all-available-ban">
                        <div className="text-caledar">
                            <i className="fas fa-bars"><span>Danh sách bàn trống</span></i>
                        </div>
                        <div className="ban-content">
                            {allAvalableBan && allAvalableBan.length > 0 ?
                                allAvalableBan.map((item, index) => {
                                    let ban = item.timeTypeData.SO_BAN
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => this.handledatban(item)}
                                        ><i className="fas fa-couch"></i> Bàn số: {ban}</button>
                                    )
                                })
                                :
                                <div className="het-ban"> Khu vực này đã hết bàn, Quý khách vui lòng cho khu vực khác !!
                                </div>

                            }
                        </div>

                    </div>
                </div>
                <DatbanModal
                    isOpenModal={isOpenModalBooking}
                    closebooking={this.closebooking}
                    dataBan={datadatban}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BanSchedule);
