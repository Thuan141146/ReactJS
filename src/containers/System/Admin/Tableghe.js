import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Tableghe.scss';
import *  as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// import { couldStartTrivia } from 'typescript';
import NumberFormat from 'react-number-format';


class Tableghe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allgheRedux: []

        }

    }
    componentDidMount() {
        this.props.fetchAllgheStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listallghe !== this.props.listallghe) {
            this.setState({
                allgheRedux: this.props.listallghe
            })
        }
    }
    handleDeleteBan = (ghe) => {

        this.props.Deleteghe(ghe.id);

    }
    handleEditBan = (ghe) => {
        //console.log('thuan check', ban)
        this.props.handleEditgheFromParentKey(ghe)
    }
    render() {

        //console.log('check all ban:', this.props.listallban)
        //console.log('check state: ', this.state.allbanRedux)
        let arrallghe = this.state.allgheRedux;
        return (
            <table id="Tableghe">
                <div className="title">
                    Danh sách ghế sự kiện
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>

                        <th>Ghế số</th>
                        <th>Loại ghế</th>
                        <th>Giá ghế</th>
                        <th>Công cụ</th>

                    </tr>
                    {arrallghe && arrallghe.length > 0 &&
                        arrallghe.map((item, index) => {
                            return (
                                <tr key={'index'}>
                                    <td>{item.id}</td>

                                    <td>{item.SO_GHE}</td>
                                    <td>{item.TT}</td>
                                    <td><NumberFormat
                                        className="gia"
                                        value={item.GIA}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    /></td>

                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditBan(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteBan(item)}
                                                className="btn-delete" ><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        );
    }
}

const mapStateToProps = state => {
    return {
        listallghe: state.admin.allghe,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllgheStart: () => dispatch(actions.fetchAllgheStart()),
        Deleteghe: (id) => dispatch(actions.deleteghe(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tableghe);
