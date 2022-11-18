import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Discount.scss';
class Discount extends Component {

    render() {

        return (
            <div className="section-discount">
                <div className="discount-container">
                    <div className="discount-header">
                        <div className="nen1"></div>
                        <div className="nen2"></div>
                    </div>
                    <div className="text">
                        <div className="title ">
                            <div className="logo-title">GOLD TEA</div>
                            <div className="text-title">Creme Brulee and Creamy
                                <div className="text-title">Được kết hợp từ Cloud (đám mây) và cofFee (cà phê)</div>
                            </div>

                        </div>
                    </div>
                    <div className="text-new">
                        <div className="title-new">
                            <i>Thức uống "chiều chuộng bản thân" </i>
                            bậc nhất cho những ai thích vị ngọt ngào
                            hay muốn thưởng thức sự kết hợp độc đáo
                            giữa món tráng miệng và thức uống.
                        </div>
                    </div>
                    <div className="text-new1">
                        <div className="title-new1">
                            <i>Thức uống "đánh thức" </i>
                            năng lượng ngày mới hợp cho những ai mới bước vào thế giới cà phê
                            hoặc ghiền cà phê nhưng muốn khám phá thêm nhiều hương vị mới.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Discount);
