import { fromCodePoint } from 'markdown-it/lib/common/utils';
import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import *  as actions from "../../../store/actions";
import './AllSuKien.scss';
import { withRouter } from 'react-router';
import moment from 'moment';
class SanPham extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrsukien: []
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allsukienRedux !== this.props.allsukienRedux) {
            this.setState({
                arrsukien: this.props.allsukienRedux
            })
        }
    }
    componentDidMount() {
        this.props.fetchAllLoaiSKStartRedux();
    }
    handleViewDetailSuKien = (sukien) => {
        console.log('b1809299 check view infor su kien: ', sukien)
        this.props.history.push(`detail-sukien/${sukien.id}`)

    }
    render() {
        console.log('check all su kien: ', this.props.allsukienRedux);
        let arrsukien = this.state.arrsukien;
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-sk">
                    <div className="sanpham-container">
                        <div className="danhmuc">Sự kiện sắp diễn ra</div>
                        <div className="sanpham-content">
                            {arrsukien && arrsukien.length > 0
                                && arrsukien.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let tensk = `${item.TEN_LSK}`
                                    // let gia = `${item.GIA}`
                                    let formatDate = moment(item.NGAY).format('DD-MM-YYYY')
                                    return (
                                        <div className="view-sp" key={index} onClick={() => this.handleViewDetailSuKien(item)}>
                                            <div className="anh-sp" style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className="ngay">Ngày diễn: {item.NGAY}</div>
                                            <div className="ten-sp">{tensk}</div>
                                            {/* <div className="gia">200000</div> */}
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
        allsukienRedux: state.admin.loaisk,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllLoaiSKStartRedux: () => dispatch(actions.fetchAllLoaiSKStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SanPham));
