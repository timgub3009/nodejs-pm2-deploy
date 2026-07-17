require('dotenv').config({ path: '../.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      script: './dist/app.js',
      cwd: '/home/timur/mesto/current/backend',
      autorestart: true,
      restart_delay: 3000,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,

      'pre-deploy-local': `scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env`,

      'post-deploy': [
        'cd backend',
        'npm ci',
        'npm run build',
        `cp ${DEPLOY_PATH}/shared/.env .env`,
        'pm2 startOrRestart ecosystem.config.js --env production',
      ].join(' && '),
    },
  },
};
