# AWS QuickSight Setup Guide

## Prerequisites
1. AWS Account with appropriate permissions
2. AWS CLI installed and configured (or use AWS Management Console)

## Step 1: Create IAM User

### Using AWS Management Console:
1. Go to AWS IAM Console
2. Click "Users" → "Create user"
3. User name: `quicksight-embed-user`
4. Select "Attach policies directly"
5. Create inline policy with the following JSON:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "quicksight:GetDashboardEmbedUrl",
                "quicksight:DescribeDashboard",
                "quicksight:ListUsers",
                "quicksight:RegisterUser",
                "quicksight:GetUser",
                "quicksight:DescribeUser"
            ],
            "Resource": [
                "arn:aws:quicksight:*:YOUR_ACCOUNT_ID:dashboard/*",
                "arn:aws:quicksight:*:YOUR_ACCOUNT_ID:user/*",
                "arn:aws:quicksight:*:YOUR_ACCOUNT_ID:namespace/default"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "sts:GetFederationToken"
            ],
            "Resource": "*"
        }
    ]
}
```

6. Create access keys for the user
7. Save the Access Key ID and Secret Access Key

## Step 2: Set up QuickSight

1. Go to AWS QuickSight Console
2. Sign up for QuickSight (if not already done)
3. Register the IAM user created above
4. Create a new dashboard or use an existing one
5. Note the Dashboard ID from the URL or dashboard settings

## Step 3: Configure Environment Variables

Create a `.env` file in your project root with:

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_ACCOUNT_ID=your_aws_account_id_here

# QuickSight Configuration
VITE_QUICKSIGHT_DASHBOARD_ID=your_dashboard_id_here
VITE_QUICKSIGHT_USER_ARN=arn:aws:quicksight:us-east-1:your_account_id:user/default/quicksight-embed-user
```

## Step 4: Enable Embedding in QuickSight

1. In QuickSight Console, go to your dashboard
2. Click "Share" → "Embed dashboard"
3. Select "Embed in your application"
4. Configure embedding permissions for your IAM user
5. Note the dashboard ID for your environment variables

## Step 5: Test the Integration

1. Start your React application
2. Navigate to the Analytics Dashboard
3. The QuickSight dashboard should embed successfully

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your domain is whitelisted in QuickSight embedding settings
2. **Authentication Errors**: Verify IAM user permissions and QuickSight user registration
3. **Dashboard Not Found**: Check dashboard ID and ensure it's shared with your IAM user

### Required IAM Permissions:
- `quicksight:GetDashboardEmbedUrl`
- `quicksight:DescribeDashboard`
- `quicksight:RegisterUser`
- `sts:GetFederationToken`

### QuickSight User Registration:
The IAM user must be registered in QuickSight before embedding will work.
