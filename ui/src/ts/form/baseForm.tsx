import * as React from 'react';

class BaseForm extends React.Component {
    onChange(k: string | number, v: any) {
        this.setState({[k]: v});
    }
}

export default BaseForm;
