export const DisplayStyle = {
  resultsMainBox: {
    borderRadius: 2,
    padding: 2,
    margin: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '68%',
    height: '80%',
    // border: '2px solid green',
    boxShadow: 'rgba(0,0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    // marginBottom: 3,

  },
  resultsContainer: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: '100%',
    marginLeft: 2,
    // backgroundColor: 'pink',

  },
  resultsTMName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  resultImg: {
    marginTop: .5,
    height: '100%',
    width: '100%',
  },
  reultText: {
    fontWeight: 'bold',

  },
  resultCustomerBoxBorder: {
    display: 'flex',
    flexDirection: "row",
    marginLeft: 2,
    border: '2px solid WhiteSmoke',
    borderRadius: 3,
    padding: 1,
    marginBottom: 1
  },
  resultCustomerInfoBox: {
    // border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '100%',
    margin: 2
  },
  resultCustomerInfoText: {
    marginLeft: 2,
    textShadow: '1px 2px 6px orange',
    display: 'flex',
    alignItems: 'center'
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
  },
  resultBox: {
    // border: '2px solid black',
    // borderRadius: 5,
    // marginTop: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    // backgroundColor: 'lightgrey',
    // height: '100vh',
    // backgroundColor: 'grey'
    // position: 'absolute',
    overflowY: 'scroll',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none',
    // marginTop: '-68px',
    maxHeight: '100%',
    maxWidth: '100%',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  displayBox: {
    // border: '2px solid purple',
    // paddingBottom: 2,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80vh',
  },

}