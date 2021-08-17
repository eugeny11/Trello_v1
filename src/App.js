import React, {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import List from './Components/List/List';
import store from './Utils/Store'
import storeApi from './Utils/storeApi'
import { makeStyles } from '@material-ui/core/styles'
import InputContainer from './Components/Input/inputContainer';
import { DragDropContext } from 'react-beautiful-dnd'

const useStyle = makeStyles((theme) => ({
root:{
 display: 'flex',
 minHeight: '100vh',
 width:'100%',
 overflowY:'auto'
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

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result

    if (!destination){
      return;
    }

    const sourceList = data.lists[source.dropabbleId]
    const destinationList = data.lists[destination.dropabbleId]
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId)[0];

    if (source.dropabbleId === destination.dropabbleId){
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)
    }

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [sourceList.id]:destinationList
      }
    }

    setData(newState)
  }

  return (
    <storeApi.Provider value={{addMoreCards, addMoreLists, updateListTitle}}>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={classes.root}> 
            {data.listIds.map((listId, index) => {
              const list = data.lists[listId]
              return <List list={list} key={listId} index={index}/>
            })}
            <InputContainer type='list' />
            </div>
      </DragDropContext>
    </storeApi.Provider>
  )}
