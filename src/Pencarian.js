import { useState } from "react";
import JSONDATA from "./db.json"

function Pencarian(){
    const [searchTerm, setSearchTerm] = useState("");
    return(
        <div>
            <input type="text" placeholder="Ketikkan" onChange={(event) => {
                setSearchTerm(event.target.value);
            }} />
            {JSONDATA.filter((val) =>{
                if(searchTerm === ""){
                    return val
                }else if (val.judul.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return val
                }
            }).map((val, key) => {
                return(
                    <div key={key}>
                        <p> {val.judul} </p>
                    </div>
                );
            })}
        </div>
    );
}
export default Pencarian;