import React from 'react';
import pet from '@frontendmasters/pet';
import {navigate} from "@reach/router";
import Carousel from './Carousel';
import ErrorBoundary from "./ErrorBoundary";
import {ThemeContext} from "./ThemeContext";
import Modal from "./Modal";

export class Details extends React.Component {

    state = {
        loading: true,
        showModal: false,
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loading: true,
    //     }
    // }

    componentDidMount() {
        // throw new Error('Hey');
        pet.animal(this.props.id).then(({animal}) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false,
            })
        }, console.error);
    }

    toggleModal = () => this.setState({showModal: !this.state.showModal});

    adopt = () => navigate(this.state.url);

    render() {
        if (this.state.loading) {
            return (
                <h1>Loading ...</h1>
            )
        }
        const {animal, name, location, breed, description, media, showModal} = this.state;
        return (
            <div className="details">
                <Carousel media={media}/>
                <div>
                    <h1>{name}</h1>
                    <h2>{animal} - {breed} - {location}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button onClick={this.toggleModal} style={{backgroundColor: theme}}>Adopt {name}</button>
                        )}
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {
                        showModal ? (
                            <Modal>
                                <div className="modalContent">

                                <h1>Would you like to adopt me?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No, I'm a monster</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
            // <pre>
            //     <code>
            //         {JSON.stringify(this.props, null, 2)}
            //         {JSON.stringify(this.state, null, 2)}
            //     </code>
            // </pre>
        );
    }
}

export function DetailsWithErrorBoundary(props) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    )
}

export default Details;
