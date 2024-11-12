/// <reference types="cypress"/>

import BookingPage from "../pages/BookingPage";

const bookingPage = new BookingPage();


describe("Project 03 Booking feature", () => {

  beforeEach(() => {
    cy.visit("https://www.techglobal-training.com/frontend/project-3");
  });

  it("Validate the default Book your trip form", () => {
    bookingPage
      .getOneWayRadioButton()
      .should("be.visible")
      .and("be.enabled")
      .and("have.attr", "checked");

    bookingPage
      .getRoundTripRadioButton()
      .should("be.visible")
      .and("be.enabled")
      .and("not.have.attr", "checked");

    bookingPage.getCabinClassLabel().should("be.visible");
    bookingPage.getCabinClassDropdown().should("be.visible");
    bookingPage.getFromLabel().should("be.visible");
    bookingPage.getFromDropdown().should("be.visible");
    bookingPage.getToLabel().should("be.visible");
    bookingPage.getToDropdown().should("be.visible");
    bookingPage.getDepartLabel().should("be.visible");
    bookingPage.getDepartDatePicker().should("be.visible");
    bookingPage.getReturnLabel().should("be.visible");
    bookingPage.getReturnDatePicker().should("be.visible").and("be.disabled");
    bookingPage.getNumberOfPassengersLabel().should("be.visible");
    bookingPage.getNumberOfPassengersDropdown().should("be.visible");
    bookingPage.getNumberOfPassengersDropdownOption(1).should("not.have.attr", "hidden");
    bookingPage.getPassengerCategoryDropdown(1).should("be.visible");
    bookingPage.getPassengerCategoryDropdown(1).should("be.visible");
    bookingPage.getBookButton().should("be.visible").and("be.enabled");
  });


  it(" Validate the Book your trip form when Round trip is selected", () => {
    bookingPage.getRoundTripRadioButton().click().should("be.checked");
    bookingPage.getOneWayRadioButton().should("not.be.selected");
    bookingPage.getCabinClassDropdown().should("be.visible");
    bookingPage.getCabinClassLabel().should("be.visible");
    bookingPage.getFromLabel().should("be.visible");
    bookingPage.getFromDropdown().should("be.visible");
    bookingPage.getToLabel().should("be.visible");
    bookingPage.getToDropdown().should("be.visible");
    bookingPage.getDepartLabel().should("be.visible");
    bookingPage.getDepartDatePicker().should("be.visible");
    bookingPage.getPassengerCategoryDropdown(1).should("be.visible");
    bookingPage.getPassengerCategoryDropdown(1).should("be.visible");
    bookingPage.getBookButton().should("be.visible").and("be.enabled");
  });


  it("Validate the booking for 1 passenger and one way", () => {
    bookingPage.clickOneWayRadioButton();
    bookingPage.selectCabinClass("Business");
    bookingPage.selectFrom("Illinois");
    bookingPage.selectTo("Florida");
    bookingPage.clearAndEnterDateForDepart(7);
    bookingPage.selectNumberOfPassengers(1);
    bookingPage.selectPassengerCategory(1, "Senior (65+)");
    bookingPage.clickBookButton();

    const arr = [
      "DEPART",
      "IL to FL",
      bookingPage.futureDate(7).futureDateString,
      "Number of Passengers: 1",
      "Passenger 1: Senior (65+)",
      "Cabin class: Business",
    ];

    bookingPage.getBookingInfoElements().each(($ele, index) => {
      cy.wrap($ele).should("have.text", arr[index]);
    });
  });


  it("Validate the booking for 1 passenger and round trip", () => {
    bookingPage.clickOneWayRadioButton();
    bookingPage.selectCabinClass("First");
    bookingPage.selectFrom("California");
    bookingPage.selectTo("Illinois");
    bookingPage.clearAndEnterDateForDepart(7);
    bookingPage.EnterDateForReturn();
    bookingPage.selectNumberOfPassengers(1);
    bookingPage.selectPassengerCategory(1, "Adult (16-64)");
    bookingPage.clickBookButton();

    const arr = [
      "DEPART",
      "CA to IL",
      bookingPage.futureDate(7).futureDateString,
      "Number of Passengers: 1",
      "Passenger 1: Adult (16-64)",
      "Cabin class: First",
      "RETURN",
      "IL to CA",
      bookingPage.futureDate(1).formattedFutureDate,
    ];

    bookingPage.getBookingInfoElements().each(($ele, index) => {
      cy.wrap($ele).should("have.text", arr[index]);
    });
  });


  it("Validate the booking for 2 passengers and one way", () => {
    bookingPage.clickOneWayRadioButton();
    bookingPage.selectCabinClass("Premium Economy");
    bookingPage.selectFrom("New York");
    bookingPage.selectTo("Texas");
    bookingPage.clearAndEnterDateForDepart(1);
    bookingPage.selectNumberOfPassengers(2);
    bookingPage.selectPassengerCategory(1, "Adult (16-64)");
    bookingPage.selectPassengerCategory(2, "Child (2-11)");
    bookingPage.clickBookButton();

    const arr = [
      "DEPART",
      "NY to TX",
      bookingPage.futureDate(1).futureDateString,
      "Number of Passengers: 2",
      "Passenger 1: Adult (16-64)",
      "Passenger 2: Child (2-11)",
      "Cabin class: Premium Economy",
    ];

    bookingPage.getBookingInfoElements().each(($ele, index) => {
      cy.wrap($ele).should("have.text", arr[index]);
    });
  });
});
