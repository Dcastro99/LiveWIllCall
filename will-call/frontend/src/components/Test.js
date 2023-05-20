{/* <Box sx={{ width: '30%', minHeight: '120%' }}>
          <form style={{ height: "100%" }} id='ticketForm' onSubmit={(e) => { addLiveWillCall(e) }}>
            <Box sx={AdminStyle.inputBox}>
              <Box sx={AdminStyle.customerInfoBox}>
                <Typography sx={AdminStyle.customerText} variant="h6">Customer Name</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer Name" variant="outlined" name='customer_name' />
                <Typography sx={AdminStyle.customerText} variant="h6">Order Number</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Order Number" variant="outlined" name='order_number' />
                <Typography sx={AdminStyle.customerText} variant="h6">Customer PO</Typography>
                <TextField sx={AdminStyle.customerTextField} id="outlined-basic" label="Customer PO" variant="outlined" name='customer_po' />
              </Box>
              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1, marginTop: 5, marginBottom: 5 }} />
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

              <Divider sx={{ width: '90%', bgcolor: 'GhostWhite', opacity: 1, marginTop: 5, marginBottom: 5 }} />
              <Button sx={AdminStyle.submitButton} type='submit' onClick={timeFunction}>Submit</Button>
            </Box >
          </form >
        </Box > * /}