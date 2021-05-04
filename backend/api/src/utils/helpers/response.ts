import {
  INTERNAL_ERROR_RESPONSE_MESSAGE,
  ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE,
} from "../../resources/messages-response.json";

export const sanitizeError = (error: string): string => {
  let errorMessage = `${INTERNAL_ERROR_RESPONSE_MESSAGE} ${error}`;

  if (error === "404") {
    errorMessage = ENTITY_NOT_FOUND_ERROR_RESPONSE_MESSAGE;
  }

  console.log(`ERROR: ${errorMessage}`);

  return errorMessage;
};
