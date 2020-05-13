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
/* We use stateless functional component (SFC)  React.SFC to represent these type
of components */

const Confirm: React.SFC<IProps> = (props) => {
  /* 
    第一行的 console.log('Confirm rendering') 用来证明 如果不使用React.memo的时候
    只要父组件重新渲染的时候，即使子组件接收的props不发生改变也会跟随父组件渲染。
    If we look at the running app and the console, we'll see that a render occurs every
time the  App component counts down. The countdown is in the  App component
state, and a change to state means the component will be rendered again, along
with any child components. This is why, without any optimization, our  Confirm
component renders on each countdown */
  console.log('Confirm rendering')

  const [cancelClickCount, setCancelClickCount] = React.useState(0)

  React.useEffect(() => {
    console.log('Confirm first rendering')
    return () => {
      console.log('Confirm unmounted')
    }
  }, [])

  const handleOkClick = () => {
    props.onOkClick()
  }

  const handleCancelClick = () => {
    const newCount = cancelClickCount + 1
    setCancelClickCount(newCount)
    if (newCount >= 2) {
      props.onCancelClick()
    }
  }

  return (
    <div className={props.open ? 'confirm-wrapper confirm-visible' : 'confirm-wrapper'}>
      <div className="confirm-container">
        <div className="confirm-title-container">
          <span>{props.title}</span>
        </div>
        <div className="confirm-content-container">
          <p>{props.content} </p>
        </div>
        <div className="confirm-buttons-container">
          <button className="confirm-cancel" onClick={handleCancelClick}>
            {cancelClickCount === 0 ? props.cancelCaption : 'Really?'}
          </button>
          <button className="confirm-ok" onClick={handleOkClick}>
            {props.okCaption}
          </button>
        </div>
      </div>
    </div>
  )
}

Confirm.defaultProps = {
  cancelCaption: 'Cancel',
  okCaption: 'Okay',
}
/*  we wrap our component with a function called  memo from React. We then
export this wrapper function. The  memo function then only renders the
component if its props change */
/* memo should be used with care, and only on components that are being rendered more than
they need to be */
const ConfirmMemo = React.memo(Confirm)

export default ConfirmMemo

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
