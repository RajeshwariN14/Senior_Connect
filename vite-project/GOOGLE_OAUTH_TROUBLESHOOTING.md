# Google OAuth Troubleshooting Guide

## Common Issues and Solutions

### 1. "Access Blocked Authorization Error"

**Causes:**
- Incorrect or missing client ID
- Domain not authorized in Google Cloud Console
- Wrong redirect URIs
- OAuth consent screen not configured

**Solutions:**

#### A. Verify Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID
5. Click on the client ID to edit

#### B. Check Authorized JavaScript Origins

Add these origins to your OAuth client:
```
http://localhost:5173
http://localhost:3000
http://localhost:4173
https://your-production-domain.com
```

#### C. Check Authorized Redirect URIs

Add these redirect URIs:
```
http://localhost:5173
http://localhost:5173/
http://localhost:3000
http://localhost:3000/
https://your-production-domain.com
```

### 2. Development vs Production

**For Development:**
- Use `http://localhost:5173` (Vite default)
- Use `http://localhost:3000` (if using different port)

**For Production:**
- Use your actual domain (e.g., `https://seniorconnect.com`)

### 3. OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Make sure your app is configured
3. Add necessary scopes:
   - `openid`
   - `email`
   - `profile`

### 4. Testing Steps

1. **Clear browser cache and cookies**
2. **Check browser console for errors**
3. **Verify Google API is loaded** (check Network tab)
4. **Test in incognito/private mode**

### 5. Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
VITE_GOOGLE_CLIENT_ID=152858433188-9j30mtn2vppe87u9ivodrp8ki8c4i3ce.apps.googleusercontent.com
```

Then update your code to use:
```javascript
client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID
```

### 6. Common Error Messages

- **"popup_closed_by_user"**: User cancelled the sign-in
- **"access_denied"**: User denied permissions
- **"invalid_client"**: Wrong client ID
- **"redirect_uri_mismatch"**: Wrong redirect URI

### 7. Debug Mode

Add this to your Google initialization for debugging:
```javascript
window.google.accounts.id.initialize({
  client_id: 'your-client-id',
  callback: handleCredentialResponse,
  auto_select: false,
  cancel_on_tap_outside: true,
  prompt_parent_id: 'google-signin-btn',
  ux_mode: 'popup',
  // Add this for debugging
  debug: true
});
```

## Quick Fix Checklist

- [ ] Client ID is correct
- [ ] Domain is authorized in Google Cloud Console
- [ ] OAuth consent screen is configured
- [ ] Redirect URIs are correct
- [ ] Browser cache is cleared
- [ ] Testing in incognito mode
- [ ] Check browser console for errors 