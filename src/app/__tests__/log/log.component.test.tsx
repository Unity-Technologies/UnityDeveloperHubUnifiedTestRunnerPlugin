import * as React from 'react'
import { render } from 'enzyme';
import { Log } from './../../components/log/log.component'

describe('Log component renders without crashes', () => {
    it('Renders without crashes', () => {
        render(<Log/>);
    });
});
