export const summaryDonations = (donations) =>
  donations.reduce((accumulator, value) => accumulator + value, 0);

export const groupDonations = (payments = []) => {
  return payments.reduce((acc, transaction) => {
    const { charitiesId, amount = 0 } = transaction;

    const sumGroupDonate = acc?.[charitiesId];
    const totalDonate = sumGroupDonate ? sumGroupDonate + amount : amount;

    acc[charitiesId] = totalDonate;

    return acc;
  }, {});
};
