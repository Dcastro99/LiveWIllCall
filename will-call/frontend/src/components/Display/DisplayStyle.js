export const DisplayStyle = {
  resultsMainBox: {
    borderRadius: 2,
    padding: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    height: '25%',

    boxShadow: 'rgba(0,0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    marginBottom: 3,

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
    height: '70%',
    width: '70%',
  },
  reultText: {
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
  },
  resultBox: {
    borderRadius: 5,
    marginTop: 2,
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
    maxWidth: '68%',
    '&::-webkit-scrollbar': {
      width: '0',
      height: '0',
    },
  },
  displayBox: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '71vh',
  },

}