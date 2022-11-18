import React, { Component } from 'react';
import { connect } from "react-redux";
import './DatbanModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import moment from 'moment';
import { postbookingbanSevice } from '../../../../services/userService'
//import { handleInputChange } from 'react-select/dist/index-fe3694ff.cjs.dev';
import { toast } from "react-toastify";
////import { dateFilter } from 'react-bootstrap-table2-filter';
import LoadingOverlay from 'react-loading-overlay';
class DatbanModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoten: '',
            email: '',
            diachi: '',
            sdt: '',
            ghichu: '',
            bankey: '',
            khuvucid: '',
            ngay: '',
            TT: '',
            isShowLoading: false,

        }
    }


    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataBan !== prevProps.dataBan) {
            if (this.props.dataBan && !_.isEmpty(this.props.dataBan)) {
                let khuvucid = this.props.dataBan.khuvucid;
                let bankey = this.props.dataBan.bankey
                let ngay = this.props.dataBan.ngay
                let TT = this.props.dataBan.TT
                this.setState({
                    khuvucid: khuvucid,
                    bankey: bankey,
                    ngay: ngay,
                    TT: TT
                })

            }
        }

    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    renderkhubanBoking = (dataBan) => {
        if (dataBan && !_.isEmpty(dataBan)) {
            let soban = dataBan.timeTypeData.SO_BAN;
            let khu = dataBan.tenkhu.TEN_KV;

            return `${khu} - Bàn số: ${soban}`
        }
        return ''
    }
    renderTimeBoking = (dataBan) => {
        if (dataBan && !_.isEmpty(dataBan)) {

            let ngay = moment.unix(+dataBan.ngay / 1000).format('dddd- DD-MM-YYYY');

            return `${ngay}`
        }
        return ''
    }

    handlexacnhan = async () => {
        this.setState({
            isShowLoading: true
        })

        console.log('input', this.props)
        let timeString = this.renderTimeBoking(this.props.dataBan)
        let khuban = this.renderkhubanBoking(this.props.dataBan)

        //validate inpu
        let res = await postbookingbanSevice({
            ten_tk: this.state.hoten,
            email: this.state.email,
            diachi: this.state.diachi,
            sdt: this.state.sdt,
            ghichu: this.state.ghichu,
            ID_BAN: this.state.bankey,
            TT: this.state.TT,
            khuvucid: this.state.khuvucid,
            NGAY: this.state.ngay,
            khuban: khuban,
            timeString: timeString,



        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Đặt bàn thành công')
            this.props.closebooking()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Đặt bàn không thành công')
        }
    }

    render() {
        // toggle={}

        let { isOpenModal, closebooking, dataBan } = this.props;
        console.log('check input', this.props.dataBan)
        let khuvucid = '';
        if (dataBan && !_.isEmpty(dataBan)) {
            khuvucid = dataBan.khuvucid
        }
        let formatDate = `${moment(dataBan.NGAY).format('DD-MM-YYYY')}`
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Vui lòng đợi vài giây...'
            >
                <Modal
                    isOpen={isOpenModal} className={"dat-ban-container"}
                    size="lg"
                    centered
                >
                    <div className="dat-ban-content">
                        <div className="dat-ban-header">
                            <span className="letf">Thông tin đặt bàn</span>
                            <span className="right"
                                onClick={closebooking}
                            ><i className="fas fa-times"></i></span>
                        </div>
                        <div className="dat-ban-body">
                            <div className="ngay-dat">
                                Ngày: {formatDate}

                            </div>
                            <div className="khu-dat">
                                {dataBan.tenkhu && dataBan.tenkhu.TEN_KV &&
                                    <span> {dataBan.tenkhu.TEN_KV}</span>
                                }
                            </div>
                            <div className="ban-dat">
                                {dataBan.timeTypeData && dataBan.timeTypeData.SO_BAN &&
                                    <span> Bàn số: {dataBan.timeTypeData.SO_BAN}</span>
                                }
                            </div>
                            <div className="ban-dat">
                                {dataBan && dataBan.TT &&
                                    <span> Trạng thái bàn: {dataBan.TT}</span>
                                }
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ và tên</label>
                                    <input className="form-control"
                                        value={this.state.hoten}
                                        onChange={(event) => this.handleOnChangeInput(event, 'hoten')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Email</label>
                                    <input className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ</label>
                                    <input className="form-control"
                                        value={this.state.diachi}
                                        onChange={(event) => this.handleOnChangeInput(event, 'diachi')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoai</label>
                                    <input className="form-control"
                                        value={this.state.sdt}
                                        onChange={(event) => this.handleOnChangeInput(event, 'sdt')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Ghi chú</label>
                                    <input className="form-control" placeholder=" Vui lòng nhập thời gian nhận bàn hoặc có yêu khác tại đây"
                                        value={this.state.ghichu}
                                        onChange={(event) => this.handleOnChangeInput(event, 'ghichu')}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="dat-ban-footer">
                            <button className="btn-booking-confirm"
                                onClick={() => this.handlexacnhan()}
                            >Xác nhận</button>
                            <button className="btn-booking-cancel"
                                onClick={closebooking}
                            >Hủy</button>
                        </div>


                    </div>
                </Modal>
            </LoadingOverlay>

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

export default connect(mapStateToProps, mapDispatchToProps)(DatbanModal);
