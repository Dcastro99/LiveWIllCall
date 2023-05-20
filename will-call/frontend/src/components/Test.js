// {/* <Box sx={DisplayStyle.resultsMainBox}>
// <Card sx={DisplayStyle.resultsContainer}
//   key={ticket.id}>
//   <CardMedia component="img" sx={DisplayStyle.resultImg} image={ticket.TeamMember.image} alt={ticket.TeamMember.name} />
//   <CardContent>
//     <Typography sx={DisplayStyle.resultsTMName} variant="h5">{ticket.TeamMember.name}</Typography>
//   </CardContent>
// </Card>
// <Box sx={DisplayStyle.resultCustomerInfoBox}>
//   {/* <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center' }}>Currently Helping</Typography> */}
//   <Box sx={DisplayStyle.resultCustomerBoxBorder}>
//     <Typography sx={DisplayStyle.reultText} variant='h3'>Currently Helping :</Typography>
//     <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerName}</Typography>
//   </Box>


//   <Box sx={DisplayStyle.resultCustomerBoxBorder}>
//     <Typography sx={DisplayStyle.reultText} variant='h3'>Customer PO :</Typography>
//     <Typography variant='h3' sx={DisplayStyle.resultCustomerInfoText} >{ticket.customerPO}</Typography>
//   </Box>



// </Box>
// </Box> */}
{/* <Box sx={AdminStyle.adminHeader}>
        <img src={Logo} width="90" alt="Will Call Logo" />
        <Typography variant="h4">Manage Team Members</Typography>
        <Box sx={{ width: '50px', height: '50px' }} />
      </Box>
      <Box sx={{ width: '30%' }}>
        <form style={{ border: '4px solid purple' }} id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
          <Box sx={AdminStyle.adminContainer}>
            <Box sx={AdminStyle.inputBox}>
              <Box sx={AdminStyle.customerInfoBox}>
                <Typography sx={AdminStyle.customerText} variant="h6">Customer Name</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer Name" variant="outlined" name='customer_name' />
                <Typography sx={AdminStyle.customerText} variant="h6">Order Number</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Order Number" variant="outlined" name='order_number' />
                <Typography sx={AdminStyle.customerText} variant="h6">Customer PO</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer PO" variant="outlined" name='customer_po' />
              </Box>
              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1 }} />
              <Box sx={AdminStyle.imgBox}>

                {/*------------------- ADD-TEAM-MEMBER -------------------*/}

{
  TM.length > 0 ? TM.map((member, index) => (
    <Button sx={AdminStyle.carButton} onClick={() => handleTM(member, index)} key={member.id}>
      <Card
        sx={index === clicked ? AdminStyle.cardContainerClicked : AdminStyle.cardContainer}
        key={member.id} >
        <CardMedia component="img" sx={AdminStyle.carImg} image={member.image} alt={member.name} />
        <CardContent sx={AdminStyle.cardContent}>
          <Typography sx={AdminStyle.carName} variant="h5">{member.name}</Typography>
        </CardContent>
      </Card>
    </Button>
  )) : <Typography variant="h5">No Team Members</Typography>
}
              </Box >

              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1 }} />
              <Button sx={AdminStyle.submitButton} type='submit' onClick={timeFunction}>Submit</Button>
            </Box >
          </Box >
        </form >
      </Box > * /}