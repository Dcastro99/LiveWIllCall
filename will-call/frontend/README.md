# Gensco Live Will-Call

## APP

- [Will-Call Display](https://live-w-ill-call-19lm.vercel.app/)

- [Will-Call Admin](https://live-w-ill-call-19lm.vercel.app/admin)

### Table of Contents

- [V-1](./src/Notes/Version-1.md)

## Phase 1 Requirements

In this phase I wanted to have both the Display.js screen working and the Admin.js screen working. The user will have the ability to input an order number, customer name, customer PO, and select a Team Member which will be pulling the order. Once this ticket is generated a time stamp is added to the object and sent to the database.

Once we pull from the database we can determine the time it is taking the team member to pull the order by using the original timestamp minus the current time.

Team Members are hard coded in a JSON{} file but will be stored in the backend in the near future.
