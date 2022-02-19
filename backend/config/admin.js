module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '74791cd0eee294fa30eca53ddbab0988'),
  },
});
