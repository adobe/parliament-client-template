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
import { React, Component, Fragment } from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { componentsMapping } from "../components/componentsMapping"

const markCorrect = (id, correct) => {
  if (correct) {
    return `✅`
  }
  return `❌`
}

class QuizQuestion extends Component {
  constructor(props) {
    super(props)

    const { question, choices } = props
    this.question = question
    this.choices = choices
  }

  render() {
    const choices = this.choices.map((choice) => {
      choice.onClick = markCorrect(choice.id, true)
    })

    return (
      <Fragment>
        {this.question}
        {this.choices}
      </Fragment>
    )
  }
}

const components = {
  wrapper: ({children, ...props}) => {
    const questions = children.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        // TODO: better, React-y way to do this?
        const [question, choices] = array.slice(index, index + 2)
        result.push(<QuizQuestion question={question} choices={choices} /> );
      }
      return result;
    }, []);

    return questions
  }
}

const RenderQuizMdx = ({ children, data }) => (
  <MDXProvider components={ {...components, ...componentsMapping } }>
    <MDXRenderer>
      {children}
    </MDXRenderer>
  </MDXProvider>
)

export default RenderQuizMdx
