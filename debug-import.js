
console.log('getAllUsers type:', typeof getAllUsers);
console.log('getAllUsers function:', getAllUsers.toString());

// Test function call
try {
    const result = await getAllUsers();
    console.log('Function call successful, status:', result.status);
} catch (error) {
    console.error('Function call failed:', error.message);
}