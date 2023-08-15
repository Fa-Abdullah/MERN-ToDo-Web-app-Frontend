import React, { useState } from 'react'
import backgroundImage from '../imgs/background.jpg'
import notesBack from '../imgs/notes.jpg'
import './main.css'
import openEye from '../imgs/eye open.png'
import closeEye from '../imgs/eye close.png'
import { Link, useNavigate } from 'react-router-dom'
import mobile from '../imgs/mobile Notes.jpg'
import axios from 'axios'

const Signup = () => {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')

    const click = () => {
        if (pass1 === pass2){
            setPassword(pass1)
            setShow1('none')
            setShow2('')
        }else{
            alert('Passwords do not match')
        }
    }

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post('https://mern-todo-list-85ni.onrender.com/signup',{
                email,password,phone,name,birthYear
            })
            .then(res=>{ 
                if(res.data === "exist"){
                    alert("User already exists")
                }
                else if(res.data === "notexist"){
                    history("/home",{state:{
                        id:name,password:password,phone:phone,email:email,birthYear:birthYear
                    }})
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
    ////-------------------0------------------------------------------------------

    const [lagClick, setLagClick] = useState(true);

    const toggleLagClick = () => {
      setLagClick(!lagClick);
    };
   
    let lagBtn = lagClick ? 'Ar' : 'En'
    let flexDir = lagClick ? 'row' : 'row-reverse';

    const [type , setType] = useState(true)
    const [type2 , setType2] = useState(true)

    let inputType = type ? 'password' : 'text'
    let inputType2 = type2 ? 'password' : 'text'

    const handleInputType = () =>{
      setType(!type)
    }
    const handleInputType2 = () =>{
        setType2(!type2)
    }

    let eye = type ? closeEye : openEye
    let eye2 = type2 ? closeEye : openEye

    let marL = window.innerWidth <= 768 ? (lagClick ? '0px' : '238px') : (lagClick ? '0px' : '295px')

    ///----------------------------------------------------------------------------------------------------

    const [show1 , setShow1] = useState('')

    const [show2 , setShow2] = useState('none')

  return (
    <React.Fragment>
        <div className='login' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: '', flexDirection: flexDir}}>
            <div className='checkout' style={{flexDirection: flexDir}}>
                <div className='notes' style={{}}>
                    <img src={mobile} className='notesBack' alt='' style={{display: window.innerWidth <= 768 ? '' : 'none'}}></img>
                    <img src={notesBack} alt='' className='notesBack' style={{display: window.innerWidth <= 768 ? 'none' : ''}}></img>
                    <span className='lagBtn' onClick={toggleLagClick} style={{cursor: 'pointer'}}>{lagBtn}</span>
                </div>
                <div>
                <div className='frame create' style={{display: show1}}>
                    <span className='Log complete' style={{marginBottom: '25px'}}>{lagClick ? 'Signup' : 'إنشاء حساب'}</span>    
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Email' : 'الحساب'}            
                        </div>
                        <input type="email" className="field" onChange={(e) => { setEmail(e.target.value) }} style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                    </div>
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Password' : 'الرقم السرى'}
                        </div>
                        <input type={inputType} onChange={(e) => { setPass1(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                        <span onClick={handleInputType} style={{width: '24.072px', height: '24px', marginLeft: window.innerWidth <= 768 ? (lagClick ? '115px' : '-155px') : (lagClick ? '130px' : '-212px'), marginTop: '-37px', position: 'absolute'}}>
                            <img src={eye} alt="" style={{width: '24.072px', height: '24px'}}></img>
                        </span>
                    </div>
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Confirm password' : 'تأكيد الرقم السري'}
                        </div>
                        <input type={inputType2} onChange={(e) => { setPass2(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                        <span onClick={handleInputType2} style={{width: '24.072px', height: '24px', marginLeft: window.innerWidth <= 768 ? (lagClick ? '115px' : '-155px') : (lagClick ? '130px' : '-212px'), marginTop: '-37px', position: 'absolute'}}>
                            <img src={eye2} alt="" style={{width: '24.072px', height: '24px'}}></img>
                        </span>
                    </div>
                    <button className='loginBtn create2' style={{textDecoration: 'none', marginBottom: '10px', border: 'none'}} onClick={click}>
                        {lagClick ? 'Complete signup  →' : '←  إكمال إنشاء الحساب'}
                    </button>
                    <span className='sign' style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir}}>
                        <div style={{marginLeft: window.innerWidth <= 768 ? lagClick ? '63px' : '0px' : lagClick ? '70px' : '15px',
                         marginRight: window.innerWidth <= 768 ? lagClick ? '0px' : '9px' : lagClick ? '10px' : '127px', color: '#697386'}}>
                            {lagClick ? 'Don’t have an account!' : '!تمتلك حساب بالفعل'}
                        </div>
                        <Link to='/login' style={{marginLeft: window.innerWidth <= 768 ? lagClick ? '125px' : '0px' : lagClick ? '0px' : '0px', color: '#D375B9', textDecoration: 'none'}}>{lagClick ? 'Login' : 'تسجيل الدخول'}</Link>
                    </span>
                </div>
                <div className='frame create he' style={{display : show2}}>
                    <span className='Log complete' style={{marginBottom: '15px'}}>{lagClick ? 'Complete Signup' : 'إكمال إنشاء حساب'}</span>    
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Username' : 'اسم المستخدم'}            
                        </div>
                        <input type="text" onChange={(e) => { setName(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                    </div>
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Phone' : 'رقم الهاتف'}
                        </div>
                        <input type='text' onChange={(e) => { setPhone(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                    </div>
                    <div className="dataItems" style={{ flexDirection: flexDir}}>
                        <div className="fieldName" style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, color: '#697386', marginLeft: marL}}>
                            {lagClick ? 'Birthday Year' : 'سنة الميلاد'}
                        </div>
                        <input type='text' onChange={(e) => { setBirthYear(e.target.value) }} className="field" style={{ flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
                    </div>
                    <button type='submit' onClick={submit} className='loginBtn create2' style={{textDecoration: 'none', marginBottom: '0px', border: 'none'}}>
                        {lagClick ? 'Complete signup  →' : '←  إكمال إنشاء الحساب'}
                    </button>
                    <button className='loginBtn create2' style={{textDecoration: 'none', marginTop: window.innerWidth <= 768 ? '10px' : '20px', background: '#7C8495', border: 'none'}} onClick={() => {setShow1(''); setShow2('none')}}>
                        {lagClick ? 'Back  ←' : '→  للخلف'}
                    </button>
                    <span className='d-flex sign' style={{textAlign: lagClick ? 'left' : '', flexDirection: flexDir, marginTop: '-15px'}}>
                        <span style={{ marginLeft: window.innerWidth <= 768 ? lagClick ? '27px' : '10px' : lagClick ? '70px' : '15px', 
                         marginRight: window.innerWidth <= 768 ? lagClick ? '10px' : '57px' : lagClick ? '10px' : '127px', color: '#697386'}}>
                            {lagClick ? 'Don’t have an account!' : 'تمتلك حساب بالفعل'}
                        </span>
                        <Link to='/login' style={{color: '#D375B9', textDecoration: 'none'}}>{lagClick ? 'Login' : 'تسجيل الدخول'}</Link>
                    </span>
                </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Signup
