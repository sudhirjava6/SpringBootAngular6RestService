export class Project
{
    ticketId: number;
    passengerName: string;
    bookingDate: Date;
    sourceStation: string;
    destStation: string;
    email: string;

    constructor()
    {
        this.ticketId = 0;
        this.passengerName = null;
        this.bookingDate = null;
        this.sourceStation = null;
        this.destStation=null;
        this.email=null;
    }
}
