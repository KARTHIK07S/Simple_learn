// All courses data for searching
const allCourses = [
    // Programming courses
    { name: "JavaScript Basics", category: "Programming", description: "Learn the fundamentals of JavaScript programming", duration: "4 weeks" },
    { name: "Python for Beginners", category: "Programming", description: "Start your Python programming journey", duration: "6 weeks" },
    { name: "Web Development", category: "Programming", description: "Build modern websites with HTML, CSS, JS", duration: "8 weeks" },
    
    // Design courses
    { name: "Graphic Design", category: "Design", description: "Master the art of visual communication", duration: "5 weeks" },
    { name: "UI/UX Design", category: "Design", description: "Design user-friendly interfaces", duration: "7 weeks" },
    { name: "Photography", category: "Design", description: "Learn professional photography techniques", duration: "4 weeks" },
    
    // Business courses
    { name: "Digital Marketing", category: "Business", description: "Master online marketing strategies", duration: "6 weeks" },
    { name: "Project Management", category: "Business", description: "Learn to manage projects effectively", duration: "5 weeks" },
    { name: "Finance Basics", category: "Business", description: "Understanding business finance", duration: "4 weeks" },
    
    // Language courses
    { name: "English Speaking", category: "Languages", description: "Improve your English communication", duration: "8 weeks" },
    { name: "Spanish for Beginners", category: "Languages", description: "Start learning Spanish today", duration: "10 weeks" },
    { name: "French Basics", category: "Languages", description: "Learn fundamental French skills", duration: "8 weeks" }
];

// Function to show different sections
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Function to search courses
function searchCourses() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('Please enter a search term');
        return;
    }
    
    // Filter courses based on search term
    const searchResults = allCourses.filter(course => 
        course.name.toLowerCase().includes(searchTerm) ||
        course.category.toLowerCase().includes(searchTerm) ||
        course.description.toLowerCase().includes(searchTerm)
    );
    
    // Display search results
    displaySearchResults(searchResults, searchTerm);
    showSection('searchResults');
}

// Function to display search results
function displaySearchResults(results, searchTerm) {
    const resultsContainer = document.getElementById('searchResultsContainer');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-result-item">
                <h4>No courses found</h4>
                <p>No courses found for "${searchTerm}". Try searching with different keywords.</p>
            </div>
        `;
        return;
    }
    
    let resultsHTML = `<p>Found ${results.length} course(s) for "${searchTerm}":</p>`;
    
    results.forEach(course => {
        resultsHTML += `
            <div class="search-result-item">
                <h4>${course.name}</h4>
                <p><strong>Category:</strong> ${course.category}</p>
                <p>${course.description}</p>
                <span class="course-duration">${course.duration}</span>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = resultsHTML;
}

// Function to handle registration form
function handleRegistration(event) {
    event.preventDefault();
    
    // Get form data
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const interests = document.getElementById('interests').value;
    
    // Simple validation
    if (!fullName || !email || !password || !confirmPassword || !interests) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // If validation passes, show success page
    showSection('success');
    
    // Clear the form
    document.getElementById('registrationForm').reset();
}

// Function to handle search with Enter key
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        searchCourses();
    }
}

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', function() {
    // Show home section by default
    showSection('home');
    
    // Add event listener to registration form
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', handleRegistration);
    
    // Add event listener to search input for Enter key
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', handleSearchKeyPress);
    
    // Add click event to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Remove active class from all nav links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

// Make functions globally available
window.showSection = showSection;
window.searchCourses = searchCourses;