import * as React from 'react'
import { render } from 'enzyme';
import { SmartComplete } from './../../components/smartcomplete/smartcomplete.component'

describe('SmartComplete component renders without crashes', () => {
    it('Renders without crashes', () => {
        render(<SmartComplete commandSelectedCallBack={()=>{}}/>);
    });
});
