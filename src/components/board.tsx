import React, { useState, useEffect } from 'react'

type Players = "O"|"X"

const Board = () => {
   const [turn, setTurn] = useState<Players>("O")
   const [winner, setWinner] = useState<Players | null>(null)
   const [draw, setDraw] = useState<boolean | null>(null)
   const [marks, setMarks] = useState<{[key: string]: Players}>({}) // the state is an object and the key is a string and the value is the type players 

    const restartingGame = !!winner || !!draw

    const play = (index: number) => {

        if(marks[index] || restartingGame) {
            return
        }

        setMarks(history => ({...history, [index]:turn}))
        setTurn(history => history === "O" ? "X" : "O")
    }

    const defineWinner = () => {
        const checkLine = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ]

        for(const line of checkLine) {
            const [a, b, c] = line
            if(marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
                return marks[a]
            }
        }
    }

    const reset = () => {
        setMarks({})
        setWinner(null)
        setDraw(null)
    }

    useEffect(() => {
        const winner = defineWinner()
        
        if(winner) {
            setWinner(winner)
        } else if(Object.keys(marks).length === 9){
            setDraw(true)
        }
    },[marks])

   return (
        <div className='container'>
            {winner && <h1>{winner} Winner!!!</h1>}
            {draw && <h1>Tied game!</h1>}
            {restartingGame&&(<button onClick={reset}>Restart</button>)}
            <div className='board'>
                {Array.from({length: 9}).map((_,index)=>(
                <div className='cell' key={index} onClick={() => play(index)}>{marks[index]}</div>
                ))}
            </div>
        </div>
    )
}

export default Board