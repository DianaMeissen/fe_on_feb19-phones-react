import React from 'react';
import Basket from './Basket'

class Viewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImg: this.props.phone.images[0],
        };
    }

    render() {
        return (
            < div >
                <img className="phone" src={this.state.selectedImg} />
                <button onClick={this.props.onBack}>Back</button>
                <button onClick={() => {

                }}>
                    Add to basket
                </button>

                <h1>{this.props.phone.name}</h1>
                <p>{this.props.phone.description}</p>

                <ul className="phone-thumbs">
                    {this.props.phone.images.map((imageUrl, index) => (
                        <li>
                            <img
                                src={imageUrl}
                                onClick={() => {
                                    this.setState({
                                        selectedImg: this.props.phone.images[index]
                                    })
                                }} />
                        </li>
                    ))}
                </ul>
            </div >
        )
    }
}

export default Viewer;