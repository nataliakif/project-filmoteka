import { refs } from '../references/refs';

refs.scrolltop.addEventListener('click', scrollToTop);
document.addEventListener('scroll', handleScroll);

function handleScroll() {
  // Do something on scroll
  const scrollTotal = refs.rootElement.scrollHeight - refs.rootElement.clientHeight;
  if (refs.rootElement.scrollTop / scrollTotal > 0) {
    // Show button
    refs.scrolltop.classList.add('showBtn');
  } else {
    // Hide button
    refs.scrolltop.classList.remove('showBtn');
  }
}

function scrollToTop() {
  // Scroll to top logic
  refs.rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export { handleScroll, scrollToTop };
