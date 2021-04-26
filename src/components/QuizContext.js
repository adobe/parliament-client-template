/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import * as React from "react"
const QuizStateContext = React.createContext()
const QuizDispatchContext = React.createContext()

const ACTION_TYPES = {
  UPDATE_PROGRESS: "updateProgress",
  NEW_QUESTION: "newQuestion",
  QUESTION_ANSWERED: "questionAnswered",
}

const initialState = {
  progress: 0,
  score: 0,
  answered: 0,
  correct: 0,
  totalQuestions: 0,
  questions: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_PROGRESS: {
      return { ...state, progress: action.progress }
    }
    case ACTION_TYPES.NEW_QUESTION: {
      const newState = { ...state }
      newState.totalQuestions++
      newState.questions[action.id] = {
        selected: [],
        correct: false,
        answered: false,
      }
      return { ...newState }
    }
    case ACTION_TYPES.QUESTION_ANSWERED: {
      const newState = { ...state }
      if (action.question.answered) {
        newState.answered++
      }
      if (action.question.correct) {
        newState.correct++
      }
      newState.progress = (newState.answered / newState.totalQuestions) * 100
      newState.score = (newState.correct / newState.totalQuestions) * 100
      newState.questions[action.id] = action.question
      return { ...newState }
    }
    default:
      throw new Error()
  }
}

const QuizProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  )
}
const useQuizState = () => {
  const context = React.useContext(QuizStateContext)
  if (context === undefined) {
    throw new Error("useQuizState must be used within a QuizProvider")
  }
  return context
}
const useQuizDispatch = () => {
  const context = React.useContext(QuizDispatchContext)
  if (context === undefined) {
    throw new Error("useQuizDispatch must be used within a QuizProvider")
  }
  return context
}

const useQuiz = () => {
  return [useQuizState(), useQuizDispatch()]
}

QuizProvider.ACTION_TYPES = ACTION_TYPES

export { QuizProvider, useQuizState, useQuizDispatch, useQuiz }
