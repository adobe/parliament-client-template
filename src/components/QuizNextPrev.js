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

/** @jsx jsx */
import { jsx } from "@emotion/react"
import { useQuizState } from "./QuizContext"
import NextPrev from "./NextPrev"

const QuizNextPrev = ({ nextPage, previousPage, markProgression, alreadyPassed = false }) => {
  // rendering a quiz
  const { answered, correct, totalQuestions } = useQuizState()
  if (!alreadyPassed && totalQuestions > 0) {
    // only show nav if quiz completed
    if (answered < totalQuestions) { return "" }
  }

  let passQuiz = () => {}
  if (correct === totalQuestions) {
    passQuiz = markProgression
  }

  return <NextPrev nextPage={nextPage} previousPage={previousPage} markProgression={passQuiz} />
}

export default QuizNextPrev
