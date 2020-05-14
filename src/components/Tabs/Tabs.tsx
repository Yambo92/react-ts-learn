import * as React from 'react'

interface ITabsContext {
  activeName?: string
  handleTabClick?: (name: string, content: React.ReactNode) => void
}

const TabsContext = React.createContext<ITabsContext>({})

interface IState {
  activeName: string
  activeContent: React.ReactNode
}

interface ITabProps {
  name: string
  initialActive?: boolean
  heading: () => string | JSX.Element
}
/* We can consume a context via a  Consumer component within the context
component. So, this is  <TabsContext.Consumer /> in our case.
The child for  Consumer needs to be a function that has a parameter for the
context value and returns some JSX.  Consumer will then render the JSX we
return. */
class Tabs extends React.Component<{}, IState> {
  public static Tab: React.SFC<ITabProps> = (props) => (
    <TabsContext.Consumer>
      {(context: ITabsContext) => {
        if (!context.activeName && props.initialActive) {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children)
            return null
          }
        }
        const activeName = context.activeName
          ? context.activeName
          : props.initialActive
          ? props.name
          : ''
        const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
          if (context.handleTabClick) {
            context.handleTabClick(props.name, props.children)
          }
        }
        return (
          <li onClick={handleTabClick} className={props.name === activeName ? 'active' : ''}>
            {props.heading()}
          </li>
        )
      }}
    </TabsContext.Consumer>
  )

  private handleTabClick = (name: string, content: React.ReactNode) => {
    this.setState({ activeName: name, activeContent: content })
  }

  public render() {
    return (
      <TabsContext.Provider
        value={{
          activeName: this.state ? this.state.activeName : '',
          handleTabClick: this.handleTabClick,
        }}
      >
        <ul className="tabs">{this.props.children}</ul>
        <div>{this.state && this.state.activeContent}</div>
      </TabsContext.Provider>
    )
  }
}

export default Tabs
