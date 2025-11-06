# Create a simple test
cat > test.js << 'EOF'
console.log('Testing file paths...');
try {
  const Contact = require('./models/Contact');
  console.log('✅ models/Contact.js found successfully!');
} catch (error) {
  console.log('❌ Error loading models/Contact.js:', error.message);
}
EOF

node test.js