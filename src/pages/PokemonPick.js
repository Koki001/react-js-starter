import { useSelector } from "react-redux"
import ProgressBar from "../components/ProgressBar"

const PokemonPick = () => {
  console.log(useSelector((state) => state.user.completed))
  return (
    <div className="pickContainer">
      <ProgressBar />
      <h2>hey</h2>
    </div>
  )
}

export default PokemonPick