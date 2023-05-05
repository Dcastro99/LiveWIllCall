
export const EditStyle = {
  mainBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  paper: {
    padding: '30px 20px',
    width: 300,
    margin: '20px auto',
    borderRadius: 15
  },
  formtext: {
    margin: '10px 0'
  },
  textFiled: {
    margin: '0 0 20px'
  },
  numberTextFiled: {
    margin: '0 0 20px',
    width: '100px',
    // backgroundColor: 'pink'
  },
  addIcon: {
    fontSize: 40,
  },
  button: {
    backgroundColor: '#676767',
    color: 'WhiteSmoke',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: 'white',
      color: '#676767',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  modalButton: {
    color: 'Tomato',
    //  backgroundColor: '#B8B8B8',
    backgroundColor: '#F5F5F5',
    marginTop: 5,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', '&:hover': {
      backgroundColor: 'DimGray',
      color: 'WHiteSmoke',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  },
  editModalButton: {
    // border: '1px solid Tomato',
    // backgroundColor: '#B8B8B8',
    backgroundColor: 'WhiteSmoke',
    color: 'Tomato',
    borderRadius: '10px',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: 'white',
      color: 'Tomato',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  }
}
