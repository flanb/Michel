import "./Tag.scss"
import { Request } from "../Chatbot"

export default function Tag(props) {
  return (
    <div
      className="tag"
      onClick={() => {
        document.querySelector(".msg-input").value = props.children
        Request()
      }}
    >
      {props.children}
    </div>
  )
}
