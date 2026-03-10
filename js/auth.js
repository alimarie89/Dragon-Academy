// ===== AUTHENTICATION =====

// Sign In with Google
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      
      // Save or update user in Firestore
      db.collection('users').doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isAdmin: false, // Default to student
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      updateUIForAuth();
    })
    .catch(error => {
      console.error('Auth error:', error);
      showAuthError('Sign in failed: ' + error.message);
    });
}

// Sign Out
function signOut() {
  auth.signOut().then(() => {
    updateUIForAuth();
    closeModal('member-modal');
  });
}

// Monitor Auth State
auth.onAuthStateChanged(user => {
  updateUIForAuth();
  
  if (user) {
    // Load user data and determine if admin
    db.collection('users').doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          window.currentUser = {
            uid: user.uid,
            name: user.displayName || userData.name,
            email: user.email,
            photoURL: user.photoURL || userData.photoURL,
            isAdmin: userData.isAdmin || false
          };
          setupMemberUI();
          loadAttendanceData();
          loadPracticeRatings();
          if (userData.isAdmin) setupAdminPanel();
        }
      });
  } else {
    window.currentUser = null;
  }
});

// Update UI based on auth state
function updateUIForAuth() {
  const user = auth.currentUser;
  const authButton = document.getElementById('auth-button');
  const memberInfo = document.getElementById('member-info');
  const memberTrackingSection = document.getElementById('member-tracking-section');
  
  if (user) {
    // Hide auth button, show member info
    if (authButton) authButton.style.display = 'none';
    if (memberInfo) memberInfo.style.display = 'flex';
    if (memberTrackingSection) memberTrackingSection.style.display = 'block';
    
    // Update user name/email
    const nameSpan = document.getElementById('member-name');
    if (nameSpan && window.currentUser) {
      nameSpan.textContent = window.currentUser.name || window.currentUser.email;
    }
    
    // Update member profile modal
    updateMemberProfile();
  } else {
    // Show auth button, hide member info
    if (authButton) authButton.style.display = 'block';
    if (memberInfo) memberInfo.style.display = 'none';
    if (memberTrackingSection) memberTrackingSection.style.display = 'none';
  }
}

// Update member profile display
function updateMemberProfile() {
  const profileDiv = document.getElementById('member-profile');
  if (!profileDiv || !window.currentUser) return;
  
  profileDiv.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      ${window.currentUser.photoURL ? `<img src="${window.currentUser.photoURL}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px;">` : ''}
      <p style="color: var(--white); font-size: 16px; font-weight: 600; margin: 0;">${window.currentUser.name}</p>
      <p style="color: var(--stone); font-size: 12px; margin: 4px 0 0 0;">${window.currentUser.email}</p>
      ${window.currentUser.isAdmin ? '<p style="color: var(--ember); font-size: 12px; margin: 8px 0 0 0; font-weight: 600;">🔥 Admin</p>' : ''}
    </div>
  `;
}

// Show error message
function showAuthError(message) {
  const errorEl = document.getElementById('auth-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  }
}

// Open/Close Modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-backdrop')) {
    const modal = e.target.closest('.modal');
    if (modal) {
      closeModal(modal.id);
    }
  }
});
