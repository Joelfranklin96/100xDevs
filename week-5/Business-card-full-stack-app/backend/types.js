const z = require('zod');

const UserDetails = z.object({
    name: z.string(),
    description: z.string(),
    linkedinUrl: z.string().url(),
    twitterUrl: z.string().url(),
    interestString: z.string()
  });

  module.exports = {
    UserDetails
  }