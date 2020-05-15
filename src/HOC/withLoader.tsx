import * as React from 'react'

interface IProps {
  loading: boolean
}
/* https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb */
const withLoader = <P extends object>(
  Component: React.ComponentType<P>
): React.SFC<P & IProps> => ({ loading, ...props }: IProps) =>
  loading ? (
    <div className="loader-overlay">
      <div className="loader-circle-wrap">
        <div className="loader-circle" />
      </div>
    </div>
  ) : (
    <Component {...(props as P)} />
  )

/*   const withLoader = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoader extends React.Component<P & IProps> {
  public render() {
  const { loading, ...props } = this.props as IProps;
  return loading ? (
  <div className="loader-overlay">
  <div className="loader-circle-wrap">
  <div className="loader-circle" />
  </div>
  </div>
  ) : (
  <Component {...props} />
  );
  }
  }; */

export default withLoader

/* https://levelup.gitconnected.com/understanding-react-higher-order-components-by-example-95e8c47c8006 */

/* A higher-order component can fall into one or both of these categories, as will be demonstrated in the coming examples.
Note that the examples in this article do not demonstrate best practices, such as adding a display name and hoisting statics; the main aim of this article is to show how HOCs can be typed effectively.
Enhancers
We will start with enhancers as these are the easiest to set types for. A basic example of this pattern is a HOC that adds loading prop to a component and displays a loading spinner if set to true. Here is an example without types:

… and with types:

There are a few things going on here, so we will break it down:
interface WithLoadingProps {
  loading: boolean;
}
Here an interface is declared with the types of the props that will be added to (or enhance) the component when it is wrapped.
<P extends object>(Component: React.ComponentType<P>)
Here we are using a generic; P represents the props of the component that is passed into the HOC. React.ComponentType<P> is an alias for React.FunctionComponent<P> | React.ClassComponent<P>, meaning the component that is passed into the HOC can be either a function component or class component.
class WithLoading extends React.Component<P & WithLoadingProps>
Here we are defining a component to return from the HOC, and specifying that the component will include the passed in component’s props (P) and the HOC’s props (WithLoadingProps). These are combined via a type intersection operator (&).
const { loading, ...props } = this.props;
Note: in older versions of TypeScript you may need to cast this.props — this.props as WithLoadingProps to avoid a compilation error “Rest types may only be created from object types.”
Finally, we use the loading prop to conditionally display a loading spinner or our component with its own props passed in:
return loading ? <LoadingSpinner /> : <Component {...props as P} />;
Note: A type cast (props as P) is required here from TypeScript v3.2 onwards, due to a likely bug in TypeScript.
Our withLoading HOC can also be rewritten to return a function component rather than a class:

Here, we have the same problem with object rest/spread, so it’s being worked around by setting an explicit return type React.FC<P & WithLoadingProps>, but only using WithLoadingProps within the stateless functional component.
Note: React.FC is shorthand for React.FunctionComponent. In earlier versions of @types/react this was React.SFC or React.StatelessFunctionalComponent.
Injectors
Injectors are the more common form of HOC, but more difficult to set types for. Besides injecting props into a component, in most cases they also remove the injected props when it is wrapped so they can no longer be set from the outside. react-redux’s connect is an example of an injector HOC, but in this article we will use a simpler example — a HOC that injects a counter value and callbacks to increment and decrement the value:

There are a few key differences here:
export interface InjectedCounterProps {  
  value: number;  
  onIncrement(): void;  
  onDecrement(): void;
}
An interface is being declared for the props that will be injected into the component; it is exported so they can be used by the component that the HOC wraps:

<P extends InjectedCounterProps>(Component: React.ComponentType<P>)
Again we use a generic, but this time it ensures that the component passed into the HOC includes the props that are going to be injected by it; if it doesn’t you will receive a compilation error.
class MakeCounter extends React.Component<
  Subtract<P, InjectedCounterProps>,    
  MakeCounterState  
>
The component returned by the HOC uses Subtract from Piotrek Witek’s utility-types package, which will subtract the injected props from the passed in component’s props, meaning that if they are set on the resulting wrapped component you will receive a compilation error:

TypeScript compilation error when attempting to set value on the wrapped component
In most cases, this is the behaviour you would want from an injector, though this will be discussed later in the article.
Enhance + Inject
Combining the two patterns, we will build on the counter example to allow for the minimum and maximum counter values to be passed into the HOC, which in turn are intercepted and used by it without passing them through to the component:

Here, Subtract is being combined with type intersection to combine the component’s own props with the HOCs own props, minus the props that are injected into the component:
Subtract<P, InjectedCounterProps> & MakeCounterProps
Other than that, there are no real differences over the other two patterns to highlight, but the example does bring to the fore a number of issues with higher-order components in general. These aren’t really TypeScript-specific, but are worth detailing so that we can talk about how to address them with TypeScript.
Firstly, minValue and maxValue are intercepted by the HOC and not passed through to the component. However, you may want them to be so you can disable the increment/decrement buttons based on the values, or display a message to the user. If you wrote the HOC you could simply modify it to inject these values too, though if you didn’t (e.g. it is from an npm package), then this is an issue.
Secondly, the value prop that is being injected by the HOC has a very generic name; if you want to use this for other purposes, or if you are injecting props from multiple HOCs, this name may conflict with other injected props. You can change the name to be something less generic as a solution, but far as solutions go, this is not a very good one! */
