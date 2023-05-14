import { apiUrls } from "@utils";

describe("Check for average exchange rates table", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('[data-test="avg-exchange-rates-table"]').as("table");
    cy.get('[data-test="exchange-rates-card"]').as("card");
  });

  it("table should load data", () => {
    cy.get("@card")
      .find('[data-test="loading-message"]')
      .should("contain.text", "Loading data...");

    cy.intercept(`**/${apiUrls.getCurrentCurrencyExchangeRate}/**`).as("api");
    cy.wait("@api");
    cy.get("@table").get("tbody").children().should("have.length.above", 0);
  });

  it("every row should contain data", () => {
    cy.get("@table")
      .find("tbody")
      .children()
      .each((row) => {
        const tds = row.children();
        cy.wrap(tds).should("have.length", 3);
        cy.wrap(tds.get(0)).should("not.be.empty");
        cy.wrap(tds.get(1)).invoke("text").should("have.length", 3);
        cy.wrap(tds.get(2))
          .invoke("text")
          .should("match", /^[0-9]\d*(\.\d+)?$/);
      });
  });
});
