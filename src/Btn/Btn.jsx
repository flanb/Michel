import "./Btn.scss"

export default function Btn(props) {
  return <button className="btn" onClick={props.onClick}>{props.children}</button>
}
 