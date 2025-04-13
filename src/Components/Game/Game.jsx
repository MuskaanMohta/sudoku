import React, { useEffect, useRef } from 'react'
import Board from '../Board/Board'
import { Lightbulb, LogOut, Pause, PencilLine, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../store/gameStore'

const Game = () => {
  const navigate = useNavigate()
  const timeRef = useRef()

  const {isStart,increaseTime,isPause,pauseGame,time,isComplete,quitGame,pencilMode,togglePencilMode,usedHint,hints,resetQBoard} = useGame()
  useEffect(()=>{
    if(!isStart)
      navigate("/")
    
    timeRef.current=setInterval(()=>{
      if(!isPause && !isComplete)
        increaseTime()
    },1000)
    return ()=>clearInterval(timeRef.current)
  },[isPause,time,isComplete,isStart,increaseTime,navigate,usedHint])

  return (
    <div className='flex flex-col items-center justify-center'>
      <Board />
      <div className='flex items-center justify-around w-full'>
        <button onClick={()=>quitGame()} className='p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'><LogOut /></button>
        <button onClick={()=>pauseGame()} className='p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'>{!isPause?<Pause />:<Play/>}</button>
        <button onClick={()=>resetQBoard()} className='p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'>Reset</button>
        <button onClick={()=>togglePencilMode()} className={`p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90 ${pencilMode&&"text-green-500"}`}><PencilLine /></button>
        <button onClick={()=>usedHint()} className='relative p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'>
          <span className='absolute flex items-center justify-center w-6 h-6 p-2 text-xl text-center text-white bg-blue-700 rounded-full -right-3 -top-3'>{hints}</span>
          <Lightbulb /></button>
      </div>
    </div>
  )
}

export default Game
