import React from "react"

import {colors} from "../utils/styles"
import {dragElement} from "../utils/dragable"

const titleBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  height: 78,
  minHeight: 78,
  backgroundColor: colors.blue,
  color: colors.white,
  paddingLeft: 20
}

const flexMiddle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 20,
  width: '96%'
}

const backButtonStyle = {
  display: 'flex',
  cursor: 'pointer',
  paddingLeft: 4,
  paddingRight: 24
}

const buttonStyle = {
  cursor: 'pointer',
  marginRight: '20px'
}

const exitStyle = {
  cursor: 'pointer',
  fontSize: 15,
  fontWeight: 'bold',
  color: colors.white,
  marginRight: '20px'
}

const headerLeft = {
  alignItems: 'center',
  marginTop: -2
}

const headerSubtitle = {
  paddingLeft: 7,
  marginTop: 3,
  fontSize: '20px',
  fontWeight: 600
}

const finePrint = {
  marginTop: 1,
  color: colors.white
}

export class TitleBar extends React.Component {

  handleClose() {
    if (this.props.closeFn)
      this.props.closeFn()
  }

  componentDidMount(){
    if (this.props.drag) {
      let anchor = document.getElementsByClassName("titleBar")
      if (anchor.length > 0){
        // assume last title bar in the list is the "active" one
        anchor = anchor[anchor.length-1]
      }
      let container = document.getElementsByClassName(this.props.drag)[0]
      if (!container) {
        return
      }
      if (container.style.marginLeft.substr(0,1) === "-"){
        console.error("cannot use drag with negative margin")
        return
      }
      dragElement(container, anchor)
    }
  }

  getButtons() {
    const {showCloseButton} = this.props
    let showClose = false
    showClose = showCloseButton !== undefined ? showCloseButton : showClose

    return (
        <span className='titlebar-buttons' style={{display: 'flex', alignItems: 'center', paddingLeft: '10px'}}>
          {showClose && <span id="close" style={exitStyle} onClick={this.handleClose.bind(this)} data-tip={"Close"}>âœ•</span>}
        </span>
    )
  }

  render() {
    let {title, subtitles, fineprint, rightDetails, embedded, showBackButton, delimiter} = this.props
    let backButton=false
    let delimiterToUse = delimiter ? delimiter : '|'
    const getSubtitles = subtitles && subtitles.map((s, i) => (
        <span key={i} style={headerSubtitle} className="h2">| {s}</span>))
    const cc = '%%%%'
    const getFineprints = fineprint && fineprint.filter( e => e != null).join(cc + ' '+delimiterToUse+' ' + cc).split(cc)
    .map((s, i) => (<span key={i}>{s}</span>))
    const getRightDetails = rightDetails && rightDetails.map((s, i) => (
        <span key={i} style={{paddingRight: 6}}>{s}</span>))
    if (!embedded){
      backButton=true
    }
    backButton = showBackButton !== undefined ? showBackButton : backButton

    return (
      <div className="titleBar" style={titleBarStyle}>
        <span style={flexMiddle}>
          <div style={headerLeft}>
            <div>
              <span className="h1">{title}</span>
              {getSubtitles}
            </div>
            {fineprint &&
            <div style={finePrint} className="h4">
              {getFineprints}
            </div>}
          </div>
          <div className="h2" style={{display: 'flex', alignItems: 'center'}}>
            {getRightDetails}
          </div>
          {this.getButtons()}
        </span>
      </div>
    )
  }
}
