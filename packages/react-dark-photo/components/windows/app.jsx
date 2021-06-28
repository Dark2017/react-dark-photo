import React from 'react'
import './app.less'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  close = () => {
    this.props.close()
  }

  render_child = (child, key) => {
    const { props } = child
    if(props.slot === 'body') {
      return (
        <div className='windows_body' key={key}>
          { child }
        </div>
      )
    } else if(props.slot === 'footer') {
      return (
        <div className="windows_footer" key={key}>
          { child }
        </div>
      )

    }
  }

  render() {
    const { visible, children } = this.props
    return (
      <div>
        {
          visible ? 
            <div>
              <div className="bg" id="bg" onClick={this.close}></div>
              <div className="windows">
                {
                  children.length ? children.map((child, index) => {
                    return this.render_child(child, index)
                  }) : children && this.render_child(children)
                }
              </div>

            </div>
          : null
        }
      </div>
    )
  }
}

export default App