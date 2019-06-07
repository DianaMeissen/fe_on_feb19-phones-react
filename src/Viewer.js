import React from 'react';

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
                <img className="phone" src={this.state.selectedImg} alt={this.props.phone.description} />
                <button onClick={this.props.onBack}>Back</button>
                <button onClick={() => {
                    this.props.updateData(this.props.phone)
                    this.props.countSameEls(this.props.phone)
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
                                alt={this.props.phone.description}
                                onClick={() => {
                                    this.setState({
                                        selectedImg: this.props.phone.images[index]
                                    })
                                }} 
                            />
                        </li>
                    ))}
                </ul>
            </div >
        )
    }
}

export default Viewer;