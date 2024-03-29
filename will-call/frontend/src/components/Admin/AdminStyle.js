export default {
  adminHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    backgroundColor: "WhiteSmoke",
  },

  adminHeaderRightImgBox: {
    width: "50px", height: "50px",
  },

  mainAdminContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },

  adminContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // border: "2px solid purple",
  },

  dividerContainer: {
    width: "90%", bgcolor: "GhostWhite", opacity: 1, marginTop: 3, marginBottom: 3,

  },

  // ------------FROM_STYLES------------//

  customerInputContainer: {
    width: "30%", minHeight: "100%",
    // border: "3px solid black",

  },
  customerInputContainer2: {
    width: "100%", minHeight: "100%",
    // border: "3px solid black",

  },

  formStyle: {
    height: "100%",
  },

  inputBox: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 1,
    marginBottom: 1,
  },
  inputBox2: {
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "78vh",
    paddingTop: 1,
    paddingBottom: 1,
    marginTop: 1,
    marginBottom: 1,
  },

  customerInfoBox: {
    backgroundColor: "white",
    borderRadius: 3,
    padding: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "20%",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
  },
  customerInfoBox2: {
    backgroundColor: "white",
    borderRadius: 3,
    paddingTop: 2,
    paddingBottom: 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
  },

  customerTextField: {
    width: "60%",
  },

  customerText: {
    width: "60%",
    marginBottom: 0,
    fontWeight: "bold",
  },

  imgBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -1,
    marginBottom: -1,
  },

  cardContainer: {
    margin: 1,

    boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    },
    height: "100%",
  },

  cardContainerClicked: {
    margin: 1,
    boxShadow: "rgba(251, 192, 147) 0px 8px 24px, rgba(251, 192, 147, 9)"
      + "0px 16px 56px, rgba(17, 17, 65, 0.1) 0px 24px 80px",
    backgroundColor: "black",
    color: "GhostWhite",
    border: "2px solid rgba(275, 192, 147)",
    height: "115px",
  },

  carImg: {
    height: "80px",
    width: "80px",
  },

  cardContent: {
    padding: 0,
    "&: last-child": {
      paddingBottom: 0,
    },
  },

  carName: {
    display: "flex",
    justifyContent: "center",
    marginTop: 1,
    fontSize: "18px",
  },

  carButton: {
    padding: "0px",
  },

  dividerBox: {
    width: 4,
    backgroundColor: "whitesmoke",
  },

  submitButton: {
    color: "#C8744F",
    backgroundColor: "black",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    },
  },

  clearButton: {
    borderRadius: 1,
    cursor: "pointer",
    fontSize: "11px",
    width: "12%",
    padding: 0.3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#C8744F",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    },
  },

  // ------------RESULTS_STYLES------------//
  resultDisplayBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    position: "relative",
  },

  resultBox: {
    borderRadius: 5,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    overflowY: "scroll",
    msOverflowStyle: "none",
    minHeight: "100%",
    maxHeight: "100%",
    "&::-webkit-scrollbar": {
      width: "0",
      height: "0",
    },
  },

  resultsMainBox: {
    borderRadius: 2,
    padding: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
    margin: 2,
    height: "35%",
    boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  },

  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "47%",
    height: "80%",
  },

  resultsTMName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  resultImg: {
    height: "180px",
    width: "180px",
  },

  resultText: {
    fontWeight: "bold",
  },

  resultFields: {
    marginLeft: 2, display: "flex", alignItems: "center",
  },

  resultTextFieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    height: "100%",
    margin: 2,
  },

  resultTextfield: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 2,
    border: "2px solid WhiteSmoke",
    borderRadius: 3,
    padding: 1,
    marginBottom: 1,
  },

  resultEditContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#90EE90",
    color: "WhiteSmoke",
    borderRadius: "10px",
    marginTop: 3,
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "white",
      color: "#676767",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
    },
  },

  editButton: {
    backgroundColor: "white",
    color: "#D3D3D3",
    borderRadius: "10px",
    marginTop: 3,
    "&:hover": {
      backgroundColor: "white",
      color: "#676767",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",

    },
  },

  noTicketContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Dancing Script",
    fontSize: "50px",

  },

  noTmBox: {
    borderRadius: 2,
    padding: 20,
    margin: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1)"
      + "0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
  },

};
