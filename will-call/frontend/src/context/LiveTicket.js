import { createContext, useState } from 'react';


const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [ticket, setTicket] = useState([]);
  console.log('TICKET CONTEXT', ticket)
  const addTicket = (customer_name, order_number, customer_po, { name, image, id }) => {
    console.log('IN THE CONTEXT', customer_name, order_number, customer_po, { name, image, id })
    setTicket((prev) => [...prev, {
      customer_name: customer_name,
      order_number: order_number,
      customer_po: customer_po,
      teamMember: { name, image, id }
    }])
  }

  return (
    <TicketContext.Provider value={{ ticket, setTicket, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export default TicketContext;