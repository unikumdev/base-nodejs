import * as React from 'react'

export const Component1: React.FunctionComponent<{
  readonly prop1: string
}> = ({ prop1 }) => (
  <>
    <h1>Header1</h1>

    <div>text1</div>

    <span children={prop1} />
  </>
)
