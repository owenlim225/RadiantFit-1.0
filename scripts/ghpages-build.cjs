const { renameSync, existsSync } = require('fs')
const { execSync } = require('child_process')
const path = require('path')

const root = path.join(__dirname, '..')
const apiDir = path.join(root, 'app', 'api')
const backupDir = path.join(root, '_api_ghpages_backup')

if (!existsSync(apiDir)) {
  console.log('No app/api folder, running next build.')
  execSync('npx next build', { stdio: 'inherit', cwd: root })
  process.exit(0)
}

try {
  renameSync(apiDir, backupDir)
  console.log('Moved app/api aside for static export.')
  execSync('npx next build', { stdio: 'inherit', cwd: root })
} finally {
  if (existsSync(backupDir)) {
    renameSync(backupDir, apiDir)
    console.log('Restored app/api.')
  }
}
