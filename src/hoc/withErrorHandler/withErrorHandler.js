import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrapedComponent, axios) => {

    return class extends Component {

        constructor(props) {
            super(props);
            console.log('constructor');
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.respInterceptor = axios.interceptors.response.use(resp => resp, error => this.setState({ error: error }));
        }

        componentWillUnmount() {
            console.log(this.reqInterceptor);
            console.log(this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        componentDidMount() {
            console.log('[withErrorHandler].componentDidMount')
        }

        state = {
            error: null
        };

        errorConfirmedHandler = () => {
            console.log('errorConfirmedHandler');
            this.setState({ error: null });
        }

        render() {

            return (
                <Aux>
                    <Modal show={this.state.error} closed={this.errorConfirmedHandler}>
                        <p style={{ textAlign: 'center' }}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrapedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;