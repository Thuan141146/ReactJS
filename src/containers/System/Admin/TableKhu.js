import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableKhu.scss';
import *  as actions from "../../../store/actions";
class TableKhu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allkhuRedux: [],

        }

    }
    componentDidMount() {
        this.props.fetchAllKhuRedux();
    }
    handleEditKhu = (khu) => {
        // console.log('thuan check', khu)
        this.props.handleEditKhuFromParentKey(khu)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.Listallkhu !== this.props.Listallkhu) {
            this.setState({
                allkhuRedux: this.props.Listallkhu
            })
        }
    }
    handleDeleteKhu = (khu) => {

        this.props.deleteKhu(khu.id);

    }
    render() {
        console.log('chek all danh muc:', this.props.Listallkhu);
        let arrallkhu = this.state.allkhuRedux;
        return (
            <table id="TableKhu">
                <div className="title">
                    Danh sách khu vực
                </div>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Tên khu</th>
                        <th> Mô tả khu</th>
                        <th> Mô trạng thái</th>

                    </tr>
                    {arrallkhu && arrallkhu.length > 0 &&
                        arrallkhu.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.TEN_KV}</td>
                                    <td>{item.MO_TA_KV}</td>
                                    <td >
                                        <div className='edit-btn'>
                                            <button
                                                onClick={() => this.handleEditKhu(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteKhu(item)}
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
        Listallkhu: state.admin.allkhu,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllKhuRedux: () => dispatch(actions.fetchAllKhuStart()),
        deleteKhu: (id) => dispatch(actions.deleteKhu(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableKhu);
