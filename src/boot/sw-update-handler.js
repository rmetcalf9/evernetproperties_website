
export default ({ app }) => {
  window.addEventListener('swUpdated', () => {
    console.log('Service worker updated event detected!');
    // Show a notification or prompt the user to reload the page
    //if (confirm('New version available. Do you want to update?')) {
    window.location.reload();
    //}
  });
};
