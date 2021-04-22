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
import { Checkbox, CheckboxGroup } from "@adobe/react-spectrum"

const answerIsCorrect = (choice) => {
  const checkBoxes = choice.props.children.filter(
    (child) => child.props && child.props.type === "checkbox"
  )
  if (checkBoxes.length !== 1) {
    return false
  }

  return checkBoxes[0].props.checked
}

const correctChoices = (choices) =>
  choices.map((choice, ix) => answerIsCorrect(choice) ? ix : null).filter((ix) => ix !== null)

const getOptionText = (choice) =>
  choice.props.children
    .filter((child) => !child.props)
    .join(" ")
    .trim()

const QuizChoice = ({ choice, value, selected, correctChoices }) => {
  if (choice.props.originalType !== "li") {
    return null
  }

  const validSelection = answerIsCorrect(choice)
  const text = getOptionText(choice)
  let questionDisabled = false

  if (selected.length > 0) {
    if (correctChoices.length === 1) {
      questionDisabled = true
    }
    else {
      // multiple choice answer

      // any of the selected choices are wrong
      if (selected.some((ix) => correctChoices.indexOf(ix) === -1)) {
        questionDisabled = true
      }
      else {
        if (selected.length >= correctChoices) {
          const multipleChoiceCorrect = selected.all((ix) => correctChoices.includes(ix))
          questionDisabled = multipleChoiceCorrect
        }
        else {
          // not finished selecting all correct answers for multiple choice question
        }
      }
    }
  }

  // If the user has selected a value then we need to see if they got the correct answer
  if (selected.includes(value)) {
    return (
      <div>
        {validSelection ? `✅` : `❌`}
        <span
          style={{ marginLeft: `var(--spectrum-global-dimension-size-125)` }}
        >
          {text}
        </span>
      </div>
    )
  } else {
    return (
      <Checkbox isDisabled={questionDisabled} value={value}>
        {text}
      </Checkbox>
    )
  }
}

// https://stackoverflow.com/a/56749849/158584
// TODO: move into utils or something?
const shuffle = arr =>
  [...arr].reduceRight((res,_,__,s) =>
    (res.push(s.splice(0|Math.random()*s.length,1)[0]), res),[]);

const QuizQuestion = ({ children, ...props }) => {
  let [selected, setSelected] = useState([])
  const [shuffledChoices] = useState(shuffle(Children.toArray(children)))

  return (
    <CheckboxGroup aria-label="Question" onChange={setSelected}>
      {shuffledChoices.map((choice, index) => (
        <QuizChoice
          value={index}
          choice={choice}
          selected={selected}
          correctChoices={correctChoices(shuffledChoices)} />
      ))}
    </CheckboxGroup>
  )
}

export default QuizQuestion
