const { exec } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const tagArgIndex = args.findIndex(arg => arg === '-tag');
const actionArgIndex = args.findIndex(arg => arg === '-action');
const tag = tagArgIndex !== -1 ? args[tagArgIndex + 1] : '';
const action = actionArgIndex !== -1 ? args[actionArgIndex + 1] : '';

// Execute docker build command
exec(`docker ${action} ${action == 'build' ? '-t' : ''} ${tag}${action == 'build' ? ' .' : ''}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
