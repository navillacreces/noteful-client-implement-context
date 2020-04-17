import React from 'react'

const ApiContext = React.createContext({
  notes: [],
  folders: [],
  handleAddFolder: () => {},
  handleAddNote: () => {},
  handleDeleteNote: () => {},
});

export default ApiContext;