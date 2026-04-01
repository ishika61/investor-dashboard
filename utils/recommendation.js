export const scoreDeal=(deal,user)=>{
  let score=0;

  if(deal.industry===user.preferredIndustry) score+=30;
  if(deal.risk===user.riskTolerance) score+=30;
  if(deal.roi>=15) score+=20;
  if(deal.investmentRequired<=user.budget) score+=20;

  return score;
};