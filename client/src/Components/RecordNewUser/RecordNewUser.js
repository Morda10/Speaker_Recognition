import { Box, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { SpawnRandWord } from '../AddUser/SpawnRandWord'

export const RecordNewUser = () => {
    const [spawn, setSpawn] = useState(0)
    const [show, setShow] = useState(false)

    const handleClicked = () => {
        setSpawn(spawn+1)
        if(!show) setShow(true)
    }

    return (
        <Box align="center">
            <Button  onClick={()=>handleClicked()} style={{margin: "1rem"}}>Spawn Word</Button>
            <SpawnRandWord spawn={spawn} show={show} />
        </Box>
    )
}
