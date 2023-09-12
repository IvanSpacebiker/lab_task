const request = require('supertest')
const app = require('../app.js')


// ------------------------------ topBook tests ------------------------------
test('no books in table', async () => {
    await request(app)
    .get('/topBook?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, []);
})
test('1 book in table', async () => {
    await request(app).post('/events?action=take&bookid=1&readerid=1');
    await request(app)
    .get('/topBook?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '1', bookid: 1} ]);
})
test('2 same books in table', async () => {
    await request(app).post('/events?action=take&bookid=1&readerid=1');
    await request(app)
    .get('/topBook?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '2', bookid: 1} ]);
})
test('2 same and 1 different books in table', async () => {
    await request(app).post('/events?action=take&bookid=2&readerid=1');
    await request(app)
    .get('/topBook?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '2', bookid: 1} ]);
})

// ------------------------------ topReader tests ------------------------------
test('no readers in table', async () => {
    await request(app).delete('/events')
    await request(app)
    .get('/topReader?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [])
})
test('1 reader in table', async () => {
    await request(app).post('/events?action=take&bookid=1&readerid=1');
    await request(app)
    .get('/topReader?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '1', readerid: 1} ]);
})
test('2 same readers in table', async () => {
    await request(app).post('/events?action=take&bookid=1&readerid=1');
    await request(app)
    .get('/topReader?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '2', readerid: 1} ]);
})
test('2 same and 1 different readers in table', async () => {
    await request(app).post('/events?action=take&bookid=1&readerid=2');
    await request(app)
    .get('/topReader?from=2000-01-01T00:00:00&to=2030-12-31T00:00:00')
    .expect(200, [ {count: '2', readerid: 1} ]);
    await request(app).delete('/events')
})