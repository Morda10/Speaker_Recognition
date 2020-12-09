import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as randWords from 'random-words' 
import { Button } from '@material-ui/core'

export const SpawnRandWord = ({spawn, show}) => {
    const [word, setWord] = useState("")

    useEffect(() => {
        setWord(randWords())
    }, [spawn, show])


    return (
        <div>
            {show ?<b>{word}</b> : null}
            
        </div>
    )
}
