import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/loadingWrapper.scss';
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class LoadingWrapper extends Component {
    render() {
        return (
            this.props.loading ? <div className="loading-wrapper">
                <div>
                    <SyncLoader
                        css={override}
                        size={20}
                        color={"#3c4b64"}
                        loading={this.props.loading} />
                </div>
            </div> :
                null
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.loadingReducer.loading
    }
}

export default connect(mapStateToProps)(LoadingWrapper);
