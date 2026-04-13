function switchTab(id, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
    if (id === 'library') {
      renderLibrary();
    }
    if (id === 'glossary') {
      renderGlossary();
    }
    if (id === 'sessions') {
      renderSessions();
    }
  }

  function renderLibrary() {
    const container = document.getElementById('practices-library');
    if (!container || !allPractices) return;

    container.innerHTML = '';
    allPractices.forEach(practice => {
      const practiceEl = document.createElement('div');
      practiceEl.className = 'practice-card';
      practiceEl.id = 'practice-' + practice.id;
      practiceEl.setAttribute('data-session', practice.session);
      practiceEl.setAttribute('data-format', (practice.format || '').toLowerCase());
      practiceEl.setAttribute('data-level', (practice.level || '').toLowerCase());
      practiceEl.setAttribute('data-skills', (practice.skills || []).join(',').toLowerCase());
      practiceEl.setAttribute('data-topics', (practice.topics || []).join(',').toLowerCase());

      const header = document.createElement('div');
      header.className = 'practice-header';
      header.onclick = function() {
        practiceEl.classList.toggle('open');
      };

      const headerContent = document.createElement('div');
      headerContent.className = 'practice-header-content';

      const titleEl = document.createElement('h3');
      titleEl.textContent = practice.title;
      headerContent.appendChild(titleEl);

      // Add short description for collapsed state
      const descEl = document.createElement('p');
      descEl.className = 'practice-header-desc';
      descEl.textContent = practice.what || practice.how || practice.how || '';
      headerContent.appendChild(descEl);

      header.appendChild(headerContent);

      const metaEl = document.createElement('div');
      metaEl.className = 'practice-meta';
      metaEl.innerHTML = `<span class="badge-small">${practice.sessionLabel}</span> · ${practice.format.toUpperCase()} · ${practice.level}`;
      header.appendChild(metaEl);

      const chevron = document.createElement('span');
      chevron.className = 'practice-chevron';
      chevron.innerHTML = '▼';
      header.appendChild(chevron);

      practiceEl.appendChild(header);

      // Details panel
      const details = document.createElement('div');
      details.className = 'practice-details';

      let html = `<p class="practice-duration"><strong>Duration:</strong> ${practice.duration || 'N/A'}</p>`;
      
      if (practice.what) {
        html += `<p><strong>What it trains:</strong> ${practice.what}</p>`;
      }
      if (practice.how) {
        html += `<p><strong>How it works:</strong> ${practice.how}</p>`;
      }
      if (practice.instructions) {
        html += `<p><strong>Instructions:</strong> ${practice.instructions}</p>`;
      }
      if (practice.example) {
        html += `<p><strong>Example:</strong> ${practice.example}</p>`;
      }
     if (practice.examples) {
        html += `<p><strong>Examples:</strong> ${practice.examples}</p>`;
      }
      if (practice.use) {
        html += `<p><strong>How to use:</strong> ${practice.use}</p>`;
      }
      if (practice.gift) {
        html += `<p><strong>The gift:</strong> ${practice.gift}</p>`;
      }
      if (practice.key) {
        html += `<p><strong>Key distinction:</strong> ${practice.key}</p>`;
      }
      if (practice.hole_looks) {
        html += `<p><strong>What the hole looks like:</strong> ${practice.hole_looks}</p>`;
      }
      if (practice.way_out) {
        html += `<p><strong>The way out:</strong> ${practice.way_out}</p>`;
      }
      if (practice.options) {
        html += `<p><strong>Three options:</strong> ${practice.options}</p>`;
      }
      if (practice.note) {
        html += `<p><em><strong>Common pitfalls:</strong> ${practice.note}</em></p>`;
      }
      if (practice.additional) {
        html += `<p><strong>Additional instruction:</strong> ${practice.additional}</p>`;
      }
      if (practice.menu) {
        html += `<p><strong>Menu of desire requests:</strong><br/>${practice.menu}</p>`;
      }
      if (practice.format_examples) {
        html += `<p><strong>Examples:</strong><br/>${practice.format_examples}</p>`;
      }
      if (practice.hole_looks) {
        html += `<p><strong>What threat does the system think is happening right now?</strong><br/>${practice.hole_looks}</p>`;
      }
      if (practice.principles) {
        html += `<p><strong>The principles:</strong><br/>${practice.principles}</p>`;
      }

      details.innerHTML = html;
      practiceEl.appendChild(details);
      container.appendChild(practiceEl);
    });

    filterLibraryNew();
  }

  function filterLibraryNew() {
    const session = document.getElementById('filter-session-lib')?.value.toLowerCase() || '';
    const format = document.getElementById('filter-format-lib')?.value.toLowerCase() || '';
    const level = document.getElementById('filter-level-lib')?.value.toLowerCase() || '';
    const skill = document.getElementById('filter-skill-lib')?.value.toLowerCase() || '';
    const topic = document.getElementById('filter-topic-lib')?.value.toLowerCase() || '';

    const practices = document.querySelectorAll('.practice-card');
    let visibleCount = 0;

    practices.forEach(card => {
      const cardSession = card.getAttribute('data-session');
      const cardFormat = card.getAttribute('data-format').split(',').map(f => f.trim());
      const cardLevel = card.getAttribute('data-level');
      const cardSkills = card.getAttribute('data-skills').split(',').map(s => s.trim());
      const cardTopics = card.getAttribute('data-topics').split(',').map(t => t.trim());

      let show = true;

      if (session && cardSession !== session) {
        show = false;
      }

      if (show && format && !cardFormat.some(f => f.includes(format))) {
        show = false;
      }

      if (show && level && cardLevel !== level) {
        show = false;
      }

      if (show && skill && !cardSkills.some(s => s.includes(skill))) {
        show = false;
      }

      if (show && topic && !cardTopics.some(t => t.includes(topic))) {
        show = false;
      }

      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
  }

  function resetLibraryFilters() {
    document.getElementById('filter-session-lib').value = '';
    document.getElementById('filter-format-lib').value = '';
    document.getElementById('filter-level-lib').value = '';
    document.getElementById('filter-skill-lib').value = '';
    document.getElementById('filter-topic-lib').value = '';
    filterLibraryNew();
  }

  function switchToPractice(practiceId) {
    const libraryTab = document.querySelector('.tab[onclick*="library"]');
    if (libraryTab) {
      switchTab('library', libraryTab);
    }
    setTimeout(() => {
      const element = document.getElementById('practice-' + practiceId);
      if (element) {
        element.classList.add('open');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  function filterLibrary() {
    const sessionFilter = document.getElementById('filter-session').value.toLowerCase();
    const formatFilter = document.getElementById('filter-format').value.toLowerCase();
    const levelFilter = document.getElementById('filter-level').value.toLowerCase();
    const skillFilter = document.getElementById('filter-skill').value.toLowerCase();
    const topicFilter = document.getElementById('filter-topic').value.toLowerCase();

    const rows = document.querySelectorAll('#table-body tr');
    let visibleCount = 0;

    rows.forEach(row => {
      const session = row.getAttribute('data-session');
      const format = row.getAttribute('data-format');
      const level = row.getAttribute('data-level');
      const skills = row.getAttribute('data-skills');
      const topics = row.getAttribute('data-topics');

      let show = true;

      if (sessionFilter && !session.includes(sessionFilter)) {
        show = false;
      }

      if (show && formatFilter) {
        const formatsArray = format.split(',').map(f => f.trim().toLowerCase());
        if (!formatsArray.some(f => f.includes(formatFilter))) {
          show = false;
        }
      }

      if (show && levelFilter) {
        const levelsArray = level.split(',').map(l => l.trim().toLowerCase());
        if (!levelsArray.some(l => l.includes(levelFilter))) {
          show = false;
        }
      }

      if (show && skillFilter) {
        const skillsArray = skills.split(',').map(s => s.trim().toLowerCase());
        if (!skillsArray.some(s => s.includes(skillFilter))) {
          show = false;
        }
      }

      if (show && topicFilter) {
        const topicsArray = topics.split(',').map(t => t.trim().toLowerCase());
        if (!topicsArray.some(t => t.includes(topicFilter))) {
          show = false;
        }
      }

      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Show message if no results
    const tbody = document.getElementById('table-body');
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) existingMessage.remove();

    if (visibleCount === 0) {
      const message = document.createElement('tr');
      message.className = 'no-results-message';
      message.innerHTML = '<td colspan="6" style="text-align: center; padding: 24px; color: var(--stone); font-style: italic;">No practices match your filters. Try adjusting your selection.</td>';
      tbody.appendChild(message);
    }
  }

  function sortTable(columnIndex) {
    const table = document.getElementById('practices-table');
    const tbody = document.getElementById('table-body');
    const rows = Array.from(tbody.querySelectorAll('tr:not(.no-results-message)'));

    const isAscending = table.getAttribute('data-sort-asc') === 'true';
    table.setAttribute('data-sort-asc', !isAscending);
    table.setAttribute('data-sort-col', columnIndex);

    rows.sort((a, b) => {
      const cellA = a.cells[columnIndex].textContent.trim();
      const cellB = b.cells[columnIndex].textContent.trim();

      if (!isAscending) {
        return cellA.localeCompare(cellB);
      } else {
        return cellB.localeCompare(cellA);
      }
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    filterLibrary();
  }

  function toggleAccordion(header) {
    const group = header.parentElement;
    const isOpen = group.classList.contains('open');
    group.classList.toggle('open', !isOpen);
  }

  function switchDepth(btn, panelId) {
    const container = btn.closest('.accordion-body');
    container.querySelectorAll('.depth-tab').forEach(t => t.classList.remove('active'));
    container.querySelectorAll('.depth-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(panelId).classList.add('active');
  }

  function expandSession(sessionNumber) {
    const detail = document.getElementById('session-' + sessionNumber + '-detail');
    if (!detail) return;
    detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
  }

  function renderGlossary() {
    const container = document.getElementById('glossary-container');
    if (!container || typeof glossaryTerms === 'undefined') return;
    container.innerHTML = '';
    const entries = Object.keys(glossaryTerms).sort((a, b) => a.localeCompare(b));

    entries.forEach(term => {
      const group = document.createElement('div');
      group.className = 'accordion-group';

      const header = document.createElement('div');
      header.className = 'accordion-header';
      header.onclick = () => group.classList.toggle('open');

      const title = document.createElement('div');
      title.className = 'acc-title';
      title.textContent = term;

      const chevron = document.createElement('span');
      chevron.className = 'acc-chevron';
      chevron.textContent = '▼';

      header.appendChild(title);
      header.appendChild(chevron);

      const body = document.createElement('div');
      body.className = 'accordion-body';

      const panel = document.createElement('div');
      panel.className = 'depth-panel';
      panel.innerHTML = `<p style="margin: 0; color: var(--stone); line-height:1.7;">${glossaryTerms[term]}</p>`;
      body.appendChild(panel);

      group.appendChild(header);
      group.appendChild(body);
      container.appendChild(group);
    });
  }

  function renderSessions() {
    const container = document.getElementById('sessions-container');
    if (!container || typeof sessionsData === 'undefined' || typeof developmentalArc === 'undefined') return;
    container.innerHTML = '';

    developmentalArc.layers.forEach(layer => {
      const layerCard = document.createElement('div');
      layerCard.className = 'session-layer-card';

      const header = document.createElement('div');
      header.innerHTML = `
        <h3>${layer.name}</h3>
        <p>${layer.question} Sessions ${layer.sessions.join('–')}</p>
      `;
      layerCard.appendChild(header);

      layer.sessions.forEach(sessionNumber => {
        const session = sessionsData[sessionNumber];
        if (!session) return;

        const item = document.createElement('div');
        item.className = 'session-item';
        item.onclick = () => expandSession(session.number);
        item.innerHTML = `
          <p class="session-title">Session ${session.number}: ${session.title}</p>
          <p class="session-subtitle">${session.subtitle}</p>
        `;

        const detail = document.createElement('div');
        detail.id = 'session-' + session.number + '-detail';
        detail.className = 'session-detail';
        detail.style.borderLeft = '3px solid ' + layer.color;

        let html = '';
        html += `<p><strong>Core question:</strong> ${session.coreQuestion}</p>`;
        html += `<p>${session.coreConcept}</p>`;
        if (session.keyInsight) html += `<p><strong>Key insight:</strong> ${session.keyInsight}</p>`;
        if (session.concepts && session.concepts.length) {
          html += `<p><strong>Core concepts:</strong></p><ul>${session.concepts.map(c => `<li><strong>${c.title}:</strong> ${c.desc}</li>`).join('')}</ul>`;
        }
        if (session.keyRequirements && session.keyRequirements.length) {
          html += `<p><strong>Requirements:</strong></p><ul>${session.keyRequirements.map(req => `<li>${req}</li>`).join('')}</ul>`;
        }
        if (session.keyCapacities && session.keyCapacities.length) {
          html += `<p><strong>Key capacities:</strong></p><ul>${session.keyCapacities.map(cap => `<li>${cap}</li>`).join('')}</ul>`;
        }
        if (session.threatAltitudes && session.threatAltitudes.length) {
          html += `<p><strong>Threat altitudes:</strong></p><ul>${session.threatAltitudes.map(th => `<li><strong>${th.name}:</strong> ${th.danger ? th.danger + ' — ' : ''}${th.belief || ''}${th.response ? ' (' + th.response + ')' : ''}</li>`).join('')}</ul>`;
        }
        if (session.settlingStyles && session.settlingStyles.length) {
          html += `<p><strong>Settling styles:</strong></p><ul>${session.settlingStyles.map(style => `<li><strong>${style.name}:</strong> ${style.desc} ${style.needs ? '– Needs: ' + style.needs : ''}</li>`).join('')}</ul>`;
        }
        if (session.receiverOptions && session.receiverOptions.length) {
          html += `<p><strong>Receiver options:</strong></p><ul>${session.receiverOptions.map(opt => `<li><strong>${opt.name}:</strong> ${opt.desc} ${opt.when ? '— ' + opt.when : ''}</li>`).join('')}</ul>`;
        }
        if (session.categories && session.categories.length) {
          html += `<p><strong>Revelation categories:</strong></p><ul>${session.categories.map(cat => `<li>${cat}</li>`).join('')}</ul>`;
        }
        if (session.practices && session.practices.length && typeof practicesMap !== 'undefined') {
          html += `<p><strong>Practices:</strong></p><ul>${session.practices.map(practiceId => { const practice = practicesMap[practiceId]; const title = practice ? practice.title : practiceId; return `<li><a href="#" onclick="switchToPractice('${practiceId}')" style="color: var(--ember); text-decoration: none;">${title}</a></li>`; }).join('')}</ul>`;
        }

        detail.innerHTML = html;
        layerCard.appendChild(item);
        layerCard.appendChild(detail);
      });

      container.appendChild(layerCard);
    });
  }