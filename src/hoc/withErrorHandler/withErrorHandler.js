import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrapedComponent, axios) =>{
    
    return class extends Component {

        state={
            error: null
        };

        errorConfirmedHandler = () =>{
            console.log('errorConfirmedHandler');
            this.setState({error: null});
        }

        render(){

            axios.interceptors.request.use(req => {
                    this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(resp =>resp, error => this.setState({error: error}));

            return(
                <Aux>
                    <Modal show={this.state.error} closed={this.errorConfirmedHandler}>
                        <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : null}</p>
                    </Modal>
                    <WrapedComponent {...this.props} />
                </Aux> 
            );
        }
    }
}

export default withErrorHandler;