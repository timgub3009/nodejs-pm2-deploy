require('dotenv').config({ path: '../.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: `${DEPLOY_PATH}-frontend`,

      'post-deploy': [
        'cd frontend',
        'npm ci',
        'npm run build',
        'rm -rf /var/www/mesto/*',
        'cp -r build/* /var/www/mesto/',
      ].join(' && '),
    },
  },
};