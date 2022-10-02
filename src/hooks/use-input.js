import { useState } from "react"

const useInput = (validateValue) =>{
    const [enteredData,setEnteredData] = useState('')
    const [touched,setTouched] = useState(false)

    const isValid = validateValue(enteredData)
    const hasError = !isValid && touched

    const dataChangeHandler  = (e) =>{
        setEnteredData(e.target.value)
    }

    const dataBlurHandler  = (e) =>{
        setTouched(true)
    }

    const reset=() =>{
        setEnteredData('');
        setTouched(false)
    }

    return {
        data:enteredData,
        isValid,
        hasError,
        dataChangeHandler,
        dataBlurHandler,
        reset
    }

}

export default useInput