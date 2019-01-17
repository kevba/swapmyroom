import * as React from 'react';

import Form from './form'
import PostSubmit from './postSubmit'

interface IContainerProps {}

interface IContainerState {
    submitting: boolean
}

export class Container extends React.Component<IContainerProps, IContainerState> {
    constructor(props: IContainerProps) {
        super(props);

        this.state = {
            submitting: false,
        };
    }

    async sendRequest(data: any) {
        this.setState({
            submitting: true
        });

        let jsonData = JSON.stringify(data);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let request = new Request("user/form_submit", {
            headers: headers,
            method: 'POST',
            body: jsonData
        });
        await fetch(request);
    }

    handleSubmit(data: any) {
        let sortedData = {
            wants: {
                want_size: data["want_size"],
                want_rent: data["want_rent"],
                want_postal_code: data["want_postal_code"],
                want_toilet: data["want_toilet"],
                want_bathroom: data["want_bathroom"],
                want_living_room: data["want_living_room"],
                want_personal_spaces: data["want_personal_spaces"],
                want_landlord: data["want_landlord"],
            },
            room: {
                own_postal_code: data["own_postal_code"],
                own_toilet: data["own_toilet"],
                own_bathroom: data["own_bathroom"],
                own_living_room: data["own_living_room"],
                own_personal_spaces: data["own_personal_spaces"],
                own_floor: data["own_floor"],
                own_hospice: data["own_hospice"],
                own_landlord: data["own_landlord"],
            },
            user: {
                email: data["email"],
                firstName: data["firstName"],
                lastName: data["lastName"],
            }
        }


        this.sendRequest(sortedData)
    }

    render() {
        if (this.state.submitting) {
            return <PostSubmit />
        }
        return (
            <Form onSubmit={(data: any) => this.handleSubmit(data)}/>
        )
    }
}

export default Container
