#!/bin/bash

# AWS QuickSight IAM User Setup Script
# This script creates an IAM user with the necessary permissions for QuickSight embedding

echo "Setting up AWS QuickSight IAM user..."

# Variables
IAM_USER_NAME="quicksight-embed-user"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "AWS Account ID: $ACCOUNT_ID"

# Create IAM user
echo "Creating IAM user: $IAM_USER_NAME"
aws iam create-user --user-name $IAM_USER_NAME

# Create inline policy for QuickSight permissions
cat > quicksight-embed-policy.json << EOF
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
                "arn:aws:quicksight:*:$ACCOUNT_ID:dashboard/*",
                "arn:aws:quicksight:*:$ACCOUNT_ID:user/*",
                "arn:aws:quicksight:*:$ACCOUNT_ID:namespace/default"
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
EOF

# Attach policy to user
echo "Attaching QuickSight policy to user..."
aws iam put-user-policy --user-name $IAM_USER_NAME --policy-name QuickSightEmbedPolicy --policy-document file://quicksight-embed-policy.json

# Create access keys
echo "Creating access keys..."
ACCESS_KEYS=$(aws iam create-access-key --user-name $IAM_USER_NAME --query 'AccessKey.[AccessKeyId,SecretAccessKey]' --output text)

# Parse access keys
ACCESS_KEY_ID=$(echo $ACCESS_KEYS | awk '{print $1}')
SECRET_ACCESS_KEY=$(echo $ACCESS_KEYS | awk '{print $2}')

echo ""
echo "=== IAM USER SETUP COMPLETE ==="
echo "User Name: $IAM_USER_NAME"
echo "Access Key ID: $ACCESS_KEY_ID"
echo "Secret Access Key: $SECRET_ACCESS_KEY"
echo "Account ID: $ACCOUNT_ID"
echo ""
echo "IMPORTANT: Save these credentials securely!"
echo "Add them to your .env file:"
echo "AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID"
echo "AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY"
echo "AWS_ACCOUNT_ID=$ACCOUNT_ID"
echo ""

# Clean up
rm quicksight-embed-policy.json

echo "Next step: Register this user in QuickSight console"
echo "Go to AWS QuickSight console and register the user"
