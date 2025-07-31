import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmt: 3000,
  disablefooter: false,
  disablemain: true,
  revealed: [],
  betamount: "10.00",
  minesCount: 3,
  cashOutamount: 0,
  multiplier: 1.00,
  boxes: [],
  navcashout: true,
  cashoutNotification: null,
  flipTrigger: false,
  menuSelector: false,
  soundSelector: true,
  howtoplay: false,
  autoGame: false,
  betBoxes: [],
  startAutoGameSelector: false,
  autoGameRoundsArray: [3, 10, 25, 100, 200, 500],
  autoGameRound: 3,
  betState: false,
  autorevealState: false,
  autogamingstate: false,
  roundLeft: 3,
  stopGamestate: false,
  freeBetsSelector: false,
  betHistorySelector: false,
  gameLimitsSelector: false,
  gameRulesSelector: false,
  GamesSelector: false,
  bettingstate:false
}

export const minesSlices = createSlice({
  name: "mines",
  initialState,
  reducers: {
    betAmt: (state, action) => {
      state.totalAmt = state.totalAmt - action.payload
    },
    cashOutAmt: (state, action) => {

    },
    togglemain: (state, action) => {
      state.disablemain = action.payload
    },
    togglefooter: (state, action) => {
      state.disablefooter = action.payload
    },
    revealedFalse: (state, action) => {
      const falsearray = Array(5 * 5).fill(false)
      state.revealed = falsearray
    },
    revealedOne: (state, action) => {
      const newSelect = state.revealed
      let safeClickCount = state.revealed.filter(v => v === true).length;
      if (safeClickCount < 10) {
        newSelect[action.payload] = !newSelect[action.payload]
        state.revealed = newSelect
      } else {
        newSelect[action.payload] = false
        state.revealed = newSelect
      }
      // const newRevealed = state.revealed
      // newRevealed[action.payload] = true
      // state.revealed = newRevealed

    },
    revealRandom: (state, action) => {
      const newSelect = state.revealed
      newSelect[action.payload] = true
      state.revealed = newSelect


    },
    changebetValue: (state, action) => {
      if (action.payload == ".") {
        if (!state.betamount.includes(".")) {
          state.betamount = state.betamount + action.payload
        }
      }
      else if (action.payload == "delete") {
        state.betamount = state.betamount.slice(0, -1)
      } else {
        state.betamount = state.betamount + action.payload.toString()
      }
    },
    changebetFix: (state, action) => {
      if (state.betamount >= 100 && action.payload == true) {
        state.betamount = "100"
      } else if (state.betamount <= 0 && action.payload == true) {
        state.betamount = "0.10"
      } else if (state.betamount == "." && action.payload == true) {
        state.betamount = "0.10"
      } else if (state.betamount == NaN && action.payload == true) {
        state.betamount = "0.10"
      }

      if (state.betamount.includes(".")) {
        const [intPart, decimalPart] = state.betamount.split(".");
        if (decimalPart && decimalPart.length > 2) {
          state.betamount = `${intPart}.${decimalPart.slice(0, 2)}`;
        }
      }


    },
    changefixbettomin: (state, action) => {
      if (action.payload == false) {
        state.betamount = ""
      }
    },
    fixBets: (state, action) => {
      state.betamount = action.payload.toFixed(2).toString()
    },
    changeMines: (state, action) => {
      state.minesCount = action.payload
    },
    cashOutbetamount: (state, action) => {
      state.totalAmt = state.totalAmt + action.payload

    },
    setMultiplier: (state, action) => {
      state.multiplier = action.payload;
    },
    setcashOutamount: (state, action) => {
      state.cashOutamount = Number(state.betamount) * action.payload
    },
    boxesSet: (state, action) => {
      state.boxes = action.payload
    },
    addfixBet: (state, action) => {
      state.betamount = action.payload
    },
    setNavcashout: (state, action) => {
      state.navcashout = !state.navcashout
    },
    setCashoutNotification: (state, action) => {
      state.cashoutNotification = action.payload;
    },
    clearCashoutNotification: (state) => {
      state.cashoutNotification = null;
    },
    triggerFlip(state) {
      state.flipTrigger = true;
    },
    resetFlip(state) {
      state.flipTrigger = false;
    },
    toggleMenu: (state, action) => {
      state.menuSelector = action.payload
    },
    toggleSound: (state, action) => {
      state.soundSelector = action.payload
    },
    togglehowtoplay: (state, action) => {
      state.howtoplay = action.payload
    },
    toggleAutoGame: (state, action) => {
      state.autoGame = action.payload
    },
    SetbetBoxes: (state, action) => {
      const falsearray = Array(36).fill(false)
      state.betBoxes = falsearray
    },
    SetbetBoxesOne: (state, action) => {
      const betBoxes = state.betBoxes
      const index = action.payload.index
      betBoxes[index] = true
      // let selectedBetBoxes = 0

      // function selectrandomBoxes() {
      //   if (selectedBetBoxes > 10) {
      //     return
      //   }
      //   setTimeout(() => {
      //     const index = 0
      //     while (index < 10) {
      //       const random = Math.floor(Math.random() * 36)
      //       if (betBoxes[random] == false) {
      //         betBoxes[random] = true
      //         index++
      //       }
      //     }
      //     selectedBetBoxes++
      //     setTimeout(selectrandomBoxes, 1000);
      //   }, 1000);
      // }
      // selectrandomBoxes()

    },
    toggleStartAutoGameSelector: (state, action) => {
      state.startAutoGameSelector = action.payload
    },
    SetautoGameRound: (state, action) => {
      state.autoGameRound = action.payload
    },
    SetbetState: (state, action) => {
      state.betState = action.payload
    },
    SetautorevealState: (state, action) => {
      state.autorevealState = action.payload
    },
    Setautogamingstate: (state, action) => {
      state.autogamingstate = action.payload
    },
    SetroundLeft: (state, action) => {
      state.roundLeft = action.payload
    },
    SetstopGamestate: (state, action) => {
      state.stopGamestate = action.payload
    },
    SetfeeeBetsSelector: (state, action) => {
      state.freeBetsSelector = action.payload
    },
    SetBethistorySelector: (state, action) => {
      state.betHistorySelector = action.payload
    },
    SetGameLimitsSelector: (state, action) => {
      state.gameLimitsSelector = action.payload
    },
    SetGamerulesSelector: (state, action) => {
      state.gameRulesSelector = action.payload
    },
    SetGamesSelector: (state, action) => {
      state.GamesSelector = action.payload
    },
    setBettingstate:(state,action)=>{
    state.bettingstate = action.payload
    }

  }
})


export const { SetfeeeBetsSelector, setBettingstate,SetGamesSelector, SetGameLimitsSelector, SetGamerulesSelector, SetBethistorySelector, toggleAutoGame, SetstopGamestate, SetroundLeft, Setautogamingstate, SetautorevealState, SetbetState, SetautoGameRound, toggleStartAutoGameSelector, SetbetBoxesOne, SetbetBoxes, togglehowtoplay, toggleSound, boxesSet, triggerFlip, toggleMenu, resetFlip, setNavcashout, changefixbettomin, clearCashoutNotification, setCashoutNotification, addfixBet, setMultiplier, setcashOutamount, cashOutbetamount, changeMines, fixBets, betAmt, cashOutAmt, togglemain, togglefooter, revealedFalse, revealedOne, revealRandom, changebetValue, changebetFix } = minesSlices.actions

export const minesReducers = minesSlices.reducer