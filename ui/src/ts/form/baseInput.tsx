import * as React from 'react';
import {Validator} from './validation/validations';

export interface IBaseInput {
    onValidate: (k: any, v: any) => void
    onChange: (k: any, v: any) => void
}

export interface IBaseInputProps {
    defaultValue: string | number;
    rules: Validator[];
    id: string;
    onChange: (id: string | number, v: any) => void;
    onValidate: (id: string | number, v: any) => void;
}

export interface IBaseInputState {
    value: string | number;
    errorText: string;
}

export class BaseInput<P extends IBaseInputProps, S extends IBaseInputState> extends React.Component<P, S> {
    static defaultProps = {
        rules: new Array<Validator>(),
        onChange: () => {return},
        onValidate: () => {return},
    };

    constructor(props: P) {
        super(props);
    }

    componentWillMount() {
        let {defaultValue} = this.props;
        this.handleChange(defaultValue);
    }

    validate(value: string | number) {
        let {rules} = this.props;
        let validationResults = rules.map(validation => {
            return validation(value);
        });

        let valid = validationResults.filter(v => {
            return !v.valid;
        });

        if (valid.length > 0) {
            return valid[0];
        }
        return {valid: true, text: ''};
    }

    handleChange(v: any) {
        let {id, onChange, onValidate} = this.props;
        let validation = this.validate(v);
        this.setState({value: v, errorText: validation.text});
        onChange(id, v);
        onValidate(id, validation.valid);
    }
}

export default BaseInput;
