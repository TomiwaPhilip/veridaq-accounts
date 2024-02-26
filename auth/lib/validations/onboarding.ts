import { z } from "zod";

export const OnboardingValidation = z.object({
  firstName: z.string().min(1, {
    message: "Firstname must be at least 1 character.",
  }),
  lastName: z.string().min(1, {
    message: "Lastname must be at least 1 character.",
  }),
  otherName: z.string().min(1, {
    message: "Lastname must be at least 1 character.",
  }),
  streetAddress: z.string().min(8, {
    message: "Street Address must be at least 8 characters.",
  }),
  city: z.string().min(1, {
    message: "City must be at least 1 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 characters.",
  }),
  country: z.string().min(1, {
    message: "Country must be at least 1 characters.",
  }),
  profile_photo: z.string().url().min(1),
});
