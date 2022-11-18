import React, { Component } from 'react';
import { connect } from "react-redux";
import './Sanphamlienquan.scss';
import { getsplienquan } from '../../../services/monService'
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
class Sanphamlienquan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanphamlq: {},
        }
    }
    async componentDidMount() {
        let ID_DM = this.props.danhmucid;
        let res = await getsplienquan(ID_DM);
        if (res && res.errCode === 0) {
            this.setState({
                sanphamlq: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleViewDetailMonlq = (mon) => {

        let danhmucid = mon.ID_DM;
        let monid = mon.id
        console.log('b1809299 check view infor su kien: ', mon)
        this.props.history.push({
            pathname: "/detail-sanpham/${mon.id}",
            state: { danhmucid, monid }
        })
    }
    render() {
        let ID_DM = this.props.danhmucid;
        // console.log('b1809299 : ', this.props)
        let { sanphamlq } = this.state;
        return (
            <>
                <div className="sanpham-content">

                    {sanphamlq && sanphamlq.length > 0 &&
                        sanphamlq.map((item, index) => {
                            let imageBase64 = '';
                            if (item.ANH) {
                                imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                            }
                            let gia = `${item.GIA}`
                            return (
                                <div className="view-sp" key={index} onClick={() => this.handleViewDetailMonlq(item)}>
                                    <div className="anh-sp" style={{ backgroundImage: `url(${imageBase64})` }} />
                                    <div className="ten-sp">{item.TEN_MON}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sanphamlienquan));
