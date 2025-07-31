import React, { useState, useMemo, useRef, useEffect } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { calculateSpribeMultiplier } from '../../utils/multiplier';
import { useSelector, useDispatch } from 'react-redux';
import { togglehowtoplay, toggleMenu, setCashoutNotification, clearCashoutNotification, betAmt, togglemain, SetbetBoxes, togglefooter, boxesSet, revealedFalse, setcashOutamount, SetbetState, SetbetBoxesOne, cashOutbetamount, setBettingstate } from '../../features/mines/mineSlices';
import { GiConsoleController, GiStaticWaves } from 'react-icons/gi';
import { current } from '@reduxjs/toolkit';

const Betcomponent = () => {
    const dispatch = useDispatch()
    const revealed = useSelector(state => state.revealed);
    const minesCount = useSelector(state => state.minesCount);
    const autogameSelector = useSelector(state => state.autoGame)
    const [keyboard, setKeyboard] = useState(false)
    const betamount = useSelector(state => state.betamount)
    const soundSelector = useSelector(state => state.soundSelector)
    const [togglefixedamt, setTogglefixedamt] = useState(false)
    const betState = useSelector(state => state.betState)
    const safeClicks = revealed.filter(val => val === true).length;
    const multiplier = () => calculateSpribeMultiplier(safeClicks, minesCount)
    const [disablefooter, setDisablefooter] = useState(false)
    const totalAmt = useSelector(state => state.totalAmt)
    const betBoxes = useSelector(state => state.betBoxes)
    const betBoxesref = useRef([])
    const autogamemultiplier = useSelector(state => state.multiplier)
    const bettingstate = useSelector(state => state.bettingstate)
    const autogamingstate = useSelector(state => state.autogamingstate)


    const cashOut = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        if (safeClicks > 0) {

            const currentmultiplier = autogamemultiplier[hitsref.current]
            const payout = parseFloat(betamount) * currentmultiplier;
            if (payout > 0) {


                dispatch(cashOutbetamount(payout))
                dispatch(togglefooter(false));
                dispatch(togglemain(true));
                dispatch(setCashoutNotification(payout))


                let minestapsound = "/sounds/success-alert.mp3"
                let audio = new Audio(minestapsound)
                if (soundSelector) {
                    audio.play()
                }
                setTimeout(() => {
                    dispatch(clearCashoutNotification())
                }, 2000);
                // resetGame()
            } else {
                let minestapsound = "/sounds/lose.mp3"
                let audio = new Audio(minestapsound)
                if (soundSelector) {
                    audio.play()
                }
            }
        }
    }




    const hits = useMemo(() => {
        let hit = 0
        let index = 0
        while (index < 36) {
            if (revealed[index] == true) {
                if (revealed[index] == betBoxesref.current[index]) {
                    hit++
                }
            }
            index++
        }
        return hit
    }, [revealed, betBoxes, betBoxesref.current]);

    const hitsref = useRef(hits)

    useEffect(() => {
        hitsref.current = hits
    }, [hits])


    useEffect(() => {
        betBoxesref.current = betBoxes
    }, [betBoxes])


    const safeClickCount = useMemo(() => {
        return revealed.filter(v => v === true).length;
    }, [revealed]);

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
        dispatch(togglemain(true))
        dispatch(boxesSet(newBoxes))
        dispatch(revealedFalse())
    }
    const bet = (e) => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))

        if (keyboard == false && safeClickCount > 0 && Number(totalAmt) > 0 && Number(betamount) > 0 && Number(betamount) <= 100 && autogamingstate == false && bettingstate == false) {
            dispatch(setBettingstate(true))
            dispatch(SetbetBoxes())
            let minestapsound = "/sounds/bet-click.mp3"
            let audio = new Audio(minestapsound)
            if (soundSelector) {
                audio.play()
            }
            let random = []
            let sortarray
            let index = 0
            while (index < 10) {
                let randomnumber = Math.floor(Math.random() * 36)

                if (random.filter((num) => num == randomnumber).length > 0) {

                } else {
                    random.push(randomnumber)
                    let createsortarray = random.sort((a, b) => a - b)
                    if (createsortarray.length >= 10) {
                        sortarray = createsortarray
                    }
                    index++
                }
            }
            let selectedBetBoxes = 0

            function selectrandomBoxes() {
                dispatch(setBettingstate(true))
                if (selectedBetBoxes >= 10) {
                    dispatch(setBettingstate(false))
                    cashOut()
                    return
                }
                setTimeout(() => {
                    dispatch(SetbetBoxesOne({ index: sortarray[selectedBetBoxes] }))
                    selectedBetBoxes++
                    setTimeout(selectrandomBoxes, 100);
                }, 100);
            }
            selectrandomBoxes()
            dispatch(SetbetState(true))
            dispatch(betAmt(Number(betamount)))
        }
    }
    return (
        <div onClick={bet} className={` ${((safeClickCount > 0) && betState && !autogamingstate) ? "" : "disable-div"} flex cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] items-center justify-between w-9/10 bg-radial-[at_50%_60%] from-[#5CA003] to-[#327A00] to-60% h-full rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150`}><CiPlay1 className='text-white font-bold text-3xl ml-5 ' />
            <span className='text-white font-bold text-xl w-8/10  mr-10 flex justify-center'>
                BET
            </span>
        </div>
    )
}

export default Betcomponent