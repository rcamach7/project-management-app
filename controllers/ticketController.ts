import { Ticket } from 'schemas';

export const getAllTickets = async () => {
  try {
    const tickets = await Ticket.find();
    return tickets;
  } catch (error) {
    console.error('Error getting all ticket: ', error);
    return Promise.reject(error);
  }
};

/**
 * POST Controllers
 */

export const createNewTicket = async (
  title: string,
  description: string,
  label: string
) => {
  try {
    const newTicket = new Ticket({
      title,
      description,
      labels: [label],
    });
    await newTicket.save();

    return newTicket;
  } catch (error) {
    console.error('Error creating ticket: ', error);
    return Promise.reject(error);
  }
};
