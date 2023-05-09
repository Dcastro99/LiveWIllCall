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
    paddingTop: 1,
    paddingBottom: 1,
    // backgroundColor: '#C8744F',
    marginTop: 1,
    marginBottom: 1,
    // height: '80%',
    // backgroundColor: 'pink'
  },
  customerInfoBox: {
    // marginTop: 1,
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
    // border: '2px solid pink',

    height: '115px',
  },
  cardContainerClicked: {
    margin: 1,
    boxShadow: 'rgba(251, 192, 147) 0px 8px 24px, rgba(251, 192, 147, 9) 0px 16px 56px, rgba(17, 17, 65, 0.1) 0px 24px 80px',
    backgroundColor: 'black',
    color: 'GhostWhite',
    border: '2px solid rgba(275, 192, 147)',

    height: '115px',
  },
  carImg: {
    height: '80px',
    width: '80px',
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
    position: 'relative',
    // border: '2px solid pink'
  },
  submitButton: {
    color: '#C8744F',
    backgroundColor: 'black',
  },
  resultBox: {
    borderRadius: 5,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // border: '2px solid blue',
    position: 'absolute',
    overflowY: 'scroll',
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none',
    // maxHeight: '100%',
    // maxWidth: '100%',
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
    width: '45%',
    margin: 2,
    // border: '2px solid black',
    height: '35%',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  },
  resultsContainer: {
    // border: '2px solid purple',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '47%',
    height: '80%',
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
  resultTexfeildContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    height: '100%',
    margin: 2
  },
  resultTextfield: {
    display: 'flex', flexDirection: "row", marginLeft: 2, border: '2px solid WhiteSmoke', borderRadius: 3, padding: 1, marginBottom: 1
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
  editButton: {

    backgroundColor: 'white',
    color: '#D3D3D3',
    borderRadius: '10px',
    marginTop: 3,
    // boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    '&:hover': {
      backgroundColor: 'white',
      color: '#676767',
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',

    },
  },



}