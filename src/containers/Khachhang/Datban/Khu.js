// import { fromCodePoint } from 'markdown-it/lib/common/utils';
import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import *  as actions from "../../../store/actions";
import './Khu.scss';
import { withRouter } from 'react-router';
class Khu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrkhu: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allkhuRedux !== this.props.allkhuRedux) {
            this.setState({
                arrkhu: this.props.allkhuRedux
            })
        }
    }
    componentDidMount() {
        this.props.fetchAllKhuStartHome();
    }
    handleViewDetailKhu = (khu) => {
        console.log('b1809299 check view infor su kien: ', khu)
        this.props.history.push(`/detail-khu/${khu.id}`)

    }
    render() {

        // console.log('check all mon: ', this.props.allmonRedux);
        let arrkhu = this.state.arrkhu;
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-khu">
                    <div className="sanpham-container">
                        <div className="danhmuc">Chọn khu vực đặt bàn</div>
                        <div className="sanpham-content">
                            {arrkhu && arrkhu.length > 0
                                && arrkhu.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let TEN_KV = `${item.TEN_KV}`
                                    let mota = `${item.MO_TA_KV}`
                                    return (
                                        <div className="view-sp" key={index} onClick={() => this.handleViewDetailKhu(item)}>
                                            <div className="anh-sp" style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className="ten-sp">{TEN_KV}</div>
                                            <div className="gia">{mota}</div>

                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allkhuRedux: state.admin.allkhu

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuStartHome: () => dispatch(actions.fetchAllKhuStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Khu));
