
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the authorization code from the query parameters
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }
  
  try {
    // Log the received code (for development purposes)
    console.log('Received Salesforce authorization code:', code);
    
    // In a production environment, here you would:
    // 1. Exchange the code for an access token
    // 2. Store the token securely
    // 3. Redirect the user to the appropriate page
    
    // For now, redirect to the home page
    return res.redirect('/');
  } catch (error) {
    console.error('Error in Salesforce callback:', error);
    return res.status(500).json({ error: 'Failed to process callback' });
  }
}
