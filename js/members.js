// ===== MEMBER TRACKING FUNCTIONALITY =====

// Setup member UI when user logs in
function setupMemberUI() {
  // Load all member data for the logged-in user
  loadAttendanceData();
  loadPracticeRatings();
}

// ===== ATTENDANCE TRACKING =====

function markAttendance(sessionId, attended, notes = '') {
  const user = auth.currentUser;
  if (!user) {
    alert('Please sign in to track attendance');
    return;
  }
  
  const docId = `${sessionId}_${user.uid}`;
  db.collection('student_progress').doc(docId).set({
    userId: user.uid,
    sessionId: sessionId,
    attended: attended,
    notes: notes,
    completedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log(`Attendance recorded for ${sessionId}`);
    showNotification(`Attendance marked for ${sessionId}`);
  })
  .catch(error => {
    console.error('Error marking attendance:', error);
    showNotification('Error saving attendance', 'error');
  });
}

function loadAttendanceData() {
  const user = auth.currentUser;
  if (!user) return;
  
  // Load all attendance records for this user
  db.collection('student_progress')
    .where('userId', '==', user.uid)
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const sessionId = data.sessionId;
        
        // Update UI with loaded data
        const attendedCheckbox = document.getElementById(`attended-${sessionId}`);
        const notesTextarea = document.getElementById(`notes-${sessionId}`);
        
        if (attendedCheckbox) attendedCheckbox.checked = data.attended;
        if (notesTextarea) notesTextarea.value = data.notes || '';
      });
    });
}

// ===== PRACTICE MASTERY RATINGS =====

function ratePractice(practiceId, masteryLevel, notes = '') {
  const user = auth.currentUser;
  if (!user) {
    alert('Please sign in to rate practices');
    return;
  }
  
  const docId = `${practiceId}_${user.uid}`;
  const masteryLabels = {
    '1': 'Unfamiliar',
    '2': 'Understood',
    '3': 'Experienced',
    '4': 'Practicing',
    '5': 'Mastering'
  };
  
  db.collection('practice_ratings').doc(docId).set({
    userId: user.uid,
    practiceId: practiceId,
    masteryLevel: parseInt(masteryLevel) || 0,
    notes: notes,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    const label = masteryLabels[masteryLevel] || 'Not rated';
    showNotification(`${practiceId}: ${label}`);
  })
  .catch(error => {
    console.error('Error rating practice:', error);
    showNotification('Error saving rating', 'error');
  });
}

function loadPracticeRatings() {
  const user = auth.currentUser;
  if (!user) return;
  
  db.collection('practice_ratings')
    .where('userId', '==', user.uid)
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data();
        const practiceId = data.practiceId;
        
        // Update UI with loaded data
        const ratingSelect = document.getElementById(`mastery-${practiceId}`);
        if (ratingSelect) {
          ratingSelect.value = data.masteryLevel;
        }
      });
    });
}

// ===== COMMENTS & COMMUNITY =====

function addComment(sessionId, commentText) {
  const user = auth.currentUser;
  if (!user) {
    alert('Please sign in to comment');
    return;
  }
  
  if (!commentText.trim()) {
    alert('Please enter a comment');
    return;
  }
  
  db.collection('comments').add({
    sessionId: sessionId,
    userId: user.uid,
    userName: user.displayName || 'Anonymous',
    userEmail: user.email,
    userPhoto: user.photoURL,
    text: commentText,
    replies: [],
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    document.getElementById(`new-comment-${sessionId}`).value = '';
    showNotification('Comment posted!');
    loadSessionComments(sessionId);
  })
  .catch(error => {
    console.error('Error posting comment:', error);
    showNotification('Error posting comment', 'error');
  });
}

function loadSessionComments(sessionId) {
  const commentsContainer = document.getElementById(`comments-${sessionId}`);
  if (!commentsContainer) return;
  
  db.collection('comments')
    .where('sessionId', '==', sessionId)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      commentsContainer.innerHTML = '';
      
      if (snapshot.empty) {
        commentsContainer.innerHTML = '<p style="color: var(--stone); font-style: italic;">No comments yet. Be the first to share!</p>';
        return;
      }
      
      snapshot.forEach(doc => {
        const comment = doc.data();
        const date = comment.createdAt?.toDate?.() || new Date();
        const isOwner = auth.currentUser?.uid === comment.userId;
        
        const commentEl = document.createElement('div');
        commentEl.className = 'comment-box';
        commentEl.innerHTML = `
          <div class="comment-header">
            <span class="comment-author">${comment.userName}</span>
            <span class="comment-date">${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            ${isOwner ? `<button class="comment-delete" onclick="deleteComment('${doc.id}', '${sessionId}')">×</button>` : ''}
          </div>
          <p class="comment-text">${escapeHtml(comment.text)}</p>
        `;
        commentsContainer.appendChild(commentEl);
      });
    });
}

function deleteComment(commentId, sessionId) {
  if (confirm('Delete this comment?')) {
    db.collection('comments').doc(commentId).delete()
      .then(() => {
        loadSessionComments(sessionId);
        showNotification('Comment deleted');
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        showNotification('Error deleting comment', 'error');
      });
  }
}

// ===== UTILITY FUNCTIONS =====

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === 'error' ? 'var(--ember)' : 'var(--gold-light)'};
    color: var(--obsidian);
    padding: 16px 24px;
    border-radius: 4px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInUp 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideOutDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(100px); opacity: 0; }
  }
  
  .comment-box {
    background: rgba(232,82,10,0.08);
    border-left: 3px solid var(--ember);
    padding: 12px 16px;
    margin-bottom: 12px;
    border-radius: 2px;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-size: 13px;
  }
  
  .comment-author {
    font-weight: 600;
    color: var(--white);
  }
  
  .comment-date {
    color: var(--stone);
    font-size: 12px;
  }
  
  .comment-delete {
    background: transparent;
    border: none;
    color: var(--stone);
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    width: 20px;
    height: 20px;
    transition: color 0.2s;
  }
  
  .comment-delete:hover {
    color: var(--ember);
  }
  
  .comment-text {
    color: var(--bone);
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    word-wrap: break-word;
  }
`;
document.head.appendChild(style);
