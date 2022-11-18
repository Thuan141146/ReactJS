import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Event.scss';
//import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router';

class Event extends Component {



    constructor(props) {
        super(props)
        this.state = {
            arrLoaiSK: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topLoaiSKRedux !== this.props.topLoaiSKRedux) {
            this.setState({
                arrLoaiSK: this.props.topLoaiSKRedux,
            })
        }

    }
    componentDidMount() {
        this.props.loadLoaiSK();

    }
    handleViewDetailSuKien = (sukien) => {
        console.log('b1809299 check view infor su kien: ', sukien)
        this.props.history.push(`/sukien/detail-sukien/${sukien.id}`)

    }
    render() {
        let arrLoaiSK = this.state.arrLoaiSK;

        return (
            <div className="section-speacil">
                <div className="section-container">
                    <div className="section-header">
                        <div className="title-section"> Sự kiện sắp diễn ra</div>
                        {/* <button className="btn-section">Xem thêm</button> */}
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>

                            {arrLoaiSK && arrLoaiSK.length > 0
                                && arrLoaiSK.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.ANH) {
                                        imageBase64 = new Buffer(item.ANH, 'base64').toString('binary');
                                    }
                                    let TEN_LSK = `${item.TEN_LSK}`
                                    return (
                                        <div className="speacil-customize-event" key={index} onClick={() => this.handleViewDetailSuKien(item)}>
                                            <div className="bg-image-event"
                                                style={{ backgroundImage: `url(${imageBase64})` }} />
                                            <div className="text-customize"> {TEN_LSK} </div>
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
        topLoaiSKRedux: state.admin.topLoaiSK,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadLoaiSK: () => dispatch(actions.fetchTopLoaiSK())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
