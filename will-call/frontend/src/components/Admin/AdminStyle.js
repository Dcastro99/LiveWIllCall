export const AdminStyle = {
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 5,
    padding: 3,
    backgroundColor: 'WhiteSmoke',
  },
  adminContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',

  },
  inputBox: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
    border: '3px solid WhiteSmoke',
    // backgroundColor: '#C8744F',
    marginTop: 1,
    // height: '20%',
    // backgroundColor: 'pink'
  },
  customerInfoBox: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '70%',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
  customerTextField: {
    width: '80%',
  },
  customerText: {
    width: '80%',
    marginBottom: 1,
    fontWeight: 'bold',
  },
  imgBox: {
    // borderRadius: 5,
    display: 'flex',
    flexWrap: 'wrap',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'lightGray',
  },
  cardContainer: {
    margin: 1,
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    // backgroundColor: 'white',
  },
  carImg: {
    height: '180px',
    width: '180px',
    // borderRadius: '4px'
  },
  carName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carButton: {
    padding: '0px',
  },
  displayBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    // backgroundColor: 'Ghostwhite'
  },
  submitButton: {
    color: '#C8744F',
    backgroundColor: 'black',
    marginTop: 1,
    marginBottom: 2
  },
  resultBox: {
    borderRadius: 5,
    marginTop: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '95%',
    // backgroundColor: 'lightgrey',
    height: '95%'
  },
  resultsMainBox: {
    borderRadius: 2,
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    height: '25%',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: '80%',
    marginLeft: 2,
    // backgroundColor: 'pink',

  },
  resultsTMName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultImg: {
    height: '180px',
    width: '180px',
  },
  resultText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'salmon',
    color: 'WhiteSmoke',
    borderRadius: '10px',
    marginTop: 3,
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: 'white',
      color: '#676767',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    },
  }

}