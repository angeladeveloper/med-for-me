module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  i_am_a_helper: (param) => {
    // this function doesnt do ANYTHING, it is just a placeholder for future functions and making sure the server.js will run without error. 
    return param + "I am a helper"
  }
};
