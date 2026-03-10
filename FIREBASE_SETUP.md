# Firebase Setup for Dragon Academy Member Platform

This guide walks you through setting up Firebase authentication and Firestore database for the Dragon Academy member site, enabling user login, tracking, and community features.

---

## Prerequisites

- Google account
- Access to Firebase console (firebase.google.com)
- Basic understanding of the application structure
- Node.js installed (for local development, optional)

---

## Phase 1: Create Firebase Project

### Step 1: Create a New Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Project name: `Dragon Academy`
4. Accept terms and click **Continue**
5. Disable Google Analytics (optional, not needed for this project)
6. Click **Create project**
7. Wait for project creation to complete, then click **Continue**

### Step 2: Register Your Web App

1. In the Firebase console home, click the **Web** icon (`</>`)
2. App name: `Dragon Academy Website`
3. Copy the Firebase config object (you'll need this soon)
4. Click **Continue to console**

### Step 3: Copy Your Firebase Config

From Firebase console:
1. Go to **Project Settings** (gear icon, top right)
2. Find the **Web API Key** and **Project Config**
3. You need:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

---

## Phase 2: Enable Authentication

### Step 1: Enable Google Sign-In

1. In Firebase console, go to **Authentication** (left sidebar)
2. Click **Get Started** or **Sign-in method**
3. Click **Google**
4. Toggle **Enable** to ON
5. Set support email (your Gmail address)
6. Click **Save**

### Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type
3. Fill in app information:
   - App name: `Dragon Academy`
   - User support email: your Gmail
   - Developer contact: your Gmail
4. Click **Save and Continue**
5. Add scopes: 
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`
6. Click **Save and Continue**
7. Click **Back to Dashboard**

### Step 3: Add Local Development Authorized Redirect URI

1. Go to **Credentials** in Google Cloud Console
2. Click the OAuth 2.0 Client created by Firebase
3. Under **Authorized redirect URIs**, add:
   - `http://localhost:5000/`
   - Your Netlify domain: `https://your-site.netlify.app/`
4. Click **Save**

---

## Phase 3: Set Up Firestore Database

### Step 1: Create Firestore Database

1. In Firebase console, go to **Firestore Database**
2. Click **Create database**
3. Start in **production mode**
4. Choose region: **us-central1** (or closest to you)
5. Click **Create**

### Step 2: Set Firestore Security Rules

When Firestore is created, go to **Rules** tab and replace with:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Student progress - users can read/write their own
    match /student_progress/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId ||
        request.auth.uid == request.resource.data.userId;
    }
    
    // Practice ratings - users can read/write their own
    match /practice_ratings/{document=**} {
      allow read, write: if request.auth != null &&
        request.auth.uid == resource.data.userId ||
        request.auth.uid == request.resource.data.userId;
    }
    
    // Comments on sessions - authenticated users can create, read their own
    match /comments/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null &&
        request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

Click **Publish**

### Step 3: Create Database Collections

In Firestore, create these collections by clicking **Start Collection**:

1. **users**
   - Document format: Auto ID
   - Fields: `name` (string), `email` (string), `uid` (string), `createdAt` (timestamp)

2. **student_progress**
   - Document format: `sessionId_userId` (e.g., `S1-1_abc123def456`)
   - Fields: `userId`, `sessionId`, `attended` (boolean), `notes` (string), `completedAt` (timestamp)

3. **practice_ratings**
   - Document format: `practiceId_userId`
   - Fields: `userId`, `practiceId`, `masteryLevel` (number 1-5), `notes` (string), `updatedAt` (timestamp)

4. **comments**
   - Document format: Auto ID
   - Fields: `sessionId`, `userId`, `userName`, `text`, `replies` (array), `createdAt` (timestamp), `updatedAt` (timestamp)

---

## Phase 4: Add Firebase to Your HTML

### Step 1: Create `config/firebase-config.js`

Create a new file at the root of your project:

```javascript
// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Auth
const auth = firebase.auth();

// Initialize Firestore
const db = firebase.firestore();
```

Replace values with your Firebase config from Step 1.3

### Step 2: Add Firebase Scripts to HTML

In `index.html`, add before `</body>`:

```html
<!-- Firebase Scripts -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"></script>

<!-- Your Firebase Config -->
<script src="config/firebase-config.js"></script>

<!-- Your App Scripts -->
<script src="js/auth.js"></script>
<script src="js/members.js"></script>
<script src="js/script.js"></script>
```

---

## Phase 5: Add Authentication UI

Create `js/auth.js`:

```javascript
// Sign In with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      // Save user to Firestore
      db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      showMemberView();
    })
    .catch(error => {
      console.error('Auth error:', error);
      alert('Sign in failed. Please try again.');
    });
}

// Sign Out
function signOut() {
  auth.signOut().then(() => {
    showPublicView();
  });
}

// Monitor Auth State
auth.onAuthStateChanged(user => {
  if (user) {
    showMemberView();
    loadUserData(user);
  } else {
    showPublicView();
  }
});

// Load user data from Firestore
function loadUserData(user) {
  db.collection('users').doc(user.uid).get()
    .then(doc => {
      if (doc.exists) {
        const userData = doc.data();
        // Update UI with user data
        document.getElementById('user-name').textContent = userData.name;
        document.getElementById('user-email').textContent = userData.email;
      }
    });
}

// Show member-only content
function showMemberView() {
  document.getElementById('auth-section').style.display = 'none';
  document.getElementById('member-section').style.display = 'block';
}

// Show public content
function showPublicView() {
  document.getElementById('auth-section').style.display = 'block';
  document.getElementById('member-section').style.display = 'none';
}
```

---

## Phase 6: Add Member Tracking Features

Create `js/members.js`:

```javascript
// Mark attendance for a session
function markAttendance(sessionId, attended, notes = '') {
  const user = auth.currentUser;
  if (!user) return;
  
  const docId = `${sessionId}_${user.uid}`;
  db.collection('student_progress').doc(docId).set({
    userId: user.uid,
    sessionId: sessionId,
    attended: attended,
    notes: notes,
    completedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Rate a practice (mastery level 1-5)
function ratePractice(practiceId, masteryLevel, notes = '') {
  const user = auth.currentUser;
  if (!user) return;
  
  const docId = `${practiceId}_${user.uid}`;
  db.collection('practice_ratings').doc(docId).set({
    userId: user.uid,
    practiceId: practiceId,
    masteryLevel: masteryLevel, // 1-5 scale
    notes: notes,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Load user's attendance record
function loadAttendanceRecord(sessionId) {
  const user = auth.currentUser;
  if (!user) return;
  
  const docId = `${sessionId}_${user.uid}`;
  db.collection('student_progress').doc(docId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById(`attended-${sessionId}`).checked = data.attended;
        document.getElementById(`notes-${sessionId}`).value = data.notes || '';
      }
    });
}

// Load user's practice ratings
function loadPracticeRating(practiceId) {
  const user = auth.currentUser;
  if (!user) return;
  
  const docId = `${practiceId}_${user.uid}`;
  db.collection('practice_ratings').doc(docId).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        document.getElementById(`mastery-${practiceId}`).value = data.masteryLevel;
      }
    });
}

// Post a comment on a session
function addComment(sessionId, commentText) {
  const user = auth.currentUser;
  if (!user) return;
  
  db.collection('comments').add({
    sessionId: sessionId,
    userId: user.uid,
    userName: user.displayName,
    text: commentText,
    replies: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Load comments for a session
function loadSessionComments(sessionId) {
  db.collection('comments')
    .where('sessionId', '==', sessionId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      const commentsContainer = document.getElementById(`comments-${sessionId}`);
      commentsContainer.innerHTML = '';
      
      snapshot.forEach(doc => {
        const comment = doc.data();
        const commentEl = document.createElement('div');
        commentEl.className = 'comment-item';
        commentEl.innerHTML = `
          <p class="comment-author">${comment.userName}</p>
          <p class="comment-text">${comment.text}</p>
          <p class="comment-date">${comment.createdAt.toDate().toLocaleString()}</p>
        `;
        commentsContainer.appendChild(commentEl);
      });
    });
}
```

---

## Phase 7: Update HTML for Member Features

Add these sections to your HTML where appropriate:

### Sign In Button (in overview or separate login tab)

```html
<div id="auth-section">
  <button onclick="signInWithGoogle()" style="padding: 12px 24px; background: var(--ember); color: var(--white); border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
    Sign In with Google
  </button>
</div>
```

### Member Profile Section

```html
<div id="member-section" style="display: none;">
  <div class="mission-card">
    <p class="mission-headline">Welcome Back</p>
    <p id="user-name"></p>
    <p id="user-email"></p>
    <button onclick="signOut()" style="margin-top: 16px; padding: 8px 16px; background: var(--stone); color: var(--white); border: none; border-radius: 3px; cursor: pointer;">
      Sign Out
    </button>
  </div>
</div>
```

### Attendance Tracking (in Session Arc)

```html
<div style="margin-top: 16px; padding: 16px; background: rgba(232,82,10,0.08); border-radius: 4px;">
  <label>
    <input type="checkbox" id="attended-S1-1" onchange="markAttendance('S1-1', this.checked)"> 
    Attended this session
  </label>
  <textarea id="notes-S1-1" placeholder="Personal notes..." onchange="markAttendance('S1-1', document.getElementById('attended-S1-1').checked, this.value)" style="width: 100%; margin-top: 8px; padding: 8px; border: 1px solid var(--ember); background: var(--obsidian); color: var(--white);"></textarea>
</div>
```

### Mastery Rating (with practice cards)

```html
<div style="margin-top: 12px;">
  <label for="mastery-S1-1">Mastery Level: </label>
  <select id="mastery-S1-1" onchange="ratePractice('S1-1', this.value)" style="padding: 6px; background: var(--ash); color: var(--white); border: 1px solid var(--ember);margin-bottom: 8px;">
    <option value="">Not yet practiced</option>
    <option value="1">1 - Unfamiliar</option>
    <option value="2">2 - Understood</option>
    <option value="3">3 - Experienced</option>
    <option value="4">4 - Practicing</option>
    <option value="5">5 - Mastering</option>
  </select>
</div>
```

### Comments Section (in Session Arc)

```html
<div style="margin-top: 24px; padding: 16px; background: rgba(232,82,10,0.05); border-radius: 4px;">
  <h4 style="color: var(--white); margin-bottom: 12px;">Comments & Reflections</h4>
  <textarea id="new-comment-S1-1" placeholder="Share your thoughts on this session..." style="width: 100%; height: 80px; padding: 12px; background: var(--obsidian); color: var(--white); border: 1px solid rgba(232,82,10,0.3); border-radius: 3px;"></textarea>
  <button onclick="addComment('S1-1', document.getElementById('new-comment-S1-1').value)" style="margin-top: 8px; padding: 8px 16px; background: var(--ember); color: var(--white); border: none; border-radius: 3px; cursor: pointer;">
    Post Comment
  </button>
  <div id="comments-S1-1" style="margin-top: 16px;">
    <!-- Comments will load here -->
  </div>
</div>
```

---

## Phase 8: Deploy to Netlify

### Step 1: Commit to Git

```bash
git add .
git commit -m "Add Firebase authentication and member features"
git push origin main
```

Netlify will automatically redeploy when you push to `main`.

### Step 2: Update Firebase Allowed Domains

In Firebase console:
1. Go to **Authentication** → **Settings**
2. Under **Authorized domains**, add your Netlify domain
3. It should auto-populate, but if not, add: `your-site.netlify.app`

### Step 3: Test Live

1. Visit your live site at `https://your-site.netlify.app`
2. Click "Sign In with Google"
3. Verify sign-in works
4. Check Firestore console to see user data being saved

---

## Troubleshooting

### "Sign in failed" error
- **Check:** Is Google Sign-In enabled in Firebase Authentication?
- **Check:** Have you added your redirect URI to Google Cloud Console?
- **Check:** Is the Firebase config correct in your HTML?

### Firestore writes failing
- **Check:** Are security rules published?
- **Check:** Is user authenticated (uid should exist)?
- **Check:** Is the collection name spelled correctly?

### Comments not loading
- **Check:** Is Firestore database created in production mode?
- **Check:** Do the security rules allow reads of the comments collection?
- **Check:** Are you authenticated before trying to load?

### Local testing issues
- **Check:** You may need to enable CORS for local development
- Run `firebase emulators:start` to use local Firebase emulator

---

## Next Steps

1. **Customize the UI** — Update colors, fonts, and layout to match Dragon Academy branding
2. **Add more member features** — Progress dashboards, practice recommendations, cohort views
3. **Set up email notifications** — Notify members of new comments, session updates
4. **Create admin panel** — Dashboard for facilitators to view attendance, ratings, comments

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Pricing](https://firebase.google.com/pricing) — Free tier covers small-medium projects

---

**Questions?** Firebase has excellent documentation and community support. Start with the official docs linked above.