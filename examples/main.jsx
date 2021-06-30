import React from 'react'
import ReactDOM from 'react-dom'
import ReactDarkPhoto from '../packages/react-dark-photo/index.jsx'

const imgData = "https://dark2017.github.io/vue-dark-photo.github.io/img/logo.82b9c7a5.png"
const imgData1 = "https://camo.githubusercontent.com/6c28f1291fb0e2b404c4fd8393298c8602c62d7f3f862404dedbfc862d466c27/68747470733a2f2f6769746875622d726561646d652d73746174732e616e7572616768617a7261312e76657263656c2e6170702f6170693f757365726e616d653d4461726b323031372673686f775f69636f6e733d7472756526696e636c7564655f616c6c5f636f6d6d6974733d74727565267468656d653d7261646963616c"

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      showBox: false,
      imgArr: [
        imgData, imgData1
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
    const { showBox, imgArr, isAnimation } = this.state
    return (
      <div>
        <button onClick={this.open}>11</button>
        <ReactDarkPhoto 
          showBox={showBox}
          // imgData={imgData}
          imgArr={imgArr}
          close={this.close}
          isAnimation={true}
          isHint={true}
        />
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
