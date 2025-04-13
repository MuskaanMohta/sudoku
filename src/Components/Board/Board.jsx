import React from 'react'
import Square from './Square'
import { useGame } from '../../store/gameStore';

export default function Board() {
   
    const {changeQBoard,mode,mistake,totalMistakes,time,isPause,isComplete,tryAgain,startGame} = useGame()
    const numbers=Array(9).fill(null);
    const squares = Array(3).fill(Array(3).fill(null));
    function formateTime(seconds){
        seconds=Math.max(0,Math.floor(seconds))
        const minutes=Math.floor(seconds/60)
        const remainingSeconds=seconds%60
        const minutesFormatted=String(minutes).padStart(2,"0")
        const secondsFormatted=String(remainingSeconds).padStart(2,"0")
        return `${minutesFormatted}:${secondsFormatted}`
    }

    return (
        <div className='flex w-screen h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative'>
            {isPause && (<span className='absolute z-10 w-full p-10 text-6xl text-center -translate-x-1/2 -translate-y-1/2 border border-black shadow-lg bg-slate-700 rounded-xl top-1/2 left-1/2 '>Pause</span>)}

            {isComplete && (<div className='absolute z-10 w-full p-10 text-2xl -translate-x-1/2 -translate-y-1/2 border border-black shadow-lg bg-slate-700 rounded-xl top-1/2 left-1/2'>
                {mistake>=totalMistakes?<span>All Mistakes Used</span>:<span>Very Good</span>}
                <div className='flex items-center justify-around p-5'>
                    <button onClick={()=>tryAgain()} className='p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'>Try Again</button>
                    <button onClick={()=>startGame(mode.key)} className='p-3 rounded-md bg-slate-900 hover:bg-slate-800 active:scale-90'>Start New</button>
                </div>
            </div>)}
            
            <div className='flex justify-around w-full pt-5 text-xl'>
                <p>Mode:<span>{mode.name}</span></p>
                <p>Mistakes:<span>{mistake}/{totalMistakes}</span></p>
                <p>Time:<span>{formateTime(time)}</span></p>
            </div>
            
            {squares.map((arr,row)=>(
                <div key={row} className= 'flex w-full h-full gap-2'>
                    {arr.map((_,col)=>(
                        <Square key={col} row={row} col={col}/>
                    ))}
                
                </div>
       
            ))}

            <div className='flex justify-around w-full select-none'>
                {numbers.map((_,i)=>(
                    <span key={i} onClick={()=>changeQBoard(i+1)} className='text-slate-200 bg-neutral-900 shadow-lg rounded-md p-2 hover:outline outline-[1px] md:px-3 my-5 text-2xl cursor-pointer'>{i+1}</span>
                ))}
            </div>

         </div>
            
            
    )
}


