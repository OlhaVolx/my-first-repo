import {faker} from '@faker-js/faker';

describe('CheckCRUD lifecycle for goals', () => {
    let goalId = null;// Створює змінну goalId та одразу присвоює їй значення null. Це потрібно для того, щоб оголосити змінну до початку тесту,а потім у процесі тесту (наприклад, після створення нової цілі через API)зберегти у цю змінну ідентифікатор (id) створеної цілі.
    const TEAM_ID = Cypress.env('TEAM_ID');
    const API_URL = Cypress.env('API_URL');
    const TOKEN = Cypress.env('TOKEN');

    it('Send Get request and return 200 code', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            // 2. Перевірка, що ціль створена
            cy.sendRequest(`/team/${TEAM_ID}/goal`, 'GET').then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                const found = getResponse.body.goals.some(g => g.id === goalId);
                expect(found).to.be.true;
//const - Створення нової змінної, яку не можна переприсвоїти (але якщо це об’єкт – його властивості можна змінювати).
//found - новоа змінна: В ній буде зберігатися результат перевірки (true або false)
// .some() - Метод масиву. Перевіряє, чи є в масиві хоча б один елемент, який відповідає умові всередині дужок. Повертає true або false.
// g => g.id === goalId - Це стрілкова (arrow) функція. g — це кожен елемент масиву goals (тобто одна ціль).=> — означає «повернути те, що написано справа».g.id === goalId — перевіряє, чи id цієї цілі дорівнює шуканому id (goalId).=== — оператор суворої рівності (перевіряє і тип, і значення).

                // 3. Оновлення цілі
                cy.updateGoal(goalId, {name: faker.internet.username()})
                    .then((updateResponse) => {
                        expect(updateResponse.status).to.eq(200);


                        // 4. Видалення цілі
                        cy.deleteGoal(goalId).then((deleteResponse) => {
                            expect(deleteResponse.status).to.eq(200);

                            // 5. Перевірка, що ціль видалена
                            cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                                expect(deletedGoalResponse.status).to.eq(404);
                            });
                        })
                    })
            })
        })
    })

    it('Send Get request with invalid token ', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            //2. GET запит з невалідним токеном
            cy.request({
                url: `${API_URL}/team/${TEAM_ID}/goal`,
                method: 'GET',
                headers: {
                    Authorization: "invalid_188620723_KIOELYZKBXGAQTS9L69ECYOAI223V9HX"
                },
                failOnStatusCode: false
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(401);

                // 3. Видалення цілі
                cy.deleteGoal(goalId).then((deleteResponse) => {
                    expect(deleteResponse.status).to.eq(200);

                    // 4. Перевірка, що ціль видалена
                    cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                        expect(deletedGoalResponse.status).to.eq(404);
                    })
                })

            })
        })
    })

    it('Send Get request with invalid team_id', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            //2. GET запит з невалідним айді
            const randomTeamId = faker.string.numeric(6);
            cy.request({
                url: `${API_URL}/team/${randomTeamId}/goal`,
                method: 'GET',
                headers: {
                    Authorization: TOKEN,
                },
                failOnStatusCode: false
            }).then((getResponse) => {
                expect([400, 401, 404]).to.include(getResponse.status) // 400, 401, 404 тому що залежно від того як згенерує браузер, може бути різний статус код

                // 3. Видалення цілі
                cy.deleteGoal(goalId).then((deleteResponse) => {
                    expect(deleteResponse.status).to.eq(200);

                    // 4. Перевірка, що ціль видалена
                    cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                        expect(deletedGoalResponse.status).to.eq(404);
                    })
                })
            })
        })
    })

    it('Send POST request with invalid token ', () => {
        cy.request({
            url: `${API_URL}/team/${TEAM_ID}/goal`,
            method: 'POST',
            headers: {
                Authorization: "invalid_188620723_KIOELYZKBXGAQTS9L69ECYOAI223V9HX",
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false
        }).then((getResponse) => {
            expect(getResponse.status).to.eq(401);
        })
    })
    it('Send POST request with incorect teamId ', () => {
        const randomTeamId = faker.string.numeric(6)
        cy.request({
            url: `${API_URL}/team/${randomTeamId}/goal`,
            method: 'POST',
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
            body: {
                name: faker.internet.username(),
            }
        }).then((getResponse) => {
            expect([400, 401, 404]).to.include(getResponse.status) // 400, 401, 404 тому що залежно від того як згенерує браузер, може бути різний статус код
        })
    })
    it('Send PUT request with invalid token  ', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            // 2. Перевірка, що ціль створена
            cy.sendRequest(`/team/${TEAM_ID}/goal`, 'GET').then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                const found = getResponse.body.goals.some(g => g.id === goalId);
                expect(found).to.be.true;
                // 3. Оновлення цілі з невалідним токеном
                cy.request({
                    url: `${API_URL}/goal/${goalId}`,
                    method: 'PUT',
                    headers: {
                        Authorization: "invalid_188620723_KIOELYZKBXGAQTS9L69ECYOAI223V9HX"
                    },
                    failOnStatusCode: false
                }).then((getResponse) => {
                    expect(getResponse.status).to.eq(401);

                    // 4. Видалення цілі
                    cy.deleteGoal(goalId).then((deleteResponse) => {
                        expect(deleteResponse.status).to.eq(200);

                        // 4. Перевірка, що ціль видалена
                        cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                            expect(deletedGoalResponse.status).to.eq(404);
                        })
                    })
                })
            })
        })
    })

    it('Send Delete request with invalid token  ', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            // 2. Перевірка, що ціль створена
            cy.sendRequest(`/team/${TEAM_ID}/goal`, 'GET').then((getResponse) => {
                expect(getResponse.status).to.eq(200);
                const found = getResponse.body.goals.some(g => g.id === goalId);
                expect(found).to.be.true;

                // 3. Оновлення цілі
                cy.updateGoal(goalId, {name: faker.internet.username()})
                    .then((updateResponse) => {
                        expect(updateResponse.status).to.eq(200);

                        // 4. Видалення з невалідним токеном
                        cy.request({
                            url: `${API_URL}/goal/${goalId}`,
                            method: 'DELETE',
                            headers: {
                                Authorization: "invalid_188620723_KIOELYZKBXGAQTS9L69ECYOAI223V9HX"
                            },
                            failOnStatusCode: false
                        }).then((getResponse) => {
                            expect(getResponse.status).to.eq(401);

                            // 5. Видалення цілі
                            cy.deleteGoal(goalId).then((deleteResponse) => {
                                expect(deleteResponse.status).to.eq(200);

                                // 6. Перевірка, що ціль видалена
                                cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                                    expect(deletedGoalResponse.status).to.eq(404);
                                })
                            })
                        })
                    })
            })
        })
    })
    it('Send Get Goal request with invalid token  ', () => {

        // 1. Створення цілі
        cy.createGoal().then((response) => {
            expect(response.status).to.eq(200);
            console.log('Create goal response:', response.body);
            goalId = response.body.goal.id;

            // 2. GET запит з невалідним токеном
            cy.request({
                url: `${API_URL}/goal/${goalId}`,
                method: 'GET',
                headers: {
                    Authorization: "invalid_188620723_KIOELYZKBXGAQTS9L69ECYOAI223V9HX"
                },
                failOnStatusCode: false
            }).then((getResponse) => {
                expect(getResponse.status).to.eq(401);

                // 3. Видалення цілі
                cy.deleteGoal(goalId).then((deleteResponse) => {
                    expect(deleteResponse.status).to.eq(200);

                    // 4. Перевірка, що ціль видалена
                    cy.sendRequest(`/goal/${goalId}`, 'GET', null, {failOnStatusCode: false}).then((deletedGoalResponse) => {
                        expect(deletedGoalResponse.status).to.eq(404);
                    })
                })
            })
        })
    })
})