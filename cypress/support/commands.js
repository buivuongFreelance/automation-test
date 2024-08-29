import { ADMIN_EMAIL, ADMIN_PASSWORD } from './constants';
import 'cypress-file-upload';

Cypress.Commands.add(
  'login',
  (email = ADMIN_EMAIL, password = ADMIN_PASSWORD) => {
    cy.visit('/sign-in');

    // Kiểm tra placeholder của trường email
    cy.get('input[placeholder="Enter email"]').should('exist').type(email);

    // Kiểm tra placeholder của trường password
    cy.get('input[placeholder="Enter password"]')
      .should('exist')
      .type(password);

    // Nhấn nút submit
    cy.get('button[type="submit"]').click();

    // Kiểm tra vô home
    cy.get('h1').should('contain.text', 'Welcome to CEH System');
  }
);
