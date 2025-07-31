import React, { useState, useEffect, useMemo } from 'react'
import { handleFlip } from '../utils/handleFlip'
import { useSelector, useDispatch } from 'react-redux'
import { setMultiplier, betAmt, SetbetState, SetautorevealState, Setautogamingstate, toggleAutoGame, toggleMenu, togglehowtoplay, revealedFalse, togglefooter, togglemain, revealedOne, revealRandom, changeMines, boxesSet, SetbetBoxes } from '../features/mines/mineSlices'
import { calculateSpribeMultiplier } from '../utils/multiplier'
import { MdOutlineAutorenew } from "react-icons/md";
import Mainboxes from './Maincomponents/Mainboxes'
import Picknumber from './Maincomponents/Picknumber'


const Main = () => {
  const minesCount = useSelector(state => state.minesCount)
  const multiplier = useSelector(state => state.multiplier);
  const boxes = useSelector(state => state.boxes)
  const revealed = useSelector(state => state.revealed)
  const soundSelector = useSelector(state => state.soundSelector)
  const autogameSelector = useSelector(state => state.autoGame)
  const betBoxes = useSelector(state => state.betBoxes)
  const betState = useSelector(state => state.betState)
  const autorevealState = useSelector(state => state.autorevealState)
  const autogamingstate = useSelector(state => state.autogamingstate)
  const [maindisable, setMaindisable] = useState(true)
  const mainselector = useSelector(state => state.disablemain)
  const footerselector = useSelector(state => state.disablefooter)
  const flipTrigger = useSelector(state => state.flipTrigger)
  const bettingstate = useSelector(state => state.bettingstate)

  const dispatch = useDispatch()

  useEffect(() => {
    resetGame();
  }, [minesCount]);

  let safeClickCountauto = useMemo(() => {
    return betBoxes.filter(v => v === true).length;
  }, [betBoxes]);

  const resetGame = () => {
    const newBoxes = Array(36).fill("unsafe")
    let index = 0
    while (index < 10) {
      const random = Math.floor(Math.random() * newBoxes.length)
      if (newBoxes[random] !== "safe") {
        newBoxes[random] = "safe"
        index++
      }
    }

    setMaindisable(true)
    dispatch(togglemain(true))
    dispatch(boxesSet(newBoxes))
    dispatch(revealedFalse())
    dispatch(SetbetBoxes())
    // setRevealed(Array(5 * 5).fill(false))
  }

  const selectRandom = async () => {
    if (bettingstate == false) {
      dispatch(togglehowtoplay(false))
      dispatch(toggleMenu(false))
      dispatch(revealedFalse())
      dispatch(SetbetState(true))
      dispatch(SetbetBoxes())
      if (autogameSelector == false) {


        let random = []
        let index = 0
        while (index < 10) {
          let randomnumber = Math.floor(Math.random() * 36)

          if (random.filter((num) => num == randomnumber).length > 0) {

          } else {
            random.push(randomnumber)
            dispatch(revealRandom(random[index]))

            index++
          }
        }



        // if (boxes[random] == "mines") {
        //   let minestapsound = "/sounds/lose.mp3"
        //   let audio = new Audio(minestapsound)
        //   if (soundSelector) {
        //     audio.play()
        //   }
        //   dispatch(revealAll())
        //   handleFlip(dispatch)
        //   dispatch(togglefooter(false))
        //   dispatch(togglemain(true))
        //   dispatch(SetbetState(!betState))
        // } else {
        //   let minestapsound = "/sounds/star-click.mp3"
        //   let audio = new Audio(minestapsound)
        //   if (soundSelector) {
        //     audio.play()
        //   }
        // }

      }
      if (footerselector && autogameSelector) {
        const random = Math.floor(Math.random() * 25)
        if (selectAutoBoxes[random] == false) {
          let minestapsound = "/sounds/star-click.mp3"
          let audio = new Audio(minestapsound)
          if (soundSelector) {
            audio.play()
          }
          if (25 - minesCount > safeClickCountauto) {
            dispatch(selectAutoOne(random))
          }
        }
        else {
          selectRandom()
        }
      }
    }
  }

  const safeClickCountlength = useMemo(() => {
    return revealed.filter(v => v === true).length;
  }, [revealed]);

  const safeClickCount = useMemo(() => {
    return revealed.filter(v => v === true);
  }, [revealed]);

  const autoGameFunction = () => {

    if (!betState) {
      resetGame()
      dispatch(toggleAutoGame(!autogameSelector))
      dispatch(togglefooter(!footerselector))
      dispatch(togglemain(!mainselector))
      dispatch(SetselectAutoBoxes())
      dispatch(SetautorevealState(false))
    } else {

    }
  }
  const clearGame = () => {
    if (bettingstate == false) {
      resetGame()
    }

  }

  useEffect(() => {
    if (!autogameSelector) {
      const newMultiplier = calculateSpribeMultiplier(safeClickCountlength, 7);
      dispatch(setMultiplier(newMultiplier));
    } else {
      const newMultiplier = calculateSpribeMultiplier(safeClickCountauto, minesCount);
      dispatch(setMultiplier(newMultiplier));
    }

  }, [safeClickCountlength, minesCount, flipTrigger, safeClickCountauto])


  return (
    <main className={`flex flex-col justify-between items-center md:h-8/10 h-8/12  `}>
      <Picknumber />
      <Mainboxes />
      <div className='flex md:w-[45%] w-9/10 h-8 justify-between items-center mt-3 mb-2 space-x-1'>
        <div onClick={selectRandom} className={`w-1/2 inset-shadow-[0px_0.6px_0px_#C0325B] shadow-[1px_1px_1px_rgb(0,0,0)] cursor-pointer bg-[#CA0348]  border border-[#56011F] rounded-xl flex justify-center items-center text-white font-semibold font-sans ${(autogamingstate || bettingstate) ? "disable-div" : ""}`}>
          RANDOM
        </div>
        <div onClick={clearGame} className={`${((safeClickCountlength <= 0) || bettingstate) ? "disable-div" : ""} w-1/2 inset-shadow-[0px_0.6px_0px_#C0325B] shadow-[1px_1px_1px_rgb(0,0,0)] bg-[#CA0348] cursor-pointer border border-[#56011F] rounded-xl flex justify-center items-center text-white font-semibold font-sans `}>
          CLEAR
        </div>
      </div>
    </main>
  )
}

export default Main