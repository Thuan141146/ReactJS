import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
// import { Redirect, Route, Switch } from 'react-router-dom';
import './GioiThieu.scss';
class GioiThieu extends Component {
    render() {

        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="back-gioithieu">
                    <div className="gioithieu-container">
                        <div className="intro-gioithieu">
                            <div className="content-left">
                            </div>
                            <div className="content-right">

                                <div className="up">
                                    <span>GOLD COFFEE</span>
                                    <p>Thời gian hoạt động: 8:00 - 23:00</p>
                                </div>
                                <div className="down">
                                    Nhắc đến cà phê học tập mà không nhắc tới Gold Coffee, quả thực là một thiếu sót vô cùng lớn.
                                    Gold Coffee mang đến bạn một không gian mát mẻ yên tĩnh là một trong không gian thích hợp cho việc học tập, với những món nước mới lạ giá cả rất phù hợp với túi tiền của các bạn sinh viên.
                                    Ngoài ra quán còn trang bị hệ thống wifi tốc độ siêu mạnh kèm theo ổ cấm điện được lắp tại mỗi bàn thận tiện cho các bạn khi có nhu cầu sử dụng.
                                    WEGO | GOLD COFFEE
                                    <p>Hệ thống cửa hàng:</p>

                                    <li>📌 CN Hòa Phú: Gần Cây Xăng Hòa Phú</li>
                                    <lo>📞 Hotline: 0939.964.664</lo>
                                    <li>📌 CN Vincom Vĩnh Long: Đối diện Đài Truyền Hình Vĩnh Long, đường Phạm Thái Bường, P4, TPVL</li>
                                    <lo>📞 Hotline: 0931.110.664</lo>
                                    <li>📌 CN Bình Minh: 4955, Tổ 1, Khóm 2, Nguyễn Văn Thảnh, Phường Cái Vồn, TX Bình Minh.</li>
                                    <lo>📞 Hotline: 079.5452.664</lo>
                                    <li>📌 CN Cần Thơ 1: 163N, Nguyễn Văn Cừ Nối Dài</li>
                                    <lo>📞 Hotline: 0774.087.664</lo>
                                    <li>📌 CN Cần Thơ 2: Khu vực Bờ Hồ Bún Xáng (gần quán T-REX BEER)</li>
                                    <lo>📞 Hotline: 0348.761.664</lo>
                                    <li>📌 CN Gold Coffee: 46 Trưng Nữ Vương, P1, Tp Vĩnh Long ( Đối diện Phở Việt siêu thị Co.op Mart VL)</li>

                                </div>
                            </div>
                        </div>
                        <div className="lich-gioithieu">
                            <lo>không gian yên tĩnh nhẹ nhàng, thích hợp cho làm việc, học bài hay trò chuyện với bạn bè...</lo>
                            <li>Được trang bị nhiều ổ cấm điện để sạc điện thoại, laptop</li>
                            <li>Wifi bao mạnh thoải mái lướt web </li>
                            <li>Nhân viên thân thiện</li>
                        </div>
                        <div className="detail-info-gioithieu">
                            <div className="img1"></div>
                            <div className="title"></div>
                            <div className="img2"></div>
                            <div className="title"></div>
                            <div className="img3"></div>
                        </div>
                    </div>
                    <div className="danhgia-gioithieu">

                        <div className="danhgia-gioithieu">

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

export default connect(mapStateToProps, mapDispatchToProps)(GioiThieu);
