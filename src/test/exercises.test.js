'use strict';

import 'dotenv/config';
import * as exercisesModel from '../controller/exercises_model.mjs';

let id_test_user = undefined

beforeAll( async() => {
    await exercisesModel.connect(true);
});

test('Test 0. To be added', async () => {
    const toBeAdded = true;
    expect(toBeAdded).toBe(true);
});

// test('Test 1. Create user', async() => {
//     const user = await exercisesModel.createUser("Test User", 25, "TestEmail@gmail.com");
//     expect(user.name).toBe("Test User");
//     expect(user.age).toBe(25);
//     expect(user.email).toBe("TestEmail@gmail.com");
//     expect(user._id).toBeDefined();
//     id_test_user = user._id.toString()
// })
