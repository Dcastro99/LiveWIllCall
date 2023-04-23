import { createContext, useState } from 'react';


const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [ticket, setTicket] = useState([]);

  const addticket = (customer_name, customer_po, order_number, { name, image, id }) => {
    console.log('IN THE CONTEXT', customer_name, customer_po, order_number, { name, image, id })
    setTicket((prev) => [...prev, {
      customer_name: customer_name,
      order_number: order_number,
      customer_po: customer_po,
      teamMember: { name, image, id }
    }])
  }

  return (
    <TicketContext.Provider value={{ ticket, setTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export default TicketContext;