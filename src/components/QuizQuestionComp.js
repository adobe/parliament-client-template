/**
 *  Copyright 2020 Adobe. All rights reserved.
 *  This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License. You may obtain a copy
 *  of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under
 *  the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *  OF ANY KIND, either express or implied. See the License for the specific language
 *  governing permissions and limitations under the License.
 */
import { React, useState, Children } from "react"
import QuizQuestion from "./QuizQuestion"
import { useQuiz } from "./QuizContext"

const QuizQuestionComp = ({ children, ...props }) => {
  const [quiz, updateQuiz] = useQuiz()
  let [questionStates, recordAnswers] = useState({ progress: 0, score: 0 })
  let [state, setSelected] = useState({
    selected: [],
    correct: null,
    answered: false,
  })
  const ack = (input) => {
    setSelected(input)
    calcProgress()
  }
  const questionProps = {
    children,
    selected: state.selected,
    setSelected: ack,
    ...props,
  }

  const calcProgress = () => {
    const answered = Object.entries(questionStates).filter(
      (o) => o.pop().answered
    ).length
    const total = Object.keys(questionStates).length - 2
    const correct = Object.entries(questionStates).filter(
      (o) => o.pop().correct
    ).length

    questionStates.progress = (answered / total) * 100
    questionStates.score = (correct / total) * 100
    /*
    recordAnswers({
      progress: (answered / total) * 100,
      score: (correct / total) * 100,
    })
    */
    // console.log(answered)
    updateQuiz({
      type: "updateProgress",
      progress: (answered / total) * 100,
      score: (correct / total) * 100,
    })
  }

  // UHHHHH.....
  questionStates[
    children.map((c) => c.props.children.toString()).join("")
  ] = state

  // calcProgress()
  // recordAnswers(questionStates)

  return <QuizQuestion {...questionProps} />
}

export default QuizQuestionComp
