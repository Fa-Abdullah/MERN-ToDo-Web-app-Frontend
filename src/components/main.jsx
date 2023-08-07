import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import './main.css'
import pinkLogo from '../imgs/pink logo.png'
import logoText from '../imgs/logoText.png'
import light from '../imgs/light.png'
import dark from '../imgs/dark icon.png'
import userIcon from '../imgs/user.png'
import Ar from '../imgs/Ar.png'
import En from '../imgs/En.png'
import lightUp from '../imgs/light up page.jpg'
import darkUp from '../imgs/dark up page.jpg'
import wrong from '../imgs/wrong sign.png'
import openEye from '../imgs/eye open.png'
import closeEye from '../imgs/eye close.png'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";


const Main = props => { 

    const location=useLocation()
    
    const [lagClick, setLagClick] = useState(true);

    const toggleLagClick = () => {
      setLagClick(!lagClick);
    };

    let lag = lagClick ? Ar : En ;
    let flexDir = lagClick ? 'row' : 'row-reverse';
    let marg = lagClick ? 'auto' : '0px'
    let margin = lagClick ? '0px' : 'auto'
    let dis = lagClick ? 'block' : 'none'
    let display = lagClick ? 'none' : 'block'
    let inBox = lagClick ? '        Create a new todo…' : '…انشاء ملاحظة جديدة        '
    let current = lagClick ? ' items left' : 'ملاحظات متبقية'
    let all = lagClick ? 'All' : 'الكل'
    let complete = lagClick ? 'Completed' : 'منتهى'
    let left = lagClick ? 'Active' : 'متبقى'
    let btnText = lagClick ? 'Clear Completed' : 'مسح ما تم إنهاؤه'

    ////------------------------------------------------------------------------------
    const [backClick , setBackClick] = useState(true);

    const toggleBackClick = () => {
        setBackClick(!backClick);
    };

    let back = backClick ? 'white' : '#25273D'
    let pwColor = backClick ? '#D375B9' : 'white'
    let conBack = backClick ? '#FAFAFA' : '#241229'
    let color = backClick ? 'black' : 'white'
    let backIcon = backClick ? dark : light
    let img = backClick ? lightUp : darkUp

    ////--------------------------------------------------------------------
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tasks`, {
        params: {
          email: location.state.email // Replace with the actual email
        }
      })
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    });

    const handleTaskCreate = (newTask) => {
      axios.post(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tasks`, newTask, {
        params: {
          email: location.state.email // Replace with the actual email
        }
      }) // Update the URL to your backend API endpoint
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error creating task:', error);
        });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const input = event.target.value;
      if (input === '') {
        return;
      }
      const newTask = { task: input, done: false };
  
      handleTaskCreate(newTask);
  
      event.target.value = '';
    };

    const handleTaskDelete = (taskId) => {
      axios.delete(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tasks/${taskId}`, {
        params: {
          email: location.state.email
        }
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
    };

    const handleDelete = (taskToDelete) => {
      handleTaskDelete(taskToDelete);
    };

  
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        handleSubmit(event);
      }
    };

    const handleTaskStatusUpdate = (taskId, newState) => {
      axios.put(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tasks/${taskId}`, null, {
        params: {
          email: location.state.email, // Replace with the actual email
          done:newState
        }
      }) // Update the URL to your backend API endpoint
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error updating task status:', error);
        });
    };

    const handleDone = (task,done) => {
      const newDoneStatus = !done;
      handleTaskStatusUpdate(task, newDoneStatus);
    };
    

    const quantity = tasks.filter((task) => !task.done).length;
    let hi = lagClick ? 'hi' : 'مرحبا'

    ////--------------------------------------------------------------------------------------------
    const [user , setUser] = useState(false)

    const userClick = () => {
      setUser(!user)
    }

    let userDisplay = user ? 'block' : 'none'

    ////-------------------------------------------------------------------------------------------
    const [filter, setFilter] = useState('all');
    
    const DeleteCompletedTasks = (email) => {
      axios
        .delete(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/tasks`, {
          params: {
            email: location.state.email 
          }
        }) // Update the URL to your backend API endpoint
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error('Error deleting tasks:', error);
        });
    };

    const handleFilter = (newFilter) => {
      setFilter(newFilter);
    };

    let filteredTasks = tasks;

    if (filter === 'notCompleted') {
      filteredTasks = tasks.filter((task) => !task.done);
    } else if (filter === 'completed') {
      filteredTasks = tasks.filter((task) => task.done);
    }

    const marginLeft = window.innerWidth <= 768 ? lagClick ? '-140px' : '0px' :  lagClick ? '96px' : '85px'
    const marginRight = window.innerWidth <= 768 ? lagClick ? '0px' : '-90px' :  lagClick ? '85px' : '96px'

    ////------------------------------------------------------------------------------------------------------

    const [type , setType] = useState(true)

    let inputType = type ? 'password' : 'text'

    const handleInputType = () =>{
      setType(!type)
    }

    let eye = type ? closeEye : openEye

    ////-------------------------------------------------------------------------------------------------------------

    const [show1 , setShow1] = useState('')
    const [show2 , setShow2] = useState('none')

    ////---------------------------------------------------------------------------------------------------------------

    const [password, setPassword] = useState(location.state.password);
    const [name, setName] = useState(location.state.id);
    const [phone, setPhone] = useState(location.state.phone);
    const [birthYear, setBirthYear] = useState(location.state.birthYear);

    async function saveChanges(e){
      e.preventDefault();

      try{
          await axios.post(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/profile`,{
              email:location.state.email,password,phone,name,birthYear,tasks
          })
          .then(res=>{
              if(res.data){
                  console.log(res.data)
                  alert("successful change, when you Login again will see your new data")
              }
              else{
                 alert("something is wrong") 
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

  return (
    <React.Fragment>
        <div name="viewport" content="width=device-width, initial-scale=1.0" style={{}}>
          <nav className="nav" style={{ flexDirection: flexDir , background: conBack}}>
              <div className='logo' style={{}}>
                  <img className='pinkLogo logoItem' src={pinkLogo} alt='' style={{}}></img>
                  <img className='logoText logoItem' src={logoText} alt='' style={{}}></img>
              </div>   
              <div className='btns' style={{marginLeft: marg , marginRight: margin ,  flexDirection: flexDir , display: dis}}>
                  <button className='navBtn' onClick={toggleLagClick}>
                      <img className='btnImg' src={lag} alt=''></img>
                  </button>
                  <button className='navBtn' onClick={toggleBackClick}>
                      <img className='btnImg' src={backIcon} alt='' style={{}}></img>
                  </button>
                  <button className='navBtn' onClick={userClick}>
                      <img className='btnImg' src={userIcon} alt=''></img>
                  </button>
              </div>
              <div className='btns' style={{marginLeft: marg , marginRight: margin ,  flexDirection: flexDir , display: display }}>
                  <button className='navBtn' onClick={userClick}>
                      <img className='btnImg' src={userIcon} alt=''></img>
                  </button>
                  <button className='navBtn' onClick={toggleBackClick}>
                      <img className='btnImg' src={backIcon} alt='' style={{}}></img>
                  </button>
                  <button className='navBtn' onClick={toggleLagClick}>
                      <img className='btnImg' src={lag} alt=''></img>
                  </button>
              </div>
          </nav>
            <img className="upImg" src={img} alt=""></img>
          <div className='cont' style={{background: conBack, alignItems:"center", flexDirection: flexDir, display: show1}}>
            <form>
              <input type="text" name="taskInput" onKeyDown={handleKeyDown} className="input" style={{background: back, color: color, flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} placeholder={inBox}/>
            </form>
            <div className="tasks" style={{background: back, color: color, flexDirection: flexDir}}>
                {Array.isArray(filteredTasks) &&
                filteredTasks.map((task) => (
                <div key={task._id}>
                  <div className="d-flex task" style={{flexDirection: flexDir}}>
                    <div className="checkbox">
                      <input type="checkbox" checked={task.done} onChange={() => handleDone(task._id, task.done)} />
                    </div>
                    <p className={task.done ? 'done text' : 'text'} style={{ flexDirection: flexDir }}>{task.task}</p>
                    <span style={{marginLeft: marg , marginRight: margin, cursor: 'pointer'}} onClick={() => handleDelete(task._id)}>
                      <img src={wrong} alt="" className="wrong"></img>
                    </span>
                  </div>
                  <span className="line" style={{position:"absolute" ,background: backClick ? '#E3E4F1' : '#393A4B' }}></span>
                </div>
              ))}
                <div className="lastPart" style={{flexDirection: flexDir}}>
                  <span className="span del quantity d-flex" style={{color : '#9495A5',
                   marginRight: window.innerWidth <= 768 ? lagClick ? '25px' : '0px' :  lagClick ? '0px' : '35px', flexDirection: flexDir, gap: '5px', }}>
                    <div>{quantity}</div>
                    <div>{current}</div>
                  </span>
                  <span className="d-flex half" style={{marginLeft: marginLeft , marginRight: marginRight , flexDirection: flexDir, background: back}}>
                    <span className="span all" style={{color : '#D375B9'}} onClick={() => handleFilter('all')}>{all}</span>
                    <span className="span left" style={{color : backClick ? '#9495A5' : '#E3E4F1'}} onClick={() => handleFilter('notCompleted')}>{left}</span>
                    <span className="span comp" style={{color : '#9495A5'}} onClick={() => handleFilter('completed')}>{complete}</span>
                  </span>
                  <span className="span del clear" style={{color : backClick ? '#9495A5' : '#E3E4F1', marginRight: window.innerWidth <= 768 ? lagClick ? '-px' : '-105px' :  lagClick ? '' : '40px',
                   flexDirection: flexDir}} onClick={DeleteCompletedTasks}>{btnText}</span>
                </div>
            </div>
            <div className="userBtn" style={{background: back, marginLeft: lagClick ? '1045px' : '53px', marginRight: lagClick ? '53px' : '1610px', display: userDisplay}}>
              <div className="hi" style={{flexDirection: flexDir, marginLeft:lagClick ?  window.innerWidth <= 768 ? 'auto' : '72px' :  window.innerWidth <= 768 ? 'auto' : '-102px', marginRight: window.innerWidth <= 768 ? 'auto' : lagClick ? '' : '67px' }}>
                <div>{hi}</div>
                <div style={{marginLeft: '0px', marginRight: '0px'}}>{location.state.id}</div>
              </div>
              <button className="userBtns" onClick={() => {setShow1('none');setShow2('')}} style={{border: 'none',color: back, background: backClick ? '#7C8495' : '#fff', marginLeft: 'auto', marginRight: 'auto'}} dir="rtl">{lagClick ? 'Modify User info' : 'تعديل بيانات الحساب'}</button>
              <Link to='/' className="userBtns create2" style={{background: '#D375B9', color: '#fff', marginLeft: 'auto', marginRight: 'auto'}}>{lagClick ? 'Logout' : 'تسجيل الخروج'}</Link>
            </div>
          </div>

          <div className='cont' style={{background: conBack, alignItems:"center", flexDirection: flexDir, display: show2}}>
          <span className="Modify" style={{background: back, color: pwColor, flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}}>
            {lagClick ? 'Modify User Information' : 'تعديل بيانات الحساب'}
          </span>
          <div className="data" style={{background: back, flexDirection: flexDir}}>
            <div className="dataItems" style={{background: back, flexDirection: flexDir}}>
              <div className="fieldName" style={{textAlign: lagClick ? 'left' : 'right', flexDirection: flexDir, color: '#697386'}}>
                {lagClick ? 'Email' : 'الحساب'}            
              </div>
              <input type="email" value={location.state.email} readOnly={true} className="field" style={{color: backClick ? '#9495A5' : 'white',background: backClick ? 'white' : '#404363', flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
            </div>
            <div className="dataItems" style={{background: back, flexDirection: flexDir}}>
              <div className="fieldName" style={{textAlign: lagClick ? 'left' : 'right', flexDirection: flexDir, color: '#697386'}}>
                {lagClick ? 'Password' : 'الرقم السرى'}
              </div>
              <input type={inputType} value={password} onChange={(e) => { setPassword(e.target.value) }} className="field" style={{color: backClick ? '#9495A5' : 'white',background: backClick ? 'white' : '#404363', flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
              <span onClick={handleInputType} style={{marginLeft: window.innerWidth <= 768 ? (lagClick ? '280px' : '12px') : (lagClick ? '360px' : '12px'), 
              width: '24.072px', height: '24px', marginTop: '-37px', position: 'absolute'}}>
                <img src={eye} alt="" style={{width: '24.072px', height: '24px'}}></img>
              </span>
            </div>
            <div className="dataItems" style={{background: back, flexDirection: flexDir}}>
              <div className="fieldName" style={{textAlign: lagClick ? 'left' : 'right', flexDirection: flexDir, color: '#697386'}}>
                {lagClick ? 'Username' : 'اسم المستخدم'}
              </div>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} className="field" style={{color: backClick ? '#9495A5' : 'white',background: backClick ? 'white' : '#404363', flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
            </div>
            <div className="dataItems" style={{background: back, flexDirection: flexDir}}>
              <div className="fieldName" style={{textAlign: lagClick ? 'left' : 'right', flexDirection: flexDir, color: '#697386'}}>
                {lagClick ? 'Phone' : 'رقم الهاتف'}
              </div>
              < input type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} className="field" style={{color: backClick ? '#9495A5' : 'white',background: backClick ? 'white' : '#404363', flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
              </div>
              <div className="dataItems" style={{background: back, flexDirection: flexDir}}>
                <div className="fieldName" style={{textAlign: lagClick ? 'left' : 'right', flexDirection: flexDir, color: '#697386'}}>
                  {lagClick ? 'Birthday Year' : 'سنة الميلاد'}
                </div>
                <input type="text" value={birthYear} onChange={(e) => { setBirthYear(e.target.value) }} className="field" style={{color: backClick ? '#9495A5' : 'white',background: backClick ? 'white' : '#404363', flexDirection: flexDir, textAlign: lagClick ? 'left' : 'right'}} name="taskInput"/>
              </div>
            </div>
            <button onClick={saveChanges} className="change" style={{border: 'none'}}>
              {lagClick ? 'Save Changes' : 'حفظ التعديلات'}
            </button>
            <div className="userBtn" style={{background: back, marginLeft: lagClick ? '1045px' : '53px', marginRight: lagClick ? '53px' : '1610px', display: userDisplay}}>
            <div className="hi" style={{ fontWeight: '700', flexDirection: flexDir, color: '#D375B9', marginLeft: '80px', marginRight: '75px', marginTop: '34px', marginBottom: '57px', gap: '10px', display: "flex"}}>
              <div>{hi}</div>
              <div style={{marginLeft: '0px', marginRight: '0px'}}>{location.state.id}</div>
            </div>
            <button className="userBtns" onClick={() => {setShow1('');setShow2('none')}} style={{border: 'none',color: back, background: backClick ? '#7C8495' : '#fff'}} dir="rtl">{lagClick ? 'back' : 'العودة'}</button>
            <Link to='/' className="userBtns create2" style={{background: '#D375B9', color: '#fff', marginLeft: 'auto', marginRight: 'auto'}}>{lagClick ? 'Logout' : 'تسجيل الخروج'}</Link>
          </div>
          </div>
            
        </div>
        <style>
          {`
          body{
            background-color:${conBack}
          }
          `}
        </style>
    </React.Fragment>
  )
}

export default Main
