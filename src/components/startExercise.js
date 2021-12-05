import react, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();
    const location = useLocation();
    const { initialValue } = location.state;
    let aa = window.localStorage.getItem('setVal');
    const [isTimers, setIsTimers] = useState({
        exerciseTimer: true
    })
 
    const [timersValue, setTimersValue] = useState({
        exerciseValue: initialValue.exercise
    })

    const displayHandler = () => {
        switch (true) {
            case ((isTimers.exerciseTimer)): {
                return timersValue.exerciseValue
            }
           
            default:
                console.log("soryyyyyyy");
        }
    }
    useEffect(() => {
        let countExercise = initialValue.exercise;
        let exercise = null;
        switch (true) {
            case ((isTimers.exerciseTimer)): {
                exercise = setInterval(() => {
                    setTimersValue({exerciseValue:countExercise});
                    countExercise -=1;
                    if (countExercise === -1) {
                        clearInterval(exercise);
                        setIsTimers({ exerciseTimer: false})
                        history.push('/startrest',{initialValue});

                    }
                }, 1000);
            }
                break;

            default:
                console.log("soryyyyyyy");
        }

        return () => {
            clearInterval(exercise);
        }
    }, [isTimers.exerciseTimer]);

    const stopHandler = () => {
        history.push('/')
    }
    return <div>
        <h1>{initialValue.title}</h1>
        <h3>{
            (isTimers.exerciseTimer) && 'Exercise.....'
        }
        </h3>
        <br />
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