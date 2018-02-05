import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    getGifts,
    sendGifts,
    addGift,
    changeGiftName
} from '../reducers'
import App from '../components/App.component'

const mapStateToProps = ({ gifts, message, form: { giftName } }) => {
    return {
        gifts,
        message,
        giftName
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGifts,
        sendGifts,
        addGift,
        changeGiftName
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)