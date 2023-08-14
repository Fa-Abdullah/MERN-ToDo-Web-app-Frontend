import React, { useState } from 'react'
import backgroundImage from '../imgs/background.jpg'
import notesBack from '../imgs/notes.jpg'
import './main.css'
import openEye from '../imgs/eye open.png'
import closeEye from '../imgs/eye close.png'
import { useNavigate, Link,/* useLocation */} from "react-router-dom"
import mobile from '../imgs/mobile Notes.jpg'
import axios from "axios"

const Login = () => {

    const history=useNavigate();
    // const location = useLocation()
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    // const [name,setName]=useState(location.state.id)

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,{
                email,password
            })
            .then(res=>{
                if(res.data === "exist"){
                    history("/home",{state:{id: res.data.name, email: res.data.email, password: res.data.password, phone: res.data.phone, birthYear: res.data.birthYear}})

                }
                else if(res.data === "notexist"){
                    alert("User have not sign up")
                }
                else if(res.data === "wrong password"){
                    alert("wrong password")
                } else{
                    history("/home",{state:{id: res.data.name, email: res.data.email, password: res.data.password, phone: res.data.phone, birthYear: res.data.birthYear}})
                }
                })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }

    ////------------------------------------------------------------------

    const [lagClick, setLagClick] = useState(true);

    const toggleLagClick = () => {
      setLagClick(!lagClick);
    };

    let lagBtn = lagClick ? 'Ar' : 'En'
    let flexDir = lagClick ? 'row' : 'row-reverse';

    const [type , setType] = useState(true)

    let inputType = type ? 'password' : 'text'

    const handleInputType = () =>{
      setType(!type)
    }

    let eye = type ? closeEye : openEye

    let marL = window.innerWidth <= 768 ? (lagClick ? '0px' : '238px') : (lagClick ? '0px' : '295px')

  return (
    <React.Fragment>
        <div  className='login' style={{backgroundImage: `url(${backgroundImage})`, flexDirection: flexDir}}>
            <div className='checkout' style={{flexDirection: flexDir}}>
            <div className='notes' style={{}}>
                <img src={mobile} className='notesBack' alt='' style={{display: window.innerWidth <= 768 ? '' : 'none'}}></img>
                <img src={notesBack} alt='' className='notesBack' style={{display: window.innerWidth <= 768 ? 'none' : ''}}></img>
                <span className='lagBtn' onClick={toggleLagClick} style={{ cursor: 'pointer' }}>{lagBtn}</span>
            </div>
                <div className='frame' style={{paddingTop: window.innerWidth <= 768 ? '65px' : '95px'}}>
                    <span className='Log complete'>{lagClick ? 'Login' : 'تسجيل دخول'}</span>    
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Email' : 'الحساب'}            
                        </div>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                    </div>
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Password' : 'الرقم السرى'}
                        </div>
                        <input onChange={(e) => { setPassword(e.target.value) }} type={inputType} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                        <span onClick={handleInputType} style={{width: '24.072px', height: '24px', marginLeft: window.innerWidth <= 768 ? (lagClick ? '115px' : '-155px') : (lagClick ? '130px' : '-212px'),
                         marginTop: '-37px', position: 'absolute'}}>
                            <img src={eye} alt="" style={{width: '24.072px', height: '24px'}}></img>
                        </span>
                    </div>
                    <button onClick={submit} type='submit' className='loginBtn create2' style={{textDecoration: 'none', border: 'none'}}>
                        {lagClick ? 'Login' : 'تسجيل دخول'}
                    </button>
                    <span className='sign' style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir}}>
                        <span style={{marginLeft: window.innerWidth <= 768 ? lagClick ? '63px' : '0px' : lagClick ? '70px' : '15px',
                         marginRight: window.innerWidth <= 768 ? lagClick ? '0px' : '9px' : lagClick ? '10px' : '127px', color: '#697386'}}>{lagClick ? 'Don’t have an account!' : 'تمتلك حساب بالفعل'}</span>
                        <Link to='/create1' style={{marginLeft: window.innerWidth <= 768 ? lagClick ? '125px' : '0px' : lagClick ? '0px' : '0px', color: '#D375B9', textDecoration: 'none'}}>
                            {lagClick ? 'Signup' : 'تسجيل الدخول'}
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Login
