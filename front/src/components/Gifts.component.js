import React from 'react'
import Gift from './Gift.component'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'

const Gifts = ({ gifts, removeGift, loading }) => (
    <div className="GiftWrapper">
        {loading && <CircularProgress />}
        {gifts.length > 0 || <Paper style={{ padding: 40 }}>You don't want any gift ? 😐</Paper>}
        {gifts.map(({ giftName, _id }) => (
            <Gift key={_id} name={giftName} remove={() => removeGift(_id)} />
        ))}
    </div>
)

export default Gifts
