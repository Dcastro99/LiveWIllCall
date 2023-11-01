const ticketErrors = (err) => {
    console.log("in ticketErrors message::", err.message, "CODE!!", err.code);

    let errors = { ticket: "" };

if(err.message === "ticket not found"){
    errors.ticket = "ticket not found";
}

if(err.message === "ticket already completed"){
    errors.ticket = "ticket already completed";
}
if(err.message === "Cannot read properties of undefined (reading 'branch_id') "){
    console.log("in undefined YO!!!");
    errors.ticket = "ticket not found";
}

return errors;

};

export { ticketErrors };