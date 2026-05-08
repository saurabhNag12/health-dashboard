# AWS QuickSight IAM User Setup Script (PowerShell)
# This script creates an IAM user with the necessary permissions for QuickSight embedding

Write-Host "Setting up AWS QuickSight IAM user..." -ForegroundColor Green

# Variables
$IAM_USER_NAME = "quicksight-embed-user"
$ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)

Write-Host "AWS Account ID: $ACCOUNT_ID" -ForegroundColor Yellow

# Create IAM user
Write-Host "Creating IAM user: $IAM_USER_NAME" -ForegroundColor Blue
aws iam create-user --user-name $IAM_USER_NAME

# Create inline policy for QuickSight permissions
$policy = @"
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
"@

# Save policy to temporary file
$policy | Out-File -FilePath "quicksight-embed-policy.json" -Encoding UTF8

# Attach policy to user
Write-Host "Attaching QuickSight policy to user..." -ForegroundColor Blue
aws iam put-user-policy --user-name $IAM_USER_NAME --policy-name QuickSightEmbedPolicy --policy-document file://quicksight-embed-policy.json

# Create access keys
Write-Host "Creating access keys..." -ForegroundColor Blue
$accessKeys = aws iam create-access-key --user-name $IAM_USER_NAME --query 'AccessKey.[AccessKeyId,SecretAccessKey]' --output text

# Parse access keys
$keys = $accessKeys -split "`t"
$ACCESS_KEY_ID = $keys[0]
$SECRET_ACCESS_KEY = $keys[1]

Write-Host ""
Write-Host "=== IAM USER SETUP COMPLETE ===" -ForegroundColor Green
Write-Host "User Name: $IAM_USER_NAME"
Write-Host "Access Key ID: $ACCESS_KEY_ID"
Write-Host "Secret Access Key: $SECRET_ACCESS_KEY"
Write-Host "Account ID: $ACCOUNT_ID"
Write-Host ""
Write-Host "IMPORTANT: Save these credentials securely!" -ForegroundColor Red
Write-Host "Add them to your .env file:"
Write-Host "AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID"
Write-Host "AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY"
Write-Host "AWS_ACCOUNT_ID=$ACCOUNT_ID"
Write-Host ""

# Clean up
Remove-Item "quicksight-embed-policy.json"

Write-Host "Next step: Register this user in QuickSight console" -ForegroundColor Yellow
Write-Host "Go to AWS QuickSight console and register the user"
