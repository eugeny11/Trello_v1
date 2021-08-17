import { InputBase, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, {useState, useContext} from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import storeApi from '../../Utils/storeApi'

const useStyle = makeStyles((theme) => ({
    editableTitle :{
        flexGrow: 1,
        fontSize:'1.2rem',
        fontWeight:'bold'
    },
    editableTitleContainer :{
        margin: theme.spacing(1),
        display: 'flex'
    },
    input:{
        margin: theme.spacing(1),
        fontSize:'1.2rem',
        fontWeight:'bold',
        '&:focus':{
            background: '#ddd'
        }
    }
    }))

export default function Title({title, listId}){
    const [open,setOpen] = useState(false)
    const [newTitle,setNewTitle] = useState(title)
    const {updateListTitle} = useContext(storeApi)
    const classes = useStyle()

    const handleOnChange = (e) => {
        setNewTitle(e.target.value)
    }

    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(false)
    }

    return(
        <div>
            {open ? (
            <div>
                <InputBase 
                onChange={handleOnChange}
                autoFocus
                value={newTitle}
                inputProps = {{
                    className: classes.input
                }}
                fullWidth
                onBlur = {handleOnBlur}
                />
            </div>
                
            ) :(
            <div className={classes.editableTitleContainer}>
                <Typography onClick={() => setOpen(!open)} className={classes.editableTitle}>
                    {title}
                    </Typography>
                    <MoreHorizIcon/>
            </div>)}
        
        
        </div>
    )
}