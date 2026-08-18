import { customAlphabet } from "nanoid";
const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
const generate = customAlphabet(alphabet, 22);
// function to generate token only
//  Generates a new household  token anyone with this token can read and write plants in household
export const generateHouseholdToken = (): string => {
    return generate();
}
export const HOUSEHOLD_COOKIE = "if she had been with me";
export const HOUSEHOLDS_COOKIE = "if she had been with meeee";