/**
 * Cypress E2E Support File
 * This file is loaded automatically before all test files run
 * Use this file for global configuration and custom command imports
 */

// Import custom commands defined in commands.ts
import './commands'

/**
 * Declare custom commands for TypeScript support
 * Extends the Cypress namespace with custom command types
 */
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Change the application language to English
       * Handles language dropdown selection across all pages
       */
      changeLanguageToEnglish(): Chainable<void>

      /**
       * Close welcome tour popups that appear on page initialization
       * Removes modal overlays and Shepherd tour elements
       */
      closeWelcomeTourPopups(): Chainable<void>

      /**
       * Custom login command with corrected form field selectors
       * Uses Angular formcontrolname attributes for field identification
       * @param email - User email address
       * @param password - User password
       */
      login(email: string, password: string): Chainable<void>
    }
  }
}
