import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Speacil.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import speacilimg from "../../../assets/speacil/bacxiu.webp"
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';

class Speacil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDanhMuc: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDanhMucRedux !== this.props.topDanhMucRedux) {
            this.setState({
                arrDanhMuc: this.props.topDanhMucRedux,
            })
        }

    }
    componentDidMount() {
        this.props.loadDanhMuc();

    }
    handleallmondanhmuc = (danhmuc) => {
        console.log('b1809299 check all mon:', danhmuc.id)

        this.props.history.push(`/danhmuc/${danhmuc.id}`)
    }

    render() {

        let arrDanhMuc = this.state.arrDanhMuc;
        //arrDanhMuc = arrDanhMuc.concat(arrDanhMuc).concat(arrDanhMuc)
        return (
            <div className="section-speacil">
                <div className="section-container">
                    <div className="section-header">
                        <div className="title-section"> Danh mục phổ biến</div>
                        {/* //<button className="btn-section">Xem thêm</button> */}
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {arrDanhMuc && arrDanhMuc.length > 0
                                && arrDanhMuc.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let TEN_DM = `${item.TEN_DM}`
                                    return (
                                        <div className="speacil-customize" key={index}
                                            onClick={() => this.handleallmondanhmuc(item)}
                                        >
                                            <div className="bg-image"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                            <div>   </div>
                                            <div className="text-customize"
                                            > {TEN_DM}</div>
                                        </div>
                                    )

                                })
                            }
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDanhMucRedux: state.admin.topDanhMuc,
    };
};

const mapDispatchToProps = dispatch => {

    return {
        loadDanhMuc: () => dispatch(actions.fetchTopDanhMuc())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speacil));
