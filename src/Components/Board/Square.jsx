import React from 'react'
import Cell from './Cell'

function Square({row,col}) {
  const squares = Array(3).fill(Array(3).fill(null))  
  return (
    <div className='flex flex-col w-full h-full gap-1 box'>
      
        {squares.map((arr,i)=>(
            <div key={i} className='flex w-full h-full gap-1'>
                {arr.map((_,k)=>(
                    <Cell key={k} row={row*3+i} col={col*3+k}/>
                ))}
            </div>
        ))}
        
        
      
    </div>
  )
}

export default Square
