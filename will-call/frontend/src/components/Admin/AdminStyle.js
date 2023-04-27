export const AdminStyle = {
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 5,
    padding: 2,
    backgroundColor: 'WhiteSmoke',
  },
  adminContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    // border: '2px solid purple',
  },
  inputBox: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '30%',
    border: '3px solid WhiteSmoke',
    paddingTop: 2,
    paddingBottom: 2,
    // backgroundColor: '#C8744F',
    marginTop: 2,
    marginBottom: 2,
    // height: '80%',
    // backgroundColor: 'pink'
  },
  customerInfoBox: {
    marginTop: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    // border: '3px solid pink',
    // height: '90%',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
  customerTextField: {
    width: '60%',
  },
  customerText: {
    width: '60%',
    marginBottom: 0,
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
    // backgroundColor: 'blue',
    height: '100px',
  },
  carImg: {
    height: '70px',
    width: '70px',
    // borderRadius: '4px'
  },
  cardContent: {
    // backgroundColor: 'pink',

    padding: 0,
    '&: last-child': {
      paddingBottom: 0,
    },
  },
  carName: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 1,

    fontSize: '18px',
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
    // border: '2px solid pink'
  },
  submitButton: {
    color: '#C8744F',
    backgroundColor: 'black',
    marginTop: 1,
    marginBottom: 2
  },
  resultBox: {
    borderRadius: 5,
    // marginTop: -1,
    display: 'flex',
    // flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '95%',
    // backgroundColor: 'lightgrey',
    height: '100%',
    // border: '2px solid blue',
    position: 'absolute',
    overflowY: 'scroll',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none',
    // marginTop: '-68px',
    maxHeight: '800px',
    maxWidth: '68%',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  resultsMainBox: {
    borderRadius: 2,
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    marginTop: 2,
    marginBottom: 2,
    margin: 2,
    // border: '2px solid black',
    // height: '25%',
    maxHeight: '250px',
    // boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  },
  resultsContainer: {
    // border: '2px solid purple',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%',
    // marginLeft: 2,
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