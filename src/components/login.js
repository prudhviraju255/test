import React from "react";
import axios from 'axios';
class Login extends React.Component {

    constructor(props){
        super(props);
    this.state={
        email:'',
        password:'',
        count:10,
        isHover:false
    }
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0,800);
this.start();
    }

    start(){
        this.interval=setInterval(()=>{
            if(this.state.count>0){
                (this.setState({count:this.state.count-1}))
        }else{
                this.setState.count=0;
            }
        },1000)
    }

    pause(){
clearInterval(this.interval);
    }

    login(){
        if(this.state.email=='' || this.state.password==''){
alert("please enter valid email & password")
        }else{
            // console.log(this.state);
            let data={
                email:this.state.email,
                password:this.state.password
            }
            axios.post('http://localhost:3003/login',data).then(response=>{
let Token=response.data;
localStorage.setItem('token',Token)
            }).catch((error)=>{
                console.log(error)
            })
        }
    }

    onMouseEnterHandler() {
        this.setState({
            isHover: true,count:10
        });
    }

    onMouseLeaveHandler() {
        this.setState({
            isHover: false
        });
    }

    render(){
        return (
            <div className="icon" onMouseMove={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
            <div className="wrapper">
            <div className="form-wrapper">
              <h1>Login</h1>
<input type="text" placeholder="email" name="email" value={this.state.email} onChange={e=>this.setState({email:e.target.value})}></input>
<br></br>
<input type="text" placeholder="password" name="password" value={this.state.password} onChange={e=>{this.setState({password:e.target.value})}}></input>
<br></br>
<button type="button" className="btn btn-success" onClick={this.login.bind(this)}>Login</button>
             count:{this.state.count}
             <button type="button" name="pause" onClick={this.pause.bind(this)}>pause</button>
              </div>
              </div>
              </div>
        )   
    }


    
}



export default Login;
  