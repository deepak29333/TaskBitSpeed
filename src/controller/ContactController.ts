import {Contact} from "../entity/Contact";
import {DataSource} from "typeorm";
import {BaseController} from "./BaseController";

export class ContactController extends BaseController {

  private contactRepository: any;

  constructor(connection: DataSource) {
    super();
    this.contactRepository = connection.getRepository(Contact);
  }

  async getContacts(ctx: any) {
    try {
      const {email, phoneNumber} = ctx.request.body;

      // Validate input
      if (!email && !phoneNumber) {
        return this.errorResponse(ctx, new Error("Either email or phone number must be provided"), 400);
      }

      const primaryContact: Contact = await this.contactRepository.findOne({
        where: [
          (email ? {email: email, linkPrecedence: "primary"} : {}),
          (phoneNumber ? {phoneNumber: phoneNumber, linkPrecedence: "primary"} : {}),
        ]
      });

      if (!primaryContact) {
        return this.errorResponse(ctx, new Error("Primary contact not found"), 404);
      }


      const primaryContactIdId = primaryContact.id;

      const linkedSecondaryContacts: Contact[] = await this.contactRepository.find({
        select: ["email", "phoneNumber", "id"],
        where: {
          linkedIn: primaryContactIdId,
          linkPrecedence: "secondary"
        }
      });

      let phoneNumbers: Set<string> = primaryContact.phoneNumber ? new Set([primaryContact.phoneNumber!]) : new Set();
      let emails: Set<string> = primaryContact.email ? new Set([primaryContact.email!]) : new Set();
      let secondaryContactsIds: Set<number> = new Set();

      linkedSecondaryContacts.map(
        (contact: Contact) => {
          if (contact.phoneNumber) {
            phoneNumbers.add(contact.phoneNumber!);
          }
          if (contact.email) {
            emails.add(contact.email!);
          }
          secondaryContactsIds.add(contact.id);
        }
      )

      let output = {
        primaryContactId: primaryContactIdId,
        emails: Array.from(emails),
        phoneNumbers: Array.from(phoneNumbers),
        secondaryContactsIds: Array.from(secondaryContactsIds)
      }

      return this.okResponse(ctx, output);
    } catch (err) {
      return this.errorResponse(ctx, err as Error, 500);
    }
  }
}