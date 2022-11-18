import React, { Component } from 'react';
import { connect } from "react-redux";
import './Detailve.scss';
import { getdetailvebyiddon } from '../../../services/khubanService';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { withRouter } from 'react-router';
import *  as actions from "../../../store/actions";
class Detailve extends Component {
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
        let res = await getdetailvebyiddon(ID_DON)
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
        console.log('check props:', listdata)
        const { userInfo } = this.props
        let chonmon = listdata.filter(item => item.isSelected === true)
        // console.log('chon mon render:', chonmon)
        let tongtien = listdata.reduce((tongtien, item) => tongtien + Number(item.GIA_GHE) + Number(item.GIA_VE), 0);
        //let tiengiam1 = listdata.reduce((tiengiam1, item) => tiengiam1 + Number(item.GIA_SPHAM) * Number(item.SL_SPHAM) * Number(item.ID_KM) / 100, 0);
        let ship = Number(15000);


        let pttt = this.props.location.state.TEN_TT;
        console.log('check thanh toan:', pttt)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-Detailve">
                    <div className="giohang">
                        Chi tiết vé
                    </div>
                    <div className="giohang-container">
                        <div className="header">
                            <div className="header1">Hình ảnh</div>
                            <div className="header2">Tên sự kiện </div>
                            <div className="header3">Số ghế</div>
                            <div className="header4">Thời gian</div>
                            <div className="header5">Thành tiền</div>
                            <div className="header6"></div>
                            <div className="header7">Thông tin khách hàng</div>
                        </div>
                        <div className="intro-giohang" >
                            <div className="content-left">
                                {listdata && listdata.length > 0
                                    && listdata.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.sk.ANH) {
                                            imageBase64 = new Buffer(item.sk.ANH, 'base64').toString('binary');
                                        }
                                        let SL = item.SL_SPHAM
                                        let tongtiensk = Number(item.GIA_GHE) + Number(item.GIA_VE);


                                        return (


                                            <div className="view-mon">
                                                <div className="mon-left" style={{ backgroundImage: `url(${imageBase64})` }} key={index} ></div>
                                                <div className="mon-right1"
                                                // key={index} onClick={() => this.handleViewDetailMon(item)}
                                                >{item.sk.TEN_LSK}
                                                    <div>
                                                        <NumberFormat
                                                            className="gia"
                                                            value={tongtiensk}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        />
                                                    </div>
                                                    {/* <div >Giảm: {item && item.ID_KM ? item.ID_KM : '0'}% </div> */}
                                                </div>

                                                <div className="mon-right2">
                                                    <div> Ghế số: {item.ttghe.SO_GHE}</div>
                                                    <div>Loại: {item.ttghe.TT}</div>
                                                </div>
                                                <div className="mon-right3">
                                                    <div>{item.SUAT_DIEN}</div>
                                                    <div>Ngày: {item.NGAY_DIEN}</div>
                                                </div>
                                                <div className="mon-right4">
                                                    <NumberFormat
                                                        className="gia"
                                                        value={tongtiensk}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className="content-right">
                                <div className="ten-kh">Tên Khách hàng: {userInfo
                                    && userInfo.ten_tk ? userInfo.ten_tk : ''}
                                </div>
                                <div className="sdt-kh">Số điện thoại: {userInfo
                                    && userInfo.sdt ? userInfo.sdt : ''}
                                </div>

                                <div className="phi-ship">Tổng tiền: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>


                                <div className="Tongtien">Tổng thanh toán: <NumberFormat
                                    className="gia"
                                    value={tongtien}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                </div>
                                <div className="pttt">Phương thức thanh toán: {pttt}</div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detailve));
