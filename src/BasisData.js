import { Component } from "react";
import axios from "axios";

class BasisData extends Component{
  constructor(props){
      super(props);
      this.state= {
          dataApi: [],
          edit:false,
          dataPost:{
              id:0,
              judul:'',
              isi:''
          }
      };
      this.handleRemove = this.handleRemove.bind(this);
      this.inputChange = this.inputChange.bind(this);
      this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  reloadData(){
    axios.get("http://localhost:3004/data-catatan")
    .then(res =>{
        this.setState({
            dataApi:res.data,
            edit: false
        })
    });
  }
  inputChange(e){
      let newdataPost = {...this.state.dataPost};
      if(this.state.edit === false){
        newdataPost['id']=new Date().getTime();
      }
      newdataPost[e.target.name]=e.target.value;

      this.setState({
          dataPost: newdataPost
      }, () => console.log(this.state.dataPost))
  }
  onSubmitForm=()=>{
      if(this.state.edit === false){
        axios.post(`http://localhost:3004/data-catatan`, this.state.dataPost).then(()=>{this.reloadData()});
        this.reloadData();
        this.clearData();

      }else{
        axios.put(`http://localhost:3004/data-catatan/${this.state.dataPost.id}`, this.state.dataPost).then(()=>{
            this.reloadData();
            this.clearData();
        })
      }
  }
  handleRemove(e){
    console.log(e.target.value);
    fetch(`http://localhost:3004/data-catatan/${e.target.value}`,{
        method:"DELETE"
    }).then(res => this.reloadData());
  }
  getDataId = e =>{
      axios
      .get(`http://localhost:3004/data-catatan/${e.target.value}`)
      .then(res=>{
          this.setState({
              dataPost:res.data,
              edit:true
          })
      });
  }
  clearData =()=>{
    let newdataPost = {...this.state.dataPost};
    newdataPost['id']="";
    newdataPost['judul']="";
    newdataPost['isi']="";
    this.setState({
        dataPost :newdataPost
    })
  }
  componentDidMount(){
     this.reloadData();
  }
  render(){
    return(
      <div>
        <input type="text" name='judul' placeholder="Masukkan judul" value={this.state.dataPost.judul} onChange={this.inputChange}/>
        <input type="text" name='isi' placeholder="Masukkan isi" value={this.state.dataPost.isi} onChange={this.inputChange}/>
        <button type="submit" onClick={this.onSubmitForm} style={{backgroundColor: "blue"}}>Simpan Data</button>
        {this.state.dataApi.map((dat, index)=>{
            return(
                <div key={index}>
                    <p>{dat.judul}</p>
                    <p>{dat.isi}</p>
                    <button value={dat.id} onClick={this.handleRemove} style={{backgroundColor: "orange"}}>Delete</button>
                    <button value={dat.id} onClick={this.getDataId} style={{backgroundColor: "green"}}>Edit</button>
                </div>
            );
        })}
      </div>
    )
  }
}
export default BasisData;