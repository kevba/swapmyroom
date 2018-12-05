import * as React from 'react';

import BaseInput from '../forms/baseInput';
import Select from 'material-ui/Select';

class FormSelect extends BaseInput {
    render() {
        let {id, label} = this.props;
        let {value} = this.state;

        return (
            <div style={{paddingTop: '1em', paddingBottom: '1em'}}>
                <Select
                    id={id}
                    value={value}
                    onChange={e => this.handleChange(e.target.value)}
                    label={label}
                    autoWidth>
                    {this.props.children}
                </Select>
            </div>
        );
    }
}

export default FormSelect;
