import * as React from 'react'

export class Component2 extends React.Component<{
  readonly age: number
  readonly name: string
}> {
  getName = () => this.props.name

  render = () => (
    <>
      <div children={this.getName()} />
    </>
  )
}
