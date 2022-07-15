module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  get_color: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `ff46c7`;
    } else if (randomNum > 0.4) {
      return `ff4400`;
    } else {
      return `6f00ff`;
    }
  },
  get_emoji: () => {
    const randomNum = Math.random();

    // Return a random emoji
    if (randomNum > 0.7) {
      return `💡`;
    } else if (randomNum > 0.4) {
      return `💻`;
    } else {
      return `⚙️`;
    }
  },
};
