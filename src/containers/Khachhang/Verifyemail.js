import React, { Component } from 'react';
import { connect } from "react-redux";
import './Verifyemail.scss';
import HomeHeader from '../HomePage/HomeHeader';
import { postveritybanSevice } from '../../services/userService'
class Verifyemail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const ID_BAN = urlParams.get('ID_BAN');
            const khuvucid = urlParams.get('khuvucid')
            let res = await postveritybanSevice({
                token: token,
                ID_BAN: ID_BAN,
                khuvucid: khuvucid
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        let { statusVerify, errCode } = this.state;
        console.log('check state >>>>>', this.state)
        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            loading data...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className="xac-nhan-thanh-cong"><i className="fas fa-check"></i> Xác nhận đặt bàn thành công</div> :
                                <div className="xac-nhan-that-bai"><i className="fas fa-spinner"></i>Bàn đặt không tồn tại hoặc đã được xác nhận</div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Verifyemail);
