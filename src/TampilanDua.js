import {Component} from "react";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import { Button, Form, Grid, Header, Segment, Image, TextArea, Table, Input } from 'semantic-ui-react';

class Tampilan extends Component{
  constructor(props){
    super(props);
    this.state= {
        dataApi: [],
        edit:false,
        dataPost:{
            id:0,
            judul:'',
            isi:'',
            tanggal:''
        },
        mencari:''
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCari = this.handleCari.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
}
handleCari(event) {
  this.setState({mencari: event.target.value});
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
    let date = new Date();
    let newdataPost = {...this.state.dataPost};
    if(this.state.edit === false){
      newdataPost['id']=new Date().getTime();
    }
    newdataPost[e.target.name]=e.target.value;
    newdataPost['tanggal'] = date.toLocaleString('En-Us')
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
cari 
componentDidMount(){
   this.reloadData();
}
  render(){
    return(
      <div>
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/book-icon.png' /> Catatanku
            </Header>
            <Form size='large'>
              <Segment>
                <Form.Input name='judul' fluid icon='pencil'  value={this.state.dataPost.judul} onChange={this.inputChange} iconPosition='left' placeholder='Judul Catatan' />
                <TextArea name='isi' value={this.state.dataPost.isi} onChange={this.inputChange} placeholder='Isi Catatan' />
                <Button type="submit" onClick={this.onSubmitForm} color='teal' fluid size='large'>
                  Simpan
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Table fixed textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan='4' textAlign='left'>
                  <Input icon='search' type="text" value={this.state.value} onChange={this.handleCari} placeholder='Cari Judul Catatan' />
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Judul Catatan</Table.HeaderCell>
              <Table.HeaderCell>Isi Catatan</Table.HeaderCell>
              <Table.HeaderCell>Tanggal dan Waktu Catatan</Table.HeaderCell>
              <Table.HeaderCell>Menu</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body textAlign='center'>
          
          {this.state.dataApi.filter((dat) =>{
                if(this.state.mencari === ""){
                    return dat
                }else if (dat.judul.toLowerCase().includes(this.state.mencari.toLocaleLowerCase())){
                    return dat
                }
            }).map((dat, index)=>{
            return(
                <Table.Row key={index} textAlign='center'>
                        <Table.Cell>{dat.judul}</Table.Cell>
                        <Table.Cell>{dat.isi}</Table.Cell>
                        <Table.Cell>{dat.tanggal}</Table.Cell>
                        <Table.Cell>
                          <Button.Group>
                            <Button value={dat.id} onClick={this.getDataId} color='red'>Edit</Button>
                            <Button value={dat.id} onClick={this.handleRemove} color='orange'>Hapus</Button>
                          </Button.Group>
                        </Table.Cell> 
                
                </Table.Row>
            );
          })}
          </Table.Body>
          </Table>
      </div>
    )
  }
}

export default Tampilan;
