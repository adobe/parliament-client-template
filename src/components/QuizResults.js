/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { React, Fragment } from "react"
import { Header, Well } from "@adobe/react-spectrum"
import { useQuizState } from "../components/QuizContext"

const QuizResults = () => {
  const { answered, correct, totalQuestions } = useQuizState()

  if (totalQuestions > 0 && answered < totalQuestions) { return null }

  return (
    <Fragment>
      <Well marginTop={32}>
        <Header>{ (correct === answered) ? "Congrats, you aced the quiz! 🎉" : "Good try!" }</Header>
        <p>If you want to try the quiz again, refresh the page. Or you can continue with the course below.</p>
      </Well>
    </Fragment>
  )
}

export default QuizResults
