import React from 'react'
import ReactDOM from 'react-dom'
import ReactDarkPhoto from '../packages/react-dark-photo/index.jsx'
import Wave from "../packages/react-dark-photo/components/wave/app";

const imgData = "https://dark2017.github.io/vue-dark-photo.github.io/img/logo.82b9c7a5.png"
const imgData1 = "https://static.quanmaigo.com/i/b/78da7ec08eb733dff45ec99ae3b48f3e.png"
const imgData2 = "https://i.picsum.photos/id/47/300/200.jpg?hmac=9EsCkmRWNWNcad1bCkYlIyvrH7KYONvdKRbWChvJ-Us"
class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showBox: false,
      imgArr: [
        imgData, imgData1, imgData2
      ]
    }
  }

  open = () => {
    this.setState({
      showBox: true
    })
  }

  close = () => {
    this.setState({
      showBox: false
    })
  }

  render() {
    const { showBox, imgArr } = this.state
    return (
      <div style={{ height: '1100px' }}>
        <button onClick={this.open}>open</button>
        <ReactDarkPhoto 
          showBox={showBox}
          // imgData={imgData}
          imgArr={imgArr}
          close={this.close}
          isAnimation={true}
          isHint={true}
          ifWave={true}
        />
        <Wave/>
      </div>
    )
  }

}



ReactDOM.render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
)
