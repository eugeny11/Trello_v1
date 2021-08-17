import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import List from './Components/List/List';
import store from './Utils/Store'
import storeApi from './Utils/storeApi'
import { makeStyles } from '@material-ui/core/styles'
import InputContainer from './Components/Input/inputContainer';

const useStyle = makeStyles((theme) => ({
root:{
 display: 'flex',
 minHeight: '100vh'
}
}))

export default function App() {
  const [data,setData] = useState(store)
  const classes = useStyle()

  const addMoreCards = (title, listId) => {
    const newCardId = uuidv4()
    const newCard = {
      id: newCardId,
      title,
    }

    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]: list,
      }
    }

    setData(newState)
  }

  const addMoreLists = (title) => {
    const newListId = uuidv4()
    const newList = {
      id: newListId,
      title,
      cards:[],
    }

    const newState = {
      listIds:[...data.listIds,newListId],
      lists:{...data.lists,
      [newListId]:newList},
    }

    setData(newState)
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId]
    list.title = title

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]:list
      }
    }

    setData(newState)
  }

  return (
    <storeApi.Provider value={{addMoreCards, addMoreLists, updateListTitle}}>
    <div className={classes.root}> 
    {data.listIds.map((listId) => {
      const list = data.lists[listId]
      return <List list={list} key={listId}/>
})}
    <InputContainer type='list' />
    </div>
    </storeApi.Provider>
  )}
