module.exports = {
  apps: [{
    name: 'API',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
