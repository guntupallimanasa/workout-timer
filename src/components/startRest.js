import react, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { initialValue } = location.state;
    let { set } = initialValue;
    const [isTimers, setIsTimers] = useState({
        restTimer: true
    })
    let setValue;
    let getValue;

    let aa = window.localStorage.getItem('setVal');


    const [timersValue, setTimersValue] = useState({
        restValue: initialValue.rest
    })

    const [localVal, setLocalval] = useState(0)

    const displayHandler = () => {
        switch (true) {
            case ((isTimers.restTimer)): {
                return timersValue.restValue
            }
            default:
                console.log("soryyyyyyy");
        }
    }
    useEffect(() => {
        let countRest = initialValue.rest;
        let rest = null;
        switch (true) {
           
            case ((isTimers.restTimer)): {
                rest = setInterval(() => {
                    setTimersValue({ restValue: countRest});
                    countRest -=1;
                    if (countRest === -1) {
                        getValue = window.localStorage.getItem('setVal');
                        getValue--;
                        clearInterval(rest);
                        setIsTimers({ restTimer: false })
                        if(getValue>0){
                            setLocalval(getValue)
                        window.localStorage.setItem('setVal', getValue);
                            history.push('/startExercise',{initialValue});
                        }
                    }
                }, 1000);
            }
                break;
            default:
                console.log("soryyyyyyy");
        }

        return () => {
            clearInterval(rest);
        }
    }, [isTimers.restTimer]);

    const stopHandler = () => {
        history.push('/')
    }
    return <div>
        <h1>{initialValue.title}</h1>
      
        <h3>{
            (isTimers.restTimer) && 'Relax.....'
        }
        </h3>
        {
            `${aa}/${initialValue.set}`
       }
        <div className='timer'>
            {
            displayHandler()
            }
        </div>
        <br />
        <div onClick={stopHandler}>
            <svg class="AddCircleTwoTone" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 9h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" opacity=".3"></path><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
        </div>
    </div>

}