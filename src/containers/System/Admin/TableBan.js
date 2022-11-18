import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableBan.scss';
import *  as actions from "../../../store/actions";
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// import { couldStartTrivia } from 'typescript';



class TableBan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allbanRedux: []

        }

    }
    componentDidMount() {
        this.props.fetchAllBanStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listallban !== this.props.listallban) {
            this.setState({
                allbanRedux: this.props.listallban
            })
        }
    }
    handleDeleteBan = (ban) => {

        this.props.DeleteBan(ban.id);

    }
    handleEditBan = (ban) => {
        //console.log('thuan check', ban)
        this.props.handleEditBanFromParentKey(ban)
    }
    render() {

        console.log('check all ban:', this.props.listallban)
        console.log('check state: ', this.state.allbanRedux)
        let arrallban = this.state.allbanRedux;
        return (
            <table id="TableBan">
                <div className="title">
                    Danh sách bàn
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>ID khu vực</th>
                        <th>Bàn số</th>
                        <th>Mô tả</th>
                        <th> Trạng Thái</th>

                    </tr>
                    {arrallban && arrallban.length > 0 &&
                        arrallban.map((item, index) => {
                            return (
                                <tr key={'index'}>
                                    <td>{item.id}</td>
                                    <td>{item.ID_KV}</td>
                                    <td>{item.SO_BAN}</td>
                                    <td>{item.TT}</td>

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
        listallban: state.admin.allban,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBanStart: () => dispatch(actions.fetchAllBanStart()),
        DeleteBan: (id) => dispatch(actions.deleteBan(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableBan);
