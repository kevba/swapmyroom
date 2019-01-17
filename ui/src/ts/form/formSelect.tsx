import * as React from 'react';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { BaseInput, IBaseInputProps, IBaseInputState } from './baseInput';

interface IFormSelectProps extends IBaseInputProps{
    label?: string
    className?: string
}

interface IFormSelectState extends IBaseInputState {}

class FormSelect extends BaseInput<IFormSelectProps, IFormSelectState> {
    render() {
        let {id, label} = this.props;
        let {value} = this.state;

        return (
            <div
                className={this.props.className} 
                style={{paddingTop: '1em', paddingBottom: '1em'}}>
                <InputLabel>{label}</InputLabel>
                <Select
                    id={id}
                    fullWidth
                    value={value}
                    onChange={(e: any) => this.handleChange(e.target.value)}
                    autoWidth>
                    {this.props.children}
                </Select>
            </div>
        );
    }
}

export default FormSelect;
