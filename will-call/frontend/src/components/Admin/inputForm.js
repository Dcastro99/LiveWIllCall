import React, { useState } from "react";
import {
  Box, Typography, Card, CardMedia, CardContent, TextField, Button, Divider,
} from "@mui/material";
import AdminStyle from "./AdminStyle";
import TM from "../../asset/Data/VanTM.json";
import Logo from "../../asset/images/GLogo.png";

export default function InputForm({ handleCreateTicket }) {
  const [clicked, setClicked] = useState(null);
  const [teamMember, setTeamMember] = useState({});
  const [time, setTime] = useState(null);

  // ------------------- CREATING-TIME-FUNCTION -------------------//
  const timeFunction = () => setTime(Date.now());

  // ------------------- IF-NO-TEAMMEMBER-SELECTED -------------------//
  const noTM = {
    name: "Pending...",
    image: Logo,
  };

  // ------------------- TEAM-MEMBER -------------------//
  const handleTM = (tm, index) => {
    setTeamMember(tm);
    setClicked(index === clicked ? null : index);
  };

  // ------------------- TICKET-ADD -------------------//
  const addLiveWillCall = (e) => {
    e.preventDefault();
    let tm = "";
    if (teamMember.name === undefined) {
      tm = noTM;
    } else {
      tm = teamMember;
    }

    const formData = e.target;
    const newTicket = {
      customerName: formData.customer_name.value,
      orderNumber: formData.order_number.value,
      customerPO: formData.customer_po.value,
      TeamMember: tm,
      TimeStamp: time,
      storeData: false,
    };
    handleCreateTicket(newTicket);
    document.getElementById("ticketForm").reset();
    setClicked("");
    setTeamMember({});
  };

  const clearFields = () => {
    document.getElementById("ticketForm").reset();
    setClicked("");
    setTeamMember({});
  };

  TM.sort((a, b) => ((a.name > b.name) ? 1 : -1));

  return (

    <Box
      sx={ AdminStyle.custometInputContainer }
    >
      <form
        style={ AdminStyle.formStyle }
        id="ticketForm"
        onSubmit={ (e) => { addLiveWillCall(e); } }
      >
        <Box
          sx={ AdminStyle.inputBox }
        >
          <Box
            sx={ AdminStyle.customerInfoBox }
          >
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
            >
              <Box
                sx={ AdminStyle.clearButton }
                onClick={ clearFields }
              >
                Clear
              </Box>

            </Box>
            <Typography
              sx={ AdminStyle.customerText }
              variant="h6"
            >
              Customer Name
            </Typography>
            <TextField
              sx={ AdminStyle.customerTextField }
              id="outlined-basic"
              label="Customer Name"
              variant="outlined"
              name="customer_name"
            />
            <Typography
              sx={ AdminStyle.customerText }
              variant="h6"
            >
              Order Number
            </Typography>
            <TextField
              sx={ AdminStyle.customerTextField }
              id="outlined-basic"
              label="Order Number"
              variant="outlined"
              name="order_number"
            />
            <Typography
              sx={ AdminStyle.customerText }
              variant="h6"
            >
              Customer PO
            </Typography>
            <TextField
              sx={ AdminStyle.customerTextField }
              id="outlined-basic"
              label="Customer PO"
              variant="outlined"
              name="customer_po"
            />
          </Box>
          <Divider
            sx={ AdminStyle.dividerContainer }
          />
          <Box
            sx={ AdminStyle.imgBox }
          >

            { /* ------------------- ADD-TEAM-MEMBER -------------------*/ }

            { TM.length > 0 ? TM.map((member, index) => (
              <Button
                sx={ AdminStyle.carButton }
                onClick={ () => handleTM(member, index) }
                key={ member.id }
              >
                <Card
                  sx={
                    index === clicked
                      ? AdminStyle.cardContainerClicked
                      : AdminStyle.cardContainer
                  }
                  key={ member.id }
                >
                  <CardMedia
                    component="img"
                    sx={ AdminStyle.carImg }
                    image={ member.image }
                    alt={ member.name }
                  />
                  <CardContent
                    sx={ AdminStyle.cardContent }
                  >
                    <Typography
                      sx={ AdminStyle.carName }
                      variant="h5"
                    >
                      { member.name }
                    </Typography>
                  </CardContent>
                </Card>
              </Button>
            ))
              : (
                <Typography
                  variant="h5"
                >
                  No Team Members
                </Typography>
              ) }
          </Box>

          <Divider
            sx={ AdminStyle.dividerContainer }
          />
          <Button
            sx={ AdminStyle.submitButton }
            type="submit"
            onClick={ timeFunction }
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
