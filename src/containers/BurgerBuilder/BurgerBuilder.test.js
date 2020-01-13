import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onFetchIngredient={()=>{}} />);
    });

    it('should render <BuildControls /> when receiving ingrdients', () => {
        wrapper.setProps({ ingds: { salade: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    });

});