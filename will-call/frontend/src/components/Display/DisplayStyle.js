export default {
  resultsMainBox: {
    borderRadius: 2,
    padding: 5,
    margin: 5,
    display: "flex",

    flexDirection: "row",

    alignItems: "center",
    width: "100%",
    height: "100%",
    boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1)"
      + "0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
  },

  resultsMainBoxEmpty: {
    borderRadius: 2,
    padding: 20,
    margin: 5,
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "68%",
    height: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1)"
       + "0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
  },

  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    marginLeft: 2,
  },

  resultsTMName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "3rem",
  },

  resultImg: {
    marginTop: 0.5,
    height: "100%",
    width: "100%",
  },

  resultTextName: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    minWidth: "400px",
  },

  resultTextPO: {
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    minWidth: "400px",
  },

  resultText2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 80,
    fontFamily: "Dancing Script",
  },

  resultText3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 60,
  },

  resultCustomerBoxBorder: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 2,
    border: "2px solid WhiteSmoke",
    borderRadius: 3,
    padding: 1,
    marginBottom: 1,
    width: "100%",
  },

  resultCustomerBoxBorder2: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 2,
    borderRadius: 3,
    padding: 1,
    marginBottom: 1,
  },

  resultCustomerBoxBorder3: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 2,
    borderRadius: 3,
    padding: 1,
    marginBottom: 1,
  },

  resultCustomerInfoBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    marginLeft: 15,
  },

  resultCustomerInfoText: {
    textShadow: "1px 2px 6px orange",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "60%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  resultCustomerInfoText2: {
    textShadow: "1px 2px 6px orange",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "60%",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },

  deleteButton: {
    backgroundColor: "salmon",
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

  displayBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    minHeight: "885px",
  },

  // ---------------CAROUSEL-STYLE----------------//
  carouselContainer: {
    display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%",
  },

  carouselItemContainer: {
    display: "flex", justifyContent: "center",
  },

  carouselWelcomeItemContainer: {
    display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%",
  },

  carouselTypography: {
    fontFamily: "Dancing Script",
    marginTop: 5,
  },
};
