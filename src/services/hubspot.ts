import axios from 'axios';

import { HUBSPOT_API_KEY, HUBSPOT_FORM_ID, HUBSPOT_PORTAL_ID } from './config';

export const sendToHubSpot = async (email: string) => {
  try {
    const response = await axios.post(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        fields: [
          {
            name: 'email',
            value: email,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi à HubSpot:", error);
    throw error;
  }
};
