import React, { Component } from 'react';
import formatCurrency from "../utils"
import Fade from "react-reveal/Fade"
import Zoom from "react-reveal/Zoom"
import Modal from "react-modal"
import { connect } from "react-redux"
import { fetchProducts } from "../actions/productActions"
import { addToCart } from "../actions/cartActions"


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product:null,
        }
    }
    componentDidMount() {
        this.props.fetchProducts()
    }
    openModal = (product) => {
        this.setState({product})
    }
    closeModal = () => {
        this.setState({product:null})
    }
    render() {

        const { product } = this.state
        console.log(product)
        return (
            <div>
                <Fade bottom cascade>
                    {!this.props.products ?
                        (<div>Loading...</div>)
                        : (<ul className="products">
                    {this.props.products.map(product =>
                        <li key={product._id}>
                            <div className="product">
                                <a href={"#" + product._id} onClick={() =>this.openModal(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>{product.title}</p>
                                </a>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button onClick={() => this.props.addToCart(product)} className="button primary">Add to Cart</button>
                                </div>
                            </div>

                        </li>
                        )}

                </ul>)
                }
                
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>X</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title}></img>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>{product.description}</p>
                                    <p>
                                        Available Sizes{" "}
                                        {product.availableSizes.map(x => (
                                            <span>{" "} <button className="button">{x}</button> </span>
                                        ))}
                                    </p>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={() => {
                                            this.props.addToCart(product)
                                            this.closeModal()
                                        }}>Add to Cart</button>

                                    </div>
                                </div>
                            </div>
                        </Zoom>
                        
                </Modal>
                )}
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products.filteredItems
    }
}


const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    addToCart: (product) => dispatch(addToCart(product))
  
});
 
export default connect(mapStateToProps,mapDispatchToProps)(Products);