const selector_wrapper = '.thanks .donations'
const wrapper = document.querySelector(selector_wrapper)
const wrapper_height = wrapper.offsetHeight
const selector_content = `${selector_wrapper} .content`
const content_elem = document.querySelector(selector_content)
const content_height = content_elem.offsetHeight
const content_donations = document.querySelectorAll(`${selector_content} .donation`)
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