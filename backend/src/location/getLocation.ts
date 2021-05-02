import { APIGatewayProxyEvent } from "aws-lambda";
import axios from "axios";
import { QUERY_NOT_FOUND_ERROR_RESPONSE_MESSAGE } from "../resources/messages-response.json";
import { sanitizeError } from "../utils/helpers/response";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<LocationResponse> => {
  try {
    if (!event.pathParameters || !event.pathParameters.query) {
      throw QUERY_NOT_FOUND_ERROR_RESPONSE_MESSAGE;
    }

    const query = event.pathParameters && event.pathParameters.query;
    const URL = `${process.env.MAP_BOX_URL}/${query}.json`;

    const response = await axios.get(URL, {
      params: {
        access_token: process.env.MAP_BOX_ACCESS_TOKEN,
      },
    });

    if (!response?.data?.features?.length) {
      throw 404;
    }

    return {
      coordinates: response.data.features[0].center as number[],
    };
  } catch (error) {
    throw new Error(sanitizeError(JSON.stringify(error)));
  }
};
