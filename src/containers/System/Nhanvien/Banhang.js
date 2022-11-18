import React, { Component } from 'react';
import { connect } from "react-redux";

class Banhang extends Component {
    render() {
        return (
            <React.Fragment>
                <div>banhang</div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banhang);
