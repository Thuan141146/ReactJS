import React, { Component } from 'react';
import { CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import './ModalHuyBan.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
// import moment from 'moment';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
class ModalHuyBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
        }
    }


    async componentDidMount() {
        if (this.props.dataModalHuyBan) {
            this.setState({
                email: this.props.dataModalHuyBan.email
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModalHuyBan !== this.props.dataModalHuyBan) {
            this.setState({
                email: this.props.dataModalHuyBan.email
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
    guithuhuyban = () => {
        this.props.guithuhuyban(this.state)
    }
    render() {
        // toggle={}

        let { isOpenModalHuyBan, closemodalHuyBan, dataModalHuyBan } = this.props;
        console.log("check data", dataModalHuyBan);
        return (
            <Modal
                isOpen={isOpenModalHuyBan}
                className={"dat-ban-container"}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Gửi xác nhận hủy bàn</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closemodalHuyBan}>
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

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.guithuhuyban()}>Gửi</Button>{' '}
                    <Button color="secondary" onClick={closemodalHuyBan}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalHuyBan);
