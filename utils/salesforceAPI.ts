
import axios from 'axios';

const SALESFORCE_AUTH_URL = 'https://login.salesforce.com/services/oauth2/token';
const SALESFORCE_BASE_URL = 'https://ddm00000ir8yfuaz-dev-ed.develop.my.salesforce.com/services/apexrest';

// Get credentials from environment variables
const CLIENT_ID = process.env.SALESFORCE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SALESFORCE_CLIENT_SECRET || '';
const USERNAME = process.env.SALESFORCE_USERNAME || '';
const PASSWORD = process.env.SALESFORCE_PASSWORD || '';

interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  subject: string;
}

export async function getSalesforceToken(): Promise<string> {
  try {
    const response = await axios.post<SalesforceAuthResponse>(
      SALESFORCE_AUTH_URL,
      new URLSearchParams({
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        username: USERNAME,
        password: PASSWORD,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Salesforce token:', error);
    throw new Error('Failed to authenticate with Salesforce');
  }
}

export async function fetchLearningTasks(token: string): Promise<Task[]> {
  try {
    const response = await axios.get(`${SALESFORCE_BASE_URL}/learningtasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data as Task[];
  } catch (error) {
    console.error('Error fetching learning tasks:', error);
    throw new Error('Failed to fetch learning tasks from Salesforce');
  }
}

export async function fetchWorkTasks(token: string): Promise<Task[]> {
  try {
    const response = await axios.get(`${SALESFORCE_BASE_URL}/worktasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return response.data as Task[];
  } catch (error) {
    console.error('Error fetching work tasks:', error);
    throw new Error('Failed to fetch work tasks from Salesforce');
  }
}
