interface UserGithub {
    id: number,
    login: string,
    name: string,
    bio: string,
    public_repos: number,
    repos_url: string,
    message?: "Not Found"
}

interface PublicRepos {
    name: string,
    description: string,
    fork: boolean,
    stargazers_count: number
}

const users: UserGithub[] = []

async function fetchUser(username: string) {
    const api = await fetch(`https://api.github.com/users/${username}`)
    const user: UserGithub = await api.json()

    if (user.message) {
        alert('Usuário não encontrado')
    } else {
        users.push(user)
    }
}

async function UserPublicRepos(username: string) {
    const user = users.find(user => user.login === username)

    if(typeof user === 'undefined') {
        alert('Usuário não encontrado')
    } else {
        const response = await fetch(user.repos_url)
        const repos: PublicRepos[] = await response.json()
    
        let message = `id: ${user.id}\n` +
            `\nlogin: ${user.login}` +
            `\nNome: ${user.name}` +
            `\nBio: ${user.bio}` +
            `\nRepositórios públicos: ${user.public_repos}`

        repos.forEach(repo => {
        message += `\nNome: ${repo.name}` +
            `\nDescrição: ${repo.description}` +
            `\nEstrelas: ${repo.stargazers_count}` +
            `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`
        })

    alert(message)
    }
}

function AllUsers(){
    let message = 'Usuários:\n'

    users.forEach(user => {
    message += `\n${user.login}`

    })

    alert(message)
}

function AllPublicRepos() {
    const repos = users.reduce((accumulator, user) => (accumulator + user.public_repos), 0)
    alert(`O grupo possui ${repos} repositórios públicos!`)
}

function showTopFive() {
    const topFive = users.slice().sort((a, b) => b.public_repos - a.public_repos).slice(0,5)

    let message = 'Top 5 usuários com mais repositórios públicos:\n'

    topFive.forEach((user, index) => {
        message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`
    })

    alert(message)
}