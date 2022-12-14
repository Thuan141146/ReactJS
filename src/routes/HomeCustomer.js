import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeCustomer extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirectcustomer = isLoggedIn ? '/Home' : '/Home';

        return (
            <Redirect to={linkToRedirectcustomer} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCustomer);
