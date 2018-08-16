import React from 'react'
import { Link } from 'react-router-dom'
import Section from '../styles/Section'

class ErrorPageBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch () {
    this.setState({ hasError: true })
  }

  render () {
    if (!this.state.hasError) {
      // eslint-disable-next-line
      return this.props.children
    }

    return (
      <Section>
        <h1>Something went wrong…</h1>
        <span>
          Try <Link href=''>refreshing the page</Link>. If that doesn&apos;t
          help, please{' '} check your node server.
        </span>
      </Section>
    )
  }
}

export default ErrorPageBoundary
