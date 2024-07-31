// @ts-check


const { test, expect } = require('@playwright/test');
// INTERNAL VALUES
import {THIRDPARTY_NAME} from './../../ConfigLocal.spec';

import { checkModuleActivated, checkUserLogged,  deleteThirdparty } from './../../moduleUtilsPlaywright';



test.describe('DATAS - DELETION', () => {

// We must log in and be sure module tested is activated  before each tests
	test.beforeEach(async ({ page }) => {

		// Appel des fonctions de vérifications
		await checkUserLogged(page);
		await checkModuleActivated(page);

	});
test('T-01-1 Deletion tiers', async({page}) => {await deleteThirdparty(page, THIRDPARTY_NAME);});


});


