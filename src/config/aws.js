import { QuickSightClient, GetDashboardEmbedUrlCommand } from '@aws-sdk/client-quicksight';

const config = {
  region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    sessionToken: import.meta.env.VITE_AWS_SESSION_TOKEN
  }
};

export const quickSightClient = new QuickSightClient(config);

export const getQuickSightEmbedUrl = async (dashboardId, userArn) => {
  try {
    const command = new GetDashboardEmbedUrlCommand({
      AwsAccountId: import.meta.env.VITE_AWS_ACCOUNT_ID,
      DashboardId: dashboardId,
      UserArn: userArn,
      SessionLifetimeInMinutes: 60,
      ResetDisabled: false,
      UndoRedoDisabled: false
    });

    const response = await quickSightClient.send(command);
    return response.EmbedUrl;
  } catch (error) {
    console.error('Error getting QuickSight embed URL:', error);
    throw error;
  }
};
