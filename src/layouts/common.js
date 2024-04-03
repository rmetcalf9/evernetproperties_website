// Common components for all layouts

function get_menu_items () {
  return [
    {name: 'Home', target: '/'},
    {name: 'FAQ', target: '/faq'},
    {name: 'Tools', target: '/tools'},
    {name: 'Contact Us', target: '/contact'},
    {name: 'About', target: '/about'}
  ];
}


export default {
  get_menu_items: get_menu_items
}
