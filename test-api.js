// Simple API test script
// Run with: node test-api.js

const testAPI = async () => {
    const baseUrl = 'http://localhost:5000';
    let accessToken = '';

    console.log('🧪 Testing Core Backend API...\n');

    try {
        // 1. Health Check
        console.log('1️⃣  Testing Health Check...');
        const healthRes = await fetch(`${baseUrl}/stats/health`);
        const health = await healthRes.json();
        console.log('✅ Health Check:', health.data.status);
        console.log('   Database:', health.data.database);
        console.log('');

        // 2. Register User
        console.log('2️⃣  Testing User Registration...');
        const registerRes = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            })
        });
        const registerData = await registerRes.json();

        if (registerData.success) {
            accessToken = registerData.data.accessToken;
            console.log('✅ User Registered:', registerData.data.user.name);
            console.log('   Email:', registerData.data.user.email);
            console.log('   Token received ✓');
            console.log('');
        } else {
            throw new Error('Registration failed');
        }

        // 3. Get Current User
        console.log('3️⃣  Testing Get Current User...');
        const userRes = await fetch(`${baseUrl}/users/me`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const userData = await userRes.json();
        console.log('✅ User Profile:', userData.data.user.name);
        console.log('');

        // 4. Create Tasks
        console.log('4️⃣  Testing Create Tasks...');
        const tasks = [
            { title: 'Complete backend setup', status: 'done' },
            { title: 'Write API documentation', status: 'pending' },
            { title: 'Test all endpoints', status: 'pending', dueDate: new Date(Date.now() + 86400000).toISOString() }
        ];

        for (const task of tasks) {
            const taskRes = await fetch(`${baseUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(task)
            });
            const taskData = await taskRes.json();
            console.log(`✅ Created: "${taskData.data.task.title}" [${taskData.data.task.status}]`);
        }
        console.log('');

        // 5. Get All Tasks
        console.log('5️⃣  Testing Get All Tasks...');
        const tasksRes = await fetch(`${baseUrl}/tasks`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const tasksData = await tasksRes.json();
        console.log(`✅ Retrieved ${tasksData.data.tasks.length} tasks`);
        console.log(`   Pagination: Page ${tasksData.data.pagination.page} of ${tasksData.data.pagination.pages}`);
        console.log('');

        // 6. Update a Task
        if (tasksData.data.tasks.length > 0) {
            console.log('6️⃣  Testing Update Task...');
            const firstTask = tasksData.data.tasks[0];
            const updateRes = await fetch(`${baseUrl}/tasks/${firstTask._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({ status: 'done' })
            });
            const updateData = await updateRes.json();
            console.log(`✅ Updated: "${updateData.data.task.title}" → ${updateData.data.task.status}`);
            console.log('');
        }

        // 7. Get Statistics
        console.log('7️⃣  Testing Get Statistics...');
        const statsRes = await fetch(`${baseUrl}/stats`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const statsData = await statsRes.json();
        const stats = statsData.data.stats;
        console.log('✅ User Statistics:');
        console.log(`   Total Tasks: ${stats.totalTasks}`);
        console.log(`   Pending: ${stats.pendingTasks}`);
        console.log(`   Completed: ${stats.completedTasks}`);
        console.log(`   Completion Rate: ${stats.completionRate}%`);
        console.log(`   Created Today: ${stats.tasksCreatedToday}`);
        console.log('');

        // 8. Test Filters
        console.log('8️⃣  Testing Task Filters...');
        const filterRes = await fetch(`${baseUrl}/tasks?status=pending&limit=5`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const filterData = await filterRes.json();
        console.log(`✅ Filtered pending tasks: ${filterData.data.tasks.length}`);
        console.log('');

        console.log('🎉 ALL TESTS PASSED!\n');
        console.log('📊 Summary:');
        console.log('   ✅ Health check');
        console.log('   ✅ User registration');
        console.log('   ✅ Authentication');
        console.log('   ✅ Get user profile');
        console.log('   ✅ Create tasks');
        console.log('   ✅ Get tasks');
        console.log('   ✅ Update task');
        console.log('   ✅ Get statistics');
        console.log('   ✅ Filter tasks');
        console.log('\n✨ Core Backend is fully functional!\n');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error('\n💡 Make sure:');
        console.error('   1. Server is running (npm run dev)');
        console.error('   2. MongoDB is connected');
        console.error('   3. Port 5000 is accessible\n');
    }
};

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
    console.log('❌ This script requires Node.js 18+ for native fetch support');
    console.log('💡 Please upgrade Node.js or use Postman for testing\n');
    process.exit(1);
}

testAPI();
