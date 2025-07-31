import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleFlip } from '../../utils/handleFlip';
import { togglehowtoplay, toggleMenu, revealedOne, togglefooter, togglemain, SetbetState, SetbetBoxes, revealedFalse } from '../../features/mines/mineSlices'
import { FaStar } from "react-icons/fa";
import { PiBombFill } from "react-icons/pi";
import { FiDivideCircle } from 'react-icons/fi';

const Mainboxes = () => {
    const dispatch = useDispatch()
    const mainselector = useSelector(state => state.disablemain)
    const autogameSelector = useSelector(state => state.autoGame)
    const autogamingstate = useSelector(state => state.autogamingstate)
    const boxes = useSelector(state => state.boxes)
    const footerselector = useSelector(state => state.disablefooter)
    const soundSelector = useSelector(state => state.soundSelector)
    const minesCount = useSelector(state => state.minesCount)
    const betBoxes = useSelector(state => state.betBoxes)
    const revealed = useSelector(state => state.revealed)
    const flipTrigger = useSelector(state => state.flipTrigger)
    const autorevealState = useSelector(state => state.autorevealState)
    const betState = useSelector(state => state.betState)
    const autogamemultiplier = useSelector(state => state.multiplier)
    const bettingstate = useSelector(state => state.bettingstate)



    let safeClickCountauto = useMemo(() => {
        return betBoxes.filter(v => v === true).length;
    }, [betBoxes]);


    const safeClickCountlength = useMemo(() => {
        return revealed.filter(v => v === true).length;
    }, [revealed]);
    const safeClickCount = useMemo(() => {
        let revealnumarray = []
        revealed.forEach((element, index) => {
            if (element == true) {
                revealnumarray.push(index)
            }
        });
        return revealnumarray
    }, [revealed]);

    const hits = useMemo(() => {
        let hit = 0
        let index = 0
        while (index < 36) {
            if (revealed[index] == true) {
                if (revealed[index] == betBoxes[index]) {
                    hit++
                }
            }
            index++
        }
        return hit
    }, [revealed, betBoxes]);


    const handleBoxclick = (index) => {
        if (bettingstate == false) {
            dispatch(togglehowtoplay(false))
            dispatch(toggleMenu(false))
            dispatch(SetbetState(true))
            dispatch(SetbetBoxes())


            if (autogameSelector == false) {
                if (safeClickCount > 0) {
                    dispatch(revealedOne(index))
                } else {
                    dispatch(revealedOne(index))
                }
                // if (boxes[index] == "mines") {
                //     let minestapsound = "/sounds/lose.mp3"
                //     let audio = new Audio(minestapsound)
                //     if (soundSelector) {
                //         audio.play()
                //     }

                //     // const revealall = Array(5 * 5).fill("true")
                //     // setRevealed(revealall)

                //     dispatch(revealAll())
                //     handleFlip(dispatch)

                //     dispatch(togglefooter(false))
                //     dispatch(togglemain(true))
                //     dispatch(SetbetState(!betState))


                // } else {
                //     let minestapsound = "/sounds/star-click.mp3"
                //     let audio = new Audio(minestapsound)
                //     if (soundSelector) {
                //         audio.play()
                //     }
                // }

            }

            if (footerselector && autogameSelector) {
                let minestapsound = "/sounds/star-click.mp3"
                let audio = new Audio(minestapsound)
                if (soundSelector) {
                    audio.play()
                }
                if (25 - minesCount > safeClickCountauto) {
                    dispatch(selectAutoOne(index))
                } else {
                    dispatch(selectAutoOne(index))
                }
            }
        }
    }



    return (
        <div className={`md:w-[45%] md:h-98  h-70 w-[96%] rounded-2xl flex justify-center  items-center ${((mainselector && autogameSelector == false) || autogamingstate) ? "" : ""}`}>
            <div className='w-[70%] h-full flex flex-wrap justify-center md:gap-x-3 gap-x-3 items-center'>
                {boxes.map((box, index) => {
                    return <div key={index} onClick={() => handleBoxclick(index)} className={`aspect-square  cursor-pointer w-1/8  rounded-full  flex justify-center items-center
           ${((autogamingstate == false)) ? revealed[index] ? "grad2" : "grad" : "grad"}
          ${((autogamingstate == false) && betState) ? betBoxes[index] ? revealed[index] ? "grad-gold" : "grad-auto" : "grad" : "grad"}
        
        
           ${(autogamingstate) ? revealed[index] ? "grad2" : "grad" : "grad"}
             ${(autogamingstate && betState) ? betBoxes[index] ? revealed[index] ? "grad-gold" : "grad-auto" : "grad" : "grad"}
        
           `}>
                        {((autogameSelector == false || autorevealState)) ? (revealed[index]) ? <div className={`w-[85%] h-[85%] rounded-full border-[#F77587] border-2 text-[black] md:text-xl text-base font-semibold flex justify-center items-center `}>{index + 1}</div> : <div className={`w-[85%] h-[85%] rounded-full gradcircle text-[#E4FBFF] md:text-xl text-base font-semibold flex justify-center items-center `}>{index + 1}</div> : <div></div>}

                        {(autogameSelector && autorevealState == false) ? (selectAutoBoxes[index]) ? <div className={`h-7 w-7 rounded-full gradcircle-auto `}></div> : <div className={`h-7 w-7 rounded-full gradcircle `}></div> : <div></div>}
                    </div>
                })}
            </div>
            <div className='w-[30%] h-full md:text-base text-sm border-[#B53A65] border rounded-xl flex justify-center items-center flex-col'>
                {Object.entries(autogamemultiplier).reverse().map(([key, value]) => {
                    return <div key={key} className=' md:w-1/2 w-[65%] h-1/10  flex justify-between items-center'><span className={`${hits < key ? "bg-[#830330]" : "bg-[#feaa05]"} text-white rounded-full flex justify-center items-center aspect-square md:w-8 w-6 my-0.5`}>{key}</span><span className='text-white'>{value.toFixed(2)}</span></div>
                })}
            </div>
        </div>
    )
}

export default Mainboxes