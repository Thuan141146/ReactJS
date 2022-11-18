import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableLoaiSK.scss';
import *  as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import moment from 'moment';
import { dateFormat } from '../../../utils';
import NumberFormat from 'react-number-format';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaiskRedux: [],

        }

    }
    componentDidMount() {
        this.props.fetchLoaiSKRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Lisloaisk !== this.props.Lisloaisk) {
            this.setState({
                loaiskRedux: this.props.Lisloaisk
            })
        }
    }
    handleDeleteSuKien = (sukien) => {

        this.props.deleteSuKien(sukien.id);

    }
    handleEditSuKien = (sukien) => {
        // console.log('thuan check', mon)
        this.props.handleEditSuKienFromParentKey(sukien)
    }
    render() {
        //console.log('tieng viet:', moment(new Date()).format('dddd - DD/MM'));
        //console.log('chek all su kien:', this.props.Lisloaisk);
        let arrLoaiSK = this.state.loaiskRedux;
        //console.log('chek all su kien:', arrLoaiSK);
        return (
            <React.Fragment>
                <table id="TableLoaiSK">
                    <div className="title">
                        Danh sách sự kiện
                    </div>
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Tên Sự kiện</th>
                            <th>Giá vé</th>
                            <th>Ngày</th>
                            <th> Trạng Thái</th>

                        </tr>
                        {arrLoaiSK && arrLoaiSK.length > 0 &&
                            arrLoaiSK.map((item, index) => {

                                return (

                                    <tr key={'index'}>
                                        <td>{item.id}</td>
                                        <td>{item.TEN_LSK}</td>
                                        <td><NumberFormat
                                            className="gia"
                                            value={item.gia.value}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        /></td>
                                        <td>{item.NGAY}</td>

                                        <td >
                                            <div className='edit-btn'>
                                                <button
                                                    onClick={() => this.handleEditSuKien(item)}
                                                    className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                                <button
                                                    onClick={() => this.handleDeleteSuKien(item)}
                                                    className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                            </div>
                                        </td>
                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />


            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        Lisloaisk: state.admin.loaisk,
        lisUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoaiSKRedux: () => dispatch(actions.fetchAllLoaiSKStart()),
        deleteSuKien: (id) => dispatch(actions.deleteSuKien(id)),



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
