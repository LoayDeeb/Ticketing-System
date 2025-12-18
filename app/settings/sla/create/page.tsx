"use client";

import React from 'react';

export default function CreateSLAPolicyPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Create SLA Policy - Labiba</title>
          <style>
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                  background: #f8f9fa;
                  padding: 20px;
              }

              .container {
                  max-width: 1400px;
                  margin: 0 auto;
              }

              .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 24px;
              }

              .header h1 {
                  font-size: 28px;
                  font-weight: 600;
                  color: #1a1a1a;
              }

              .header-actions {
                  display: flex;
                  gap: 12px;
              }

              .card {
                  background: white;
                  border-radius: 8px;
                  padding: 32px;
                  margin-bottom: 24px;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
              }

              .card-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 24px;
                  padding-bottom: 16px;
                  border-bottom: 1px solid #e5e7eb;
              }

              .card-title {
                  font-size: 18px;
                  font-weight: 600;
                  color: #1a1a1a;
              }

              .card-subtitle {
                  font-size: 14px;
                  color: #6b7280;
                  margin-top: 4px;
              }

              .form-group {
                  margin-bottom: 24px;
              }

              .form-label {
                  display: block;
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
                  margin-bottom: 8px;
              }

              .form-label .required {
                  color: #ef4444;
              }

              .form-input,
              .form-select {
                  width: 100%;
                  padding: 10px 14px;
                  border: 1px solid #d1d5db;
                  border-radius: 6px;
                  font-size: 14px;
                  color: #1a1a1a;
                  background: white;
                  transition: all 0.2s;
              }

              .form-input:focus,
              .form-select:focus {
                  outline: none;
                  border-color: #3b82f6;
                  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
              }

              .form-input::placeholder {
                  color: #9ca3af;
              }

              .form-helper {
                  font-size: 12px;
                  color: #6b7280;
                  margin-top: 6px;
              }

              .form-row {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 20px;
              }

              /* Condition Builder */
              .condition-builder {
                  background: #f9fafb;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  padding: 20px;
              }

              .condition-header {
                  font-size: 13px;
                  font-weight: 500;
                  color: #6b7280;
                  margin-bottom: 16px;
              }

              .condition-row {
                  display: grid;
                  grid-template-columns: 200px 1fr 40px;
                  gap: 12px;
                  margin-bottom: 12px;
                  align-items: start;
              }

              .btn-icon {
                  width: 40px;
                  height: 40px;
                  border: none;
                  border-radius: 6px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 18px;
                  transition: all 0.2s;
              }

              .btn-add {
                  background: #f3f4f6;
                  color: #1a1a1a;
              }

              .btn-add:hover {
                  background: #e5e7eb;
              }

              .btn-remove {
                  background: #fee;
                  color: #ef4444;
              }

              .btn-remove:hover {
                  background: #fecaca;
              }

              .btn-add-condition {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 8px 16px;
                  background: white;
                  border: 1px dashed #d1d5db;
                  border-radius: 6px;
                  color: #6b7280;
                  font-size: 14px;
                  cursor: pointer;
                  transition: all 0.2s;
                  margin-top: 8px;
              }

              .btn-add-condition:hover {
                  border-color: #3b82f6;
                  color: #3b82f6;
              }

              /* SLA Targets */
              .sla-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 24px;
              }

              .input-with-unit {
                  display: flex;
                  align-items: center;
                  gap: 12px;
              }

              .input-with-unit .form-input {
                  flex: 1;
              }

              .unit-label {
                  font-size: 14px;
                  color: #6b7280;
                  white-space: nowrap;
              }

              /* Toggle Switch */
              .toggle-container {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 16px;
                  background: #f9fafb;
                  border-radius: 8px;
                  cursor: pointer;
                  transition: background 0.2s;
              }

              .toggle-container:hover {
                  background: #f3f4f6;
              }

              .toggle-switch {
                  position: relative;
                  width: 44px;
                  height: 24px;
                  background: #d1d5db;
                  border-radius: 12px;
                  transition: background 0.2s;
                  flex-shrink: 0;
              }

              .toggle-switch.active {
                  background: #3b82f6;
              }

              .toggle-switch::after {
                  content: '';
                  position: absolute;
                  top: 2px;
                  left: 2px;
                  width: 20px;
                  height: 20px;
                  background: white;
                  border-radius: 50%;
                  transition: transform 0.2s;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
              }

              .toggle-switch.active::after {
                  transform: translateX(20px);
              }

              .toggle-label {
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
              }

              /* OLA Section */
              .ola-content {
                  display: none;
                  margin-top: 24px;
              }

              .ola-content.visible {
                  display: block;
              }

              .ola-department-row {
                  display: grid;
                  grid-template-columns: 1fr 200px;
                  gap: 16px;
                  margin-bottom: 16px;
                  align-items: start;
              }

              .ola-validation {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 12px 16px;
                  background: #eff6ff;
                  border: 1px solid #bfdbfe;
                  border-radius: 6px;
                  margin-top: 16px;
              }

              .ola-validation.error {
                  background: #fef2f2;
                  border-color: #fecaca;
              }

              .ola-validation-icon {
                  font-size: 18px;
              }

              .ola-validation-text {
                  font-size: 13px;
                  color: #1e40af;
                  flex: 1;
              }

              .ola-validation.error .ola-validation-text {
                  color: #991b1b;
              }

              /* Info Box */
              .info-box {
                  display: flex;
                  gap: 12px;
                  padding: 16px;
                  background: #eff6ff;
                  border-left: 4px solid #3b82f6;
                  border-radius: 6px;
                  margin-bottom: 24px;
              }

              .info-box-icon {
                  font-size: 20px;
                  flex-shrink: 0;
              }

              .info-box-content {
                  font-size: 14px;
                  color: #1e40af;
                  line-height: 1.6;
              }

              /* Buttons */
              .btn {
                  padding: 10px 20px;
                  border: none;
                  border-radius: 6px;
                  font-size: 14px;
                  font-weight: 500;
                  cursor: pointer;
                  transition: all 0.2s;
              }

              .btn-primary {
                  background: #3b82f6;
                  color: white;
              }

              .btn-primary:hover {
                  background: #2563eb;
              }

              .btn-secondary {
                  background: white;
                  color: #374151;
                  border: 1px solid #d1d5db;
              }

              .btn-secondary:hover {
                  background: #f9fafb;
              }

              .form-actions {
                  display: flex;
                  gap: 12px;
                  padding-top: 24px;
                  border-top: 1px solid #e5e7eb;
              }

              /* Priority Badge */
              .priority-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 6px 12px;
                  background: #f3f4f6;
                  border-radius: 6px;
                  font-size: 13px;
                  color: #374151;
              }

              .priority-input {
                  width: 60px;
                  padding: 4px 8px;
                  border: 1px solid #d1d5db;
                  border-radius: 4px;
                  font-size: 13px;
                  text-align: center;
              }

              /* Status Toggle */
              .status-row {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 16px;
                  background: #f9fafb;
                  border-radius: 8px;
              }

              .status-label {
                  font-size: 14px;
                  font-weight: 500;
                  color: #374151;
              }

              .validation-error {
                  color: #ef4444;
                  font-size: 13px;
                  margin-top: 6px;
                  display: none;
              }

              .validation-error.show {
                  display: block;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div>
                      <h1>Create SLA Policy</h1>
                      <p style="color: #6b7280; margin-top: 4px;">Define service level agreements and operational commitments</p>
                  </div>
                  <div class="header-actions">
                      <button class="btn btn-secondary" onclick="window.history.back()">Cancel</button>
                      <button class="btn btn-primary" onclick="savePolicy()">Save Policy</button>
                  </div>
              </div>

              <!-- Basic Information -->
              <div class="card">
                  <div class="card-header">
                      <div>
                          <div class="card-title">Policy Configuration</div>
                          <div class="card-subtitle">Define policy name and priority order</div>
                      </div>
                  </div>

                  <div class="form-group">
                      <label class="form-label">Policy Name <span class="required">*</span></label>
                      <input type="text" class="form-input" placeholder="e.g., VIP Payment Issues" id="policyName">
                      <div class="form-helper">Give this policy a descriptive name (1-100 characters)</div>
                  </div>
              </div>

              <!-- Conditions -->
              <div class="card">
                  <div class="card-header">
                      <div>
                          <div class="card-title">Ticket Conditions</div>
                          <div class="card-subtitle">Apply this policy when ALL conditions are met</div>
                      </div>
                  </div>

                  <div class="info-box">
                      <div class="info-box-icon">ℹ️</div>
                      <div class="info-box-content">
                          <strong>How conditions work:</strong> All conditions must match for this policy to apply to a ticket. If no policies match, the global SLA from Help Desk Settings will be used.
                      </div>
                  </div>

                  <div class="condition-builder" id="conditionBuilder">
                      <div class="condition-header">MATCH ALL OF THE FOLLOWING:</div>
                      
                      <!-- Ticket Type -->
                      <div class="condition-row" style="grid-template-columns: 200px 1fr 40px;">
                          <div class="form-label" style="padding: 10px 0; margin: 0;">Ticket Type</div>
                          <select class="form-select">
                              <option>All</option>
                              <option>Support Request</option>
                              <option>Bug Report</option>
                              <option>Feature Request</option>
                              <option>Incident</option>
                          </select>
                          <div style="width: 40px;"></div>
                      </div>

                      <!-- Channel -->
                      <div class="condition-row" style="grid-template-columns: 200px 1fr 40px;">
                          <div class="form-label" style="padding: 10px 0; margin: 0;">Channel</div>
                          <select class="form-select">
                              <option>All</option>
                              <option>Web Chat</option>
                              <option>Email</option>
                              <option>WhatsApp</option>
                              <option>Facebook</option>
                              <option>Instagram</option>
                          </select>
                          <div style="width: 40px;"></div>
                      </div>

                      <!-- Priority -->
                      <div class="condition-row" style="grid-template-columns: 200px 1fr 40px;">
                          <div class="form-label" style="padding: 10px 0; margin: 0;">Priority</div>
                          <select class="form-select">
                              <option>All</option>
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                              <option>Critical</option>
                          </select>
                          <div style="width: 40px;"></div>
                      </div>

                      <!-- Classification -->
                      <div class="condition-row" style="grid-template-columns: 200px 1fr 40px;">
                          <div class="form-label" style="padding: 10px 0; margin: 0;">Classification</div>
                          <select class="form-select">
                              <option>All</option>
                              <option>Payment Issue</option>
                              <option>Technical Problem</option>
                              <option>Account Question</option>
                              <option>General Inquiry</option>
                          </select>
                          <div style="width: 40px;"></div>
                      </div>

                      <!-- Custom Fields (Dynamic) -->
                      <div id="customFieldsContainer"></div>

                      <button class="btn-add-condition" onclick="addCustomField()">
                          <span>+</span>
                          <span>Add Custom Field</span>
                      </button>
                  </div>
              </div>

              <!-- SLA Targets -->
              <div class="card">
                  <div class="card-header">
                      <div>
                          <div class="card-title">SLA Targets (Customer Commitment)</div>
                          <div class="card-subtitle">Define response and resolution time commitments</div>
                      </div>
                  </div>

                  <div class="info-box">
                      <div class="info-box-icon">⏱️</div>
                      <div class="info-box-content">
                          <strong>Business hours only:</strong> SLA times are calculated using business hours configured in settings. Time outside business hours and during Pending/On Hold status is excluded.
                      </div>
                  </div>

                  <div class="sla-grid">
                      <div class="form-group">
                          <label class="form-label">First Response Target <span class="required">*</span></label>
                          <div class="input-with-unit">
                              <input type="number" class="form-input" placeholder="60" min="1" id="firstResponse">
                              <span class="unit-label">minutes</span>
                          </div>
                          <div class="form-helper">Time until first public reply to customer</div>
                      </div>

                      <div class="form-group">
                          <label class="form-label">Resolution Target <span class="required">*</span></label>
                          <div class="input-with-unit">
                              <input type="number" class="form-input" placeholder="1440" min="1" id="resolutionTarget" onchange="validateOLASum()">
                              <span class="unit-label">minutes</span>
                          </div>
                          <div class="form-helper">Total time until ticket resolution</div>
                      </div>
                  </div>
              </div>

              <!-- OLA Section -->
              <div class="card">
                  <div class="toggle-container" onclick="toggleOLA()">
                      <div class="toggle-switch" id="olaToggle"></div>
                      <div>
                          <div class="toggle-label">Track internal department commitments (OLA)</div>
                          <div class="form-helper" style="margin-top: 4px;">Monitor time spent in each department for internal accountability</div>
                      </div>
                  </div>

                  <div class="ola-content" id="olaContent">
                      <div class="info-box" style="margin-top: 24px;">
                          <div class="info-box-icon">🏢</div>
                          <div class="info-box-content">
                              <strong>How OLA tracking works:</strong>
                              <ul style="margin-top: 8px; padding-left: 20px;">
                                  <li>Define time allocations for each department involved in resolving this type of ticket</li>
                                  <li>When tickets are transferred between departments, OLA timers track time spent in each</li>
                                  <li>Only departments listed below will have OLA tracking</li>
                                  <li>Sum of all OLA times must be ≤ Resolution Target</li>
                              </ul>
                          </div>
                      </div>

                      <div class="form-group">
                          <label class="form-label">Department Time Allocations</label>
                          
                          <div id="olaRows">
                              <!-- Default departments will be added when OLA is enabled -->
                          </div>
                      </div>

                      <div class="ola-validation" id="olaValidation">
                          <span class="ola-validation-icon">✓</span>
                          <div class="ola-validation-text">
                              <strong>Total OLA time: 0 minutes</strong> (Resolution target: <span id="resolutionDisplay">0</span> minutes)
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Status -->
              <div class="card">
                  <div class="status-row">
                      <div class="toggle-switch active" id="statusToggle" onclick="toggleStatus()"></div>
                      <div class="status-label">Active</div>
                      <div class="form-helper" style="margin: 0;">Policy is currently active and will be applied to matching tickets</div>
                  </div>
              </div>

              <!-- Actions -->
              <div class="card">
                  <div class="form-actions">
                      <button class="btn btn-primary" onclick="savePolicy()">Save Policy</button>
                      <button class="btn btn-secondary" onclick="window.history.back()">Cancel</button>
                  </div>
              </div>
          </div>

          <script>
              let olaEnabled = false;
              let policyActive = true;

              function toggleOLA() {
                  const toggle = document.getElementById('olaToggle');
                  const content = document.getElementById('olaContent');
                  const olaRows = document.getElementById('olaRows');
                  olaEnabled = !olaEnabled;
                  
                  if (olaEnabled) {
                      toggle.classList.add('active');
                      content.classList.add('visible');
                      
                      // Add default departments if none exist
                      if (olaRows.children.length === 0) {
                          addDefaultOLADepartments();
                      }
                  } else {
                      toggle.classList.remove('active');
                      content.classList.remove('visible');
                  }
              }

              function addDefaultOLADepartments() {
                  const defaultDepartments = [
                      { name: 'Customer Service', time: '0' },
                      { name: 'Technical Team', time: '0' },
                      { name: 'Finance', time: '0' }
                  ];

                  const container = document.getElementById('olaRows');
                  defaultDepartments.forEach(dept => {
                      const newRow = document.createElement('div');
                      newRow.className = 'ola-department-row';
                      newRow.innerHTML = \`
                          <select class="form-select">
                              <option \${dept.name === 'Customer Service' ? 'selected' : ''}>Customer Service</option>
                              <option \${dept.name === 'IT Support' ? 'selected' : ''}>IT Support</option>
                              <option \${dept.name === 'Finance' ? 'selected' : ''}>Finance</option>
                              <option \${dept.name === 'Technical Team' ? 'selected' : ''}>Technical Team</option>
                              <option \${dept.name === 'Management' ? 'selected' : ''}>Management</option>
                          </select>
                          <div class="input-with-unit">
                              <input type="number" class="form-input ola-time-input" value="\${dept.time}" min="0" step="1" onchange="validateOLASum()">
                              <span class="unit-label">minutes</span>
                          </div>
                      \`;
                      container.appendChild(newRow);
                  });
                  validateOLASum();
              }

              function toggleStatus() {
                  const toggle = document.getElementById('statusToggle');
                  policyActive = !policyActive;
                  
                  if (policyActive) {
                      toggle.classList.add('active');
                  } else {
                      toggle.classList.remove('active');
                  }
              }

              function addCustomField() {
                  const container = document.getElementById('customFieldsContainer');
                  const newRow = document.createElement('div');
                  newRow.className = 'condition-row';
                  newRow.style.gridTemplateColumns = '200px 1fr 40px';
                  newRow.innerHTML = \`
                      <select class="form-select">
                          <option>Custom Field 1</option>
                          <option>Custom Field 2</option>
                          <option>Custom Field 3</option>
                          <option>Customer Segment</option>
                          <option>Product Category</option>
                          <option>Region</option>
                      </select>
                      <input type="text" class="form-input" placeholder="Enter value...">
                      <button class="btn-icon btn-remove" onclick="removeCustomField(this)">🗑️</button>
                  \`;
                  container.appendChild(newRow);
              }

              function removeCustomField(btn) {
                  btn.closest('.condition-row').remove();
              }

              function addOLARow() {
                  const container = document.getElementById('olaRows');
                  const newRow = document.createElement('div');
                  newRow.className = 'ola-department-row';
                  newRow.innerHTML = \`
                      <select class="form-select">
                          <option>Customer Service</option>
                          <option>IT Support</option>
                          <option>Finance</option>
                          <option>Technical Team</option>
                          <option>Management</option>
                      </select>
                      <div class="input-with-unit">
                          <input type="number" class="form-input ola-time-input" placeholder="60" min="1" step="1" onchange="validateOLASum()">
                          <span class="unit-label">minutes</span>
                      </div>
                      <button class="btn-icon btn-remove" onclick="removeOLARow(this)">🗑️</button>
                  \`;
                  container.appendChild(newRow);
                  validateOLASum();
              }

              function removeOLARow(btn) {
                  btn.closest('.ola-department-row').remove();
                  validateOLASum();
              }

              function validateOLASum() {
                  if (!olaEnabled) return;

                  const inputs = document.querySelectorAll('.ola-time-input');
                  const resolutionTarget = parseFloat(document.getElementById('resolutionTarget').value) || 0;
                  
                  let totalOLA = 0;
                  inputs.forEach(input => {
                      totalOLA += parseFloat(input.value) || 0;
                  });

                  const validation = document.getElementById('olaValidation');
                  const display = document.getElementById('resolutionDisplay');
                  
                  display.textContent = resolutionTarget.toFixed(0);
                  
                  if (totalOLA > resolutionTarget) {
                      validation.classList.add('error');
                      validation.innerHTML = \`
                          <span class="ola-validation-icon">⚠️</span>
                          <div class="ola-validation-text">
                              <strong>Validation Error:</strong> Total OLA time (\${totalOLA.toFixed(0)} minutes) exceeds Resolution Target (\${resolutionTarget.toFixed(0)} minutes)
                          </div>
                      \`;
                  } else {
                      validation.classList.remove('error');
                      validation.innerHTML = \`
                          <span class="ola-validation-icon">✓</span>
                          <div class="ola-validation-text">
                              <strong>Total OLA time: \${totalOLA.toFixed(0)} minutes</strong> (Resolution target: \${resolutionTarget.toFixed(0)} minutes) — \${(resolutionTarget - totalOLA).toFixed(0)} minutes remaining
                          </div>
                      \`;
                  }
              }

              function savePolicy() {
                  const policyName = document.getElementById('policyName').value;
                  const firstResponse = document.getElementById('firstResponse').value;
                  const resolutionTarget = document.getElementById('resolutionTarget').value;
                  
                  if (!policyName || !firstResponse || !resolutionTarget) {
                      alert('Please fill in all required fields');
                      return;
                  }

                  if (olaEnabled) {
                      const inputs = document.querySelectorAll('.ola-time-input');
                      const resolutionMinutes = parseFloat(resolutionTarget);
                      let totalOLA = 0;
                      
                      inputs.forEach(input => {
                          totalOLA += parseFloat(input.value) || 0;
                      });

                      if (totalOLA > resolutionMinutes) {
                          alert('Total OLA time exceeds Resolution Target. Please adjust the values.');
                          return;
                      }
                  }

                  alert('Policy saved successfully!\\n\\n' + 
                        'Policy Name: ' + policyName + '\\n' +
                        'First Response: ' + firstResponse + ' minutes\\n' +
                        'Resolution Target: ' + resolutionTarget + ' minutes\\n' +
                        'OLA Enabled: ' + olaEnabled + '\\n' +
                        'Status: ' + (policyActive ? 'Active' : 'Inactive'));
              }

              // Initialize
              validateOLASum();
          </script>
      </body>
      </html>
    `}} />
  );
}

