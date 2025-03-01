
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSalesforceToken, fetchLearningTasks, fetchWorkTasks } from '../../utils/salesforceAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get Salesforce token
    const token = await getSalesforceToken();
    
    // Fetch both types of tasks
    const [learningTasks, workTasks] = await Promise.all([
      fetchLearningTasks(token),
      fetchWorkTasks(token)
    ]);
    
    // Return both task types
    res.status(200).json({
      learningTasks,
      workTasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}
