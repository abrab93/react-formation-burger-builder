
import React , {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {

     componentDidUpdate(){
        console.log('modal.componentDidUpdate...');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show;
    }

    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateX(0)' : 'translateX(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default modal;