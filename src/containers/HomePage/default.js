import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileSK.scss';

class ProfileSK extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {


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
