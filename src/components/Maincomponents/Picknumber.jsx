import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { togglehowtoplay, toggleMenu, changeMines } from '../../features/mines/mineSlices'
import { FaChevronDown } from "react-icons/fa";

const Picknumber = () => {
    const dispatch = useDispatch()
    const mainselector = useSelector(state => state.disablemain)
    const autogameSelector = useSelector(state => state.autoGame)
    const footerselector = useSelector(state => state.disablefooter)
    const revealed = useSelector(state => state.revealed)


    const safeClickCount = useMemo(() => {
        return revealed.filter(v => v === true).length;
    }, [revealed]);

   
    return (
        <div className={`flex flex-col md:w-[45%] w-9/10 mt-2 ${((autogameSelector && footerselector) || !mainselector || autogameSelector) ? "disable-main" : ""}`}>
      <div className={`w-full h-10 text-[#2AA543] flex justify-center items-center ${safeClickCount>0?"":"bg-[#680E2F]"}  rounded-xl`}>{safeClickCount>0?"":"PICK NUMBERS FOR START"} </div>
          
        </div>
    )
}

export default Picknumber