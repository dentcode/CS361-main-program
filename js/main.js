// /js/main.js
import { PARKS, LABELS } from './parks-interests.js';

document.addEventListener('DOMContentLoaded', () => {

  const resultsEl   = document.getElementById('results');
  const enterBtn    = document.getElementById('enterButton');
  const resetBtn    = document.getElementById('resetButton');


  function getSelectedInterests() {
    return Array.from(document.querySelectorAll("input[name='interest']:checked"))
                .map(cb => cb.value); // keys like biking, camping
  }


  function findMatchingParks(selected) {
    if (!selected.length) return [];
    return PARKS.filter(park => selected.every(k => park.interests.includes(k)));
  }

  function showResults(parks, selected) {
    if (!selected.length) {
      resultsEl.textContent = 'Select at least one interest to see matching parks.';
      return;
    }
    if (!parks.length) {
      resultsEl.textContent = 'No parks match all selected interests. Try fewer selections.';
      return;
    }
    resultsEl.innerHTML = parks.map(p => `
      <p><strong>${p.name}</strong> — <br>
        <small>${p.interests.map(k => (LABELS?.[k] ?? k)).join(', ')}</small>
      </p>
    `).join('');
  }

  enterBtn.addEventListener('click', () => {
    const selected = getSelectedInterests();
    showResults(findMatchingParks(selected), selected);
  });

  resetBtn.addEventListener('click', () => {
    document.querySelectorAll("input[name='interest']").forEach(cb => cb.checked = false);
    resultsEl.textContent = 'Pick interests and press Enter.';
    selectionEl.textContent = '';
  });

});

