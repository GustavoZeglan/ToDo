import { z } from "zod";

const URLSchema = z.string().url();

export const isValidURL = (url: string): boolean => {
    try {
      URLSchema.parse(url);
      return true;
    } catch (error) {
      return false;
    }
  };