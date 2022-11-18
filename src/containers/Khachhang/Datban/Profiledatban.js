import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileSK.scss';

class Profiledatban extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {


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

export default connect(mapStateToProps, mapDispatchToProps)(Profiledatban);
