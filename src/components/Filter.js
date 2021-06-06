import React, { Component } from 'react';
import { connect } from "react-redux"
import * as actions from "../actions/productActions"
import { bindActionCreators } from 'redux';

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ? (
                <div>Loading...</div>
            ) : (
                
            <div div className = "filter" >
                <div className="filter-result">{this.props.filteredProducts.length} Products</div>
                <div className="filter-sort">Order{" "}
                    <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
                        <option value="Latest">Latest</option>
                        <option value="Lowest">Lowest</option>
                        <option value="Highest">Highest</option>

                    </select>
                </div>
                <div className="filter-size">Filter{" "}
                    <select value={this.props.size} onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                        <option value="">ALL</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XLL">XLL</option>
                    </select>
                </div>
            </div>
        ));
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products.items,
        size: state.products.size,
        sort: state.products.sort,
        filteredProducts: state.products.filteredItems,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions,dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);