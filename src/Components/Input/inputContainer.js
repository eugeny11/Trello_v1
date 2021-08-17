import React, {useState} from 'react'
import { Collapse, fade, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import InputCard from './inputCard'

const useStyle = makeStyles((theme) => ({
    addCard : {
        padding: theme.spacing(1,1,1,2),
        margin: theme.spacing(0,1,1,1),
        background: '#EBECF0',
        '&:hover':{
            backgroundColor: fade('#000', 0.25)
        }
    },
    root :{
        width:'300px',
        marginTop: theme.spacing(1)
    }
    }))

export default function InputContainer({listId, type}){
    const classes = useStyle()
    const [open, setOpen] = useState(false)
    return(
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type}/>
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={0}
                onClick={() => setOpen(!open)}>
                    <Typography>
                    { type ==='card' ? '+ Add card' : ' + Add list'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}