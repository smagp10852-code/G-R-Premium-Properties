export const leadershipQuery = `
*[_type == "teamMember" && role == "leadership"] | order(order asc)
`;

export const teamQuery = `
*[_type == "teamMember" && role == "team"] | order(order asc)
`;