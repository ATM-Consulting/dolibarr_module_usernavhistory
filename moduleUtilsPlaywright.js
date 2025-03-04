import { expect } from '@playwright/test';
import {THIRDPARTY_NAME, URL_TO_USE} from "./ConfigLocal.spec";

export async function checkModuleActivated(page) {
	await page.goto(URL_TO_USE + '/admin/modules.php?mainmenu=home');
	// Attendre que la page soit complètement chargée
	await page.waitForLoadState('networkidle');
	await page.getByPlaceholder('Mot-clé').fill('HISTORIQUE NAVIGATION UTILISATEUR');
	await page.getByRole('button', { name: 'Rafraichir' }).click();

	// Vérifie la présence de l'élément
	const element = page.locator('span.info-box-title:has-text("Historique navigation utilisateur")');
	//  l'élément est visible
	await expect(element).toBeVisible();
	// Vérifiez le texte exact de l'élément
	await expect(element).toHaveText('Historique navigation utilisateur');

	// Verification si le module est activé
	// Vérifiez que l'élément contient la classe "fas fa-toggle-on"
	// Localisez l'élément spécifique
	const toggleElement = page.locator('a.reposition[href*="modUserNavHistory"][href*="modules.php"]');

	// Vérifiez que l'élément est visible
	await expect(toggleElement).toBeVisible();
	const spanElement = toggleElement.locator('span');
	await expect(spanElement).toHaveClass(/fas fa-toggle-on/);

	// Vérifiez que l'élément a la classe "font-status4"
	await expect(spanElement).toHaveClass(/font-status4/);

	// Vérifiez que le titre de l'élément est "Activé"
	await expect(spanElement).toHaveAttribute('title', 'Activé');
};
export async function checkUserLogged(page){
	await page.goto(URL_TO_USE + 'index.php/');
	const inputPassword = page.getByRole('textbox', {name: 'Mot de passe'});

	// sommes nous sur la page de login  ?
	await expect(page.locator('#username')).toHaveAttribute('type', 'text');

	const inputUsername = page.locator('#username');
	const inputUsername2 = page.locator('input.flat.input-icon-user.minwidth150');
	const inputUsername3 = page.locator('[name = \'username\']');
	const inputPassword2 = page.locator("#password");

	await page.getByPlaceholder('Identifiant').fill(process.env.DOLIBARR_USER_LOGIN);

	const password = page.getByPlaceholder('Mot de passe');
	await password.fill(process.env.DOLIBARR_USER_PASSWORD);
	await password.press('Enter');

	// We must be loged in now
	await expect(page).toHaveTitle(/Accueil/);
};

// fonction générique de création de tiers pour test ultérieur
export async function addThirdparty(page, nameThridparty){

	await page.goto(URL_TO_USE + 'societe/card.php?action=create&mainmenu=companies');

	// Thirdparty name
	await page.locator('#name').fill(nameThridparty);

	// Thirdparty alias
	await page.locator('#name_alias_input').fill('[Playwright]');

	// Set thirdparty as "Customer only"
	await page.locator('#customerprospect').selectOption('1');

	// Set thirdparty as "Not Supplier"
	await page.locator('#fournisseur').selectOption('0');

	// Submit form
	await page.getByRole('button', { name: 'Créer tiers' }).click();

	await expect(page).toHaveTitle(nameThridparty +' - Fiche');
};

// fonction générique de suppression de tiers pour test ultérieur
export async function deleteThirdparty(page, nameThridparty){

	await page.goto(URL_TO_USE + 'societe/index.php?mainmenu=companies');

	// ===== JUST THE BEGINNING =====
	await page.getByRole('link', { name: 'Liste', exact: true }).first().click();
	await expect(page).toHaveTitle('Tiers');
	await expect(page).toHaveURL(/societe\/list\.php/);

	const firstRecord = page.locator(`a.classfortooltip.refurl.valignmiddle:has-text("${nameThridparty}")`).first();
	await expect(firstRecord).toBeVisible();
	await firstRecord.click();

	await expect(page).toHaveTitle(/Fiche$/);

	const deleteButton = page.locator('#action-delete');
	await expect(deleteButton).toBeVisible();
	await expect(deleteButton).toBeEnabled();

	// ===== ACTUAL DELETION =====
	await deleteButton.click();
	await expect(page.locator('.statusref')).toBeVisible();

	const dialogYesButton = page.getByRole('button', { name: 'Oui' });
	await expect(dialogYesButton).toBeVisible();

	await dialogYesButton.click();
	await expect(page).toHaveURL(/societe\/list\.php/);
};
