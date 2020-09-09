class GitHub {
    constructor() {
        this.clientID = '2a4b42154fb5d93a34b4';
        this.clientSecret = '4a4fce7b1bd00d143852e34bfa875b03e4ecd493';
        this.repos_count = 5;
        this.repos_sort = 'created asc';
    } 

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientID}&client_secret=${this.clientSecret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.clientID}&client_secret=${this.clientSecret}`);

        const profiledata = await profileResponse.json();
        const repoData = await repoResponse.json();

        return {
            profile: profiledata,
            repo: repoData
        }
    }
}