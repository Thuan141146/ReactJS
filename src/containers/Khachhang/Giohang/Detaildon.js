import React, { Component } from 'react';
import { connect } from "react-redux";
import './Detaildon.scss';
import { getalldonbyiddon } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { withRouter } from 'react-router';
import *  as actions from "../../../store/actions";
class Detaildon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            ptttArr: [],
            PTTT: ''
        }
    }
    async componentDidMount() {
        let ID_DON = this.props.location.state.ID_DON
        console.log('check gio hang:', ID_DON)
        let res = await getalldonbyiddon(ID_DON)
        console.log('check gio hang:', ID_DON)
        if (res && res.errCode === 0) {
            this.setState({
                listdata: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        // let today = new Date().getTime();
        // console.log('check ngay', ID_PTTT);
        let listdata = this.state.listdata;
        console.log('check props:', this.props)
        const { userInfo } = this.props
        let chonmon = listdata.filter(item => item.isSelected === true)
        // console.log('chon mon render:', chonmon)
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM), 0);
        let tiengiam1 = listdata.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM) * Number(item.ID_KM) / 100, 0);
        let ship = Number(15000);
        let today = tongtien + ship - tiengiam1;
        console.log('tong:', today)
        let pttt = this.props.location.state.TEN_TT;
        console.log('check thanh toan:', pttt)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-detaildon">
                    <div className="giohang">
                        Chi ti???t ????n h??ng
                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header1">H??nh ???nh</div>
                            <div className="header2">T??n s???n ph???m </div>
                            <div className="header3">Size</div>
                            <div className="header4">S??? l?????ng</div>
                            <div className="header5">Th??nh ti???n</div>
                            <div className="header6"></div>
                            <div className="header7">Th??ng tin nh???n h??ng</div>
                        </div>
                        <div className="intro-giohang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.mon.ANH) {
                                            imageBase64 = new Buffer(item.mon.ANH, 'base64').toString('binary');
                                        }
                                        let SL = item.SL_SPHAM
                                        let tongtienmon = Number(item.GIA_SPHAM) * Number(item.SL_SPHAM);
                                        let tongtiegiam = Number(item.ID_KM) / 100 * Number(item.GIA_SPHAM) * Number(item.SL_SPHAM);
                                        let thanhtien = tongtienmon - tongtiegiam
                                        return (


                                            <div className="view-mon">
                                                <div className="mon-left" style={{ backgroundImage: `url(${imageBase64})` }} key={index} ></div>
                                                <div className="mon-right1"
                                                // key={index} onClick={() => this.handleViewDetailMon(item)}
                                                >{item.mon.TEN_MON}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={item.GIA_SPHAM}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'??'}
                                                        />
                                                    </div>
                                                    <div >Gi???m: {item && item.ID_KM ? item.ID_KM : '0'}% </div>
                                                </div>

                                                <div className="mon-right2">{item.tsize.TEN_SIZE}</div>
                                                <div className="mon-right3">{SL}</div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={thanhtien}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'??'}
                                                    /></div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="content-right">
                                <div className="ten-kh">T??n Kh??ch h??ng: {userInfo
                                    && userInfo.ten_tk ? userInfo.ten_tk : ''}
                                </div>
                                <div className="sdt-kh">S??? ??i???n tho???i: {userInfo
                                    && userInfo.sdt ? userInfo.sdt : ''}
                                </div>
                                <div className="dc-kh">?????a ch???: {this.props.location.state.DIA_CHI}
                                </div>
                                <div className="phi-ship">T???ng ti???n h??ng: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                                </div>
                                <div className="phi-ship">T???ng ti???n gi???m gi??: <NumberFormat
                                    className="gia"
                                    value={tiengiam1 ? tiengiam1 : '0'}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                                </div>
                                <div className="phi-ship">Ph?? Ship: 15.000??</div>

                                <div className="Tongtien">T???ng thanh to??n: <NumberFormat
                                    className="gia"
                                    value={today}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'??'}
                                />
                                </div>
                                <div className="pttt">Ph????ng th???c thanh to??n: {pttt}</div>

                            </div>
                        </div>

                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPTTTStart: () => dispatch(actions.fetchPTTTStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detaildon));
