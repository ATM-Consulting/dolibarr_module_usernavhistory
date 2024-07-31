// @ts-check


const { test, expect } = require('@playwright/test');

// INTERNAL VALUES
import {THIRDPARTY_NAME} from './../../ConfigLocal.spec';

//
import { checkModuleActivated, checkUserLogged, addThirdparty, deleteThirdparty } from './../../moduleUtilsPlaywright';

test.describe.configure({ mode: 'serial' });

test.describe('DATAS - CREATION ', () => {
// We must log in and be sure module tested is activated  before each tests
	test.beforeEach(async ({ page }) => {

		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);

	});

	test('T-01-1 Create Thirdparty test (only mandatory)', async({page}) => {await addThirdparty(page, THIRDPARTY_NAME);});



});


