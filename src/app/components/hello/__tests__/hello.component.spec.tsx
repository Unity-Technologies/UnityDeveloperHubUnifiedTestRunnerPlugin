import * as React from 'react'
import { shallow } from 'enzyme';
import { Hello } from '../hello.component'

describe('HelloComponent', () => {
    it('Renders', () => {
        expect(shallow(
            <Hello target="world" />
        )).toMatchSnapshot()
    });

    it('Set\'s the title', () => {
        const helloComponent = shallow(<Hello target="world" />);

        expect(helloComponent.find('h1').text()).toEqual('Hello world!');
    });
});