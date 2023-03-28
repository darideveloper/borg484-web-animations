async function init () {

  // Get notes
  const selector_wrapper = '.thanks .donations'
  const selector_content = `${selector_wrapper} .content`
  const wrapper_elem = document.querySelector(selector_wrapper)
  const content_elem = document.querySelector(selector_content)
  let content_donations = document.querySelectorAll(`${selector_content} .donation`)
  
  // Render donations
  content_elem.innerHTML = "" // Clear wrapper
  for (const donnor_name in donors) {
    
    // Create donation element
    const donor_amount = donors[donnor_name]
    const donation_elem = `<p class="donation">
      <span class="name">${donnor_name}</span>
      <span class="amount">${donor_amount}</span>
    </p>`
  
    // Add donation element to wrapper
    content_elem.innerHTML += donation_elem
  }
  

  // Animate donations after render
  content_donations = document.querySelectorAll(`${selector_content} .donation`)
  const wrapper_height = wrapper_elem.offsetHeight
  const content_height = content_elem.offsetHeight
  const content_donations_count = content_donations.length
  
  // Animate donors
  anime({
    targets: selector_content,
    translateY:-(content_height - wrapper_height + 100),
    duration: 800 * content_donations_count,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad'
  });

}

init ()
