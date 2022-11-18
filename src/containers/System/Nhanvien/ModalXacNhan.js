import React, { Component } from 'react';
import { CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import './ModalXacNhan.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
// import moment from 'moment';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
class ModalXacNhan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }


    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    handleOnchangEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let Base64 = await CommonUtils.getBase64(file);

            this.setState({
                imgBase64: Base64
            })
        }
    }
    guithuxacnhan = () => {
        this.props.guithuxacnhan(this.state)
    }
    render() {
        // toggle={}

        let { isOpenModal, closemodalxacnhan, dataModal, guithuxacnhan } = this.props;
        console.log("check data", dataModal);
        return (
            <Modal
                isOpen={isOpenModal}
                className={"dat-ban-container"}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi xác nhận nhận bàn</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closemodalxacnhan}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email Khách đặt bàn</label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(event) => this.handleOnchangEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn file xác nhận</label>
                            <input className="form-control-file" type="file"
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.guithuxacnhan()}>Gửi</Button>{' '}
                    <Button color="secondary" onClick={closemodalxacnhan}>Hủy</Button>
                </ModalFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalXacNhan);
