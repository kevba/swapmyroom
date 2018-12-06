import * as React from 'react';

import BaseInput from '../forms/baseInput';
import Select from 'material-ui/Select';

interface IFormSelectProps extends IBaseInputProps{
    label: string
}

interface IFormSelectState extends IBaseInputState {}

class FormSelect extends BaseInput<IFormSelectProps, IFormSelectState> {
    render() {
        let {id, label} = this.props;
        let {value} = this.state;

        return (
            <div style={{paddingTop: '1em', paddingBottom: '1em'}}>
                <Select
                    id={id}
                    fullWidth
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
