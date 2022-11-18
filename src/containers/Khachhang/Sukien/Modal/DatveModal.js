import React, { Component } from 'react';
import { connect } from "react-redux";
import './DatveModal.scss';
import ProfileSk from '../ProfileSk';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class DatveModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    render() {
        // toggle={}
        let { isOpenModal, closebooking } = this.props;
        console.log('data props from modal: ', this.props)
        return (
            <Modal
                isOpen={isOpenModal} className={'dat-ve-container'}
                size="lg"
                centered
            >
                <div className="dat-ve-content">
                    <div className="dat-ve-header">
                        <span className="letf">Thông tin đặt vé</span>
                        <span className="right"
                            onClick={closebooking}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className="dat-ve-body">

                        <ProfileSk />
                        <div className="ngay-dat">

                        </div>
                        <div className="khu-dat">

                        </div>
                        <div className="ban-dat">

                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>Họ và tên</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control" />
                            </div>
                            <div className="col-12 form-group">
                                <label>Ghi chú</label>
                                <input className="form-control" />
                            </div>

                        </div>
                    </div>
                    <div className="dat-ve-footer">
                        <button className="btn-booking-confirm">Xác nhận</button>
                        <button className="btn-booking-cancel"
                            onClick={closebooking}
                        >Hủy</button>
                    </div>


                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatveModal);
