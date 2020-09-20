const data = [
    {
        name: 'John Doe',
        age: 32,
        gender: 'male',
        lookingfor: 'female',
        location: 'Boston MA',
        image: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
        name: 'Jen',
        age: 25,
        gender: 'female',
        lookingfor: 'male',
        location: 'CA',
        image: 'https://randomuser.me/api/portraits/women/82.jpg'
    },
    {
        name: 'Jill',
        age: 19,
        gender: 'female',
        lookingfor: 'male',
        location: 'Florida',
        image: 'https://randomuser.me/api/portraits/women/28.jpg'
    }
];

const profiles = profileIterator(data);

//loads first profile
nextProfile();

// Next events
document.getElementById('next').addEventListener('click', nextProfile);

function nextProfile() {
    const currentProfile = profiles.next().value;

    if (currentProfile !== undefined) {
        document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name} </li>
            <li class="list-group-item">Age: ${currentProfile.age} </li>
            <li class="list-group-item">Location: ${currentProfile.location} </li>
            <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingfor} </li>
        </ul>
        `
    } else {
        window.location.reload()
    }

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}" >`; 
}

function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ?
            { value: profiles[nextIndex++], done: false } :
            { done: true }
        }
    };
}