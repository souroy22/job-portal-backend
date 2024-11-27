import Contact from "../models/User.model";

export const checkForDuplicateContact = async (contact: string) => {
  try {
    const user = await Contact.findOne({ contactNumber: contact });
    return user ?? null;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      throw new Error(error.message);
    }
  }
};
