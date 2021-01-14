import React from "react"
import {Redirect, withRouter} from 'react-router-dom'
import ReactTooltip from 'react-tooltip'

import {colors} from "../../utils/styles"
import {getGlobalStore} from "../../state/globalStore"
import {merge} from "../../utils/util"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {logout} from "../../state/app/actions"
import * as types from "../../state/actionTypes"
import {dragElement} from "../../utils/dragable"
import ClickableIcon from "./ClickableIcon"

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
  // TODO we need to determine the path for embedded detail panels - also, it doesn't make sense to go back
  handleNewTab(history, location, url) {
    if (!this.props.embedded) {
      history.goBack()
    }
    else {
      this.handleClose()
    }
    //TODO: check if you can use Link or Redirect instead of calling window.open directly
    if (url) {
      window.open('#' + url, '_blank')
    } else {
      window.open('#' + location.pathname, '_blank')
    }
  }

  handleClose() {
    if (this.props.closeAction)
      getGlobalStore().dispatch({type: this.props.closeAction})
    if (this.props.closeFn)
      this.props.closeFn()
  }

  toggleRemarkBar() {
    getGlobalStore().dispatch({type: types.TOGGLE_REMARK_BAR})
  }

  getMailIcon(showMail) {
    if (!showMail) {
      return null
    }
    if (this.props.myRemarks && this.props.myRemarks.length) {
      return <ClickableIcon iconPath="images/notification-white.svg"
                            actionType={types.TOGGLE_REMARK_BAR}
                            buttonClassName="mail-icon"
                            hoverIconPath="images/notification-default.svg" toolTipText={"Notifications"} />
    } else {
      return null
    }
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

  componentWillUnmount() {
    ReactTooltip.hide()
  }

  getButtons() {
    const {history, location, url, showCloseButton, showMailIcon} = this.props
    let showClose = false, showMail=true
    showClose = showCloseButton !== undefined ? showCloseButton : showClose
    showMail = showMailIcon !== undefined ? showMailIcon: showMail
    let iconStyle = {height: 26, width: 26 }

    return (
        <span className='titlebar-buttons' style={{display: 'flex', alignItems: 'center', paddingLeft: '10px'}}>

          {url && <span id="new-tab" style={buttonStyle}
                onClick={this.handleNewTab.bind(this, history, location, url)}
                data-tip={"Open As New Tab"}>
            <img src="images/open-new-tab.svg" style={iconStyle}/>
          </span>}
          {showClose && <span id="close" style={exitStyle} onClick={this.handleClose.bind(this)}
                             data-tip={"Close"}>✕</span>}
          {this.getMailIcon(showMail)}

          <ReactTooltip class="icon-tooltip" place="bottom" effect="solid" offset={{bottom: -8, right: 2}}/>
        </span>
    )
  }

  goBack() {
    if (this.props.backUrl) {
      this.setState({goBackClicked: true})
    } else {
      this.props.history.goBack()
    }
  }

  render() {
    if (this.state && this.state.goBackClicked) {
      return <Redirect push to={this.props.backUrl}/>
    }
    let {title, subtitles, fineprint, rightDetails, embedded, titleStyle, showBackButton, delimiter} = this.props
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
      <div className="titleBar" style={merge(titleBarStyle, titleStyle)}>
        {backButton &&
        <span className="exit" style={backButtonStyle} onClick={this.goBack.bind(this)}>
          <img src="images/back.svg"/>
        </span>}

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
        </span>

        {this.getButtons()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myRemarks: state.app.myRemarks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logout
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TitleBar))