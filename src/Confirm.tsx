import * as React from 'react'

import './Confirm.css'

interface IProps {
  open: boolean
  title: string
  content: string
  cancelCaption?: string
  okCaption?: string
  onOkClick: () => void
  onCancelClick: () => void
}

class Confirm extends React.Component<IProps> {
  public static defaultProps = {
    cancelCaption: 'Cancel',
    okCaption: 'Okay',
  }

  private handleOkClick = () => {
    this.props.onOkClick()
  }

  private handleCancelClick = () => {
    this.props.onCancelClick()
  }

  public render() {
    return (
      <div className={this.props.open ? 'confirm-wrapper confirm-visible' : 'confirm-wrapper'}>
        <div className="confirm-container">
          <div className="confirm-title-container">
            <span>{this.props.title}</span>
          </div>
          <div className="confirm-content-container">
            <p>{this.props.content} </p>
          </div>
          <div className="confirm-buttons-container">
            <button className="confirm-cancel" onClick={this.handleCancelClick}>
              {this.props.cancelCaption}
            </button>
            <button className="confirm-ok" onClick={this.handleOkClick}>
              {this.props.okCaption}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Confirm

/* 
React.Component is what is called a generic class. Generic classes allow
types used within the class to be passed in. In our case, we have passed in
our  IProps interface
*/
/* We put a  ? before the type annotation to denote that the prop is optional. */
/* 
Default values can be added to component props when the component is initialized. These
can be implemented using a static object literal called  defaultProps 
*/
