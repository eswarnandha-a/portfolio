# EmailJS Template Configuration Guide

## Problem
You're receiving emails from your contact form, but they appear to come from your own email address and don't show the user's name and email properly.

## Why This Happens
EmailJS always sends emails from your configured email service (Gmail, Outlook, etc.), not from the user's email. The user's information should appear in the email **content**, not as the sender.

## Solution: Configure Your EmailJS Template

### Step 1: Access Your EmailJS Dashboard
1. Go to https://www.emailjs.com
2. Log in to your account
3. Click on "Email Templates" in the sidebar

### Step 2: Edit Template `template_l8qc4gk`
Your template should include these variables to display user information:

#### Template Subject:
```
New Contact Form Message from {{from_name}}
```

#### Template Body:
```
You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Message: 
{{message}}

---
Reply to: {{from_email}}
Sent from: Portfolio Contact Form
```

### Step 3: Variable Mapping
Make sure these variables match what your code sends:
- `{{from_name}}` ← corresponds to `from_name: formData.name`
- `{{from_email}}` ← corresponds to `from_email: formData.email`
- `{{message}}` ← corresponds to `message: formData.message`

### Step 4: Test the Template
1. Save your template changes
2. Use the "Test" feature in EmailJS dashboard
3. Fill in sample values for the variables
4. Send a test email to verify the format

## Expected Result
After fixing the template, you should receive emails that:
- Come from your email address (this is normal)
- Have a subject like "New Contact Form Message from John Doe"
- Show the user's name, email, and message clearly in the email body
- Allow you to easily reply to the user's email address

## Alternative: Enhanced Template with Better Formatting

```
Subject: 📧 New Portfolio Contact: {{from_name}}

Hello Eswar,

You've received a new message through your portfolio contact form:

👤 Name: {{from_name}}
📧 Email: {{from_email}}
💬 Message:
{{message}}

---
💡 Quick Actions:
- Reply directly to: {{from_email}}
- Add to contacts: {{from_name}} <{{from_email}}>

Sent via Portfolio Contact Form
```

This enhanced template makes it easier to identify and respond to messages.