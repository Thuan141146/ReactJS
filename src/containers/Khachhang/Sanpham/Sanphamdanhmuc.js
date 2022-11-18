// import { fromCodePoint } from 'markdown-it/lib/common/utils';
import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import *  as actions from "../../../store/actions";
import './Sanphamdanhmuc.scss';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { getMonByIdMon } from '../../../services/monService'
class Sanphamdanhmuc extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrmon: {}
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let danhmucid = this.props.match.params.id;
            let res = await getMonByIdMon(danhmucid);
            if (res && res.errCode === 0) {
                this.setState({
                    arrmon: res.data
                })
            }
            // console.log('b1809299 check mon theo danh muc: ', res)


        }
    }
    handleViewDetailMon = (mon) => {
        let danhmucid = mon.ID_DM;
        let monid = mon.id
        console.log('b1809299 check view infor su kien: ', mon)
        this.props.history.push({
            pathname: "/detail-sanpham/${mon.id}",
            state: { danhmucid, monid }
        })

    }
    render() {
        // console.log('b1809299 check state: ', this.state)
        //     console.log(this.props.match.params.id)
        // console.log('check all mon: ', this.props.allmonRedux);
        let { arrmon, tendanhmuc } = this.state;
        // let tendm = `${arrmon.TEN_DM}`
        // console.log('check teen danh muc', tendm)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-sanphadm">
                    <div className="sanpham-container">
                        <div className="danhmuc"></div>
                        <div className="sanpham-content">
                            {arrmon && arrmon.length > 0
                                && arrmon.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let tenmon = `${item.TEN_MON}`
                                    let gia = `${item.GIA}`
                                    return (
                                        <div className="view-sp" key={index} onClick={() => this.handleViewDetailMon(item)}>
                                            <div className="anh-sp" style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className="ten-sp">{tenmon}</div>
                                            <div className="gia">
                                                <NumberFormat
                                                    value={gia}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            </div>

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
        allmonRedux: state.admin.allmon

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllMonHome: () => dispatch(actions.fetchAllMonStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sanphamdanhmuc));
