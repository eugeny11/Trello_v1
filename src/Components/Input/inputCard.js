import { Button, IconButton, InputBase, Paper } from '@material-ui/core'
import React, {useState, useContext} from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { makeStyles, fade } from '@material-ui/core'
import storeApi from '../../Utils/storeApi'

const useStyle = makeStyles((theme) => ({
    card: {
        paddingBottom: theme.spacing(4),
        margin: theme.spacing(0,1,1,1)
    },
    input: {
        margin: theme.spacing(1)
    },
    btnConfirm: {
        background: '#5AAC44',
        color: '#fff',
        '&:hover' :{
            background: fade('#5AAC44',0.25)
        }
    },
    confirm: {
        margin: theme.spacing(0,1,1,1)
    }
    }))

export default function InputCard({setOpen, listId, type}){
    const classes = useStyle()
    const {addMoreCards, addMoreLists} = useContext(storeApi)
    const [title, setTitle] = useState('')
    
    const handleOnChange = (e) => {
        setTitle(e.target.value)
    }
    const handleBtnConfirm = () => {
        if (type === 'card'){
        addMoreCards(title, listId)
        setTitle('')
        setOpen(false)
    } else {
        addMoreLists(title)
        setTitle('')
        setOpen(false)
    }
    }

    return(
        <div>
            <div>
            <Paper className={classes.card}>
                <InputBase
                onChange={handleOnChange}
                multiline
                onBlur={() => setOpen(false)}
                fullWidth 
                inputProps={{
                    className:classes.input
                    }}
                value={title}
                placeholder={type ==='card'?
                'Enter a title of this card...':
                'Enter list title...'}
                    />
            </Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
                    { type ==='card' ? '+ Add card' : ' + Add list'}
                    </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <ClearIcon />
                </IconButton>
            </div>
        </div>
    )
}