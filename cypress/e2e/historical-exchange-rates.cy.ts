import { apiUrls } from "@utils";

describe("Check for historical exchange rates charts", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('[data-test="historical-exchange-rates-card"]').as("card");
  });

  it("button should send request and display charts", () => {
    cy.intercept(`**/${apiUrls.getHistoricalExchangeRates}/**`).as("api");

    cy.get("@card").find('[data-test="currency-combobox-btn"]').click();
    cy.get('[data-test="currency-combobox-item"]')
      .should("have.length.above", 0)
      .contains("EUR")
      .click();

    cy.wait("@api");

    cy.get("@card").find("canvas").should("have.length", 2);
  });
});
