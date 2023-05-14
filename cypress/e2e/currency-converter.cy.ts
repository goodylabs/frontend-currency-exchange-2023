import { apiUrls } from "@utils";

describe("Check if typed currency is converted", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('[data-test="currency-converter-card"]').as("card");
    cy.get('[data-test="currency-converter-pln-input"]').as("plnInput");
    cy.get('[data-test="currency-converter-currency-input"]').as("currInput");
  });

  it("should convert value from pln input to other currency", () => {
    cy.intercept(`**/${apiUrls.getCurrentCurrencyExchangeRate}/**`).as("api");
    cy.wait("@api");
    cy.get("@plnInput").type("10");
    cy.get("@currInput").invoke("text").should("not.contain", "0,00");
  });

  it("should convert value from other currency to pln", () => {
    cy.intercept(`**/${apiUrls.getCurrentCurrencyExchangeRate}/**`).as("api");
    cy.get("@card")
      .find('[data-test="currency-combobox-btn"]:not([disabled])')
      .click();
    cy.get('[data-test="currency-combobox-item"]')
      .should("have.length.above", 0)
      .contains("EUR")
      .click();

    cy.wait("@api");

    cy.get("@currInput").clear().type("10");
    cy.get("@plnInput").invoke("text").should("not.contain", "0,00");
  });
});
