import * as React from 'react'
import { render } from 'enzyme';
import { App } from '../app.component'

describe('App component renders wihtout crashes', () => {
    it('Renders without crashes', () => {
        render(<App/>);
    });
});