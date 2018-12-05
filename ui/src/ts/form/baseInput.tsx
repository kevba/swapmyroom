import * as React from 'react';
import {Validator} from './validation/validations';

export interface IBaseInputProps {
    defaultValue: string | number;
    rules: Validator[];
    id: number | string;
    onChange: (id: string | number, v: any) => void;
    onValidate: (id: string | number, v: any) => void;
}

interface IBaseInputState {
    value: string | number;
    errorText: string;
}

class BaseInput extends React.Component<IBaseInputProps, IBaseInputState> {
    static defaultProps = {
        rules: new Array<Validator>(),
        onChange: (id: string | number, v: any) => {return},
        onValidate: (id: string | number, v: any) => {return},
    };

    constructor(props: IBaseInputProps) {
        super(props);

        this.state = {
            errorText: '',
            value: this.props.defaultValue
        };
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
