import React, {useState, useEffect} from 'react';
import './App.css';
import { ticData } from './data/data';

function App() {
  const [data, setData] = useState(ticData)
  const [tictac, setTictac] = useState(1)
  const [scoreX, setScoreX] = useState(0)
  const [scoreO, setScoreO] = useState(0)
  const [draw, setDraw] = useState(0)
  const [haveWon, setHaveWon] = useState({
    x: false, 
    o: false,
    d: false
  })

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  useEffect(() => {
    let arrO = []
    let arrX = []
    data.map(item => {
      if(item.isX === true) {
        arrX.push(item.position - 1)
      }else if(item.isX === false && item.isClicked === true){
        arrO.push(item.position - 1)
      }
      return item
    })
    if(arrX.length >= 3 || arrO.length >= 3) {
      let drawArr = []
      for(let i = 0; i < win.length; i++) {
        let ansX = win[i].every(x => arrX.includes(x))
        if(ansX === true) {
          setScoreX(prev => prev + 1)
          setHaveWon({x: true, o: false, d: false})
          drawArr.push(true)
          break;
        }
        let ansO = win[i].every(o => arrO.includes(o))
        if(ansO === true) {
          setScoreO(prev => prev + 1)
          setHaveWon({x: false, o: true, d: false})
          drawArr.push(true)
          break;
        }
      }
      if(data.every(item => item.isClicked === true) && drawArr.length === 0) {
        setHaveWon({x: false, o: false, d: true})
        setDraw(prev => prev + 1)
      }
    }
  }, [data])

  const handleClick = (id) => {
    if(data[id - 1].isClicked !== true) {
      setTictac(prev => prev + 1)
    }
    setData(item => item.map(item => {
      if(item.id === id && item.isClicked !== true) {
        return {
          ...item,
          isX: tictac % 2 !== 0 ? true : false,
          isClicked: true
        }
      }
      return item
    }))
  }

  const handleReset = () => {
    setData(ticData)
    setHaveWon({x: false, o: false})
    setTictac(1)
  }

  return (
    <div className="App">
      <h1 style={{fontFamily: 'sans-serif'}}><span style={{color: haveWon.x ? '#25e022' : 'black'}}>X score: {scoreX}</span> | <span style={{color: haveWon.d ? '#edf255' : 'black'}}>Draw: {draw}</span> | <span style={{color: haveWon.o ? '#25e022' : 'black'}}>O score: {scoreO}</span></h1>
      <div className='tic-tac-div'>
        {data.map(tic => {
          return <div 
            className='tic-tac'
            key={tic.id}
            onClick={() => !(haveWon.o || haveWon.x || haveWon.d) && handleClick(tic.id)}
          >
            {tic.isClicked === true && (tic.isX === true ? <div className='x'></div> : <div className='o'></div>)}
          </div>
        })}
      </div>
      <button type='button' className='btn' onClick={handleReset}>{(haveWon.o === true || haveWon.x === true || haveWon.d === true) ? 'Play again' : 'Reset'}</button>
    </div>
  );
}

export default App;
