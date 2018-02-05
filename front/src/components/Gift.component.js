import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui-icons/Delete'
import Divider from 'material-ui/Divider';

const Gift = ({ name, remove }) => (
  <List style={{ width: "100%", maxWidth: "340px" }}>
    <ListItem button>
      <ListItemText primary={name} />
      <ListItemSecondaryAction onClick={remove}>
      <IconButton aria-label="Delete">
        <Delete />
      </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider />
  </List>
)

export default Gift;
