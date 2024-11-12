class BookingPage {
  /* locators */

  getOneWayRadioButton() {
    return cy.get('[value^="One"]');
  }

  getRoundTripRadioButton() {
    return cy.get('[value^="Round"]');
  }

  getCabinClassLabel() {
    return cy.get(".label").contains("Cabin Class");
  }

  getCabinClassDropdown() {
    return this.getCabinClassLabel().next().children();
  }

  getFromLabel() {
    return cy.get(".label").contains("From");
  }

  getFromDropdown() {
    return this.getFromLabel().next().children();
  }

  getToLabel() {
    return cy.get(".label").contains("To");
  }

  getToDropdown() {
    return this.getToLabel().next().children();
  }

  getDepartLabel() {
    return cy.get(".label").contains("Depart");
  }

  getDepartDatePicker() {
    return this.getDepartLabel().next().find("input");
  }

  getReturnLabel() {
    return cy.get(".label").contains("Return");
  }

  getReturnDatePicker() {
    return this.getReturnLabel().next().find("input");
  }

  getNumberOfPassengersLabel() {
    return cy.get(".label").contains("Number of passengers");
  }

  getNumberOfPassengersDropdown() {
    return this.getNumberOfPassengersLabel().next().children();
  }

  getNumberOfPassengersDropdownOption(n) {
    return this.getNumberOfPassengersDropdown()
      .children()
      .eq(1);
  }

  /**
   * Retrieves child elements of a passenger category label.
   *
   * @param {number} n - The passenger number.
   * @returns  Child elements of the label.
   *
   */
  getPassengerCategoryLabel(n) {
    return cy.get(".label").contains(`Passenger ${n}`);
  }
  /**
   *
   * @param {*} n the passenger number
   * @returns the corresponding dropdown
   */
  getPassengerCategoryDropdown(n) {
    return this.getPassengerCategoryLabel(n).next().children();
  }

 /**
     * 
     * @param {*} n1 the passenger number 
     * @param {*} category can be 'Adult (16-64)', 'Senior (65+)', 'Young Adult (12-15)', 'Child (2-11)', 'Infant in seat (under 2)'
     * @returns 
     */


  getPassengerCategoryDropdownOption(n, category) {
   return this.getPassengerCategoryDropdown(n).children().contains(category);
  }


  getBookButton() {
    return cy.get("button").contains("BOOK");
  }


  getBookingInfoElements() {
    return cy.get('[class^="ml"] h1,[class^="ml"] h3,[class^="ml"] p');
  }




  /* methods */

  // selectDropdownOption(option) {
  //   this.getToDropdown().click();
  // }

 

clickOneWayRadioButton() {
   this.getOneWayRadioButton().click()
}

selectCabinClass(cabinClass) {
   this.getCabinClassDropdown().select(cabinClass)
}

selectFrom(from) {
   this.getFromDropdown().select(from)
}

selectTo(to) {
   this.getToDropdown().select(to)
}

clearAndEnterDateForDepart(n) {
   this.getDepartDatePicker().clear().type(`${this.futureDate(n).formattedFutureDate}{enter}`)
} 


EnterDateForReturn(n) {
  this.getReturnDatePicker().invoke('removeAttr', 'disabled').type(`${this.futureDate(n).formattedFutureDate}{enter}`)
}


selectNumberOfPassengers(n) {
   this.getNumberOfPassengersDropdown().select(`${n}`)
}

selectPassengerCategory(n, category) {
   this.getPassengerCategoryDropdown(n).select(category)
}

clickBookButton() {
   this.getBookButton().click();
 }


    /**
     * 
     * @param {*} n number of days from the current date
     * @returns an object with future date (+n days from current date) in two formats:
     * MM/DD/YYYY
     * weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' (@example Sat Nov 16 2024)
     */
    futureDate(n) {

      const currentDate = new Date();
      
      
      currentDate.setDate(currentDate.getDate() + n);
      
      
      const month = currentDate.getMonth() + 1; 
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      
      const formattedFutureDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
      
      
      const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
      const futureDateString = currentDate.toLocaleDateString('en-US', options).replace(/,/g, '');
      
      return {
          formattedFutureDate,
          futureDateString
          }
      }

}

export default BookingPage;
