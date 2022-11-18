import React, { Component } from 'react';
import { CommonUtils } from "../../../utils";
import { connect } from "react-redux";
import { getalldonbyiddon } from '../../../services/khubanService';
import './ModalXacNhanDon.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
// import moment from 'moment';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
class ModalXacNhanDon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: '',
            listdata: [],
        }
    }


    async componentDidMount() {

        let ID_DON = this.props.dataModal.iddon
        console.log('check gio han11g:', ID_DON)
        let res = await getalldonbyiddon(ID_DON)
        if (res && res.errCode === 0) {
            this.setState({
                listdata: res.data
            })
        }
        // console.log('check list:', res)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.dataModal !== this.props.dataModal) {
        //     this.setState({
        //         email: this.props.dataModal.email
        //     })
        // }
    }


    // handleOnchangEmail = (event) => {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }
    // handleOnchangeImage = async (event) => {
    //     let data = event.target.files;
    //     let file = data[0];
    //     if (file) {
    //         let Base64 = await CommonUtils.getBase64(file);

    //         this.setState({
    //             imgBase64: Base64
    //         })
    //     }
    // }
    // guithuxacnhan = () => {
    //     this.props.guithuxacnhan(this.state)
    // }
    render() {
        // toggle={}

        let { isOpenModal, closemodalxacnhan, dataModal, guithuxacnhan } = this.props;
        console.log('check this.props render', dataModal)
        let listdata = this.state.listdata;
        console.log('check list: ', listdata)
        return (
            <Modal
                isOpen={isOpenModal}
                className={"don-hang-container"}
                size="xl"
                centered
            >
                <div className="modal-header">
                    <h5 className="modal-title">Chi tiết đơn hàng</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closemodalxacnhan}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="giohang-container">
                            <div className="header">
                                <div className="header2">Tên sản phẩm </div>
                                <div className="header3">Size</div>
                                <div className="header4">Số lượng</div>
                                <div className="header5">Thành tiền</div>
                                <div className="header6"></div>
                                <div className="header7">Thông tin nhận hàng</div>
                            </div>
                            <div className="intro-giohang" >
                                <div className="content-left">
                                    {listdata && listdata.length > 0
                                        && listdata.map((item, index) => {

                                            let SL = item.SL_SPHAM
                                            // let tongtienmon = Number(item.GIA_SPHAM) * Number(item.SL_SPHAM);
                                            return (


                                                <div className="view-mon">
                                                    <div className="mon-right1"
                                                        key={index} onClick={() => this.handleViewDetailMon(item)}
                                                    >{item.mon.TEN_MON}
                                                        <div>
                                                            <NumberFormat
                                                                className="gia"
                                                                value={item.GIA_SPHAM}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mon-right2">{item.tsize.TEN_SIZE}</div>
                                                    <div className="mon-right3">{SL}</div>
                                                    {/* <div className="mon-right4">
                                                        <NumberFormat
                                                            className="gia"
                                                            value={tongtienmon}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'đ'}
                                                        /></div> */}
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <div className="content-right">
                                    <div className="ten-kh">Tên Khách hàng:
                                    </div>
                                    <div className="sdt-kh">Số điện thoại:
                                    </div>
                                    <div className="dc-kh">Địa chỉ:
                                    </div>
                                    <div className="phi-ship">Tổng tiền hàng:
                                    </div>
                                    <div className="phi-ship">Phí Ship: 15.000đ</div>

                                    <div className="Tongtien">Tổng thanh toán:
                                    </div>
                                    <div className="pttt">Phương thức thanh toán:</div>

                                </div>
                            </div>

                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.guithuxacnhan()}>Cập nhật</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalXacNhanDon);
