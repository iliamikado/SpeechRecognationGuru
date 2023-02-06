const url = 'https://grizzled-phase-astrodon.glitch.me/';

function getResource(path="") {
    return fetch(url + path)
        .then(data => (data.json()));
}

function postResource(path="", obj) {
    fetch(url + path, {method: 'POST', body: JSON.stringify(obj), headers: {'Content-Type': 'application/json'}});
}

function putResource(path="", obj) {
    fetch(url + path + obj.id, {method: 'PUT', body: JSON.stringify(obj), headers: {'Content-Type': 'application/json'}});
}

function sendNewResult(obj) {
    getResource('scores/' + obj.id).then(data => {
        let levels = [];
        if (!data.levels) {
            levels[obj.level] = {score: obj.score, stars: obj.stars};
            postResource('scores/', {
                id: obj.id,
                levels: levels
            });
        } else {
            levels = data.levels;
            if (!levels[obj.level] || obj.score > levels[obj.level].score) {
                levels[obj.level] = {score: obj.score, stars: obj.stars};
            }
            putResource('scores/', {
                id: obj.id,
                levels: levels
            });
        }
    });
}

function deleteAll() {
    getResource('scores').then(data => {
        data.forEach(({id}) => {
            fetch(url + 'scores/' + id, {method: 'DELETE', headers: {'Content-Type': 'application/json'}});
        })
    });
}

export {putResource, getResource, postResource, sendNewResult};