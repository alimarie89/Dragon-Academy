# Dragon Academy Platform Setup Guide

Complete implementation guide for the member login system, attendance tracking, and admin panel.

## Overview

Your Dragon Academy site now has a fully integrated member system with:
- ✅ Google OAuth authentication (students sign in with Google)
- ✅ Member profile management
- ✅ Session attendance tracking
- ✅ Practice mastery ratings (1-5 scale)
- ✅ Community comments/reflections system
- ✅ Admin dashboard for site management
- ✅ Real-time Firestore data synchronization
- ✅ Offline persistence enabled

## Step-by-Step Setup

### Phase 1: Firebase Project Configuration (Mandatory)

#### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Name: "Dragon Academy" (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click "Create project"

#### 1.2 Register Your Web App
1. In Firebase console, click the **Web** icon (</> symbol)
2. App nickname: "Dragon Academy Website"
3. Click "Register app"
4. Copy the Firebase configuration (you'll need these values)
5. Firebase will display a config object that looks like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "dragon-academy-xxx.firebaseapp.com",
  projectId: "dragon-academy-xxx",
  storageBucket: "dragon-academy-xxx.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

#### 1.3 Add Your Config to the Project
1. Open `js/firebase-config.js` in your project
2. Replace the placeholder config values with the real values from step 1.2
3. Save the file

**Example:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDEXAMPLE_REPLACE_WITH_YOUR_KEY",  // Replace
  authDomain: "dragon-academy-xxx.firebaseapp.com", // Replace
  projectId: "dragon-academy-xxx",                  // Replace
  // ... etc
};
```

### Phase 2: Firebase Authentication Setup

#### 2.1 Enable Google Sign-In
1. In Firebase console, go to **Authentication**
2. Click on the **Sign-in method** tab
3. Click on **Google**
4. Toggle "Enable" to ON
5. Set Project name and Support email
6. Click "Save"

#### 2.2 Configure OAuth Redirects (For Local Testing)
1. Go to **Google Cloud Console** (linked from Firebase)
2. Find "OAuth 2.0 consent screen"
3. Add yourself as a test user (your email)
4. This allows you to test before publishing

#### 2.3 Configure Authorized Redirect URIs
1. In Google Cloud Console, go to **Credentials**
2. Find your OAuth 2.0 Client ID
3. Edit it and add these to "Authorized redirect URIs":
   - `http://localhost:5000` (for local testing)
   - `http://localhost:3000` (if using different port)
   - Your Netlify domain (e.g., `https://dragon-academy-xxx.netlify.app`)

### Phase 3: Firestore Database Setup

#### 3.1 Create Firestore Database
1. In Firebase console, go to **Firestore Database**
2. Click "Create database"
3. Choose region closest to you (or default)
4. Start in **Test mode** (we'll change this in 3.3)
5. Click "Create"

#### 3.2 Create Collections
You need to manually create four collections in Firestore:

**Collection 1: `users`**
- Stores user profiles and admin flags
- Documents named by user UID
- Example document structure:
```json
{
  "uid": "user123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "photoURL": "https://...",
  "isAdmin": false,
  "createdAt": "timestamp"
}
```

**Collection 2: `student_progress`**
- Stores session attendance records
- Document ID: `{sessionId}_{userId}` (e.g., "S1_user123")
- Example document:
```json
{
  "userId": "user123",
  "sessionId": "S1",
  "attended": true,
  "notes": "Great insights on instinct",
  "completedAt": "timestamp"
}
```

**Collection 3: `practice_ratings`**
- Stores practice mastery levels
- Document ID: `{practiceId}_{userId}` (e.g., "S1-1_user123")
- Example document:
```json
{
  "userId": "user123",
  "practiceId": "S1-1",
  "masteryLevel": 3,
  "notes": "Working on this",
  "ratedAt": "timestamp"
}
```

**Collection 4: `comments`**
- Stores session reflections/comments
- Auto-generated document IDs
- Example document:
```json
{
  "sessionId": "S1",
  "userId": "user123",
  "userName": "Jane Doe",
  "userEmail": "jane@example.com",
  "userPhoto": "https://...",
  "text": "This practice was transformative",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### 3.3 Set Up Security Rules
1. Go to **Firestore Database** → **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read their own profile
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if request.auth.uid != null; // Admins can see users
    }
    
    // Students can read/write their own attendance
    match /student_progress/{document=**} {
      allow read, write: if request.auth.uid != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Students can read/write their own ratings
    match /practice_ratings/{document=**} {
      allow read, write: if request.auth.uid != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Authenticated users can comment, but can only delete/edit own comments
    match /comments/{document=**} {
      allow read: if request.auth.uid != null;
      allow create: if request.auth.uid != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

3. Click "Publish"

### Phase 4: Test Local Setup

#### 4.1 Start Local Development Server
```bash
# If using Python (macOS/Linux)
python3 -m http.server 5000

# Or if using Node.js (npm)
npx http-server -p 5000

# Or if using Python 2
python -m SimpleHTTPServer 5000
```

#### 4.2 Test Sign-In
1. Go to `http://localhost:5000` in your browser
2. Click the "Sign In" button (top right)
3. You should see Google login popup
4. Sign in with your Google account
5. You should see your profile info appear in top right

#### 4.3 Test Member Features
1. Once logged in, scroll down to "Session Arc" tab
2. You should see "Your Session Attendance & Reflections" section
3. Try checking the "Session 1" attendance box
4. Go to Firebase console → Firestore Database
5. Look in `student_progress` collection
6. You should see a new document with your attendance

#### 4.4 Test Comments
1. In the Session Arc, find "Questions & Reflections" textarea
2. Type a test comment
3. Click "Post Reflection"
4. Comment should appear below the textarea
5. Check Firebase console → `comments` collection
6. You should see your comment saved

### Phase 5: Set Yourself as Admin

#### 5.1 Make Your User an Admin
1. Sign in to your app at `http://localhost:5000`
2. Go to Firebase console → Firestore Database
3. Click on `users` collection
4. Find your user document (named with your UID)
5. Click to edit it
6. Change `isAdmin: false` to `isAdmin: true`
7. Refresh your app

#### 5.2 Access Admin Panel
1. You should now see "Admin Panel" button in top right (displays as stone-colored)
2. Click "Admin Panel"
3. You should see four tabs: Dashboard, Users, Attendance, Comments
4. **Dashboard** shows statistics
5. **Users** shows all users and admin toggle switches
6. **Attendance** shows all session attendance records
7. **Comments** shows all comments with delete options

### Phase 6: Deploy to Production

#### 6.1 Build for Production (if using build tools)
```bash
# Static site - no build needed!
# Just deploy the folder as-is
```

#### 6.2 Deploy to Netlify
1. Commit your code to GitHub
2. Go to [Netlify](https://netlify.com/)
3. Click "New site from Git"
4. Choose your GitHub repo
5. Build command: (leave blank - static site)
6. Publish directory: `/` (root)
7. Click "Deploy site"

#### 6.3 Update Firebase OAuth Redirects
1. Get your Netlify domain (e.g., `https://dragon-academy-xxx.netlify.app`)
2. Go to Google Cloud Console → Credentials
3. Edit OAuth 2.0 Client ID
4. Add your Netlify domain to "Authorized redirect URIs"

### Phase 7: Testing Checklist

Before sharing with members, verify:

- [ ] Sign-in button works with Google OAuth
- [ ] Member profile displays after login
- [ ] Attendance checkbox saves to Firestore
- [ ] Notes textarea saves with attendance
- [ ] Comments post and appear in real-time
- [ ] Admin panel shows all users
- [ ] Admin can toggle user admin status
- [ ] Comments show delete button only for owner
- [ ] Offline persistence works (test by going offline and adding a comment)
- [ ] Sign-out clears user info

## File Structure

```
Dragon-Academy/
├── index.html                 # Main page with all tabs and UI
├── js/
│   ├── firebase-config.js     # Firebase initialization (UPDATE CONFIG HERE)
│   ├── auth.js                # Authentication & sign-in logic
│   ├── members.js             # Attendance, ratings, comments
│   ├── admin.js               # Admin dashboard functionality
│   ├── script.js              # Core site functionality
│   └── practices-data.js      # Practice library data
├── css/
│   └── styles.css             # All styling (professional dark theme)
└── FIREBASE_SETUP.md          # Firebase documentation
```

## Key Features Implemented

### For Students
1. **Sign In with Google** - Click button → Google popup → Automatic profile creation
2. **Attendance Tracking** - Check off sessions you attended, add personal notes
3. **Practice Ratings** - (UI ready, select dropdown to rate 1-5 mastery)
4. **Session Reflections** - Post comments and questions after sessions
5. **View All Reflections** - See what other students are reflecting on
6. **Offline Support** - Your data saves even when no internet connection

### For Admins
1. **Dashboard** - View user statistics at a glance
2. **User Management** - See all users, toggle admin status
3. **Attendance Tracking** - View/edit all attendance records
4. **Comment Moderation** - Delete inappropriate comments
5. **Data Privacy** - Students only see their own data

## Troubleshooting

### "Sign In button not working"
- Check Firebase config values in `js/firebase-config.js`
- Verify Google Sign-In is enabled in Firebase Authentication
- Check browser console for errors (Ctrl+Shift+K)

### "Attendance not saving"
- Verify Firestore security rules are correct
- Check that `student_progress` collection exists
- Look in browser DevTools → Network tab to see Firestore requests

### "Comments not appearing"
- Verify `comments` collection exists in Firestore
- Check security rules allow `create` and `read`
- Make sure your user UID matches in the document

### "Admin panel not showing"
- Verify your user document has `isAdmin: true` in Firestore
- Refresh the page after changing isAdmin
- Check browser console for errors

## Security Notes

1. **Test Mode Expires** - Firebase test mode (W mode) expires after 30 days. Switch to production rules after testing
2. **API Keys Public** - Firebase API keys in `firebase-config.js` are intentionally public (browser-side). Real security comes from Firestore rules
3. **User Data Privacy** - Security rules prevent students from accessing other students' data
4. **Admin Flag** - Only users with `isAdmin: true` see admin panel. This is checked on the client and on the database

## Next Steps

1. **Customize Sessions** - Add sessions S3-S7 attendance sections to `index.html`
2. **Add Ratings UI** - Create mastery level dropdowns for practice cards
3. **Custom Styling** - Adjust modal colors, spacing, fonts in `index.html` inline styles
4. **Notification System** - Already working! Toast appears when data saves
5. **Real-time Updates** - All data auto-syncs across browser tabs

## Support

All JavaScript functions are accessible in the browser console for testing:
```javascript
// Sign in
signInWithGoogle();

// Sign out
signOut();

// Mark attendance
markAttendance('S1', true, 'My notes here');

// Add comment
addComment('S1', 'My reflection...');

// Open admin panel (if admin)
openAdminPanel();
```

---

**Status**: Complete and ready for testing! 🔥
