import { useParams } from "react-router-dom"

export default function Read() {
  let { adsId } = useParams()
  return (
    <div>
      <h1>{adsId}</h1>
      <h2>Lire un covoiturage</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eu
        aliquet nisl nunc eu nisl. Nulla facilisi. Nulla facilisi.
      </p>
    </div>
  )
}
