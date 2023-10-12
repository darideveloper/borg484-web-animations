/**
 * Add donot to donors data
 * @param {string} amount - the amount the user wants to donate
 * @param {int} intAmount - the amount the user wants to donate as an integer
 * @param {string} dedicationImageUrl - the url of the dedication image
 * @param {string} name - the name of the donor
 * @param {string} id - the id of the donor
 * @param {int} paid - 0 or 1
 * @param {integer} donor - the id of the donor
 */
function addDonation(amount, intAmount, dedicationImageUrl, name, id, paid, donor) {
  return
}

class Render {

  constructor() {
    // Donotations data
    this.donations = [
      {
        amount: '00.00',
        intAmount: 0,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 0',
        id: '0',
        paid: 1,
        donor: 0
      },
      {
        amount: '10.00',
        intAmount: 10,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 1',
        id: '1',
        paid: 0,
        donor: 1
      },
      {
        amount: '20.00',
        intAmount: 20,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 2',
        id: '2',
        paid: 0,
        donor: 2
      },
      {
        amount: '30.00',
        intAmount: 30,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 3',
        id: '3',
        paid: 0,
        donor: 3
      },
      {
        amount: '40.00',
        intAmount: 40,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 4',
        id: '4',
        paid: 0,
        donor: 4
      },
      {
        amount: '50.00',
        intAmount: 50,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 5',
        id: '5',
        paid: 0,
        donor: 5
      },
      {
        amount: '60.00',
        intAmount: 60,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 6',
        id: '6',
        paid: 0,
        donor: 6
      },
      {
        amount: '70.00',
        intAmount: 70,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 7',
        id: '7',
        paid: 0,
        donor: 7
      },
      {
        amount: '80.00',
        intAmount: 80,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 8',
        id: '8',
        paid: 0,
        donor: 8
      },
      {
        amount: '90.00',
        intAmount: 90,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 9',
        id: '9',
        paid: 0,
        donor: 9
      },
      {
        amount: '100.00',
        intAmount: 100,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 10',
        id: '10',
        paid: 0,
        donor: 10
      },
      {
        amount: '00.00',
        intAmount: 0,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 0',
        id: '0',
        paid: 1,
        donor: 0
      },
      {
        amount: '10.00',
        intAmount: 10,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 101',
        id: '101',
        paid: 0,
        donor: 101
      },
      {
        amount: '20.00',
        intAmount: 20,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 201',
        id: '201',
        paid: 0,
        donor: 201
      },
      {
        amount: '30.00',
        intAmount: 30,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 301',
        id: '301',
        paid: 0,
        donor: 301
      },
      {
        amount: '40.00',
        intAmount: 40,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 401',
        id: '401',
        paid: 0,
        donor: 401
      },
      {
        amount: '50.00',
        intAmount: 5001,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 5',
        id: '501',
        paid: 0,
        donor: 501
      },
      {
        amount: '60.00',
        intAmount: 60,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 601',
        id: '601',
        paid: 0,
        donor: 601
      },
      {
        amount: '70.00',
        intAmount: 70,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 701',
        id: '701',
        paid: 0,
        donor: 701
      },
      {
        amount: '80.00',
        intAmount: 80,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 801',
        id: '801',
        paid: 0,
        donor: 801
      },
      {
        amount: '90.00',
        intAmount: 90,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 901',
        id: '901',
        paid: 0,
        donor: 901
      },
      {
        amount: '100.00',
        intAmount: 100,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 1001',
        id: '1001',
        paid: 0,
        donor: 1001
      },
      {
        amount: '200.00',
        intAmount: 200,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 11',
        id: '11',
        paid: 0,
        donor: 11
      },
      {
        amount: '300.00',
        intAmount: 300,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 12',
        id: '12',
        paid: 0,
        donor: 12
      },
      {
        amount: '400.00',
        intAmount: 400,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 13',
        id: '13',
        paid: 0,
        donor: 13
      },
      {
        amount: '500.00',
        intAmount: 500,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 14',
        id: '14',
        paid: 0,
        donor: 14
      }, 
      {
        amount: '600.00',
        intAmount: 600,
        dedicationImageUrl: 'https://www.darideveloper.com/imgs/logo.png',
        name: 'Donor 15',
        id: '15',
        paid: 0,
        donor: 15
      }
    ]
    this.renderedDonationsIds = []

    // Html elements
    this.donationUpperWrapper = document.querySelector('.donations-upper')
    
    // Init swiper
    this.swiper = new Swiper(".swiper", {
      slidesPerView: 10,
      spaceBetween: 30,
      autoplay: {delay: 1000},
    });
  }

  /**
   * Get the next donation to render, upper 100 usd
   */
  getNextUpperDonation() {
    const donationsUpper = this.donations.filter(donation => donation.intAmount >= 100)
    const donationsNoRendered = donationsUpper.filter(donation => !this.renderedDonationsIds.includes(donation.id))
    if (donationsNoRendered.length > 0) {
      // Return random donation
      return  donationsNoRendered[Math.floor(Math.random() * donationsNoRendered.length)]
    } else {
      return {}
    }
  }

  getNextLowerDonation() {
    const donationsLower = this.donations.filter(donation => donation.intAmount < 100)
    const donationsNoRendered = donationsLower.filter(donation => !this.renderedDonationsIds.includes(donation.id))
    if (donationsNoRendered.length > 0) {
      // Return random donation
      return donationsNoRendered[Math.floor(Math.random() * donationsNoRendered.length)]
    } else {
      return {}
    }
  }

  /**
   * Render the next lower donations
   */
  renderNextLower() {

    // Get donation data
    const donation = this.getNextLowerDonation()

    // Add donation to wrapper
    if (donation.id) {
      const donationElem = `
        <div class="donation swiper-slide">
          <img class="" src="${donation.dedicationImageUrl}" alt="${donation.name} photo">
          <p class="">${donation.name}</p>
        </div>
      `
      this.swiper.appendSlide(donationElem)

      // Add donation id to rendered donations
      this.renderedDonationsIds.push(donation.id)
    }
  }

  /**
   * Render the next upper donations
   * @param {string} position - frame to render the donation ('left' or 'right')
   */
  renderNextUpper(position) {

    // Get donation data
    const donation = this.getNextUpperDonation ()
    
    // Get frame
    const frame = this.donationUpperWrapper.querySelector (`.donation.${position}`)

    // Delete previous donation and add new one
    frame.innerHTML = ''
    const donationElem = `
      <div class="img-wrapper">
        <img class="" src="${donation.dedicationImageUrl}" alt="${donation.name} photo">
      </div>
      <p class="">${donation.name}</p>
    `
    frame.innerHTML = donationElem

    // Add donation id to rendered donations
    this.renderedDonationsIds.push(donation.id)
  }

  /**
   * Render all initial lower donations
   */
  renderInitialLower () {
    for (let i = 0; i < 20; i++) {
      this.renderNextLower()
    }
  }

  /**
   * Render all initial upper donations
   */
  renderInitialUpper () {
    this.renderNextUpper('left')
    this.renderNextUpper('right')
  }

}

const render = new Render()
render.renderInitialLower()
render.renderInitialUpper()