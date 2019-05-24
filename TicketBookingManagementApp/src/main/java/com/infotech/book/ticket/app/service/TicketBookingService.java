package com.infotech.book.ticket.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infotech.book.ticket.app.dao.TicketBookingDao;
import com.infotech.book.ticket.app.entities.Ticket;

@Service
public class TicketBookingService {

	@Autowired
	private TicketBookingDao ticketBookingDao;
	
	public Ticket createTicket(Ticket ticket) {
		return ticketBookingDao.save(ticket);
	}
	public Ticket getTicketById(Integer ticketId) {
		return ticketBookingDao.findOne(ticketId);
	}
	public Iterable<Ticket> getAllBookedTickets() {
		return ticketBookingDao.findAll();
	}
	public void deleteTicket(Integer ticketId) {
		ticketBookingDao.delete(ticketId);
	}
	public Ticket updateTicket(Ticket ticket) {
		System.out.println("ticket :"+ticket);
		Ticket ticketFromDb = ticketBookingDao.findOne(ticket.getTicketId());
		System.out.println("ticketFromDb :"+ticketFromDb);
		ticketFromDb.setEmail(ticket.getEmail());
		ticketFromDb.setPassengerName(ticket.getPassengerName());
		ticketFromDb.setSourceStation(ticket.getSourceStation());
		ticketFromDb.setDestStation(ticket.getDestStation());
		//ticketFromDb.setBookingDate(ticket.getBookingDate());
		Ticket upadedTicket = ticketBookingDao.save(ticketFromDb);
		return upadedTicket;
	}
}
