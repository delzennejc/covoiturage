import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeGift } from '../reducers'
import Gifts from '../components/Gifts.component'

const mapStateToProps = ({ gifts, loading }) => {
    return {
        gifts,
        loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ removeGift }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gifts)