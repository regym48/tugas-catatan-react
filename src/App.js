import {Component} from "react";
// import BasisData from "./BasisData";
// import Tampilan from "./Tampilan";
// import Pencarian from "./Pencarian"
import Tampilan from "./TampilanDua";

class App extends Component{
  render(){
    return(
      <div>
        {/* <Pencarian/> */}
        <Tampilan/>
        {/* <BasisData/> */}
      </div>
    )
  }
}

export default App;
