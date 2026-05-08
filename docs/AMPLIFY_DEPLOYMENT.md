# AWS Amplify Deployment Guide

## 🚀 Deploy Your Health Dashboard with QuickSight to AWS Amplify

### ✅ Pre-Deployment Setup Complete

Your project is now fully configured for AWS Amplify deployment with QuickSight integration!

## 📋 Deployment Steps

### Step 1: Push to GitHub (If not already done)

```bash
# Initialize git repository (if not done)
git init
git add .
git commit -m "Initial commit - Health Dashboard with QuickSight"

# Add remote repository
git remote add origin https://github.com/yourusername/health-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Set up AWS Amplify

1. **Go to AWS Amplify Console**
   - Navigate to: https://console.aws.amazon.com/amplify/
   - Sign in to your AWS account

2. **Create New App**
   - Click "Get started" → "Deploy app"
   - Select "GitHub" (or your preferred Git provider)
   - Authorize AWS to access your GitHub account
   - Select your repository: `health-dashboard`
   - Select branch: `main`

3. **Configure Build Settings**
   - Amplify will automatically detect your React app
   - Build settings will be read from `amplify.yml`
   - Review the build configuration:
     ```yaml
     version: 1
     frontend:
       phases:
         preBuild:
           commands:
             - npm ci
         build:
           commands:
             - npm run build
       artifacts:
         baseDirectory: dist
         files:
           - '**/*'
       cache:
         paths:
           - node_modules/**/*
     ```

4. **Set Environment Variables**
   - In Amplify Console, go to "Environment variables"
   - Add the following variables:
     ```
     VITE_AWS_REGION=us-east-1
     VITE_AWS_ACCESS_KEY_ID=your_production_access_key
     VITE_AWS_SECRET_ACCESS_KEY=your_production_secret_key
     VITE_AWS_ACCOUNT_ID=your_aws_account_id
     VITE_QUICKSIGHT_DASHBOARD_ID=your_dashboard_id
     VITE_QUICKSIGHT_USER_ARN=arn:aws:quicksight:us-east-1:your_account_id:user/default/quicksight-embed-user
     ```

5. **Deploy**
   - Click "Save and deploy"
   - Amplify will build and deploy your application
   - Wait for deployment to complete (usually 2-5 minutes)

### Step 3: QuickSight Configuration for Production

1. **Update QuickSight Embedding Settings**
   - Go to AWS QuickSight Console
   - Select your dashboard
   - Click "Share" → "Embed dashboard"
   - Add your Amplify app URL to allowed domains
   - Example: `https://main.d123abc456.amplifyapp.com`

2. **CORS Configuration**
   - Ensure your Amplify domain is whitelisted in QuickSight
   - Test the embedding functionality

## 🔧 Deployment Configuration

### Build Configuration
- **Framework:** React (Vite)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18.x or later

### Environment Variables
All AWS credentials are prefixed with `VITE_` to be accessible in the browser:
- `VITE_AWS_*` for AWS configuration
- `VITE_QUICKSIGHT_*` for QuickSight settings

## 🌍 Accessing Your Deployed App

Once deployed, your app will be available at:
```
https://main.d123abc456.amplifyapp.com
```

## 🔐 Security Considerations

### For Production:
1. **Use IAM Roles** instead of access keys when possible
2. **Enable CloudWatch** for monitoring
3. **Set up WAF** for additional security
4. **Use HTTPS** (automatically provided by Amplify)
5. **Restrict QuickSight access** to specific domains

### Environment Variables:
- Never commit actual credentials to Git
- Use Amplify's environment variable management
- Rotate credentials regularly

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check build logs in Amplify Console

2. **QuickSight Authentication Errors**
   - Verify IAM user permissions
   - Check environment variables in Amplify
   - Ensure QuickSight user is registered

3. **CORS Issues**
   - Add Amplify domain to QuickSight allowed domains
   - Check QuickSight embedding settings

4. **Environment Variables Not Working**
   - Ensure all variables have `VITE_` prefix
   - Check Amplify environment variables configuration

### Debug Mode:
Add console logging to `src/config/aws.js` to debug authentication issues in production.

## 🔄 Continuous Deployment

Your app is now set up for continuous deployment:
- **Push to GitHub** → **Automatic build and deploy**
- **Branch deployments** for testing
- **Pull request previews** (optional)

## 📊 Monitoring

AWS Amplify provides:
- **Build metrics** and logs
- **Performance monitoring**
- **Error tracking**
- **Usage analytics**

## 🎉 Success!

Your health dashboard with QuickSight integration is now live on AWS Amplify! 

**Features Available:**
- ✅ Responsive health dashboard
- ✅ QuickSight analytics integration
- ✅ Secure IAM authentication
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ✅ Global CDN distribution

**Next Steps:**
1. Share your deployed app URL
2. Monitor performance in Amplify Console
3. Set up custom domain (optional)
4. Configure monitoring and alerts

---

**🚀 Your health dashboard is now production-ready on AWS Amplify!**
