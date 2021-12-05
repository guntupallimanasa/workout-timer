import react, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { initialValue } = location.state;
    const [isTimers, setIsTimers] = useState({
        getReadyTimer: true,
    })

    const [timersValue, setTimersValue] = useState({
        getReadyValue: 3,
    })

    const displayHandler = () => {

        switch (true) {
            case ((isTimers.getReadyTimer)): {
                return timersValue.getReadyValue;
            }
            
            default:
                console.log("soryyyyyyy");
        }
    }

    useEffect(() => {
        let setGoValue = 3
       
        let ready = null;

        switch (true) {
            case ((isTimers.getReadyTimer)): {
                ready = setInterval(() => {
                    setGoValue -= 1;
                    setTimersValue({ getReadyValue:setGoValue });
                    if (setGoValue === 0) {
                        clearInterval(ready);
                        setIsTimers({ getReadyTimer: false });
                        history.push('/startExercise',{initialValue});
                    }
                }, 1000)
            }
                break;
            default:
                console.log("soryyyyyyy");
        }

        return () => {
            clearInterval(ready);
        }
    }, [isTimers.getReadyTimer]);

    const stopHandler = () => {
        history.push('/')
    }
    return <div>
        <h1>{initialValue.title}</h1>
        <h3>{
            (isTimers.getReadyTimer) && 'Get Ready...'
        }
        </h3>
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