import * as React from 'react'
import { RouteComponentProps, Prompt } from 'react-router-dom'
import { getProduct, IProduct } from './ProductsData'

import Product from './Product'

/*   RouteComponentProps gives us a  match object, containing a
params object, containing our  id route parameter */
/*  RouteComponentProps only allows us to have Route
parameters of type string or undefined */
type Props = RouteComponentProps<{ id: string }>

interface IState {
  product?: IProduct
  added: boolean
  loading: boolean
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props)
    this.state = {
      added: false,
      loading: true,
    }
  }

  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10)
      const product = await getProduct(id)
      if (product !== null) {
        this.setState({ product, loading: false })
      }
    }
  }

  private handleAddClick = () => {
    this.setState({ added: true })
  }

  private navAwayMessage = () => {
    return 'Are you sure you leave without buying this product?'
  }

  public render() {
    const product = this.state.product
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product || this.state.loading ? (
          <Product
            loading={this.state.loading}
            product={product}
            inBasket={this.state.added}
            onAddToBasket={this.handleAddClick}
          />
        ) : (
          <p>Product not found</p>
        )}
      </div>
    )
  }
}

export default ProductPage
