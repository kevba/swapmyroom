import * as React from 'react';

import Form from './form'

interface userData {
    email: string;
    firstName: string;
    lastName: string;
}

export class Container extends React.Component {
    submitUserData(data: any) {
        let ud: userData = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName
        }

        this.sendRequest(ud, "/user")
    }

    async sendRequest(data: any, url: string) {
        // this.props.setLoading(true);
        let jsonData = JSON.stringify(data);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let request = new Request(url, {
            headers: headers,
            method: 'POST',
            body: jsonData
        });
        const response = await fetch(request);
        // this.props.setLoading(false);
        return response;
    }

    handleSubmit(data: any) {
        // Submit user data
        // Submit room data
        console.log(data)
    }

    render() {
        return (
            <Form onSubmit={(data: any) => this.handleSubmit(data)}/>
        )
    }
}

export default Container
