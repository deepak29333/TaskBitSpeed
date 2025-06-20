import {Contact} from "../entity/Contact";
import {DataSource} from "typeorm";

export class ContactController {

  private contactRepository: any;

  constructor(connection: DataSource) {
    this.contactRepository = connection.getRepository(Contact);
  }

  async getContacts(ctx: any) {
    try {
      const {email, phoneNumber} = ctx.request.body;

      // Validate input
      if (!email || !phoneNumber) {
        ctx.status = 400;
        ctx.body = {error: "Bad Request: At least one of email or phoneNumber must be provided."};
        return;
      }

      const primaryContact: Contact = await this.contactRepository.findOne({
        where: [{email: email, linkPrecedence: "primary"}
          , {phoneNumber: phoneNumber, linkPrecedence: "primary"}]
      });

      if (!primaryContact) {
        ctx.status = 404;
        ctx.body = {error: "Contact not found"};
        return;
      }


      const primaryContactIdId = primaryContact.id;

      const linkedSecondaryContacts: Contact[] = await this.contactRepository.find({
        select: ["email", "phoneNumber", "id"],
        where: {
          linkedId: primaryContactIdId,
          linkPrecedence: "secondary"
        }
      });

      let phoneNumbers: string[] = primaryContact.phoneNumber ? [primaryContact.phoneNumber!] : [];
      let emails: string[] = primaryContact.email ? [primaryContact.email!] : [];
      let secondaryContactsIds: number[] = [];

      linkedSecondaryContacts.map(
        (contact: Contact) => {
          if (contact.phoneNumber) {
            phoneNumbers.push(contact.phoneNumber!);
          }
          if (contact.email) {
            emails.push(contact.email!);
          }
          secondaryContactsIds.push(contact.id);
        }
      )


      let output = {
        primaryContactId: primaryContactIdId,
        emails: emails,
        phoneNumbers: phoneNumbers,
        secondaryContactsIds: secondaryContactsIds
      }

      ctx.status = 200;
      ctx.body = {contact: output};
      return;

    } catch (err) {
      console.error("Error fetching contacts:", err);
      ctx.status = 500;
      ctx.body = {error: "Internal Server Error"};
      return;
    }
  }
}