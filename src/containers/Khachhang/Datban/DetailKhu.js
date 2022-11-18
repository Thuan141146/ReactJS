import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailKhu.scss';
import { getdetailinfokhu } from '../../../services/khubanService'
import BanSchedule from './BanSchedule';

class DetailKhu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailkhu: {},
            currentkhuid: -1,

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentkhuid: id
            })
            let res = await getdetailinfokhu(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailkhu: res.data,
                })
            }
            console.log('b1809299 check res: ', res)


        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    CTdatban = () => {
        if (this.props.history) {
            this.props.history.push({
                pathname: "/chitietdatban/",
            })
        }
    }
    render() {
        console.log('b1809299 check state: ', this.state)
        console.log(this.props.match.params.id)
        let { detailkhu } = this.state;
        let tenkhu = `${detailkhu.TEN_KV}`
        let mota = `${detailkhu.MO_TA_KV}`
        let imageBase64 = '';
        if (detailkhu.ANH) {
            imageBase64 = new Buffer(detailkhu.ANH, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-detailkhu">
                    <div className="sukien-detail-container">
                        <div className="intro-sukien">
                            <div className="content-left"
                                style={{ backgroundImage: `url(${imageBase64})` }}>
                            </div>
                            <div className="content-right">
                                <div className="up">{tenkhu}</div>
                                <div className="down">{mota}</div>
                                <div className="downn">
                                    <div>📌Địa chỉ: Khu vực Bờ Hồ Bún Xáng (gần quán T-REX BEER)</div>
                                    <div>📞 Hotline: 0348.761.664</div>
                                </div>

                                <div className="down1"> <button onClick={() => this.CTdatban()}>Xem thông tin đặt bàn</button></div>
                                <div className="down2"><i className="fas fa-hand-point-down"></i> Chọn đặt bàn miễn phí</div>
                                <div className="list-ban">

                                    <div className="content-left">
                                        <BanSchedule
                                            khuvucidFromParent={this.state.currentkhuid}
                                        />
                                    </div>


                                </div>
                                {/* <div className="col-12 btn-datban">
                                    <button className="btn btn-primary mt-5">Đặt Bàn</button>
                                </div> */}
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

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailKhu);
