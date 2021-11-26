import "./Btn.scss"

export default function Btn(props) {
  return (
    <button className={`btn ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
