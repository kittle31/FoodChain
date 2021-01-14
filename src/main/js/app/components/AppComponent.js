import React from 'react'
import {TitleBar} from "./TitleBar"
import axios from "axios"

const terrainMap = {
  'O' : {color: 'blue'},
  'B' : {color: 'burlywood'},
  'G' : {color: 'lightgreen'},
  'R' : {color: 'lightblue'},
  'F' : {color: 'darkgreen'}
}

export class AppComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startX: 1,
      startY: 1,
      squareSize: 10,
      squares: null
    }
  }

  getCoords(){
    let x1=this.state.startX
    let y1=this.state.startY
    let x2=this.state.startX+this.state.squareSize-1
    let y2=this.state.startY+this.state.squareSize-1
    return {x1:x1,y1:y1,x2:x2,y2:y2}
  }

  async refreshData(){
    let grid = {}
    const {x1,y1,x2,y2} = this.getCoords()
    const result = await axios.get('/api/square/area/' + x1 + '/' + y1 + '/' + x2 + '/' + y2)
    // make a grid
    result.data.forEach((cel) => {
      if (!grid[cel.xc]) {
        grid[cel.xc] = {}
      }
      grid[cel.xc][cel.yc] = cel
    })
    this.setState( {squares: grid})
  }

  async componentDidMount() {
    this.refreshData()
  }

  makeGrid(){
    let rows = []
    if (!this.state.squares){
      return [];
    }
    let celSize = 25
    rows.push( )
    for (let x=this.state.startX; x < this.state.startX+this.state.squareSize; x++){
      let row = [], char
      for (let y=this.state.startY; y < this.state.startY+this.state.squareSize; y++){
        let r = this.state.squares[x]
        char = "?"
        if (!r){
          char = "?"
        }
        else {
          let cel = r[y]
          if (cel) {
            char = cel.terrainType
          }
        }
        let color = terrainMap[char] ? terrainMap[char].color : 'white'
        row.push( <div key={y} style={{ height: celSize, width: celSize, backgroundColor: color}}>{char} </div>)
      }
      rows.push(<div style={{display: 'flex', flexDirection: 'row'}} key={x}>{row}</div>)
    }
    return <div>{rows}</div>;
  }

  updateSize(inc){
    this.state.squareSize = this.state.squareSize + inc
    this.refreshData()
  }

  moveStart(xd, yd){
    this.state.startX = Math.max(this.state.startX + xd, 1)
    this.state.startY = Math.max(this.state.startY + yd, 1)
    this.refreshData()
  }

  render() {
    let celSize = 25
    return (
      <div>
        <TitleBar title="Food Chain"/>
        <div style={{display: 'flex', flexDirection: 'row', padding: 10}}>
          { this.makeGrid()}
          <div style={{paddingLeft: 10}}>
            <div>Location: {this.state.startX}, {this.state.startY}</div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: celSize}}/>
                <button style={{width: celSize }} onClick={this.moveStart.bind(this, -1, 0)}>U</button>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <button style={{width: celSize}} onClick={this.moveStart.bind(this, 0, -1)}>L</button>
                <div style={{width: celSize}}/>
                <button style={{width: celSize}} onClick={this.moveStart.bind(this, 0, 1)}>R</button>
              </div>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: celSize}}/>
                <button style={{width: celSize}} onClick={this.moveStart.bind(this, 1, 0)}>D</button>
              </div>
            </div>
            <div style={{paddingTop: 25}}>Square Size: {this.state.squareSize}</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <button style={{width: celSize}} onClick={this.updateSize.bind(this, -1)}>-</button>
              <div style={{width: celSize}}/>
              <button style={{width: celSize}} onClick={this.updateSize.bind(this, 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}