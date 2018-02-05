import React, { PureComponent } from 'react'
import Gifts from '../containers/Gifts.container'
import AddGift from './AddGift.component'
import Button from 'material-ui/Button'
import Send from 'material-ui-icons/Send'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import logo from '../logo.png'
import './App.css'

class App extends PureComponent {
 
  componentWillMount() {
   const { getGifts } = this.props
   getGifts()
  } 

  render() {
    const { sendGifts, message, gifts } = this.props
    return (
      <div className="App">
      <AppBar position="static" style={{ marginBottom: "40px" }}>
        <Toolbar>
          <Typography type="title" color="inherit">
            It's Christmas !
          </Typography>
        </Toolbar>
      </AppBar>

        <img src="https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif" />

        <AddGift {...this.props} />
        <Gifts />
        <Button
          raised
          onClick={sendGifts}
          color="secondary"
          disabled={Boolean(!gifts.length) || Boolean(message)}
        >
          {message || 'Dear Santa Florian, send me my gifts'}
          <Send style={{ marginLeft: 15 }} />
        </Button>
      </div>
    )
  }
}

export default App
