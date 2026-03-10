// ===== ADMIN FUNCTIONALITY =====

// Setup admin panel if user is admin
function setupAdminPanel() {
  const user = auth.currentUser;
  if (!user || !window.currentUser?.isAdmin) return;
  
  // Show admin button in header
  const adminBtn = document.getElementById('admin-button');
  if (adminBtn) adminBtn.style.display = 'block';
}

// Open admin dashboard
function openAdminPanel() {
  openModal('admin-modal');
  loadAdminDashboard();
}

// ===== ADMIN DASHBOARD =====

function loadAdminDashboard() {
  const user = auth.currentUser;
  if (!user || !window.currentUser?.isAdmin) {
    alert('Admin access denied');
    return;
  }
  
  Promise.all([
    db.collection('users').get(),
    db.collection('student_progress').get(),
    db.collection('practice_ratings').get(),
    db.collection('comments').get()
  ]).then(([usersSnap, progressSnap, ratingsSnap, commentsSnap]) => {
    const stats = {
      totalUsers: usersSnap.size,
      totalAttendance: progressSnap.size,
      totalRatings: ratingsSnap.size,
      totalComments: commentsSnap.size,
      admins: usersSnap.docs.filter(d => d.data().isAdmin).length
    };
    
    const dashboardContent = document.getElementById('admin-dashboard-content');
    if (dashboardContent) {
      dashboardContent.innerHTML = `
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-number">${stats.totalUsers}</div>
            <div class="stat-label">Total Users</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.admins}</div>
            <div class="stat-label">Admins</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalAttendance}</div>
            <div class="stat-label">Attendance Records</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalRatings}</div>
            <div class="stat-label">Practice Ratings</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalComments}</div>
            <div class="stat-label">Comments</div>
          </div>
        </div>
      `;
    }
    
    // Load users table
    loadAdminUsers(usersSnap);
  });
}

// Load and display all users
function loadAdminUsers(snapshot) {
  const usersContainer = document.getElementById('admin-users-table');
  if (!usersContainer) return;
  
  usersContainer.innerHTML = '<table class="admin-table" style="width: 100%; border-collapse: collapse;"><thead><tr style="background: var(--ash); border-bottom: 2px solid var(--ember);"><th style="padding: 12px; text-align: left;">Name</th><th style="padding: 12px; text-align: left;">Email</th><th style="padding: 12px; text-align: center;">Admin</th><th style="padding: 12px; text-align: center;">Actions</th></tr></thead><tbody>';
  
  snapshot.forEach(doc => {
    const user = doc.data();
    usersContainer.innerHTML += `
      <tr style="border-bottom: 1px solid var(--smoke);">
        <td style="padding: 12px;">${escapeHtml(user.name)}</td>
        <td style="padding: 12px;">${escapeHtml(user.email)}</td>
        <td style="padding: 12px; text-align: center;">
          <input type="checkbox" ${user.isAdmin ? 'checked' : ''} onchange="toggleAdminRole('${user.uid}', this.checked)">
        </td>
        <td style="padding: 12px; text-align: center;">
          <button onclick="openUserEditor('${user.uid}')" style="background: var(--ember); color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px;">Edit</button>
          <button onclick="deleteUser('${user.uid}')" style="background: var(--stone); color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px; margin-left: 4px;">Delete</button>
        </td>
      </tr>
    `;
  });
  
  usersContainer.innerHTML += '</tbody></table>';
}

// Toggle admin role
function toggleAdminRole(uid, isAdmin) {
  db.collection('users').doc(uid).update({
    isAdmin: isAdmin
  })
  .then(() => {
    showNotification(`Admin role ${isAdmin ? 'granted' : 'revoked'}`);
  })
  .catch(error => {
    console.error('Error updating admin role:', error);
    showNotification('Error updating role', 'error');
  });
}

// Open user editor modal
function openUserEditor(uid) {
  db.collection('users').doc(uid).get().then(doc => {
    if (doc.exists) {
      const user = doc.data();
      const editor = document.getElementById('user-editor-content');
      if (editor) {
        editor.innerHTML = `
          <h3 style="color: var(--white); margin-top: 0;">Editing: ${escapeHtml(user.name)}</h3>
          <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 8px; color: var(--stone);">Name</label>
            <input type="text" id="edit-name" value="${escapeHtml(user.name)}" style="width: 100%; padding: 8px; background: var(--ash); color: var(--white); border: 1px solid rgba(232,82,10,0.3); border-radius: 3px;">
          </div>
          <div style="margin: 20px 0;">
            <label style="display: block; margin-bottom: 8px; color: var(--stone);">Email</label>
            <input type="email" id="edit-email" value="${escapeHtml(user.email)}" style="width: 100%; padding: 8px; background: var(--ash); color: var(--white); border: 1px solid rgba(232,82,10,0.3); border-radius: 3px;">
          </div>
          <div style="margin: 20px 0;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="edit-admin" ${user.isAdmin ? 'checked' : ''}>
              <span style="color: var(--white);">Admin Access</span>
            </label>
          </div>
          <div style="margin-top: 24px; display: flex; gap: 12px;">
            <button onclick="saveUserEdits('${uid}')" style="background: var(--ember); color: white; border: none; padding: 10px 20px; border-radius: 3px; cursor: pointer;">Save Changes</button>
            <button onclick="closeModal('user-editor-modal')" style="background: transparent; color: var(--stone); border: 1px solid var(--stone); padding: 10px 20px; border-radius: 3px; cursor: pointer;">Cancel</button>
          </div>
        `;
      }
      openModal('user-editor-modal');
    }
  });
}

// Save user edits
function saveUserEdits(uid) {
  const name = document.getElementById('edit-name').value;
  const email = document.getElementById('edit-email').value;
  const isAdmin = document.getElementById('edit-admin').checked;
  
  if (!name.trim() || !email.trim()) {
    alert('Name and email are required');
    return;
  }
  
  db.collection('users').doc(uid).update({
    name: name,
    email: email,
    isAdmin: isAdmin
  })
  .then(() => {
    closeModal('user-editor-modal');
    showNotification('User updated successfully');
    loadAdminDashboard();
  })
  .catch(error => {
    console.error('Error saving user:', error);
    showNotification('Error saving user', 'error');
  });
}

// Delete user
function deleteUser(uid) {
  if (!confirm('Delete this user and all their data? This cannot be undone.')) return;
  
  const batch = db.batch();
  
  // Delete user document
  batch.delete(db.collection('users').doc(uid));
  
  // Delete all their attendance records
  db.collection('student_progress').where('userId', '==', uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => batch.delete(doc.ref));
    });
  
  // Delete all their ratings
  db.collection('practice_ratings').where('userId', '==', uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => batch.delete(doc.ref));
    });
  
  // Delete all their comments
  db.collection('comments').where('userId', '==', uid).get()
    .then(snapshot => {
      snapshot.forEach(doc => batch.delete(doc.ref));
    });
  
  batch.commit()
    .then(() => {
      showNotification('User deleted');
      loadAdminDashboard();
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      showNotification('Error deleting user', 'error');
    });
}

// ===== ATTENDANCE MANAGEMENT =====

function loadAdminAttendance() {
  const attendanceContainer = document.getElementById('admin-attendance-table');
  if (!attendanceContainer) return;
  
  db.collection('student_progress').get().then(snapshot => {
    attendanceContainer.innerHTML = '<table class="admin-table" style="width: 100%; border-collapse: collapse;"><thead><tr style="background: var(--ash); border-bottom: 2px solid var(--ember);"><th style="padding: 12px; text-align: left;">User</th><th style="padding: 12px; text-align: left;">Session</th><th style="padding: 12px; text-align: center;">Attended</th><th style="padding: 12px; text-align: center;">Actions</th></tr></thead><tbody>';
    
    snapshot.forEach(doc => {
      const record = doc.data();
      attendanceContainer.innerHTML += `
        <tr style="border-bottom: 1px solid var(--smoke);">
          <td style="padding: 12px;">${escapeHtml(record.userId.substring(0, 20))}</td>
          <td style="padding: 12px;">${record.sessionId}</td>
          <td style="padding: 12px; text-align: center;">
            <input type="checkbox" ${record.attended ? 'checked' : ''} onchange="updateAttendance('${doc.id}', this.checked)">
          </td>
          <td style="padding: 12px; text-align: center;">
            <button onclick="deleteAttendanceRecord('${doc.id}')" style="background: var(--stone); color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px;">Delete</button>
          </td>
        </tr>
      `;
    });
    
    attendanceContainer.innerHTML += '</tbody></table>';
  });
}

function updateAttendance(docId, attended) {
  db.collection('student_progress').doc(docId).update({
    attended: attended
  })
  .then(() => {
    showNotification('Attendance updated');
  })
  .catch(error => {
    console.error('Error updating attendance:', error);
    showNotification('Error updating attendance', 'error');
  });
}

function deleteAttendanceRecord(docId) {
  if (confirm('Delete this attendance record?')) {
    db.collection('student_progress').doc(docId).delete()
      .then(() => {
        showNotification('Record deleted');
        loadAdminAttendance();
      })
      .catch(error => {
        console.error('Error deleting record:', error);
        showNotification('Error deleting record', 'error');
      });
  }
}

// ===== COMMENTS MODERATION =====

function loadAdminComments() {
  const commentsContainer = document.getElementById('admin-comments-table');
  if (!commentsContainer) return;
  
  db.collection('comments').get().then(snapshot => {
    commentsContainer.innerHTML = '<div style="display: flex; flex-direction: column; gap: 12px;">';
    
    snapshot.forEach(doc => {
      const comment = doc.data();
      const date = comment.createdAt?.toDate?.() || new Date();
      commentsContainer.innerHTML += `
        <div style="background: rgba(232,82,10,0.08); border-left: 3px solid var(--ember); padding: 16px; border-radius: 2px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--white); font-weight: 600;">${escapeHtml(comment.userName)}</span>
            <span style="color: var(--stone); font-size: 12px;">${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <p style="color: var(--bone); margin: 8px 0; font-size: 14px;">${escapeHtml(comment.text)}</p>
          <p style="color: var(--stone); margin: 8px 0; font-size: 12px;">Session: ${comment.sessionId}</p>
          <button onclick="deleteCommentAsAdmin('${doc.id}')" style="background: var(--stone); color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 12px;">Delete</button>
        </div>
      `;
    });
    
    commentsContainer.innerHTML += '</div>';
  });
}

function deleteCommentAsAdmin(docId) {
  if (confirm('Delete this comment?')) {
    db.collection('comments').doc(docId).delete()
      .then(() => {
        showNotification('Comment deleted');
        loadAdminComments();
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
        showNotification('Error deleting comment', 'error');
      });
  }
}

// Tab switching in admin panel
function switchAdminTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.admin-tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  
  // Remove active class from buttons
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const tab = document.getElementById(`admin-tab-${tabName}`);
  if (tab) tab.style.display = 'block';
  
  // Add active class to button
  event.target.classList.add('active');
  
  // Load data for tab
  if (tabName === 'users') loadAdminDashboard();
  else if (tabName === 'attendance') loadAdminAttendance();
  else if (tabName === 'comments') loadAdminComments();
}
