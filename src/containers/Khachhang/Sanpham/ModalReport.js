import React, { Component } from 'react';
import { CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import './ModalReport.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
// import moment from 'moment';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
class ModalReport extends Component {
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
                email: this.props.dataModalHuyVe.email
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModalHuyVe !== this.props.dataModalHuyVe) {
            this.setState({
                email: this.props.dataModalHuyVe.email
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
    guibaoxau = () => {
        this.props.guibaoxau(this.state)
    }
    render() {
        // toggle={}
        const { userInfo } = this.props
        let { isOpenModalreport, closemodalreport, dataModalreport } = this.props;
        console.log("check data", dataModalreport);
        return (
            <Modal
                isOpen={isOpenModalreport}
                className={"dat-ban-container"}
                size="lg"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Báo xấu bình luận</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closemodalreport}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Nội dung báo xấu</label>
                            <input className="form-control" type="email" value={this.state.email}
                                onChange={(event) => this.handleOnchangEmail(event)}
                            />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.guibaoxau()}>Gửi</Button>{' '}
                    <Button color="secondary" onClick={closemodalreport}>Hủy</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReport);
