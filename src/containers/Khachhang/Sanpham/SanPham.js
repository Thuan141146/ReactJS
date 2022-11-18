// import { fromCodePoint } from 'markdown-it/lib/common/utils';
import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import *  as actions from "../../../store/actions";
import './SanPham.scss';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { getAllDanhMuc } from '../../../services/danhmucService';
class SanPham extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrmon: [],
            arrdanhmuc: []
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        //let res = await getAllDanhMuc()
        // if (res && res.errCode === 0) {
        //     this.setState({
        //         arrdanhmuc: res.data,
        //     })
        if (prevProps.allmonRedux !== this.props.allmonRedux) {
            let res = await getAllDanhMuc("ALL")
            this.setState({
                arrmon: this.props.allmonRedux,
                arrdanhmuc: res.danhmuc,
            })
            // }
        }
    }
    componentDidMount() {
        this.props.loadAllMonHome();

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
    handleallmondanhmuc = (danhmuc) => {
        console.log('b1809299 check all mon:', danhmuc.id)

        this.props.history.push(`/danhmuc/${danhmuc.id}`)
    }
    render() {
        let arrmon = this.state.arrmon;
        console.log('check all mon: ', arrmon);
        let arrdanhmuc = this.state.arrdanhmuc;
        console.log('check all danh muc: ', arrdanhmuc);
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-sanpham">
                    <div className="sanpham-container">
                        <div className="danhmuc">{
                            arrdanhmuc && arrdanhmuc.length > 0
                            && arrdanhmuc.map((item, index) => {
                                return (
                                    <div className="ten-danh-muc"
                                        onClick={() => this.handleallmondanhmuc(item)}
                                    >{item.TEN_DM}</div>
                                )
                            })
                        }

                        </div>
                        <div className="sanpham-content">
                            {arrmon && arrmon.length > 0
                                && arrmon.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let tenmon = `${item.TEN_MON}`
                                    let gia = `${item.GIA}`
                                    // let giamgia = `${item.km.PT_GIAM}`
                                    return (
                                        <div className="view-sp" key={index} onClick={() => this.handleViewDetailMon(item)}>
                                            <div className="anh-sp" style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className="ten-sp">{tenmon}</div>
                                            <div className="gia">
                                                <NumberFormat
                                                    value={gia}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SanPham));
