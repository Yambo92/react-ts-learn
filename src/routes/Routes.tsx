import * as React from 'react'
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  RouteComponentProps,
} from 'react-router-dom'
import App from '../App'
// import AdminPage from '../pages/Admin/AdminPage'
import ProductsPage from '../pages/Products/ProductsPage'
import ProductPage from '../pages/Products/ProductPage'
import NotFoundPage from '../pages/NotFound/NotFoundPage'
import LoginPage from '../pages/Login/LoginPage'
import ContactUsPage from '../pages/Contact/ContactUsPage'

import Header from '../components/Header/Header'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
/* We use a React function called  lazy which takes in a function that returns a
dynamic import, which in turn is assigned to our  AdminPage component
variable */
const AdminPage = React.lazy(() => import('../pages/Admin/AdminPage'))

const Routes: React.SFC<RouteComponentProps> = (props) => {
  const [loggedIn, setLoggedIn] = React.useState(true)
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={props.location.key} timeout={1000} classNames="animate">
          <Switch>
            <Redirect from="/" to="/products" exact />
            <Route path="/products" exact component={ProductsPage} />
            <Route path="/products/:id" component={ProductPage} />
            <Route path="/contactus" component={ContactUsPage} />
            <Route path="/admin">
              {loggedIn ? (
                <Suspense fallback={<div className="page-container">Loading...</div>}>
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

const RoutesWrap: React.SFC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  )
}

export default RoutesWrap
