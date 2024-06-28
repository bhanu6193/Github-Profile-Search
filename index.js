document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#search');

    searchInput.addEventListener('blur', () => handleFormSubmit());

    fetchUserProfile("bhanu6193");
});

const handleFormSubmit = () => {
    const searchInput = document.querySelector('#search');
    if (searchInput.value.trim() !== "") {
        fetchUserProfile(searchInput.value.trim());
        searchInput.value = "";
    }
    return false;
}

const fetchUserProfile = async (username) => {
    const API_URL = "https://api.github.com/users";
    const mainContainer = document.querySelector('#main');

    try {
        const response = await fetch(`${API_URL}/${username}`);
        const userData = await response.json();

        const userCard = createUserCard(userData);
        mainContainer.innerHTML = userCard;

        fetchUserRepos(API_URL, username);
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

const createUserCard = (userData) => {
    return `
        <div class="card">
            <div>
                <img class="avatar" src="${userData.avatar_url}" alt="User Avatar">
            </div>
            <div class="user">
                <h2>
                    <a href="${userData.html_url}" target="_blank">${userData.name}</a>
                </h2>
                <p>${userData.bio}</p>
                <ul>
                    <li>${userData.following}<strong> following</strong></li>
                    <li>${userData.followers}<strong> followers</strong></li>
                    <li>${userData.public_repos}<strong> Repos</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;
}

const fetchUserRepos = async (API_URL, username) => {
    const reposContainer = document.querySelector('#repos');

    try {
        const response = await fetch(`${API_URL}/${username}/repos`);
        const reposData = await response.json();

        reposData.forEach(repo => {
            const repoLink = document.createElement('a');
            repoLink.classList.add('repo');
            repoLink.href = repo.html_url;
            repoLink.innerText = repo.name;
            repoLink.target = "_blank";
            reposContainer.appendChild(repoLink);
        });
    } catch (error) {
        console.error('Error fetching user repositories:', error);
    }
}
