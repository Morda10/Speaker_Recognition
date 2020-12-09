import React from 'react'
import Axios from 'axios'
import { Button } from '@material-ui/core'

export const ActivatePython = () => {

    const activatePython = async () => {
        const values = {
          userName: "mor",
          data: ["1","54"]
        }
        const res = await Axios.post("api/sample/python",values)
        console.log(res)
      }

    return (
        <div>
             <Button onClick={()=>{activatePython()}}>Activate python</Button>
        </div>
    )
}
