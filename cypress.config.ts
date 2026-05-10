/**
 * Cypress Configuration File
 * Configures test environment, API endpoints, and test behavior
 */
import { defineConfig } from 'cypress'

export default defineConfig({
  // Cypress project ID for cloud integration
  projectId: 'qthm8g',

  /**
   * E2E Test Configuration
   * Settings for end-to-end testing
   */
  e2e: {
    // Base URL for all cy.visit() commands
    baseUrl: 'https://demo.allianz-parken.de'
  },

  /**
   * Environment Variables Configuration
   * These can be loaded from system environment variables or .env files
   * Format: CYPRESS_VARIABLE_NAME becomes accessible via cy.env('variable_name')
   * 
   * Security Note: While these variables can be accessed in tests,
   * sensitive data should be managed through .env files not committed to version control
   */
  env: {
    // Email for testing login functionality
    email: process.env.CYPRESS_EMAIL || '',
    
    // Password for testing login functionality
    password: process.env.CYPRESS_PASSWORD || '',
    
    // Email for testing registration functionality
    registerEmail: process.env.CYPRESS_REGISTER_EMAIL || ''
  },

  /**
   * Explicitly disable Cypress.env() access from browser code.
   * This removes the allowCypressEnv warning and prevents insecure exposure
   * of environment values to application runtime.
   */
  allowCypressEnv: false
})