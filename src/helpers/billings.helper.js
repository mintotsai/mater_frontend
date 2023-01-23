const starterMonthly = process.env.REACT_APP_STRIPE_PLAN_STARTER_MONTHLY;
const starterYearly = process.env.REACT_APP_STRIPE_PLAN_STARTER_YEARLY;
const professionalMonthly = process.env.REACT_APP_STRIPE_PLAN_PROFESSIONAL_MONTHLY;
const professionalYearly = process.env.REACT_APP_STRIPE_PLAN_PROFESSIONAL_YEARLY;
const enterpriseMonthly = process.env.REACT_APP_STRIPE_PLAN_ENTERPRISE_MONTHLY;
const enterpriseYearly = process.env.REACT_APP_STRIPE_PLAN_ENTERPRISE_YEARLY;

export const plans = [
  { name: 'Starter', priceMonthly: 29, priceYearly: 290, limit: 'Up to 5 active job postings' },
  { name: 'Professional', priceMonthly: 99, priceYearly: 990, limit: 'Up to 25 active job postings' },
  { name: 'Enterprise', priceMonthly: 249, priceYearly: 2490, limit: 'Unlimited active job postings' },
];

export function getPlanFromStripePriceId(stripePriceId) {
  let name = "";
  let interval = "";

  if (starterMonthly == stripePriceId) {
    name = "Starter";
    interval = "month";
  } else if (starterYearly == stripePriceId) {
    name = "Starter";
    interval = "year";
  } else if (professionalMonthly == stripePriceId) {
    name = "Professional";
    interval = "month";
  } else if (professionalYearly == stripePriceId) {
    name = "Professional";
    interval = "year";
  } else if (enterpriseMonthly == stripePriceId) {
    name = "Enterprise";
    interval = "month";
  } else if (enterpriseYearly == stripePriceId) {
    name = "Enterprise";
    interval = "year";
  }

  return plans.findIndex(plan => plan.name === name);
}

export function getStripePriceIdFromPlan(selectedPlan, annualBillingEnabled) {
  let stripePriceId = "";
  if (selectedPlan == "Starter" && !annualBillingEnabled) {
    stripePriceId = starterMonthly;
  } else if (selectedPlan == "Starter" && annualBillingEnabled) {
    stripePriceId = starterYearly;
  } else if (selectedPlan == "Professional" && !annualBillingEnabled) {
    stripePriceId = professionalMonthly;
  } else if (selectedPlan == "Professional" && annualBillingEnabled) {
    stripePriceId = professionalYearly;
  } else if (selectedPlan == "Enterprise" && !annualBillingEnabled) {
    stripePriceId = enterpriseMonthly;
  } else if (selectedPlan == "Enterprise" && annualBillingEnabled) {
    stripePriceId = enterpriseYearly;
  }

  return stripePriceId;
}