import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileSK.scss';
import { getinfoskbyidService } from '../../../services/danhmucService'
class ProfileSK extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            if (id) {
                let res = getinfoskbyidService(id)
                console.log('hoi dan id check profile su kien:', res)
            }




        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {


        return (
            <div>thong tin sư kien</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSK);
