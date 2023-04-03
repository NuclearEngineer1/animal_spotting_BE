exports.convertTimestampToDate = ({ created_at, date_submitted, date_spotted, ...otherProperties }) => {
  if (created_at) {
    return { created_at: new Date(created_at), ...otherProperties };
  } else if (date_submitted && date_spotted) {
    return {
      date_submitted: new Date(date_submitted),
      date_spotted: new Date(date_spotted),
      ...otherProperties
    };
  } else {
    return {...otherProperties}
  }
};
