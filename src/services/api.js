import axios from 'axios';

/**
 * The base URL for the random user API.
 * @type {string}
 */
const BASE_URL = 'https://randomuser.me/api/';

/**
 * Axios instance configured for the random user API.
 * @type {AxiosInstance}
 */
const http = axios.create({
  baseURL: BASE_URL,
});

/**
 * Handles errors from the random user service.
 * @param {Error} error - The error object.
 * @throws {Error} The original error object.
 */
const handleServiceError = (error) => {
  console.error('Request error:', error);
  throw error;
};

/**
 * Retrieves random user data from the random user API.
 * @async
 * @function
 * @param {number} [count=15] - The number of random users to retrieve.
 * @returns {Promise<Object[]>} A promise that resolves to an array of formatted user objects.
 */
export const getRandomUsers = async (count = 15) => {
  try {
    /**
     * Represents a user object returned from the random user API.
     * @typedef {Object} RandomUser
     * @property {Object} name - The name of the user.
     * @property {string} name.first - The first name of the user.
     * @property {string} name.last - The last name of the user.
     * @property {string} picture - The URL of the user's picture.
     * @property {string} email - The email address of the user.
     */

    /**
     * Represents the response from the random user API.
     * @typedef {AxiosResponse} RandomUserApiResponse
     * @property {Object[]} results - An array of random user objects.
     */

    const response = await http.get('/', {
      params: {
        results: count,
        inc: 'name,picture,email',
        nat: 'gb,de,fr,es,ie,it,nl,pl,pt,se',
      },
    });

    /**
     * Formats a random user object.
     * @param {RandomUser} user - The random user object.
     * @returns {Object} The formatted user object.
     */
    const formatUser = (user) => ({
      name: `${user.name.first} ${user.name.last}`,
      picture: user.picture.large,
      email: user.email,
    });

    /**
     * The array of formatted user objects.
     * @type {Object[]}
     */
    const formattedUsers = response.data.results.map(formatUser);

    return formattedUsers;
  } catch (error) {
    handleServiceError(error);
  }
};
