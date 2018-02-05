import React from 'react'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

const AddGift = ({ giftName, changeGiftName, addGift }) => (
    <form onSubmit={(e) => {
        e.preventDefault()
        addGift()
    }}>
        <TextField
            placeholder="What do you want ? 😎"
            value={giftName}
            onChange={(e) => changeGiftName(e.target.value)}
            style={{ marginRight: 30 }}
        />
        <Button type="submit" raised color="primary">Ajouter</Button>
    </form>
)

export default AddGift
